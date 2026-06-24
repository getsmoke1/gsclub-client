import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(to: string, subject: string, html: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: "GetSmoke <noreply@getsmoke.com>",
      to,
      subject,
      html,
      replyTo: "info@getsmoke.com",
    });

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
