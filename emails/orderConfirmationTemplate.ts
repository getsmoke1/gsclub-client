const FREQ_LABELS: Record<string, string> = {
  "1_week":  "Every 1 week",
  "2_weeks": "Every 2 weeks",
  "4_weeks": "Every 4 weeks",
};

export const orderConfirmationTemplate = (
  customerName: string,
  orderId: string,
  items: { name: string; quantity: number; price: number }[],
  subtotal: number,
  shippingAmount: number,
  total: number,
  shippingAddress: string,
  isSubscription?: boolean,
  subscriptionFrequency?: string
) => {
  const itemsHtml = items.map(item => `
    <tr>
      <td style="padding:12px 10px;border-bottom:1px solid #e5e7eb;font-size:14px;color:#111;">${item.name}</td>
      <td style="padding:12px 10px;border-bottom:1px solid #e5e7eb;text-align:center;font-size:14px;color:#111;">${item.quantity}</td>
      <td style="padding:12px 10px;border-bottom:1px solid #e5e7eb;text-align:right;font-size:14px;color:#111;">$${(item.price * item.quantity).toFixed(2)}</td>
    </tr>
  `).join('');

  const headerTitle = isSubscription
    ? `New Subscription Order: #${orderId}`
    : `New Order: #${orderId}`;

  const freqLabel = subscriptionFrequency ? FREQ_LABELS[subscriptionFrequency] || subscriptionFrequency : null;

  const subscriptionBadge = isSubscription ? `
    <div style="margin:0 0 20px;padding:12px 16px;background:#ede9fe;border-left:4px solid #7c3aed;border-radius:6px;">
      <p style="margin:0;font-size:14px;color:#5b21b6;font-weight:700;">Subscription Order${freqLabel ? ` - ${freqLabel}` : ''}</p>
      <p style="margin:4px 0 0;font-size:12px;color:#7c3aed;">The customer will be automatically billed ${freqLabel ? freqLabel.toLowerCase() : 'on a recurring schedule'}.</p>
    </div>
  ` : '';

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Order Confirmation - GetSmoke</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:30px auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

    <!-- Header -->
    <div style="background:${isSubscription ? '#7c3aed' : '#f0a500'};padding:32px;text-align:center;">
      <h1 style="color:#fff;margin:0;font-size:28px;font-weight:700;">${headerTitle}</h1>
    </div>

    <!-- Body -->
    <div style="padding:28px 32px;">
      <p style="margin:0 0 6px;font-size:15px;color:#333;">You've received the following order from ${customerName}:</p>
      <p style="margin:0 0 20px;font-size:15px;">
        <a href="https://getsmoke.com/orders/${orderId}" style="color:#f0a500;font-weight:600;">[Order #${orderId}]</a>
      </p>

      ${subscriptionBadge}

      <!-- Items table -->
      <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;border-radius:6px;overflow:hidden;">
        <thead>
          <tr style="background:#f9fafb;">
            <th style="padding:10px;text-align:left;font-size:13px;color:#6b7280;font-weight:600;">Product</th>
            <th style="padding:10px;text-align:center;font-size:13px;color:#6b7280;font-weight:600;">Quantity</th>
            <th style="padding:10px;text-align:right;font-size:13px;color:#6b7280;font-weight:600;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" style="padding:10px;font-size:14px;font-weight:600;border-top:1px solid #e5e7eb;">Subtotal:</td>
            <td style="padding:10px;text-align:right;font-size:14px;border-top:1px solid #e5e7eb;">$${subtotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td colspan="2" style="padding:10px;font-size:14px;font-weight:600;">Shipping:</td>
            <td style="padding:10px;text-align:right;font-size:14px;">$${shippingAmount.toFixed(2)} via Flat rate</td>
          </tr>
          <tr style="background:#f9fafb;">
            <td colspan="2" style="padding:12px 10px;font-size:15px;font-weight:700;">Total:</td>
            <td style="padding:12px 10px;text-align:right;font-size:15px;font-weight:700;">$${total.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>

      <!-- Shipping address -->
      <div style="margin-top:24px;padding:16px;background:#f9fafb;border-radius:6px;border:1px solid #e5e7eb;">
        <p style="margin:0 0 6px;font-size:13px;font-weight:600;color:#374151;">Shipping Address:</p>
        <p style="margin:0;font-size:13px;color:#6b7280;white-space:pre-line;">${shippingAddress}</p>
      </div>

      <!-- Footer note -->
      <p style="margin:24px 0 0;font-size:13px;color:#9ca3af;text-align:center;">
        Questions? Contact us at <a href="mailto:info@getsmoke.com" style="color:#FE3500;">info@getsmoke.com</a>
      </p>
    </div>

    <!-- Bottom bar -->
    <div style="background:#111;padding:16px;text-align:center;">
      <p style="margin:0;color:#fff;font-size:13px;letter-spacing:1px;">GETSMOKE.COM</p>
    </div>
  </div>
</body>
</html>`;
};
