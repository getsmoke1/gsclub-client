import { prisma } from "@/lib/prisma";
import { CartItem } from "@/types/cart";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/mail";
import { orderConfirmationTemplate } from "@/emails/orderConfirmationTemplate";
import { SUBSCRIPTION_FREQUENCIES, FrequencyValue, getNextBillingDate, calcSubscriptionPrice } from "@/lib/nmi";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      token,
      email,
      items,
      shippingName,
      shippingStreetAddress,
      shippingState,
      shippingCity,
      shippingZipCode,
      shippingRateId,
      carrier,
      shippingAmount,
      _insuranceAmount,  // prefixed to avoid ESLint warning
      nameOnCard,
      billingStreetAddress,
      billingCity,
      billingState,
      billingZipCode,
      billingDifferent,
      // Subscription fields (optional)
      isSubscription,
      subscriptionFrequency,
    } = body;

    // Step 0: Validate the request
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Missing payment token" },
        { status: 400 }
      );
    }

    const securityKey = process.env.NMI_SECURITY_KEY;
    if (!securityKey) {
      console.error("NMI_SECURITY_KEY is not defined in environment variables");
      return NextResponse.json(
        { success: false, message: "Payment processor configuration error" },
        { status: 500 }
      );
    }

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
    }

    if (!items || !items.length) {
      return NextResponse.json({ success: false, message: "No items provided in cart" }, { status: 400 });
    }

    // Step 1: Check if the user exists -- guest ordering
    let user = await prisma.user.findUnique({
      where: { email },
    });

    // If the user doesn't exist, create a new user with only the email
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name: "Guest User",
        },
      });
    }

    // Step 2: Fetch detailed product information with relations for snapshot
    console.log("Fetching product details from the database");
    const productsWithDetails = await prisma.product.findMany({
      where: {
        id: { in: items.map((item: CartItem) => item.id) },
      },
      include: {
        brand: true,
        flavor: true,
        Nicotine: true,
        productFlavors: {
          include: {
            flavor: true,
          },
        },
        productPuffs: {
          include: {
            puffs: true,
          },
        },
      },
    });

    if (productsWithDetails.length !== items.length) {
      console.error("Some products not found");
      return NextResponse.json(
        { error: "Some products not found" },
        { status: 404 }
      );
    }

    // Step 3: Calculate the order total based on products and quantities
    let subtotal = 0;
    const orderItemsData = items.map((item: CartItem) => {
      const product = productsWithDetails.find((p) => p.id === item.id);
      if (!product) throw new Error(`Product not found: ${item.id}`);

      // Handle flavor based on attributeId
      let flavorName = null;
      if (item.attributeId) {
        // Find the specific flavor from productFlavors
        const productFlavor = product.productFlavors.find(
          (pf) => pf.flavorId === item.attributeId
        );
        flavorName = productFlavor?.flavor.name || null;
      } else if (product.flavor) {
        // Use the direct flavor relation if no attributeId
        flavorName = product.flavor.name;
      }

      // Calculate price per item considering packCount
      const packCount = product.packCount || 1;
      const itemPrice = product.currentPrice / packCount;
      const itemTotal = itemPrice * item.quantity;
      subtotal += itemTotal;

      // Create product snapshot with required fields only
      return {
        quantity: item.quantity,
        productId: product.id,
        purchasePrice: itemPrice, // Store per-item price
        productSnapshot: {
          id: product.id,
          name: product.name,
          currentPrice: itemPrice, // Store per-item price
          originalPrice: product.originalPrice
            ? product.originalPrice / packCount
            : null,
          brandName: product.brand.name,
          flavorName: flavorName,
          nicotineName: product.Nicotine.name,
          // Include puffs data if available
          puffs: product.productPuffs.map((pp) => ({
            name: pp.puffs.name,
            description: pp.puffDesc,
          })),
        },
      };
    });

    // Add shipping cost to calculate final total
    const shippingCost = shippingAmount ? parseFloat(shippingAmount) : 0;
    const insuranceCost = _insuranceAmount ? parseFloat(_insuranceAmount) : 0;
    const finalTotal = subtotal + shippingCost + insuranceCost;

    // Step 4: Create order in the database with isPaid = false
    const orderData = {
      userEmail: email,
      shippingName,
      shippingStreetAddress,
      shippingState,
      shippingCity,
      shippingZipCode,
      isPaid: false,
      totalAmount: finalTotal,
      shippingAmount: shippingAmount || null,
      orderItems: {
        create: orderItemsData,
      },
      Shipment: shippingRateId
        ? {
            create: {
              shippoShipmentId: shippingRateId,
              shippoTransactionId: null,
              carrier,
              status: "pending",
            },
          }
        : undefined,
      shippingRateId,
    };

    const order = await prisma.order.create({
      data: orderData,
      include: {
        orderItems: true,
        Shipment: true,
      },
    });

    // Step 5: Prepare the request to NMI Payment API with order ID and calculated amount
    const cardName = (nameOnCard || shippingName || "").trim();
    const nameParts = cardName.split(" ");
    // Build NMI request - only send fields that have values (undefined → skip)
    const nmiRequestData: Record<string, string> = {
      security_key: securityKey,
      payment_token: token.toString(),
      amount: finalTotal.toFixed(2),
      type: "sale",
    };
    // Only add optional fields if they have real values (not undefined/empty)
    if (order.id) nmiRequestData.order_id = order.id;
    if (nameParts[0]) nmiRequestData.firstname = nameParts[0];
    if (nameParts.slice(1).join(" ") || nameParts[0]) nmiRequestData.lastname = nameParts.slice(1).join(" ") || nameParts[0];
    // Use billing address if set and different; otherwise use shipping address
    // NMI requires address1 for this merchant account
    const finalAddrStreet = (billingDifferent && billingStreetAddress) ? billingStreetAddress : shippingStreetAddress;
    const finalAddrCity   = (billingDifferent && billingCity)          ? billingCity          : shippingCity;
    const finalAddrState  = (billingDifferent && billingState)         ? billingState         : shippingState;
    const finalAddrZip    = (billingDifferent && billingZipCode)       ? billingZipCode       : shippingZipCode;
    console.log("NMI address:", { street: finalAddrStreet, city: finalAddrCity, state: finalAddrState, zip: finalAddrZip });
    if (finalAddrStreet) nmiRequestData.address1 = finalAddrStreet;
    if (finalAddrCity)   nmiRequestData.city     = finalAddrCity;
    if (finalAddrState)  nmiRequestData.state    = finalAddrState;
    if (finalAddrZip)    nmiRequestData.zip      = finalAddrZip;
    nmiRequestData.country = "US";
    if (email)  nmiRequestData.email = email;

    // For subscriptions: add the card to Customer Vault during this transaction
    if (isSubscription && subscriptionFrequency) {
      nmiRequestData.customer_vault = "add_customer";
    }
    // Debug: log what we're sending to NMI (exclude security_key from log)
    const debugData = {...nmiRequestData, security_key: "[hidden]"};
    console.log("NMI Request:", JSON.stringify(debugData));

    // Make the API request to NMI
    const response = await fetch("https://secure.nmi.com/api/transact.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(nmiRequestData).toString(),
    });

    // NMI returns data in a specific format that needs parsing
    const responseText = await response.text();
    const responseData = parseNmiResponse(responseText);
    console.log("NMI Response:", JSON.stringify({
      response: responseData.response,
      responsetext: responseData.responsetext,
      response_code: responseData.response_code,
      transactionid: responseData.transactionid,
      amount: finalTotal.toFixed(2),
      hasToken: !!token,
      hasAddress: !!shippingStreetAddress,
    }));

    if (responseData.response === "1") {
      // Payment was successful - update order to paid
      await prisma.order.update({
        where: { id: order.id },
        data: { isPaid: true },
      });

      // If subscription: save vault ID and create Subscription records for each item
      if (isSubscription && subscriptionFrequency && responseData.customer_vault_id) {
        const vaultId = responseData.customer_vault_id;
        const freq = SUBSCRIPTION_FREQUENCIES.find(f => f.value === subscriptionFrequency) as typeof SUBSCRIPTION_FREQUENCIES[number] | undefined;

        if (freq) {
          const dbUser = await prisma.user.findUnique({ where: { email } });

          if (dbUser) {
            // Create or update CustomerVault record
            const vault = await prisma.customerVault.upsert({
              where: { userId: dbUser.id },
              create: {
                userId: dbUser.id,
                vaultId: vaultId,
                lastFour: responseData.cc_number?.slice(-4) || "****",
                cardType: responseData.cc_type || "card",
              },
              update: {
                vaultId: vaultId,
                lastFour: responseData.cc_number?.slice(-4) || "****",
                cardType: responseData.cc_type || "card",
              },
            });

            // Create a subscription for each product in the order
            for (const item of orderItemsData) {
              const product = productsWithDetails.find(p => p.id === item.productId);
              if (!product) continue;
              const discountedPrice = calcSubscriptionPrice(product.currentPrice, freq.discountPct);
              await prisma.subscription.create({
                data: {
                  userId: dbUser.id,
                  productId: item.productId,
                  vaultId: vault.id,
                  frequency: freq.value,
                  discountPct: freq.discountPct,
                  price: discountedPrice,
                  quantity: item.quantity,
                  status: "active",
                  nextBillingDate: getNextBillingDate(freq.value as FrequencyValue),
                },
              });
            }
          }
        }
      }

      // Send order confirmation email to customer
      try {
        const emailItems = orderItemsData.map((item: { productSnapshot: { name: string; currentPrice: number }; quantity: number; purchasePrice: number }) => ({
          name: item.productSnapshot?.name || "Product",
          quantity: item.quantity,
          price: item.purchasePrice,
        }));
        const subtotal = emailItems.reduce((sum: number, i: { price: number; quantity: number }) => sum + i.price * i.quantity, 0);
        const shippingAddr = `${shippingName}\n${shippingStreetAddress}\n${shippingCity}, ${shippingState} ${shippingZipCode}`;
        await sendEmail(
          email,
          `[getsmoke]: Order Confirmed #${order.id.slice(-8).toUpperCase()}`,
          orderConfirmationTemplate(
            shippingName,
            order.id.slice(-8).toUpperCase(),
            emailItems,
            subtotal,
            parseFloat(shippingAmount) || 0,
            finalTotal,
            shippingAddr
          )
        );
        // Notify store
        await sendEmail(
          "info@getsmoke.com",
          `[getsmoke]: New order #${order.id.slice(-8).toUpperCase()}`,
          orderConfirmationTemplate(
            shippingName,
            order.id.slice(-8).toUpperCase(),
            emailItems,
            subtotal,
            parseFloat(shippingAmount) || 0,
            finalTotal,
            shippingAddr
          )
        );
      } catch (emailErr) {
        console.error("Order confirmation email failed:", emailErr);
        // Don't fail the order if email fails
      }

      return NextResponse.json(
        {
          success: true,
          orderId: order.id,
          transactionId: responseData.transactionid,
          authCode: responseData.authcode,
          message: responseData.responsetext,
          total: finalTotal.toFixed(2),
        },
        { status: 200 }
      );
    } else {
      // Payment failed - send admin notification and return error
      console.error("NMI Error:", responseData);

      try {
        const failedItems = orderItemsData.map((item: { productSnapshot: { name: string; currentPrice: number }; quantity: number; purchasePrice: number }) => ({
          name: item.productSnapshot?.name || "Product",
          quantity: item.quantity,
          price: item.purchasePrice,
        }));
        const failedSubtotal = failedItems.reduce((sum: number, i: { price: number; quantity: number }) => sum + i.price * i.quantity, 0);
        const failedShipping = parseFloat(shippingAmount) || 0;
        const failedTotal = failedSubtotal + failedShipping + (parseFloat(_insuranceAmount) || 0);
        const failedOrderNum = order.id.slice(-8).toUpperCase();
        const failedReason = responseData.responsetext || "Payment processing error";
        const failedAddr = `${shippingName}\n${shippingStreetAddress}\n${shippingCity}, ${shippingState} ${shippingZipCode}`;

        const itemRows = failedItems.map((i: { name: string; quantity: number; price: number }) =>
          `<tr><td style="padding:8px;border:1px solid #ddd">${i.name}</td><td style="padding:8px;border:1px solid #ddd;text-align:center">${i.quantity}</td><td style="padding:8px;border:1px solid #ddd;text-align:right">$${(i.price * i.quantity).toFixed(2)}</td></tr>`
        ).join("");

        const failedEmailHtml = `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
            <div style="background:#c0392b;padding:24px;color:#fff">
              <h1 style="margin:0;font-size:24px">Payment Failed: #${failedOrderNum}</h1>
            </div>
            <div style="padding:24px">
              <p>Payment from <strong>${shippingName}</strong> (${email}) has failed.</p>
              <p style="color:#c0392b"><strong>Reason: ${failedReason}</strong></p>
              <h3>Order #${failedOrderNum}</h3>
              <table style="width:100%;border-collapse:collapse;margin-bottom:16px">
                <thead>
                  <tr style="background:#f5f5f5">
                    <th style="padding:8px;border:1px solid #ddd;text-align:left">Product</th>
                    <th style="padding:8px;border:1px solid #ddd;text-align:center">Qty</th>
                    <th style="padding:8px;border:1px solid #ddd;text-align:right">Price</th>
                  </tr>
                </thead>
                <tbody>${itemRows}</tbody>
                <tfoot>
                  <tr><td colspan="2" style="padding:8px;border:1px solid #ddd"><strong>Subtotal</strong></td><td style="padding:8px;border:1px solid #ddd;text-align:right">$${failedSubtotal.toFixed(2)}</td></tr>
                  <tr><td colspan="2" style="padding:8px;border:1px solid #ddd"><strong>Shipping</strong></td><td style="padding:8px;border:1px solid #ddd;text-align:right">${failedShipping === 0 ? "Free" : "$" + failedShipping.toFixed(2)}</td></tr>
                  <tr><td colspan="2" style="padding:8px;border:1px solid #ddd"><strong>Total</strong></td><td style="padding:8px;border:1px solid #ddd;text-align:right"><strong>$${failedTotal.toFixed(2)}</strong></td></tr>
                </tfoot>
              </table>
              <div style="display:flex;gap:24px">
                <div style="flex:1">
                  <h4 style="color:#c0392b">Billing / Shipping Address</h4>
                  <p style="white-space:pre-line;background:#f9f9f9;padding:12px;border-radius:6px">${failedAddr}</p>
                </div>
              </div>
              <p style="color:#888;font-size:12px;margin-top:16px">Payment method: Credit card (NMI) - Response code: ${responseData.response_code || responseData.response}</p>
            </div>
          </div>
        `;

        await sendEmail(
          "info@getsmoke.com",
          `[GetSmoke] Payment FAILED #${failedOrderNum} - ${shippingName} - $${failedTotal.toFixed(2)}`,
          failedEmailHtml
        );
      } catch (notifyErr) {
        console.error("Failed to send failed-payment notification:", notifyErr);
      }

      return NextResponse.json(
        {
          success: false,
          message: responseData.responsetext || "Payment processing error",
          errorDetails: responseData,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Payment processing error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while processing the payment",
      },
      { status: 500 }
    );
  }
}

// Helper function to parse NMI's response format
function parseNmiResponse(responseStr: string) {
  const result: Record<string, string> = {};
  responseStr.split("&").forEach((pair) => {
    const [key, value] = pair.split("=");
    result[key] = value;
  });
  return result;
}
