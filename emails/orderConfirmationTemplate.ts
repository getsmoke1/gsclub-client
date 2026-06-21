export const orderConfirmationTemplate = (
  customerName: string,
  orderId: string,
  items: { name: string; quantity: number; price: number }[],
  subtotal: number,
  shippingAmount: number,
  total: number,
  shippingAddress: string
) => {
  const itemsHtml = items.map(item => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">$${(item.price * item.quantity).toFixed(2)}</td>
    </tr>
  `).join('');

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Order Confirmation - GetSmoke</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:30px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
    
    <!-- Header -->
    <div style="background:#000;padding:28px 32px;text-align:center;">
      <h1 style="color:#fff;margin:0;font-size:28px;letter-spacing:2px;">GETSMOKE</h1>
      <p style="color:#fe3500;margin:6px 0 0;font-size:13px;letter-spacing:1px;">ORDER CONFIRMED</p>
    </div>

    <!-- Body -->
    <div style="padding:32px;">
      <p style="font-size:16px;color:#222;">Hi ${customerName},</p>
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Thank you for your order! We have received your payment and are preparing your shipment.
        You will receive a tracking number once your order ships.
      </p>

      <div style="background:#f9f9f9;border-radius:8px;padding:16px;margin:24px 0;">
        <p style="margin:0 0 4px;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:1px;">Order ID</p>
        <p style="margin:0;font-size:15px;font-weight:bold;color:#222;">${orderId}</p>
      </div>

      <!-- Items table -->
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <thead>
          <tr style="background:#f0f0f0;">
            <th style="padding:10px;text-align:left;font-size:12px;text-transform:uppercase;color:#666;">Product</th>
            <th style="padding:10px;text-align:center;font-size:12px;text-transform:uppercase;color:#666;">Qty</th>
            <th style="padding:10px;text-align:right;font-size:12px;text-transform:uppercase;color:#666;">Price</th>
          </tr>
        </thead>
        <tbody>${itemsHtml}</tbody>
      </table>

      <!-- Totals -->
      <table style="width:100%;font-size:14px;margin-top:16px;">
        <tr>
          <td style="padding:6px 0;color:#555;">Subtotal</td>
          <td style="padding:6px 0;text-align:right;color:#555;">$${subtotal.toFixed(2)}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#555;">Shipping</td>
          <td style="padding:6px 0;text-align:right;color:#555;">$${shippingAmount.toFixed(2)}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;font-weight:bold;font-size:16px;color:#222;border-top:2px solid #eee;">Total</td>
          <td style="padding:10px 0;text-align:right;font-weight:bold;font-size:16px;color:#fe3500;border-top:2px solid #eee;">$${total.toFixed(2)}</td>
        </tr>
      </table>

      <!-- Shipping address -->
      <div style="background:#f9f9f9;border-radius:8px;padding:16px;margin:24px 0;">
        <p style="margin:0 0 6px;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:1px;">Shipping To</p>
        <p style="margin:0;font-size:14px;color:#333;line-height:1.6;">${shippingAddress}</p>
      </div>

      <p style="color:#555;font-size:13px;line-height:1.6;">
        Questions? Reply to this email or contact us at 
        <a href="mailto:info@getsmoke.com" style="color:#fe3500;">info@getsmoke.com</a>
      </p>
    </div>

    <!-- Footer -->
    <div style="background:#111;padding:20px 32px;text-align:center;">
      <p style="color:#777;font-size:12px;margin:0;">
        &copy; ${new Date().getFullYear()} GetSmoke - COSMOPROJECT LLC. All rights reserved.<br/>
        Must be 21+ to purchase. Nicotine is addictive.
      </p>
    </div>
  </div>
</body>
</html>`;
};
