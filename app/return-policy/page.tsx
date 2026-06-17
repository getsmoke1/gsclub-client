import PolicyPage from "@/components/PolicyPage/PolicyPage"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Refund and Returns Policy | GetSmoke",
  description: "GetSmoke Refund and Returns Policy",
}

const content = `
<h2>Refund and Returns Policy</h2>
<p><em>Last updated: June 2025</em></p>

<p>Please read this policy carefully. By purchasing from GetSmoke, you acknowledge and agree to the terms below.</p>

<hr/>

<h2>1. IMPORTANT DISCLAIMERS</h2>
<p>GetSmoke is a <strong>reseller of products manufactured by third parties</strong>. We purchase all inventory from authorized U.S.-based distributors and have no control over product manufacturing, formulation, or quality control. GetSmoke <strong>does not manufacture, import directly, or modify</strong> any product we sell.</p>
<p>We are not responsible for product defects, failures, or issues that arise from the manufacturer's design or production process. All product liability, health effects, and warranty obligations related to product quality rest with the original manufacturer. By purchasing, you acknowledge this and agree not to hold GetSmoke liable for any manufacturer-side defect beyond the remedy described in this policy.</p>

<hr/>

<h2>2. ELIGIBILITY FOR RETURNS</h2>
<p>Return requests must be initiated within <strong>30 days of the purchase date</strong> by contacting us at <a href="mailto:info@getsmoke.com">info@getsmoke.com</a> with your order number.</p>
<p>Returns are accepted <strong>only</strong> for the following reasons:</p>
<ul>
  <li>Device is <strong>dead on arrival (DOA)</strong> — non-functional upon first use, unopened seal intact</li>
  <li>Device arrived with a <strong>documented manufacturer defect</strong> (e.g., auto-firing, no draw, leaking sealed unit)</li>
  <li>You received the <strong>wrong item</strong> due to a fulfillment error on our part</li>
</ul>
<p>To process a return for a defective item, you must provide a photo or short video clearly demonstrating the defect. GetSmoke reserves the right to deny any return claim that cannot be substantiated with evidence.</p>

<hr/>

<h2>3. NON-RETURNABLE ITEMS</h2>
<p>The following items are <strong>strictly non-returnable and non-refundable</strong> under any circumstances, including pursuant to applicable FDA and PACT Act regulations:</p>
<ul>
  <li>Opened or used devices of any kind</li>
  <li>Opened or used e-liquids or vape juice</li>
  <li>Products that have been used and then reported as defective (used products cannot be tested for original defects)</li>
  <li>Bundle packs or multi-packs where any unit has been opened or used</li>
  <li>Products returned without prior written authorization from GetSmoke</li>
  <li>Products not purchased from www.getsmoke.com</li>
  <li>Change-of-mind returns (you no longer want the product, do not like the flavor, etc.)</li>
</ul>
<p><strong>We do not accept returns based on subjective dissatisfaction with flavor, vapor production, throat hit, or nicotine effect.</strong> All sales of opened or used nicotine products are final.</p>

<hr/>

<h2>4. REFUND PROCESS</h2>
<p>Approved returns (confirmed defective, wrong item) will be processed as follows:</p>
<ul>
  <li>A <strong>15% restocking and processing fee</strong> is deducted from all refunds</li>
  <li>Refunds are issued to the <strong>original payment method only</strong></li>
  <li>Shipping costs are non-refundable in all cases</li>
  <li>Return shipping costs are the customer's responsibility; we do not provide prepaid return labels</li>
  <li>We recommend insuring your return shipment — GetSmoke is not responsible for items lost or damaged in return transit</li>
</ul>
<p>Alternative: We may offer a <strong>full store credit</strong> with no restocking fee, at our sole discretion.</p>

<hr/>

<h2>5. ORDER CANCELLATIONS</h2>
<p>If you wish to cancel an order that has not yet been shipped:</p>
<ul>
  <li>Contact us immediately at <a href="mailto:info@getsmoke.com">info@getsmoke.com</a></li>
  <li>A <strong>15% cancellation fee</strong> applies to cash refunds</li>
  <li>A full store credit (no fee) may be issued as an alternative</li>
</ul>
<p>Once an order has entered the shipping process, it <strong>cannot be cancelled or intercepted</strong>. You must wait for delivery and then initiate a return per this policy.</p>

<hr/>

<h2>6. HEALTH-RELATED CLAIMS</h2>
<p>GetSmoke will <strong>not accept returns, issue refunds, or provide compensation</strong> based on any claimed adverse health effects, allergic reactions, nicotine sensitivity, respiratory issues, or any other health-related complaints arising from product use. By purchasing, you have acknowledged our Health Warning in the Terms and Conditions and voluntarily assumed all health risks associated with vaping and nicotine consumption.</p>
<p>Any health-related claims must be directed to the product manufacturer.</p>

<hr/>

<h2>7. CONTACT</h2>
<p>Questions about returns or refunds: <a href="mailto:info@getsmoke.com">info@getsmoke.com</a></p>
`

export default function Page() {
  return <PolicyPage title="Refund and Returns Policy" content={content} />
}
