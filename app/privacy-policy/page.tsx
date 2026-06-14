import PolicyPage from "@/components/PolicyPage/PolicyPage"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | GetSmoke",
  description: "GetSmoke Privacy Policy",
}

const content = `		<div data-elementor-type="wp-page" data-elementor-id="3" class="elementor elementor-3" data-elementor-post-type="page">
				<div class="elementor-element elementor-element-c887be0 e-flex e-con-boxed e-con e-parent" data-id="c887be0" data-element_type="container" data-settings="{&quot;jet_parallax_layout_list&quot;:[]}">
					<div class="e-con-inner">
				<div class="elementor-element elementor-element-7602c64 elementor-widget elementor-widget-heading" data-id="7602c64" data-element_type="widget" data-widget_type="heading.default">
				<div class="elementor-widget-container">
					<h1 class="elementor-heading-title elementor-size-default">Privacy Policy</h1>				</div>
				</div>
				<div class="elementor-element elementor-element-6a2a11fc elementor-widget elementor-widget-text-editor" data-id="6a2a11fc" data-element_type="widget" data-widget_type="text-editor.default">
				<div class="elementor-widget-container">
									<p></p>
<p></p>
<p class="wp-block-paragraph"><span style="font-family: var( --e-global-typography-text-font-family ), Sans-serif; text-align: var(--text-align); caret-color: #000000; color: #000000; font-size: medium;">This Privacy Policy describes how </span><a style="font-family: var( --e-global-typography-text-font-family ), Sans-serif; text-align: var(--text-align); caret-color: #000000; cursor: pointer; color: #7a7a7a; overflow-wrap: break-word; text-decoration: inherit;" tabindex="0" href="http://getsmoke.com/" rel="noopener noreferrer" data-token-index="1"><span style="border-bottom-width: 0.05em; border-color: rgba(55, 53, 47, 0.4); opacity: 0.7;">GetSmoke.com</span></a><span style="font-family: var( --e-global-typography-text-font-family ), Sans-serif; text-align: var(--text-align); caret-color: #000000; color: #000000; font-size: medium;"> (&#8220;we,&#8221; &#8220;us,&#8221; or &#8220;our&#8221;) collects, uses, and discloses your personal information when you visit our website.</span></p>
<h2><span style="color: #000000; font-family: Unbounded, display; font-size: 2rem; font-style: inherit; text-align: var(--text-align); background-color: var(--ast-global-color-5);">Information we collect</span></h2>
<p></p>
<p class="wp-block-paragraph" style="font-style: normal; caret-color: #000000; color: #000000;">We may collect certain personal information from you when you visit our website, such as your name, email address, and contact information. We may also collect non-personal information, such as your IP address and browsing data.</p>
<h3 style="font-style: normal; caret-color: #000000;">How We Use Your Information</h3>
<p style="font-style: normal; caret-color: #000000; color: #000000;">We may use the personal information we collect for various purposes, including:</p>
<ul style="font-style: normal; caret-color: #000000; color: #000000;">
<li>Providing and personalizing our services to you</li>
<li>Communicating with you about our products, services, and promotions</li>
<li>Analyzing and improving our website and user experience</li>
<li>Protecting our rights and complying with applicable laws</li>
</ul>
<p></p>
<h2 class="wp-block-heading"><span style="font-size: 2rem; text-align: var(--text-align); background-color: var(--ast-global-color-5);">Information sharing </span></h2>
<p><span style="font-size: medium; font-family: var( --e-global-typography-text-font-family ), Sans-serif; text-align: var(--text-align); background-color: var(--ast-global-color-5);">may use cookies and similar tracking technologies to collect information about your browsing activities on our website. You can disable cookies in your browser settings, but please note that some features of our website may not function properly</span><span style="font-size: 16px; font-style: inherit; color: var( --e-global-color-text ); font-family: var( --e-global-typography-text-font-family ), Sans-serif; text-align: var(--text-align); background-color: var(--ast-global-color-5);">.</span></p>
<p></p>
<h2 class="wp-block-heading">Cookies</h2>
<p></p>
<p class="wp-block-paragraph">We may use cookies and similar tracking technologies to collect information about your browsing activities on our website. You can disable cookies in your browser settings, but please note that some features of our website may not function properly.</p>
<p></p>
<p class="wp-block-paragraph">If you visit our login page, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and is discarded when you close your browser.</p>
<p></p>
<p class="wp-block-paragraph">When you log in, we will also set up several cookies to save your login information and your screen display choices. Login cookies last for two days, and screen options cookies last for a year. If you select &#8220;Remember Me&#8221;, your login will persist for two weeks. If you log out of your <a href="https://getsmoke.com/my-account/">account</a>, the login cookies will be removed.</p>
<p></p>
<p class="wp-block-paragraph"></p>
<h2 class="wp-block-heading">Data security</h2>
<p></p>
<p class="wp-block-paragraph">We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, please be aware that no method of transmission over the internet or electronic storage is 100% secure</p>
<p></p>
<p></p>
<h2 class="wp-block-heading">Updates to this Privacy Policy</h2>
<p></p>
<p class="wp-block-paragraph">We may update this Privacy Policy from time to time. The updated version will be posted on our website with a revised effective date.</p>
<p></p>
<h2 class="wp-block-heading">What rights you have over your data</h2>
<p></p>
<p class="wp-block-paragraph">If you have an account on this site, or have left comments, you can request to receive an exported file of the personal data we hold about you, including any data you have provided to us. You can also request that we erase any personal data we hold about you. This does not include any data we are obliged to keep for administrative, legal, or security purposes.</p>
<p></p>
<h2 class="wp-block-heading">Contact Us</h2>
<p></p>
<p class="wp-block-paragraph">If you have any questions or concerns about this Privacy Policy, please contact us at <a href="mailto:info@getsmoke.com">info@getsmoke.com</a></p>
<p></p>								</div>
				</div>
					</div>
				</div>
				</div>
		`

export default function Page() {
  return <PolicyPage title="Privacy Policy" content={content} />
}
