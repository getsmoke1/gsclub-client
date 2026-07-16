import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How Many Puffs Does a Disposable Vape Last? Complete Guide | GetSmoke",
  description: "Disposable vapes range from 1,200 to 70,000 puffs. Learn how long each puff count lasts based on your usage, and which brands offer the most puffs per dollar.",
  alternates: { canonical: "https://getsmoke.com/how-many-puffs-disposable-vape" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How many puffs does a disposable vape last?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Disposable vapes range from 1,200 to 70,000 puffs depending on the model. A 7,000-puff device lasts about 1-2 weeks for a regular user taking 20-30 puffs per day. A 25,000-puff device can last 4-6 weeks."
      }
    },
    {
      "@type": "Question",
      "name": "How long does a 7000 puff vape last?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A 7,000 puff disposable vape lasts approximately 1-2 weeks for an average user taking 20-30 puffs per day. Light users (under 10 puffs/day) can get 3-4 weeks from a 7,000 puff device."
      }
    },
    {
      "@type": "Question",
      "name": "How long does a 25000 puff vape last?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A 25,000 puff disposable vape lasts approximately 4-6 weeks for an average user (20-30 puffs/day) or 2-3 weeks for heavy users (50+ puffs/day)."
      }
    },
    {
      "@type": "Question",
      "name": "How many puffs equal a cigarette?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Approximately 10-15 puffs on a disposable vape is roughly equivalent to one traditional cigarette in nicotine delivery, though this varies based on puff length and nicotine concentration."
      }
    },
    {
      "@type": "Question",
      "name": "What disposable vape has the most puffs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The EBCreate BC Pro offers 40,000 puffs, making it one of the highest-puff disposable vapes available. Other high-puff options include the Lost Mary Turbo (35,000 puffs), Geek Bar Pulse X (25,000 puffs), and RAZ DC25000 (25,000 puffs)."
      }
    }
  ]
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "How Many Puffs Does a Disposable Vape Last",
  "url": "https://getsmoke.com/how-many-puffs-disposable-vape",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["h1", ".speakable-intro", ".puff-table"]
  }
};

const PUFF_DATA = [
  { puffs: "1,200-2,000", duration: "2-5 days", user: "Light use / trial", example: "Flum Float, Fume Extra" },
  { puffs: "5,000-7,000", duration: "1-2 weeks", user: "Casual to regular", example: "HQD Cuvie Bar, Juicy Bar JB5000" },
  { puffs: "9,000-12,000", duration: "2-3 weeks", user: "Regular use", example: "RAZ TN9000, HQD Cuvie Glaze" },
  { puffs: "15,000-20,000", duration: "3-4 weeks", user: "Regular to heavy", example: "Lost Mary MT15000, Geek Bar Pulse" },
  { puffs: "25,000", duration: "4-6 weeks", user: "Heavy use", example: "Geek Bar Pulse X, RAZ DC25000" },
  { puffs: "35,000-40,000", duration: "6-8 weeks", user: "Very heavy use", example: "Lost Mary Turbo, EBCreate BC Pro" },
];

export default function HowManyPuffsPage() {
  return (
    <main className="w-11/12 mx-auto pt-8 pb-16 max-w-4xl font-unbounded">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />

      <nav className="text-xs text-gray-400 mb-6 flex gap-2">
        <Link href="/" className="hover:underline">Home</Link>
        <span>/</span>
        <Link href="/blog" className="hover:underline">Blog</Link>
        <span>/</span>
        <span>How Many Puffs</span>
      </nav>

      <h1 className="font-bold text-2xl md:text-3xl mb-4">
        How Many Puffs Does a Disposable Vape Last?
      </h1>

      <p className="speakable-intro text-gray-600 text-sm md:text-base mb-8 leading-relaxed">
        Disposable vapes range from 1,200 to 40,000+ puffs. How long yours lasts depends entirely on how often you vape. Below is a complete breakdown by puff count, usage type, and real-world duration - so you can choose the right device for your lifestyle.
      </p>

      <h2 className="font-bold text-xl mb-4">Puff Count Duration Guide</h2>
      <div className="puff-table overflow-x-auto mb-10">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-black text-white">
              <th className="text-left p-3 rounded-tl-xl">Puff Count</th>
              <th className="text-left p-3">Avg. Duration</th>
              <th className="text-left p-3">Best For</th>
              <th className="text-left p-3 rounded-tr-xl hidden md:table-cell">Examples</th>
            </tr>
          </thead>
          <tbody>
            {PUFF_DATA.map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="p-3 font-bold">{row.puffs}</td>
                <td className="p-3" style={{ color: "#fe3500" }}>{row.duration}</td>
                <td className="p-3 text-gray-600">{row.user}</td>
                <td className="p-3 text-gray-500 hidden md:table-cell text-xs">{row.example}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-xs text-gray-400 mt-2">*Based on average puff duration of 2-3 seconds, 20-30 puffs per day</p>
      </div>

      <h2 className="font-bold text-xl mb-4">What Affects How Many Puffs You Get?</h2>
      <div className="space-y-3 text-sm text-gray-700 mb-10">
        <div className="flex gap-3 items-start"><span className="text-lg">⏱</span><div><strong>Puff duration</strong> - Short 1-second puffs use less e-liquid than long 3-4 second draws. Longer puffs can reduce actual puff count by 30-40%.</div></div>
        <div className="flex gap-3 items-start"><span className="text-lg">🌡</span><div><strong>Temperature and storage</strong> - Heat degrades e-liquid faster. Store vapes at room temperature, away from direct sunlight.</div></div>
        <div className="flex gap-3 items-start"><span className="text-lg">🔋</span><div><strong>Battery vs liquid</strong> - Modern rechargeable disposables ensure battery and liquid run out together. Older non-rechargeable models sometimes die of battery before liquid runs out.</div></div>
        <div className="flex gap-3 items-start"><span className="text-lg">💨</span><div><strong>Airflow setting</strong> - Devices with adjustable airflow on higher settings deliver more vapor per puff but use more e-liquid.</div></div>
      </div>

      <h2 className="font-bold text-xl mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4 mb-10">
        {faqSchema.mainEntity.map((q, i) => (
          <div key={i} className="border border-gray-100 rounded-xl p-4">
            <h3 className="font-bold text-sm mb-2">{q.name}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{q.acceptedAnswer.text}</p>
          </div>
        ))}
      </div>

      <div className="bg-black rounded-2xl p-6 text-white text-center">
        <p className="font-bold text-lg mb-2">Shop by Puff Count</p>
        <div className="flex flex-wrap gap-3 justify-center mt-4">
          {[
            { label: "7,000-12,000 Puffs", href: "/vapes" },
            { label: "25,000 Puffs", href: "/models/geek-bar-pulse-x-25000-puffs" },
            { label: "35,000+ Puffs", href: "/models/lost-mary-turbo-35000-puffs" },
          ].map(btn => (
            <Link key={btn.label} href={btn.href}
              className="px-5 py-2 rounded-full text-sm font-bold border border-gray-600 hover:border-white transition-colors">
              {btn.label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
