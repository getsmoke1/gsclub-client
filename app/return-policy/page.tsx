import PolicyPage from "@/components/PolicyPage/PolicyPage"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Refund and Returns Policy | GetSmoke",
  description: "GetSmoke Refund and Returns Policy",
}

const content = `
<p class="wp-block-paragraph">If you encounter any issues with your purchase from <a href="https://getsmoke.com/">www.GetSmoke.com</a>, feel free to contact us via email or website contact form. Our team will assist you through the process. All returns must be initiated within 30 days of the purchase date.</p>



<p class="wp-block-paragraph"><strong>Refunds</strong></p>



<p class="wp-block-paragraph">Once we receive and check your returned devices, we will process a refund to the original payment method, deducting a 15% restocking and processing fee. Please note, we do not provide pre-paid return labels, nor do we refund shipping costs. To ensure safe delivery, we recommend adding insurance to your return shipment.</p>



<p class="wp-block-paragraph">For orders that have not been shipped but are requested to be canceled and refunded, we retain a 15% cancellation fee. Alternatively, we can issue a store credit for the full amount, in which case no cancellation fee will be applied.</p>



<p class="wp-block-paragraph"><strong>Exchanges</strong></p>



<p class="wp-block-paragraph">Exchanges are available within 30 days of the original purchase date.</p>



<p class="wp-block-paragraph"><strong>Restrictions on Refunds/Exchanges</strong></p>



<p class="wp-block-paragraph">Due to FDA regulations, some items are ineligible for return or exchange:</p>



<ul class="wp-block-list">
<li>Opened or used e-liquids</li>



<li>Products not purchased from <a href="https://getsmoke.com/">www.GetSmoke.com</a></li>



<li>Opened or used devices/accessories</li>
</ul>



<p class="wp-block-paragraph">We also do not refund:</p>



<ul class="wp-block-list">
<li>Shipping costs</li>



<li>Sample packs or bundle deals that are partially returned or opened</li>
</ul>



<p class="wp-block-paragraph"><strong>Shipping Fees</strong></p>



<p class="wp-block-paragraph">Customers are responsible for covering the cost of shipping items back to us.<br>When returned items are received, a customer service representative will contact you to finalize the exchange. You may need to pay the price difference if exchanging for an item of higher value.<br>Standard shipping fees apply to orders under $79.99.</p>



<p class="wp-block-paragraph">We’re here to ensure a smooth and hassle-free experience!</p>



<ul class="wp-block-list">
<li></li>
</ul>



<ul class="wp-block-list">
<li></li>
</ul>



<ul class="wp-block-list">
<li></li>
</ul>



<ul class="wp-block-list">
<li></li>
</ul>



<ul class="wp-block-list">
<li></li>
</ul>



<p class="wp-block-paragraph">Contact us at <a href="mailto:info@getsmoke.com">info@getsmoke.com</a> for questions related to refunds and returns.</p>



<p class="wp-block-paragraph"></p>
`

export default function Page() {
  return <PolicyPage title="Refund and Returns Policy" content={content} />
}
