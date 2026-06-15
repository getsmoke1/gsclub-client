import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

const BRAND_LOGOS: Record<string, string> = {
  "geek-bar":   "/brand-logos/geek-bar-norm.png",
  "raz":        "/brand-logos/raz-norm.png",
  "hqd":        "/brand-logos/hqd-norm.png",
  "lost-mary":  "/brand-logos/lost-mary-norm.png",
  "fume":       "/brand-logos/fume-norm.png",
  "foger":      "/brand-logos/foger-norm.png",
  "fifty-bar":  "/brand-logos/fifty-bar-norm.png",
  "ebcreate":   "/brand-logos/ebcreate-norm.png",
  "juicy-bar":  "/brand-logos/juicy-bar.png",
  "viho":       "/brand-logos/viho.png",
  "kado-bar":   "/brand-logos/kado-bar.png",
  "flum-pebble":"/brand-logos/flum.png",
  "oxbar":      "/brand-logos/oxbar.png",
  "x-posed":    "/brand-logos/x-posed.png",
};

type Props = { params: Promise<{ brandSlug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brandSlug } = await params;
  const brand = await prisma.brand.findFirst({ where: { slug: brandSlug } });
  if (!brand) return { title: "Brand Not Found" };
  return {
    title: `${brand.name} Vapes | GetSmoke`,
    description: `Shop all ${brand.name} disposable vapes at GetSmoke. Best prices, fast shipping.`,
  };
}

export default async function BrandPage({ params }: Props) {
  const { brandSlug } = await params;

  const brand = await prisma.brand.findFirst({
    where: { slug: brandSlug },
    include: {
      products: {
        include: { images: { take: 1 } },
        
        orderBy: { name: "asc" },
      },
    },
  });

  if (!brand) return notFound();

  const logo = brand.slug ? BRAND_LOGOS[brand.slug] : undefined;

  return (
    <main className="w-11/12 mx-auto pt-8 pb-16 font-unbounded">
      {/* Brand header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/brands" className="text-sm text-gray-500 hover:underline">← Brands</Link>
      </div>
      <div className="flex items-center gap-6 mb-8 p-6 border-2 border-black rounded-2xl bg-white w-fit">
        {logo ? (
          <Image src={logo} alt={brand.name} width={160} height={80} className="object-contain max-h-[70px] w-auto" />
        ) : (
          <h1 className="font-bold text-3xl">{brand.name}</h1>
        )}
        {logo && <span className="text-gray-400 text-sm">{brand.products.length} products</span>}
      </div>

      {/* Products grid */}
      {brand.products.length === 0 ? (
        <p className="text-gray-500">No products available for this brand yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
          {brand.products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="border-2 border-black rounded-3xl overflow-hidden hover:border-[#fe3500] transition-colors flex flex-col bg-white"
            >
              <div className="relative bg-gray-50" style={{ paddingTop: "100%" }}>
                <div className="absolute inset-0">
                  {product.images[0]?.url ? (
                    <Image
                      src={product.images[0].url}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <span className="text-gray-300 text-xs">No image</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="p-2 md:p-3 flex flex-col flex-grow justify-between">
                <div>
                  <div className="text-center text-sm font-bold text-black">
                    ${product.currentPrice.toFixed(2)}
                    <span className="block text-xs text-gray-500 font-normal">— or subscribe to save up to 10%</span>
                  </div>
                  <h3 className="font-bold text-xs md:text-sm text-center mt-1 line-clamp-2 leading-4">{product.name}</h3>
                </div>
                <div className="mt-3 px-1">
                  <button
                    className="w-full py-2.5 rounded-full text-white text-sm font-bold"
                    style={{ background: "linear-gradient(90deg, #fe3500 0%, #ffc42e 100%)" }}
                  >
                    select options
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
