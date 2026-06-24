// Maps NMI responsetext to user-friendly messages
export function getNmiUserMessage(responsetext: string, responseCode?: string): string {
  const text = (responsetext || "").toLowerCase();

  if (text.includes("avs")) return "Your billing address doesn't match your card records. Please double-check your address or contact your bank.";
  if (text.includes("cvv") || text.includes("security code")) return "Incorrect security code (CVV). Please check the 3-digit code on the back of your card.";
  if (text.includes("insufficient funds") || text.includes("insufficient_funds")) return "Insufficient funds on your card. Please try a different card.";
  if (text.includes("expired") || text.includes("expir")) return "Your card has expired. Please use a different card.";
  if (text.includes("invalid card") || text.includes("invalid account")) return "Invalid card number. Please check your card details and try again.";
  if (text.includes("do not honor") || text.includes("declined") || text.includes("decline")) return "Your card was declined. Please contact your bank or try a different card.";
  if (text.includes("lost") || text.includes("stolen")) return "This card has been reported lost or stolen. Please use a different card.";
  if (text.includes("limit exceeded") || text.includes("activity limit")) return "Transaction limit reached. Please try again later or contact your bank.";
  if (text.includes("invalid amount") || text.includes("invalid transaction")) return "Transaction error. Please try again.";
  if (text.includes("error occurred") || text.includes("processing error") || responseCode === "300") return "Payment could not be processed. Please try a different card or contact us at info@getsmoke.com.";

  // Fallback: if NMI gave a human-ish message, use it; otherwise generic
  if (responsetext && responsetext.length < 80 && !responsetext.includes("REFID")) return responsetext;
  return "Payment failed. Please try a different card or contact us at info@getsmoke.com.";
}
