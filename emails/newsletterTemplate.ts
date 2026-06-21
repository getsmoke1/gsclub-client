export const newsletterConfirmTemplate = (email: string) => `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><title>Subscribed - GetSmoke</title></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:30px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
    <div style="background:#000;padding:28px 32px;text-align:center;">
      <h1 style="color:#fff;margin:0;font-size:28px;letter-spacing:2px;">GETSMOKE</h1>
    </div>
    <div style="padding:32px;text-align:center;">
      <h2 style="color:#222;font-size:22px;">You're subscribed!</h2>
      <p style="color:#555;font-size:14px;line-height:1.7;">
        Thanks for subscribing to GetSmoke news.<br/>
        You'll be the first to know about new arrivals, deals, and product drops.
      </p>
      <a href="https://gsclub-client-jade.vercel.app" style="display:inline-block;margin-top:16px;background:#fe3500;color:#fff;padding:12px 28px;border-radius:9999px;text-decoration:none;font-weight:bold;font-size:14px;">Shop Now</a>
    </div>
    <div style="background:#111;padding:20px 32px;text-align:center;">
      <p style="color:#777;font-size:12px;margin:0;">
        &copy; ${new Date().getFullYear()} GetSmoke - COSMOPROJECT LLC. 21+ only.<br/>
        To unsubscribe reply to this email with "unsubscribe".
      </p>
    </div>
  </div>
</body>
</html>`;
