import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  options?: { replyTo?: string }
) {
  try {
    const payload: Parameters<typeof resend.emails.send>[0] = {
      from: "GetSmoke <noreply@getsmoke.com>",
      to,
      subject,
      html,
    };
    // Only set replyTo when it differs from the recipient (avoids Gmail loop filter)
    const replyTo = options?.replyTo ?? "info@getsmoke.com";
    if (replyTo !== to) {
      payload.replyTo = replyTo;
    }

    const { data, error } = await resend.emails.send(payload);

    if (error) {
      console.error("Resend error:", error);
      throw error;
    }

    return data;
  } catch (err) {
    console.error("sendEmail failed:", err);
    throw err;
  }
}
