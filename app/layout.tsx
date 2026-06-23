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
import { noIndex } from "@/lib/noindex";

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
    ...noIndex,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: SITE_URL,
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
