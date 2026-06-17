import PolicyPage from "@/components/PolicyPage/PolicyPage"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms and Conditions | GetSmoke",
  description: "GetSmoke Terms and Conditions - Legal terms governing use of our website and purchase of products.",
}

const content = `
<h2>Terms and Conditions</h2>
<p><em>Last updated: June 2025</em></p>

<p>This website is owned and operated by <strong>Cosmoproject LLC</strong> ("GetSmoke," "we," "us," or "our"). By accessing or using this website or purchasing any product from us, you agree to be fully bound by these Terms and Conditions. <strong>If you do not agree to all terms, do not use this website or place any order.</strong></p>

<hr/>

<h2>1. AGE RESTRICTION — 21+ ONLY</h2>
<p>ALL products sold on this website contain nicotine, are tobacco-derived, or are intended for use with such products. <strong>You must be 21 years of age or older to purchase from GetSmoke.</strong> By placing an order, you represent and warrant under penalty of perjury that you are at least 21 years old. We use third-party age verification services to confirm eligibility. Any order where age cannot be verified will be cancelled. Attempting to purchase as a minor or on behalf of a minor is a violation of federal law and these Terms.</p>

<hr/>

<h2>2. HEALTH WARNING AND ASSUMPTION OF RISK</h2>
<p><strong>WARNING: This product contains nicotine. Nicotine is an addictive chemical.</strong></p>
<p>Vaping and use of electronic nicotine delivery systems (ENDS) involves serious health risks, including but not limited to:</p>
<ul>
  <li>Nicotine addiction</li>
  <li>Lung injury (including EVALI — E-cigarette or Vaping product use-Associated Lung Injury)</li>
  <li>Cardiovascular disease</li>
  <li>Adverse effects on fetal development during pregnancy</li>
  <li>Unknown long-term health consequences</li>
</ul>
<p>These products are <strong>not approved by the FDA</strong> as smoking cessation devices and are not intended to diagnose, treat, cure, or prevent any disease or condition. By purchasing from GetSmoke, you <strong>knowingly and voluntarily assume all risks</strong> associated with the purchase and use of these products. You acknowledge that you have consulted or had the opportunity to consult with a licensed healthcare professional before using any nicotine or vaping product.</p>
<p>GetSmoke bears no responsibility whatsoever for any health consequences, injuries, illnesses, or adverse effects arising from the use or misuse of any product sold on this site.</p>

<hr/>

<h2>3. RESELLER DISCLAIMER — NO MANUFACTURER LIABILITY</h2>
<p>GetSmoke is a <strong>retail reseller only</strong>. We purchase all products exclusively from <strong>authorized U.S.-based distributors</strong> and do not manufacture, import, formulate, or directly source any product from any foreign manufacturer, including China. We have no control over, and make no representations regarding, the design, manufacturing processes, materials, ingredients, quality control, or safety testing of any product we sell.</p>
<p>All product liability, warranty claims, personal injury claims, or claims arising from product defects, contamination, mislabeling, or failure to warn must be directed to the <strong>product manufacturer</strong>. GetSmoke expressly disclaims all liability for any claims arising from the nature, composition, or condition of the products themselves.</p>
<p>GetSmoke's liability in connection with any product sold is strictly limited to its role as a reseller and shall not exceed the purchase price paid for that specific product.</p>

<hr/>

<h2>4. PACT ACT COMPLIANCE</h2>
<p>GetSmoke operates in full compliance with the <strong>Prevent All Cigarette Trafficking (PACT) Act</strong> and all applicable federal, state, and local regulations. We:</p>
<ul>
  <li>Verify customer age using a commercially available age-verification database prior to completing any sale</li>
  <li>Register with the ATF, the U.S. Attorney General, and all required state and local tax authorities</li>
  <li>Collect and remit all applicable federal, state, and local excise taxes</li>
  <li>Submit required monthly transaction reports to state agencies</li>
  <li>Require adult signature upon delivery for all shipments</li>
  <li>Maintain automated geographic controls to block sales to prohibited jurisdictions</li>
</ul>
<p>We <strong>do not ship</strong> to states where online vape sales are prohibited. Orders placed from restricted jurisdictions will be cancelled and refunded minus any applicable processing fees.</p>

<hr/>

<h2>5. DISCLAIMER OF WARRANTIES</h2>
<p>ALL PRODUCTS AND SERVICES ARE PROVIDED <strong>"AS IS" AND "AS AVAILABLE"</strong> WITHOUT ANY WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR ANY WARRANTY ARISING FROM COURSE OF DEALING OR USAGE OF TRADE. WE DO NOT WARRANT THAT ANY PRODUCT WILL MEET YOUR REQUIREMENTS OR EXPECTATIONS.</p>
<p>We make no representations regarding the accuracy, completeness, or reliability of any product description, specification, or pricing information. Product images are for illustrative purposes only. Actual products may differ from images shown.</p>

<hr/>

<h2>6. LIMITATION OF LIABILITY</h2>
<p>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, COSMOPROJECT LLC, ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, AFFILIATES, AND SUPPLIERS SHALL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, PUNITIVE, OR CONSEQUENTIAL DAMAGES OF ANY KIND, INCLUDING BUT NOT LIMITED TO:</p>
<ul>
  <li>Personal injury, death, or health conditions arising from product use</li>
  <li>Loss of profits, revenue, data, or business opportunities</li>
  <li>Property damage</li>
  <li>Any claims by third parties</li>
</ul>
<p>IN NO EVENT SHALL OUR AGGREGATE LIABILITY TO YOU FOR ANY CLAIM ARISING OUT OF OR RELATING TO THESE TERMS OR YOUR USE OF OUR WEBSITE OR PRODUCTS EXCEED THE GREATER OF (A) THE AMOUNT YOU PAID FOR THE SPECIFIC PRODUCT GIVING RISE TO THE CLAIM, OR (B) ONE HUNDRED DOLLARS ($100.00).</p>
<p>Some jurisdictions do not allow the exclusion of certain warranties or limitation of liability, so some of the above limitations may not apply to you.</p>

<hr/>

<h2>7. INDEMNIFICATION</h2>
<p>You agree to indemnify, defend, and hold harmless Cosmoproject LLC and its officers, directors, employees, agents, affiliates, and suppliers from and against any claims, demands, actions, losses, damages, penalties, fines, costs, and expenses (including reasonable attorneys' fees) arising out of or related to: (a) your use of this website or any product purchased from us; (b) your violation of these Terms; (c) your violation of any law or the rights of any third party; or (d) any misrepresentation you make, including false age representation.</p>

<hr/>

<h2>8. BINDING ARBITRATION AND CLASS ACTION WAIVER</h2>
<p>ANY DISPUTE, CLAIM, OR CONTROVERSY ARISING OUT OF OR RELATING TO THESE TERMS OR YOUR USE OF THIS WEBSITE OR PRODUCTS SOLD HEREIN SHALL BE RESOLVED BY BINDING INDIVIDUAL ARBITRATION, NOT IN COURT. <strong>YOU WAIVE ANY RIGHT TO PARTICIPATE IN A CLASS ACTION LAWSUIT OR CLASS-WIDE ARBITRATION.</strong></p>
<p>Arbitration shall be conducted by a single arbitrator under the rules of the American Arbitration Association (AAA), in the State of Florida. The arbitrator's decision shall be final and binding and may be entered as a judgment in any court of competent jurisdiction.</p>
<p>You may opt out of this arbitration agreement within 30 days of first accepting these Terms by sending written notice to <a href="mailto:legal@getsmoke.com">legal@getsmoke.com</a>.</p>

<hr/>

<h2>9. GOVERNING LAW AND JURISDICTION</h2>
<p>These Terms shall be governed by and construed in accordance with the laws of the <strong>State of Florida</strong>, without regard to its conflict of law provisions. Any dispute not subject to arbitration shall be resolved exclusively in the state or federal courts located in Florida, and you consent to personal jurisdiction in such courts.</p>

<hr/>

<h2>10. PROHIBITED USES</h2>
<p>You may not use this website to: (a) purchase products if you are under 21; (b) resell products without our written authorization; (c) circumvent age verification or geographic restrictions; (d) transmit malicious code; (e) violate any applicable law or regulation.</p>

<hr/>

<h2>11. GENERAL CONDITIONS</h2>
<p>We reserve the right to refuse service to anyone for any reason at any time. Prices are subject to change without notice. We may modify or discontinue any product or service without liability. If any provision of these Terms is held invalid or unenforceable, the remaining provisions shall continue in full force. These Terms constitute the entire agreement between you and GetSmoke regarding your use of this website.</p>

<hr/>

<h2>12. CONTACT</h2>
<p>Questions about these Terms? Contact us at <a href="mailto:info@getsmoke.com">info@getsmoke.com</a></p>
`

export default function Page() {
  return <PolicyPage title="Terms and Conditions" content={content} />
}
