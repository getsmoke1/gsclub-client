import PolicyPage from "@/components/PolicyPage/PolicyPage"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | GetSmoke",
  description: "GetSmoke Privacy Policy — how we collect, use, and protect your personal information.",
}

const content = `
<h2>Privacy Policy</h2>
<p><em>Last updated: June 2025</em></p>

<p>This Privacy Policy describes how Cosmoproject LLC ("GetSmoke," "we," "us," or "our") collects, uses, shares, and protects your personal information when you visit <a href="https://getsmoke.com">getsmoke.com</a> or make a purchase. By using our website, you consent to the practices described in this policy.</p>

<hr/>

<h2>1. INFORMATION WE COLLECT</h2>
<p>We collect the following categories of personal information:</p>
<ul>
  <li><strong>Identity information:</strong> full name, date of birth (for age verification)</li>
  <li><strong>Contact information:</strong> email address, phone number, shipping and billing address</li>
  <li><strong>Payment information:</strong> credit/debit card details (processed and stored by our payment processor — we do not store full card numbers)</li>
  <li><strong>Age verification data:</strong> information shared with our third-party age verification provider to confirm you are 21 or older, as required by federal law</li>
  <li><strong>Transaction data:</strong> order history, products purchased, prices paid</li>
  <li><strong>Technical data:</strong> IP address, browser type, device information, pages visited, referring URLs, cookies</li>
  <li><strong>Communications:</strong> messages you send us via email or contact forms</li>
</ul>

<hr/>

<h2>2. HOW WE USE YOUR INFORMATION</h2>
<p>We use your personal information to:</p>
<ul>
  <li>Process and fulfill your orders</li>
  <li>Verify your age as required by the PACT Act and applicable state law</li>
  <li>Report transaction data to state tax authorities as required by law</li>
  <li>Communicate order status, tracking, and customer service</li>
  <li>Send marketing emails and SMS (with your consent; you may opt out at any time)</li>
  <li>Prevent fraud, enforce our Terms, and comply with legal obligations</li>
  <li>Analyze and improve our website and product offerings</li>
</ul>

<hr/>

<h2>3. INFORMATION SHARING</h2>
<p>We do not sell your personal information. We may share your information with:</p>
<ul>
  <li><strong>Age verification providers:</strong> to confirm you are 21 or older, as legally required</li>
  <li><strong>Payment processors:</strong> to complete transactions securely (e.g., Stripe, PayPal)</li>
  <li><strong>Shipping carriers and fulfillment partners:</strong> to deliver your order</li>
  <li><strong>Government and law enforcement authorities:</strong> as required by the PACT Act, state tax law, court order, or other legal obligation — including submission of customer transaction data to state tobacco tax authorities</li>
  <li><strong>Service providers:</strong> analytics, email, and marketing platforms operating under confidentiality agreements</li>
</ul>
<p><strong>By making a purchase, you acknowledge that your name, address, and purchase information may be shared with state and federal regulatory authorities as required by law.</strong></p>

<hr/>

<h2>4. COOKIES AND TRACKING</h2>
<p>We use cookies and similar technologies to improve your browsing experience and track website analytics. Types of cookies we use:</p>
<ul>
  <li><strong>Essential cookies:</strong> necessary for website function (login sessions, cart)</li>
  <li><strong>Analytics cookies:</strong> Google Analytics and similar tools to understand usage patterns</li>
  <li><strong>Marketing cookies:</strong> to deliver relevant ads (only with your consent)</li>
</ul>
<p>You may disable cookies in your browser settings. Disabling essential cookies may impair site functionality. Login cookies last 14 days if "Remember Me" is selected. Session cookies are deleted when you close your browser.</p>

<hr/>

<h2>5. DATA RETENTION</h2>
<p>We retain your personal data for as long as necessary to fulfill the purposes described in this policy, including compliance with legal, regulatory, and tax obligations. Transaction records are retained for a minimum of 7 years as required by applicable tax and regulatory law. You may request deletion of your personal data subject to these legal retention requirements.</p>

<hr/>

<h2>6. YOUR RIGHTS</h2>
<p>Depending on your state of residence, you may have the following rights regarding your personal data:</p>
<ul>
  <li><strong>Access:</strong> request a copy of the data we hold about you</li>
  <li><strong>Deletion:</strong> request deletion of your personal data (subject to legal retention obligations)</li>
  <li><strong>Correction:</strong> request correction of inaccurate data</li>
  <li><strong>Opt-out of marketing:</strong> unsubscribe from marketing emails via the link in any email, or contact us at <a href="mailto:marketing@getsmoke.com">marketing@getsmoke.com</a></li>
</ul>
<p><strong>California residents (CCPA):</strong> You have the right to know what personal information we collect, to request deletion, and to opt out of the sale of personal information (we do not sell your data). To exercise these rights, contact <a href="mailto:privacy@getsmoke.com">privacy@getsmoke.com</a>.</p>

<hr/>

<h2>7. DATA SECURITY</h2>
<p>We implement industry-standard technical and organizational measures to protect your personal information from unauthorized access, disclosure, or loss. However, no method of internet transmission is 100% secure. We cannot guarantee absolute security of data transmitted to or from our website. You use our website at your own risk.</p>

<hr/>

<h2>8. THIRD-PARTY LINKS</h2>
<p>Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of any third-party site. We encourage you to review the privacy policies of any site you visit.</p>

<hr/>

<h2>9. CHANGES TO THIS POLICY</h2>
<p>We may update this Privacy Policy at any time. The updated version will be posted on this page with a revised effective date. Continued use of our website after any update constitutes acceptance of the revised policy.</p>

<hr/>

<h2>10. CONTACT</h2>
<p>Privacy questions or requests: <a href="mailto:privacy@getsmoke.com">privacy@getsmoke.com</a><br/>
General inquiries: <a href="mailto:info@getsmoke.com">info@getsmoke.com</a></p>
`

export default function Page() {
  return <PolicyPage title="Privacy Policy" content={content} />
}
