/**
 * seed-listing-faqs.mjs
 * Seeds SEO-optimized FAQs for listing pages and product page fallback.
 */
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const FAQS = [
  {
    pageSlug: "/product/*",
    faqs: [
      {
        question: "Are disposable vapes legal to buy online in the US?",
        answer: "Yes. Disposable vapes are legal to purchase online for adults 21 and older in most US states. GetSmoke verifies customer age at checkout and ships only to states where online vape sales are permitted. Some states such as Massachusetts have stricter restrictions — we will notify you if your state is not eligible at the time of order.",
        order: 0,
      },
      {
        question: "How many puffs does a disposable vape last?",
        answer: "It depends on the device. Entry-level disposables like the HQD Cuvie Bar deliver around 1,800-3,000 puffs. Mid-range devices like Juicy Bar JB7500 or Geek Bar Pulse offer 7,500-15,000 puffs. High-capacity devices like the RAZ TN9000 or Juicy Bar JB25000 Pro Max go up to 9,000-25,000 puffs. Puff count varies based on draw length and frequency.",
        order: 1,
      },
      {
        question: "What nicotine strength do disposable vapes come in?",
        answer: "Most disposable vapes at GetSmoke come in 50mg (5%) nicotine salt — the most popular strength for a strong, smooth hit. Some brands offer 20mg or 30mg options for lighter users, and select products are available in 0mg for nicotine-free vaping. The nicotine strength is listed on every product page.",
        order: 2,
      },
      {
        question: "How long does shipping take after I order?",
        answer: "Standard shipping typically takes 3-7 business days. Expedited options are available at checkout. All orders require adult signature upon delivery per federal regulations. Tracking information is emailed as soon as your order ships.",
        order: 3,
      },
      {
        question: "Can I return a disposable vape if it doesn't work?",
        answer: "Yes. GetSmoke accepts returns or replacements for defective units within 30 days of delivery. If your device is DOA (dead on arrival), has an auto-fire issue, or a manufacturer defect, contact our support team with your order number and a photo or video of the issue. We'll send a replacement at no charge.",
        order: 4,
      },
    ],
  },
  {
    pageSlug: "/vapes",
    faqs: [
      {
        question: "What are the best disposable vapes to buy online in 2025?",
        answer: "The top-selling disposable vapes at GetSmoke include the Geek Bar Pulse X (15,000 puffs), RAZ TN9000 (9,000 puffs), Lost Mary MT15000 Turbo, and Juicy Bar JB25000 Pro Max. These devices are popular for their long battery life, smooth nicotine delivery, and wide flavor variety. All are available with same-day shipping.",
        order: 0,
      },
      {
        question: "How do I choose the right disposable vape?",
        answer: "Consider three things: puff count (how long you need it to last), flavor profile (fruity, menthol, tobacco, dessert), and nicotine strength (50mg for heavy smokers, 20-30mg for light users). If you vape heavily, go for a high-capacity device like the JB25000 or Geek Bar Pulse X. If you just want to try vaping, a 3,000-puff device is a great starting point.",
        order: 1,
      },
      {
        question: "What disposable vape brands does GetSmoke carry?",
        answer: "GetSmoke stocks over 30 brands including Geek Bar, RAZ, Lost Mary, HQD, Juicy Bar, Flum, EB Design (Elf Bar), Fume, Kado Bar, Oxbar, SMOK, VIHO, Torch, Tyson, Fifty Bar, and more. New devices are added weekly. Use the brand filter on the left to browse by your favorite manufacturer.",
        order: 2,
      },
      {
        question: "Are the vapes on GetSmoke authentic?",
        answer: "Yes. GetSmoke sources all products directly from authorized US distributors. Every device comes with the manufacturer's original packaging, authentic scratch-and-verify codes (where applicable), and passes our quality check before shipping. We do not carry counterfeit or grey-market products.",
        order: 3,
      },
      {
        question: "Do you sell vapes in bulk or wholesale?",
        answer: "Yes. GetSmoke offers pack deals and bulk pricing on most products. The Bundle Deals section features curated packs of 3, 5, and 10 units at discounted per-unit pricing. For wholesale orders of 50+ units, contact our team directly for custom pricing.",
        order: 4,
      },
    ],
  },
  {
    pageSlug: "/bundles",
    faqs: [
      {
        question: "What is a vape bundle deal and how much can I save?",
        answer: "A vape bundle is a multi-pack of the same device — usually 3, 5, or 10 units. At GetSmoke, bundles are priced lower per unit than buying individual devices. A 10-pack bundle typically saves you 15-25% compared to buying 10 units separately. Bundles are ideal for regular vapers who don't want to reorder frequently.",
        order: 0,
      },
      {
        question: "Which vape bundles are the most popular at GetSmoke?",
        answer: "The best-selling bundles include Geek Bar Pulse Pack of 10, HQD Cuvie Bar 10-Pack, Juicy Bar JB7500 Pack of 10, and RAZ TN9000 multi-packs. High-puff bundles like the JB25000 Pro Max are popular with heavy users who want to stock up on a single flavor without reordering often.",
        order: 1,
      },
      {
        question: "Can I mix flavors in a bundle?",
        answer: "Most bundle listings are single-flavor packs from the manufacturer. If you want to mix flavors, you can add multiple individual products to your cart and our team will pack them together. Contact us before completing your order if you need a custom mix-pack of 10 or more units.",
        order: 2,
      },
      {
        question: "Is bundle shipping faster than individual orders?",
        answer: "Bundle orders ship with the same priority as individual orders — typically within 1-2 business days with delivery in 3-7 business days via standard shipping. Larger orders (50+ units) may require an extra day for packing verification.",
        order: 3,
      },
      {
        question: "Are bundle deals available for all brands?",
        answer: "Bundle deals are available for most major brands including HQD, Juicy Bar, Geek Bar, RAZ, Lost Mary, Fume, and others. The availability depends on the manufacturer's packaging. Use the filter on the bundles page to sort by brand, puff count, or flavor.",
        order: 4,
      },
    ],
  },
];

async function main() {
  console.log("=== Seeding listing FAQs ===\n");

  for (const entry of FAQS) {
    const existing = await prisma.faq.findFirst({ where: { pageSlug: entry.pageSlug } });

    if (existing) {
      await prisma.faq.update({
        where: { id: existing.id },
        data: { faqs: entry.faqs, isActive: true },
      });
      console.log(`✅ Updated: ${entry.pageSlug} (${entry.faqs.length} FAQs)`);
    } else {
      await prisma.faq.create({
        data: { pageSlug: entry.pageSlug, faqs: entry.faqs, isActive: true },
      });
      console.log(`✅ Created: ${entry.pageSlug} (${entry.faqs.length} FAQs)`);
    }
  }

  console.log("\n✅ Done.");
  await prisma.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
