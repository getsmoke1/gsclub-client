import PolicyPage from "@/components/PolicyPage/PolicyPage"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Shipping Policy | GetSmoke",
  description: "GetSmoke Shipping Policy — delivery times, PACT Act compliance, age verification, and order tracking.",
}

const content = `
<h2>Shipping Policy</h2>
<p><em>Last updated: June 2025</em></p>

<hr/>

<h2>1. PACT ACT AND REGULATORY COMPLIANCE</h2>
<p>GetSmoke operates in full compliance with the <strong>Prevent All Cigarette Trafficking (PACT) Act</strong> and all applicable federal, state, and local regulations governing the sale and shipment of vape and nicotine-related products. In accordance with the PACT Act, GetSmoke:</p>
<ul>
  <li>Verifies the age of all customers using a commercially available age-verification database prior to completing any purchase</li>
  <li>Is registered with the ATF, the U.S. Attorney General, and all required state and local tax authorities</li>
  <li>Collects and remits all applicable federal, state, and local excise taxes</li>
  <li>Submits required monthly transaction reports to the appropriate state agencies</li>
  <li>Ships products only through PACT Act-compliant carriers and requires an <strong>adult signature upon delivery</strong> for all vape-related orders</li>
</ul>
<p>GetSmoke maintains automated geographic controls that prevent the sale and shipment of restricted products to prohibited jurisdictions. These controls are reviewed and updated regularly to reflect changes in law.</p>
<p><strong>We do not ship to states or localities where online vape sales are prohibited.</strong> Orders placed from restricted jurisdictions will be cancelled and refunded minus applicable processing fees.</p>

<hr/>

<h2>2. AGE VERIFICATION</h2>
<p>All customers must successfully complete age verification before any order is processed. You must be <strong>21 years of age or older</strong> to purchase from GetSmoke.</p>
<p>Age verification is performed through a secure, commercially available verification service. Verification requests are sent only from our official email address: <a href="mailto:info@getsmoke.com">info@getsmoke.com</a>. <strong>Do not provide personal identification documents to any other email address or party.</strong></p>
<p>Orders that cannot be verified will not be processed and will be refunded, minus a 15% processing fee.</p>

<hr/>

<h2>3. DELIVERY TIMES</h2>
<p>All orders are processed within 1-2 business days. Expected delivery times after shipment:</p>
<ul>
  <li><strong>Standard Shipping:</strong> 5-6 business days</li>
  <li><strong>Expedited Shipping:</strong> 2-3 business days</li>
</ul>
<p>Delivery times are estimates only and not guaranteed. Delays may occur due to carrier issues, weather events, holidays, or address verification requirements. GetSmoke is not responsible for delivery delays caused by third-party carriers or circumstances outside our control.</p>

<hr/>

<h2>4. ADULT SIGNATURE REQUIREMENT</h2>
<p>Due to federal PACT Act requirements, <strong>all deliveries require an adult signature</strong> (age 21+). The carrier will not leave the package unattended. If no adult is available to sign at the time of delivery:</p>
<ul>
  <li>The carrier will make additional delivery attempts</li>
  <li>After failed delivery attempts, the package may be held at a carrier facility for pickup</li>
  <li>If the package is returned to us, re-shipping fees apply and GetSmoke is not responsible for any product condition changes during extended transit</li>
</ul>

<hr/>

<h2>5. ORDER TRACKING</h2>
<p>Tracking information will be emailed to you once your order has been processed and handed to the carrier. If you have not received tracking information within 3 business days of your order, contact us at <a href="mailto:info@getsmoke.com">info@getsmoke.com</a>.</p>

<hr/>

<h2>6. SHIPPING PROTECTION</h2>
<p>GetSmoke has partnered with SHIPPO to provide optional package protection. If you add shipping protection at checkout and your package is lost, stolen, or damaged in transit, file a claim directly with SHIPPO's support team. GetSmoke is not liable for packages lost or damaged during shipping when shipping protection was declined.</p>

<hr/>

<h2>7. CANCELING ORDERS</h2>
<p>If you need to cancel an order after placement, contact us immediately at <a href="mailto:info@getsmoke.com">info@getsmoke.com</a>. We will make every effort to cancel before shipment. Once an order has entered processing or shipment, it cannot be cancelled or intercepted. A 15% cancellation fee applies to all refund requests on unshipped orders.</p>

<hr/>

<h2>8. DISCLAIMER OF SHIPPING LIABILITY</h2>
<p>GetSmoke is not responsible for:</p>
<ul>
  <li>Delays caused by carriers, weather, or force majeure events</li>
  <li>Packages lost or damaged after delivery confirmation</li>
  <li>Packages returned due to failed age verification at delivery</li>
  <li>Incorrect addresses provided by the customer</li>
</ul>

<hr/>

<h2>9. CONTACT</h2>
<p>Shipping questions: <a href="mailto:info@getsmoke.com">info@getsmoke.com</a></p>
`

export default function Page() {
  return <PolicyPage title="Shipping Policy" content={content} />
}
