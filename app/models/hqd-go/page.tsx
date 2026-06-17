import type { Metadata } from "next";
import { noIndex } from "@/lib/noindex";
import HqdGoPage from "@/components/ModelPage/HqdGoPage";

export const metadata: Metadata = {
  title: "HQD GO 35000 Puffs Disposable Vape | Buy Online | GetSmoke",
  description:
    "Buy HQD GO 35,000 puffs disposable vape online. 14 flavors available - $34.99. Free shipping on orders over $79. Delivery 3-7 days across the USA.",
  ...noIndex,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "HQD GO 35000 Puffs Disposable Vape",
  description:
    "HQD GO disposable vape with 35,000 puffs. Available in 14 flavors. Rechargeable, 5% nicotine.",
  brand: {
    "@type": "Brand",
    name: "HQD",
  },
  image:
    "https://pub-e2c8a53d84f146beb67cf9ee9a8f4961.r2.dev/wp-content/uploads/2025/11/HQD-Go-Purple-Drank.jpg",
  offers: [
    {
      "@type": "Offer",
      name: "Single",
      price: "34.99",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: "https://getsmoke.com/models/hqd-go",
    },
    {
      "@type": "Offer",
      name: "Pack of 3",
      price: "99.72",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: "https://getsmoke.com/models/hqd-go",
    },
    {
      "@type": "Offer",
      name: "Pack of 5",
      price: "160.95",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: "https://getsmoke.com/models/hqd-go",
    },
    {
      "@type": "Offer",
      name: "Pack of 10",
      price: "307.90",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: "https://getsmoke.com/models/hqd-go",
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HqdGoPage />
    </>
  );
}
