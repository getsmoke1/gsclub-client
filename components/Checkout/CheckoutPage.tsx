"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Script from "next/script";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { IoIosArrowBack } from "react-icons/io";
import { FaSpinner, FaLock } from "react-icons/fa";
import useCart from "@/hooks/useCart";
import { Product } from "@/types/product";
import { r2src } from "@/lib/r2-image";
import { getNmiUserMessage } from "@/lib/nmiErrorMessages";
import ShippingAddress from "./../myAccount/ShippingAddress";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Card {
  id: string;
  name: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
}
interface CartItem {
  id: string;
  quantity: number;
  price: number;
  attributeId?: string | null;
  isSubscription?: boolean;
  subscriptionFrequency?: string | null;
  productSnapshot?: { name: string; currentPrice: number };
}
interface CollectJSConfig {
  paymentSelector: string;
  variant: string;
  fields: Record<string, { selector: string; title: string; placeholder: string }>;
  customCss: Record<string, string>;
  fieldsAvailableCallback: () => void;
  validationCallback: (field: string, status: boolean, message: string) => void;
  callback: (response: { token: string }) => void;
}
declare global {
  interface Window {
    CollectJS: { configure: (config: CollectJSConfig) => void };
  }
}

// ─── Constants ───────────────────────────────────────────────────────────────
const FLAT_RATE = 7.69;
const FREE_THRESHOLD = 89;
const INSURANCE_FEE = 3.00;

const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
  "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
  "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada",
  "New Hampshire","New Jersey","New Mexico","New York","North Carolina",
  "North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island",
  "South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont",
  "Virginia","Washington","West Virginia","Wisconsin","Wyoming",
];

// States where online vape sales are prohibited — removed from dropdown
const RESTRICTED_STATES = new Set([
  "California","District of Columbia","Georgia","Maine","Massachusetts",
  "Nebraska","New York","Oregon","South Dakota","Utah","Vermont",
]);


// ─── Component ───────────────────────────────────────────────────────────────
const CheckoutPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { items } = useCart();

  // Available states — remove all restricted states from dropdown
  const availableStates = US_STATES.filter(state => !RESTRICTED_STATES.has(state));

  // Stale closure refs
  const itemsRef = useRef<CartItem[]>(items as CartItem[]);
  useEffect(() => { itemsRef.current = items as CartItem[]; }, [items]);
  const statusRef = useRef(status);
  useEffect(() => { statusRef.current = status; }, [status]);
  const sessionRef = useRef(session);
  useEffect(() => { sessionRef.current = session; }, [session]);

  // Address
  const [_selectedCard, setSelectedCard] = useState<Card | null>(null);
  const selectedCardRef = useRef<Card | null>(null);

  // Guest form fields (controlled inputs)
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestFirstName, setGuestFirstName] = useState("");
  const [guestLastName, setGuestLastName] = useState("");
  const [guestStreet, setGuestStreet] = useState("");
  const [guestCity, setGuestCity] = useState("");
  const [guestState, setGuestState] = useState("");
  const [guestZip, setGuestZip] = useState("");

  // Refs for guest fields (stale closure prevention)
  const guestEmailRef = useRef("");
  const guestPhoneRef = useRef("");
  const guestFirstNameRef = useRef("");
  const guestLastNameRef = useRef("");
  const guestStreetRef = useRef("");
  const guestCityRef = useRef("");
  const guestStateRef = useRef("");
  const guestZipRef = useRef("");

  // Billing address
  const [billingDifferent, setBillingDifferent] = useState(false);
  const billingDifferentRef = useRef(false);
  const [billingStreet, setBillingStreet] = useState("");
  const [billingCity, setBillingCity] = useState("");
  const [billingState, setBillingState] = useState("");
  const [billingZip, setBillingZip] = useState("");
  const billingRef = useRef({ street: "", city: "", state: "", zip: "" });

  // Insurance
  const [useInsurance, setUseInsurance] = useState(true);
  const useInsuranceRef = useRef(true);
  const [applyFreeShipping, setApplyFreeShipping] = useState(false); // user opt-in for free shipping (orders >= $89)

  // Payment form fields
  const [nameOnCard, setNameOnCard] = useState("");
  const nameOnCardRef = useRef("");
  const [paymentEmail, setPaymentEmail] = useState("");
  const paymentEmailRef = useRef("");

  // NMI / CollectJS
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [fieldsReady, setFieldsReady] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const collectJsConfigured = useRef(false);

  // Products for display
  const [products, setProducts] = useState<Product[]>([]);

  // If script already cached from prior navigation
  useEffect(() => {
    if (typeof window !== "undefined" && (window as Window & { CollectJS?: unknown }).CollectJS) {
      setScriptLoaded(true);
    }
  }, []);

  // Fetch products for display
  useEffect(() => {
    if (items.length === 0) { setProducts([]); return; }
    const ids = [...new Set(items.map((i) => i.id))].join("&id=");
    fetch(`/api/products?id=${ids}`)
      .then((r) => r.json())
      .then((d) => setProducts(d.products || []))
      .catch(() => {});
  }, [items]);

  // NMI CollectJS configuration
  const configureCollectJS = useCallback(() => {
    window.CollectJS.configure({
      paymentSelector: "#placeOrderBtn",
      variant: "inline",
      fields: {
        ccnumber: { selector: "#ccnumber", title: "Card Number", placeholder: "0000 0000 0000 0000" },
        ccexp:    { selector: "#ccexp",    title: "Expiration Date", placeholder: "MM / YY" },
        cvv:      { selector: "#cvv",      title: "CVV", placeholder: "***" },
      },
      customCss: { "border-radius": "0.375rem", "padding": "0.75rem", "font-size": "14px" },
      fieldsAvailableCallback: () => { setFieldsReady(true); },
      validationCallback: (field, valid, msg) => { console.log(field, valid, msg); },
      callback: (response: { token: string }) => {
        handlePaymentComplete(response.token);
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Configure when script ready
  useEffect(() => {
    if (scriptLoaded && window.CollectJS && !collectJsConfigured.current) {
      configureCollectJS();
      collectJsConfigured.current = true;
    }
  }, [scriptLoaded, configureCollectJS]);

  // ── Totals ──────────────────────────────────────────────────────────────────
  const getProductForItem = (id: string) => products.find((p) => p.id === id);
  const subtotal = items.reduce((sum, item) => {
    const prod = getProductForItem(item.id);
    const price = prod ? (prod.currentPrice ?? item.price ?? 0) : (item.price ?? 0);
    return sum + price * item.quantity;
  }, 0);
  const originalTotal = items.reduce((sum, item) => {
    const prod = getProductForItem(item.id);
    const price = prod ? (prod.currentPrice ?? item.price ?? 0) : (item.price ?? 0);
    return sum + price * item.quantity;
  }, 0);
  const discount = originalTotal > subtotal ? originalTotal - subtotal : 0;
  const eligibleForFreeShipping = subtotal >= FREE_THRESHOLD; // order qualifies, but user must opt in
  const isFreeShipping = eligibleForFreeShipping && applyFreeShipping; // true only when user checks the box
  const shippingCost = isFreeShipping ? 0 : FLAT_RATE; // always $7.69 unless user opted in
  const insuranceCost = useInsurance ? INSURANCE_FEE : 0;
  const total = subtotal + shippingCost + insuranceCost;

  // ── Card select (authenticated users) ──────────────────────────────────────
  const handleCardSelect = (card: Card) => {
    setSelectedCard(card);
    selectedCardRef.current = card;
  };

  // ── Payment complete (CollectJS callback) ──────────────────────────────────
  const handlePaymentComplete = useCallback(async (token: string) => {
    setPaymentProcessing(true);
    try {
      const currentStatus  = statusRef.current;
      const currentSession = sessionRef.current;
      const currentItems   = itemsRef.current;

      // Resolve email
      const emailToSend =
        currentStatus === "authenticated"
          ? currentSession?.user?.email
          : (paymentEmailRef.current || guestEmailRef.current || "");

      if (!emailToSend) {
        setPaymentError("Please enter your email address.");
        toast.error("Please enter your email address.");
        setPaymentProcessing(false);
        return;
      }

      if (!currentItems.length) {
        setPaymentError("Your cart is empty.");
        setPaymentProcessing(false);
        return;
      }

      // Resolve shipping address
      const addr = selectedCardRef.current;
      if (!addr && currentStatus === "unauthenticated") {
        // Validate phone
        if (!guestPhoneRef.current || guestPhoneRef.current.length < 7) {
          setPaymentError("Please enter your phone number.");
          toast.error("Please enter your phone number.");
          setPaymentProcessing(false);
          return;
        }
        // Build from guest form refs
        if (!guestStreetRef.current || !guestCityRef.current || !guestStateRef.current || !guestZipRef.current) {
          setPaymentError("Please complete your shipping address.");
          toast.error("Please complete your shipping address.");
          setPaymentProcessing(false);
          return;
        }
      } else if (!addr && currentStatus === "authenticated") {
        setPaymentError("Please select a shipping address.");
        toast.error("Please select a shipping address.");
        setPaymentProcessing(false);
        return;
      }

      const shippingName   = addr ? addr.name            : `${guestFirstNameRef.current} ${guestLastNameRef.current}`.trim();
      const shippingStreet = addr ? addr.streetAddress   : guestStreetRef.current;
      const shippingCity   = addr ? addr.city            : guestCityRef.current;
      const shippingState  = addr ? addr.state           : guestStateRef.current;
      const shippingZip    = addr ? addr.zipCode         : guestZipRef.current;

      const lineItems = currentItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        attributeId: item.attributeId || null,
        isSubscription: item.isSubscription || false,
        subscriptionFrequency: item.subscriptionFrequency || null,
      }));

      const hasSubscription     = currentItems.some((i) => i.isSubscription);
      const subscriptionFreq    = currentItems.find((i) => i.subscriptionFrequency)?.subscriptionFrequency || null;

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          email: emailToSend,
          items: lineItems,
          isSubscription: hasSubscription,
          subscriptionFrequency: subscriptionFreq,
          shippingName,
          shippingStreetAddress: shippingStreet,
          shippingCity,
          shippingState,
          shippingZipCode: shippingZip,
          shippingAmount: shippingCost.toFixed(2),
          insuranceAmount: (useInsuranceRef.current ? INSURANCE_FEE : 0).toFixed(2),
          nameOnCard: nameOnCardRef.current || shippingName,
          billingDifferent: billingDifferentRef.current,
          billingStreetAddress: billingRef.current.street,
          billingCity: billingRef.current.city,
          billingState: billingRef.current.state,
          billingZipCode: billingRef.current.zip,
        }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Payment successful!");
        router.push("/checkout/success");
      } else {
        const msg = getNmiUserMessage(data.message || "", data.errorDetails?.response_code);
        setPaymentError(msg);
        toast.error(msg);
        console.error("[Payment error]", data.message, data.errorDetails?.response_code);
      }
    } catch (err) {
      console.error("Payment error:", err);
      setPaymentError("Something went wrong. Please try again.");
      toast.error("Something went wrong. Please try again.");
    } finally {
      setPaymentProcessing(false);
    }
  }, [router, shippingCost]);

  // ── Input helper ─────────────────────────────────────────────────────────────
  const inputCls = "w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-400";
  const labelCls = "block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide";

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <main className="bg-white text-black pt-5 pb-20 min-h-screen">
      <Script
        src="https://secure.nmi.com/token/Collect.js"
        data-tokenization-key={process.env.NEXT_PUBLIC_NMI_TOKEN_KEY}
        data-variant="inline"
        strategy="afterInteractive"
        onLoad={() => { setScriptLoaded(true); }}
      />

      <article className="w-11/12 mx-auto max-w-6xl font-unbounded">
        <Link href="/cart">
          <span className="font-bold flex items-center gap-1 hover:underline mb-6 text-sm">
            <IoIosArrowBack /> Go back
          </span>
        </Link>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── LEFT: Forms ──────────────────────────────────────────────────── */}
          <div className="w-full lg:w-7/12 flex flex-col gap-6">

            {/* Shipping Information */}
            <section className="border border-gray-200 rounded-xl p-5">
              <h2 className="font-semibold text-base mb-4">Shipping Information</h2>

              {status === "authenticated" ? (
                <ShippingAddress onSelectCard={handleCardSelect} ischeckoutPage={true} />
              ) : (
                <div className="flex flex-col gap-3">
                  <div>
                    <label className={labelCls}>Email *</label>
                    <input type="email" value={guestEmail} placeholder="your@email.com"
                      onChange={e => {
                        setGuestEmail(e.target.value);
                        guestEmailRef.current = e.target.value;
                        // Auto-fill payment email
                        setPaymentEmail(e.target.value);
                        paymentEmailRef.current = e.target.value;
                      }}
                      className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Phone *</label>
                    <input type="tel" value={guestPhone} placeholder="(305) 000-0000"
                      onChange={e => { const v = e.target.value.replace(/\D/g, ""); setGuestPhone(v); guestPhoneRef.current = v; }}
                      className={inputCls} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelCls}>First Name *</label>
                      <input type="text" value={guestFirstName} placeholder="John"
                        onChange={e => { setGuestFirstName(e.target.value); guestFirstNameRef.current = e.target.value; }}
                        className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Last Name *</label>
                      <input type="text" value={guestLastName} placeholder="Doe"
                        onChange={e => { setGuestLastName(e.target.value); guestLastNameRef.current = e.target.value; }}
                        className={inputCls} />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Street Address *</label>
                    <input type="text" value={guestStreet} placeholder="123 Main St"
                      onChange={e => { setGuestStreet(e.target.value); guestStreetRef.current = e.target.value; }}
                      className={inputCls} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelCls}>Town / City *</label>
                      <input type="text" value={guestCity} placeholder="Miami"
                        onChange={e => { setGuestCity(e.target.value); guestCityRef.current = e.target.value; }}
                        className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Postcode *</label>
                      <input type="text" value={guestZip} placeholder="33101" maxLength={10}
                        onChange={e => { setGuestZip(e.target.value); guestZipRef.current = e.target.value; }}
                        className={inputCls} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelCls}>State *</label>
                      <select value={guestState}
                        onChange={e => { setGuestState(e.target.value); guestStateRef.current = e.target.value; }}
                        className={inputCls}>
                        <option value="">Select state...</option>
                        {availableStates.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <p className="text-xs text-gray-400 mt-1">
                        CA, NY, MA and other states with flavor restrictions are not available.{" "}
                        <a href="/shipping-policy" className="underline">Learn more</a>
                      </p>
                    </div>
                    <div>
                      <label className={labelCls}>Country</label>
                      <input type="text" value="United States (US)" readOnly
                        className={`${inputCls} bg-gray-50 text-gray-500 cursor-not-allowed`} />
                    </div>
                  </div>
                </div>
              )}

              {/* Billing different toggle */}
              <div className="mt-4">
                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
                  <input type="checkbox" checked={billingDifferent}
                    onChange={e => { setBillingDifferent(e.target.checked); billingDifferentRef.current = e.target.checked; }}
                    className="w-4 h-4 accent-red-500" />
                  Use a different billing address (optional)
                </label>
              </div>

              {billingDifferent && (
                <div className="mt-3 flex flex-col gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div>
                    <label className={labelCls}>Billing Street Address</label>
                    <input type="text" value={billingStreet} placeholder="123 Main St"
                      onChange={e => { setBillingStreet(e.target.value); billingRef.current = { ...billingRef.current, street: e.target.value }; }}
                      className={inputCls} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelCls}>City</label>
                      <input type="text" value={billingCity} placeholder="Miami"
                        onChange={e => { setBillingCity(e.target.value); billingRef.current = { ...billingRef.current, city: e.target.value }; }}
                        className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Zip</label>
                      <input type="text" value={billingZip} placeholder="33101"
                        onChange={e => { setBillingZip(e.target.value); billingRef.current = { ...billingRef.current, zip: e.target.value }; }}
                        className={inputCls} />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>State</label>
                    <select value={billingState}
                      onChange={e => { setBillingState(e.target.value); billingRef.current = { ...billingRef.current, state: e.target.value }; }}
                      className={inputCls}>
                      <option value="">Select state...</option>
                      {availableStates.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
              )}
            </section>

            {/* Order summary - mobile only */}
            <section className="lg:hidden border border-gray-200 rounded-xl p-5">
              <h2 className="font-semibold text-base mb-4">Order Summary</h2>
              {items.map((item) => {
                const prod = getProductForItem(item.id);
                const price = prod ? (prod.currentPrice ?? item.price ?? 0) : (item.price ?? 0);
                return (
                  <div key={item.id} className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-100 last:border-0">
                    {prod?.images?.[0]?.url && (
                      <Image src={r2src(prod.images[0].url)} alt={prod.name} width={48} height={48}
                        className="rounded-md object-cover w-12 h-12 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{prod?.name || "Product"}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-semibold">${(price * item.quantity).toFixed(2)}</span>
                  </div>
                );
              })}
              {/* Free shipping opt-in for qualifying orders */}
              {eligibleForFreeShipping && (
                <div
                  onClick={() => setApplyFreeShipping(v => !v)}
                  style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", padding: "10px 12px", borderRadius: 10, marginBottom: 8, background: applyFreeShipping ? "#f0fdf4" : "#f9fafb", border: `1.5px solid ${applyFreeShipping ? "#86efac" : "#e5e7eb"}`, transition: "all 0.2s" }}>
                  <div style={{ width: 20, height: 20, borderRadius: 5, border: `2px solid ${applyFreeShipping ? "#16a34a" : "#9ca3af"}`, background: applyFreeShipping ? "#16a34a" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s" }}>
                    {applyFreeShipping && <svg width="11" height="8" viewBox="0 0 11 8" fill="none"><path d="M1 4L4 7L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: applyFreeShipping ? "#16a34a" : "#374151", margin: 0 }}>
                      {applyFreeShipping ? "Free shipping applied - save $7.69!" : "Apply free shipping (orders over $89)"}
                    </p>
                    <p style={{ fontSize: 11, color: "#9ca3af", margin: 0 }}>Your order qualifies for free shipping</p>
                  </div>
                </div>
              )}
              <OrderTotals subtotal={subtotal} discount={discount} shippingCost={shippingCost}
                isFreeShipping={isFreeShipping} useInsurance={useInsurance} total={total} />
            </section>

            {/* Shipping Insurance */}
            <section className="border border-gray-200 rounded-xl p-5">
              <h2 className="font-semibold text-base mb-3">Shipping Insurance</h2>
              <p className="text-xs text-gray-500 mb-3">Protect your order against loss, theft, or damage in transit.</p>
              <div className="flex gap-3">
                <button type="button"
                  onClick={() => { setUseInsurance(true); useInsuranceRef.current = true; }}
                  style={useInsurance ? { background: "#111", color: "#fff", border: "2px solid #111" } : { background: "#fff", color: "#111", border: "2px solid #d1d5db" }}
                  className="rounded-full px-5 py-2 text-sm font-semibold transition-all">
                  ${INSURANCE_FEE.toFixed(0)}
                </button>
                <button type="button"
                  onClick={() => { setUseInsurance(false); useInsuranceRef.current = false; }}
                  style={!useInsurance ? { background: "#111", color: "#fff", border: "2px solid #111" } : { background: "#fff", color: "#111", border: "2px solid #d1d5db" }}
                  className="rounded-full px-5 py-2 text-sm font-semibold transition-all">
                  No, Thanks!
                </button>
              </div>
            </section>

            {/* Payment Information */}
            <section className="border border-gray-200 rounded-xl p-5">
              <h2 className="font-semibold text-base mb-1">Payment Information</h2>
              <p className="text-xs text-gray-500 flex items-center gap-1 mb-4">
                <FaLock className="text-green-600" />
                All transactions are secure and encrypted. Credit card information is never stored on our servers.
              </p>

              {/* Card brand logos */}
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                {["VISA","MC","AMEX","DISC"].map(b => (
                  <span key={b} className="border border-gray-200 rounded px-2 py-1 text-xs font-bold text-gray-600 bg-gray-50">{b}</span>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                {/* Email field for guests */}
                {status === "unauthenticated" && (
                  <div>
                    <label className={labelCls}>Email for order confirmation *</label>
                    <input type="email" value={paymentEmail} placeholder="your@email.com"
                      onChange={e => { setPaymentEmail(e.target.value); paymentEmailRef.current = e.target.value; }}
                      className={inputCls}
                      style={guestEmail ? { background: "#f9fafb", color: "#374151" } : {}} />
                    <p className="text-xs text-gray-400 mt-1">
                      {guestEmail ? "Auto-filled from your email above." : "We'll send your order confirmation here."}
                    </p>
                  </div>
                )}

                {/* Name on card */}
                <div>
                  <label className={labelCls}>Name on Card</label>
                  <input type="text" value={nameOnCard} placeholder="John Doe"
                    onChange={e => { setNameOnCard(e.target.value); nameOnCardRef.current = e.target.value; }}
                    className={inputCls} />
                </div>

                {/* Card Number */}
                <div>
                  <label className={labelCls}>Card Number</label>
                  <div id="ccnumber"
                    className={`border rounded-md min-h-[44px] transition-colors ${fieldsReady ? "border-gray-300 bg-white p-3" : "border-gray-200 bg-gray-100 animate-pulse"}`}
                  />
                </div>

                {/* Expiry + CVV */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Expiration Date</label>
                    <div id="ccexp"
                      className={`border rounded-md min-h-[44px] transition-colors ${fieldsReady ? "border-gray-300 bg-white p-3" : "border-gray-200 bg-gray-100 animate-pulse"}`}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>CVV</label>
                    <div id="cvv"
                      className={`border rounded-md min-h-[44px] transition-colors ${fieldsReady ? "border-gray-300 bg-white p-3" : "border-gray-200 bg-gray-100 animate-pulse"}`}
                    />
                  </div>
                </div>

                {/* Error */}
                {paymentError && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-3 text-sm text-red-700">
                    {paymentError}
                  </div>
                )}

                {/* Submit */}
                <button
                  id="placeOrderBtn"
                  type="button"
                  disabled={paymentProcessing || !fieldsReady || items.length === 0}
                  className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: fieldsReady && !paymentProcessing ? "#fe3500" : "#ccc" }}
                >
                  {paymentProcessing ? (
                    <span className="flex items-center justify-center gap-2">
                      <FaSpinner className="animate-spin" /> Processing...
                    </span>
                  ) : !fieldsReady ? (
                    <span className="flex items-center justify-center gap-2">
                      <FaSpinner className="animate-spin" /> Preparing Payment Form...
                    </span>
                  ) : (
                    `Place Your Order - $${total.toFixed(2)}`
                  )}
                </button>

                <p className="text-center text-xs text-gray-400">
                  By placing your order you agree to our{" "}
                  <Link href="/terms-and-conditions" className="underline">Terms & Conditions</Link>.
                </p>
              </div>
            </section>

          </div>{/* end LEFT */}

          {/* ── RIGHT: Order Summary (desktop) ───────────────────────────────── */}
          <div className="hidden lg:block lg:w-5/12">
            <div className="sticky top-6 border border-gray-200 rounded-xl p-5">
              <h2 className="font-semibold text-base mb-4">Order Summary</h2>

              {items.length === 0 ? (
                <p className="text-sm text-gray-400">Your cart is empty.</p>
              ) : (
                <>
                  <div className="flex flex-col gap-3 mb-4">
                    {items.map((item) => {
                      const prod = getProductForItem(item.id);
                      const price = prod ? (prod.currentPrice ?? item.price ?? 0) : (item.price ?? 0);
                      return (
                        <div key={item.id} className="flex items-center gap-3">
                          {prod?.images?.[0]?.url && (
                            <Image src={r2src(prod.images[0].url)} alt={prod.name} width={56} height={56}
                              className="rounded-md object-cover w-14 h-14 flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium">{prod?.name || "Product"}</p>
                            <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                          </div>
                          <span className="text-sm font-semibold">${(price * item.quantity).toFixed(2)}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Free shipping toggle - mobile */}
                  {eligibleForFreeShipping && (
                    <div onClick={() => setApplyFreeShipping(v => !v)} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", padding: "10px 12px", borderRadius: 10, marginBottom: 8, background: applyFreeShipping ? "#f0fdf4" : "#f9fafb", border: `1.5px solid ${applyFreeShipping ? "#86efac" : "#e5e7eb"}` }}>
                      <div style={{ width: 20, height: 20, borderRadius: 5, border: `2px solid ${applyFreeShipping ? "#16a34a" : "#9ca3af"}`, background: applyFreeShipping ? "#16a34a" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {applyFreeShipping && <svg width="11" height="8" viewBox="0 0 11 8" fill="none"><path d="M1 4L4 7L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                      </div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: applyFreeShipping ? "#16a34a" : "#374151", margin: 0 }}>
                        {applyFreeShipping ? "Free shipping applied!" : "Apply free shipping (orders over $89)"}
                      </p>
                    </div>
                  )}
                  <OrderTotals subtotal={subtotal} discount={discount} shippingCost={shippingCost}
                    isFreeShipping={isFreeShipping} useInsurance={useInsurance} total={total} />
                </>
              )}
            </div>
          </div>

        </div>{/* end flex */}
      </article>
    </main>
  );
};

// ─── Order Totals sub-component ──────────────────────────────────────────────
function OrderTotals({ subtotal, discount, shippingCost, isFreeShipping, useInsurance, total }: {
  subtotal: number; discount: number; shippingCost: number; isFreeShipping: boolean; useInsurance: boolean; total: number;
}) {
  return (
    <div className="border-t border-gray-200 pt-3 space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Subtotal</span>
        <span className="font-medium">${subtotal.toFixed(2)}</span>
      </div>
      {discount > 0 && (
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Discount</span>
          <span className="font-medium text-green-600">-${discount.toFixed(2)}</span>
        </div>
      )}
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Shipping</span>
        <span className="font-medium">
          {isFreeShipping ? <span className="text-green-600">FREE</span> : `$${shippingCost.toFixed(2)}`}
        </span>
      </div>
      {useInsurance && (
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping Insurance</span>
          <span className="font-medium">${INSURANCE_FEE.toFixed(2)}</span>
        </div>
      )}
      <div className="flex justify-between font-bold text-base border-t border-gray-200 pt-2 mt-2">
        <span>Total</span>
        <span style={{ color: "#fe3500" }}>${total.toFixed(2)}</span>
      </div>
    </div>
  );
}

export default CheckoutPage;
