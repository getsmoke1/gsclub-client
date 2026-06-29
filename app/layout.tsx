import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Unbounded } from "next/font/google";
import { Toaster } from "react-hot-toast";
import InitializeCart from "@/components/Cart/InitializeCart";
import { Providers } from "@/providers/provider";
import { ErrorBoundary } from "@/components/ErrorBoundary/ErrorBoundary";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { Suspense } from "react";
import AgeVerification from "@/components/AgeVerification/AgeVerification";
import ScrollToTopButton from "@/components/ScrollToTopButton/ScrollToTopButton";
import CookieBanner from "@/components/CookieBanner/CookieBanner";
import { getSEOData } from "@/lib/seo";

const SITE_URL = "https://getsmoke.com";
const GTM_ID = "GTM-TLGTR33M"; // TODO: replace with GetSmoke GTM container ID when created

const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-unbounded",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getSEOData("/*");

  const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    // No global canonical - each page sets its own via generateMetadata
    // Setting it here would override all child page canonicals with homepage URL
    openGraph: {
      siteName: "GetSmoke",
      type: "website",
      images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "GetSmoke - Premium Disposable Vapes" }],
    },
    twitter: {
      card: "summary_large_image",
      images: ["/og-default.jpg"],
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      ],
      apple: [
        { url: "/icon.png", sizes: "512x512", type: "image/png" },
      ],
    },
  };

  if (!seoData) return metadata;

  // Basic SEO
  if (seoData.title) metadata.title = seoData.title;
  if (seoData.description) metadata.description = seoData.description;
  if (seoData.keywords?.length > 0) metadata.keywords = seoData.keywords;

  // OpenGraph
  const ogTitle = seoData.ogTitle || seoData.title;
  const ogDescription = seoData.ogDescription || seoData.description;
  const ogImage = seoData.ogImage;

  if (ogTitle || ogDescription || ogImage) {
    metadata.openGraph = {
      siteName: "GetSmoke",
      locale: "en_US",
      type: "website",
      images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "GetSmoke" }],
    };
    if (ogTitle) metadata.openGraph.title = ogTitle;
    if (ogDescription) metadata.openGraph.description = ogDescription;
    if (ogImage) metadata.openGraph.images = [ogImage];
  }

  // Twitter
  if (ogTitle || ogDescription || ogImage) {
    metadata.twitter = {
      card: "summary_large_image",
      site: "@getsmoke",
    };
    if (ogTitle) metadata.twitter.title = ogTitle;
    if (ogDescription) metadata.twitter.description = ogDescription;
    if (ogImage) metadata.twitter.images = [ogImage];
  }

  return metadata;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to R2 image CDN for faster LCP */}
        <link rel="preconnect" href="https://pub-e2c8a53d84f146beb67cf9ee9a8f4961.r2.dev" />
        <link rel="dns-prefetch" href="https://pub-e2c8a53d84f146beb67cf9ee9a8f4961.r2.dev" />
        {/* ── Static JSON-LD schemas — always in initial HTML, visible to all crawlers ── */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "GetSmoke",
          "url": "https://getsmoke.com",
          "logo": "https://getsmoke.com/icon-192.png",
          "email": "info@getsmoke.com",
          "legalName": "COSMOPROJECT LLC",
          "foundingLocation": { "@type": "Place", "address": { "@type": "PostalAddress", "addressCountry": "US", "addressRegion": "FL" } },
          "areaServed": { "@type": "Country", "name": "United States" },
          "contactPoint": { "@type": "ContactPoint", "email": "info@getsmoke.com", "contactType": "customer support", "areaServed": "US" }
        })}} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "GetSmoke",
          "url": "https://getsmoke.com",
          "potentialAction": { "@type": "SearchAction", "target": { "@type": "EntryPoint", "urlTemplate": "https://getsmoke.com/vapes?search={search_term_string}" }, "query-input": "required name=search_term_string" }
        })}} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["OnlineStore", "LocalBusiness"],
          "name": "GetSmoke",
          "description": "Premium disposable vapes online store. Shop Geek Bar, RAZ, Lost Mary, HQD and more. Fast US shipping. Adults 21+ only.",
          "url": "https://getsmoke.com",
          "logo": "https://getsmoke.com/icon-192.png",
          "email": "info@getsmoke.com",
          "legalName": "COSMOPROJECT LLC",
          "areaServed": { "@type": "Country", "name": "United States" },
          "currenciesAccepted": "USD",
          "paymentAccepted": "Credit Card",
          "priceRange": "$$",
          "openingHours": "Mo-Su 00:00-23:59"
        })}} />
        {/* ── End Static JSON-LD schemas ── */}
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />
        {/* End Google Tag Manager */}
        {/* Yandex Metrika */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
              })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=110132302', 'ym');
              ym(110132302, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
            `,
          }}
        />
        {/* End Yandex Metrika */}
        {/* Polyfills for Safari < 15.4 - must load before any other JS */}
        <script dangerouslySetInnerHTML={{ __html: `
          if (!Array.prototype.at) {
            Array.prototype.at = function(i) {
              i = Math.trunc(i) || 0;
              if (i < 0) i += this.length;
              if (i < 0 || i >= this.length) return undefined;
              return this[i];
            };
          }
          if (!Object.hasOwn) {
            Object.hasOwn = function(o, k) {
              return Object.prototype.hasOwnProperty.call(o, k);
            };
          }
          if (!String.prototype.at) {
            String.prototype.at = function(i) {
              i = Math.trunc(i) || 0;
              if (i < 0) i += this.length;
              if (i < 0 || i >= this.length) return undefined;
              return this[i];
            };
          }
          if (typeof structuredClone === 'undefined') {
            window.structuredClone = function(obj) {
              return JSON.parse(JSON.stringify(obj));
            };
          }
        ` }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${unbounded.variable} bg-black`}
      >

        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {/* Yandex Metrika (noscript) */}
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/110132302" style={{ position: "absolute", left: "-9999px" }} alt="" />
          </div>
        </noscript>
        {/* End Yandex Metrika (noscript) */}

        <Providers>
          <ErrorBoundary>
            <Navbar />
            <Toaster position="top-right" reverseOrder={false} toastOptions={{ duration: 1500 }} />
            <InitializeCart />
            <div className="bg-white text-black">
              <Suspense>
                <AgeVerification />
                {children}
              </Suspense>
            </div>
            <ScrollToTopButton />
            <Footer />
            <CookieBanner />
          </ErrorBoundary>
        </Providers>
      </body>
    </html>
  );
}
