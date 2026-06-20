/**
 * NMI Payment Gateway Integration
 * TODO: Replace stub functions with real NMI API calls at launch
 * NMI API endpoint: https://secure.nmi.com/api/transact.php
 */

const NMI_API_URL = "https://secure.nmi.com/api/transact.php";
const NMI_SECURITY_KEY = process.env.NMI_SECURITY_KEY || "";

export interface VaultCreateResult {
  success: boolean;
  vaultId?: string;
  error?: string;
}

export interface ChargeResult {
  success: boolean;
  transactionId?: string;
  error?: string;
}

/**
 * Add a card to NMI Customer Vault
 * Called during checkout when customer selects Subscribe
 * TODO: implement with real NMI call at launch
 */
export async function addToVault(params: {
  firstName: string;
  lastName: string;
  email: string;
  cardNumber: string;
  cardExpiry: string; // MMYY
  cardCvv: string;
  address?: string;
  zip?: string;
}): Promise<VaultCreateResult> {
  if (!NMI_SECURITY_KEY) {
    // STUB: return fake vault ID until NMI is connected
    return { success: true, vaultId: `stub_vault_${Date.now()}` };
  }

  const body = new URLSearchParams({
    security_key: NMI_SECURITY_KEY,
    customer_vault: "add_customer",
    first_name: params.firstName,
    last_name: params.lastName,
    email: params.email,
    ccnumber: params.cardNumber,
    ccexp: params.cardExpiry,
    cvv: params.cardCvv,
    address1: params.address || "",
    zip: params.zip || "",
  });

  const res = await fetch(NMI_API_URL, { method: "POST", body });
  const text = await res.text();
  const parsed = Object.fromEntries(new URLSearchParams(text));

  if (parsed.response === "1") {
    return { success: true, vaultId: parsed.customer_vault_id };
  }
  return { success: false, error: parsed.responsetext };
}

/**
 * Charge a saved Customer Vault (recurring billing)
 * Called by cron job on nextBillingDate
 * TODO: implement with real NMI call at launch
 */
export async function chargeVault(params: {
  vaultId: string;
  amount: number;
  orderId: string;
}): Promise<ChargeResult> {
  if (!NMI_SECURITY_KEY) {
    // STUB: simulate success until NMI is connected
    return { success: true, transactionId: `stub_txn_${Date.now()}` };
  }

  const body = new URLSearchParams({
    security_key: NMI_SECURITY_KEY,
    type: "sale",
    customer_vault_id: params.vaultId,
    amount: params.amount.toFixed(2),
    orderid: params.orderId,
  });

  const res = await fetch(NMI_API_URL, { method: "POST", body });
  const text = await res.text();
  const parsed = Object.fromEntries(new URLSearchParams(text));

  if (parsed.response === "1") {
    return { success: true, transactionId: parsed.transactionid };
  }
  return { success: false, error: parsed.responsetext };
}

/**
 * Delete a Customer Vault entry
 */
export async function deleteFromVault(vaultId: string): Promise<boolean> {
  if (!NMI_SECURITY_KEY) return true; // STUB

  const body = new URLSearchParams({
    security_key: NMI_SECURITY_KEY,
    customer_vault: "delete_customer",
    customer_vault_id: vaultId,
  });

  const res = await fetch(NMI_API_URL, { method: "POST", body });
  const text = await res.text();
  const parsed = Object.fromEntries(new URLSearchParams(text));
  return parsed.response === "1";
}

// Frequency configs
export const SUBSCRIPTION_FREQUENCIES = [
  { value: "1_week",  label: "Every week",    discountPct: 10, intervalDays: 7  },
  { value: "2_week",  label: "Every 2 weeks", discountPct: 8,  intervalDays: 14 },
  { value: "4_week",  label: "Every 4 weeks", discountPct: 6,  intervalDays: 28 },
] as const;

export type FrequencyValue = typeof SUBSCRIPTION_FREQUENCIES[number]["value"];

export function getNextBillingDate(frequency: FrequencyValue): Date {
  const freq = SUBSCRIPTION_FREQUENCIES.find(f => f.value === frequency);
  const days = freq?.intervalDays ?? 30;
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}

export function calcSubscriptionPrice(basePrice: number, discountPct: number): number {
  return +((basePrice * (1 - discountPct / 100)).toFixed(2));
}
