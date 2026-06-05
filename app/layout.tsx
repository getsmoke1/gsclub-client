import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Unbounded } from "next/font/google";
import { Toaster } from "react-hot-toast";
import InitializeCart from "@/components/Cart/InitializeCart";
import { Providers } from "@/providers/provider";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { Suspense } from "react";
import AgeVerification from "@/components/AgeVerification/AgeVerification";
import ScrollToTopButton from "@/components/ScrollToTopButton/ScrollToTopButton";
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
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${unbounded.variable}`}
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
          <Navbar />
          <Toaster position="top-right" reverseOrder={false} />
          <InitializeCart />
          <div className="bg-white text-black">
            <Suspense>
              <AgeVerification />
              {children}
            </Suspense>
          </div>
          <ScrollToTopButton />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
