export interface ModelConfig {
  slug: string;
  name: string;
  shortName: string;
  brand: string;
  brandSlug: string;
  puffs: string;
  nicotine: string;
  heroImage: string;
  dbSearchQuery: string;
  price: number;
}

export const MODELS: ModelConfig[] = [
  { slug: "adjust-mycool", name: "Adjust MyCool 40,000 Puffs", shortName: "Adjust MyCool", brand: "Adjust", brandSlug: "adjust", puffs: "40,000", nicotine: "50mg (5%)", heroImage: "/model-banners/adjust-mycool-hero.jpg", dbSearchQuery: "MyCool", price: 18.99 },
  { slug: "adjust-myflavor", name: "Adjust MyFlavor 40,000 Puffs", shortName: "Adjust MyFlavor", brand: "Adjust", brandSlug: "adjust", puffs: "40,000", nicotine: "50mg (5%)", heroImage: "/model-banners/adjust-myflavor-hero.jpg", dbSearchQuery: "MyFlavor", price: 18.99 },
  { slug: "adjust-mysour", name: "Adjust MySour 40,000 Puffs", shortName: "Adjust MySour", brand: "Adjust", brandSlug: "adjust", puffs: "40,000", nicotine: "50mg (5%)", heroImage: "/model-banners/adjust-mysour-hero.jpg", dbSearchQuery: "MySour", price: 18.99 },
  { slug: "adjust-mysweet", name: "Adjust MySweet 40,000 Puffs", shortName: "Adjust MySweet", brand: "Adjust", brandSlug: "adjust", puffs: "40,000", nicotine: "50mg (5%)", heroImage: "/model-banners/adjust-mysweet-hero.jpg", dbSearchQuery: "MySweet", price: 18.99 },
  { slug: "beri-crush", name: "Beri Crush 50,000 Puffs", shortName: "Beri Crush", brand: "Beri", brandSlug: "beri", puffs: "50,000", nicotine: "50mg (5%)", heroImage: "/model-banners/beri-crush-hero.jpg", dbSearchQuery: "Crush", price: 22.49 },
  { slug: "ebcreate-bc-pro", name: "EBCREATE BC Pro 40,000 Puffs", shortName: "BC Pro", brand: "EBCREATE", brandSlug: "ebcreate", puffs: "40,000", nicotine: "50mg (5%)", heroImage: "/model-banners/ebcreate-bc-pro-hero.jpg", dbSearchQuery: "BC Pro", price: 20.99 },
  { slug: "fifty-bar-black-series", name: "Fifty Bar Black Series 20,000 Puffs", shortName: "Fifty Bar Black Series", brand: "Fifty Bar", brandSlug: "fifty-bar", puffs: "20,000", nicotine: "50mg (5%)", heroImage: "/model-banners/fifty-bar-black-series-hero.jpg", dbSearchQuery: "Fifty Bar Black Series", price: 20.99 },
  { slug: "fruitia-fifty-bar", name: "Fruitia x Fifty Bar 20,000 Puffs", shortName: "Fruitia x Fifty Bar", brand: "Fifty Bar", brandSlug: "fifty-bar", puffs: "20,000", nicotine: "50mg (5%)", heroImage: "/model-banners/fruitia-fifty-bar-hero.jpg", dbSearchQuery: "Fruitia", price: 20.99 },
  { slug: "fifty-bar-hidden-hills", name: "Fifty Bar x Hidden Hills 20,000 Puffs", shortName: "Fifty Bar x Hidden Hills", brand: "Fifty Bar", brandSlug: "fifty-bar", puffs: "20,000", nicotine: "50mg (5%)", heroImage: "/model-banners/fifty-bar-hidden-hills-hero.jpg", dbSearchQuery: "Hidden Hills", price: 20.99 },
  { slug: "foger-bit", name: "Foger Bit 35,000 Puffs", shortName: "Foger Bit", brand: "Foger", brandSlug: "foger", puffs: "35,000", nicotine: "50mg (5%)", heroImage: "/model-banners/foger-bit-hero.jpg", dbSearchQuery: "Foger Bit", price: 24.89 },
  { slug: "foger-switch-pro", name: "Foger Switch Pro Kit 30,000 Puffs", shortName: "Foger Switch Pro", brand: "Foger", brandSlug: "foger", puffs: "30,000", nicotine: "50mg (5%)", heroImage: "/model-banners/foger-switch-pro-hero.jpg", dbSearchQuery: "Switch Pro Kit", price: 20.99 },
  { slug: "foger-switch-pro-pod", name: "Foger Switch Pro Pod 30,000 Puffs", shortName: "Foger Switch Pro Pod", brand: "Foger", brandSlug: "foger", puffs: "30,000", nicotine: "50mg (5%)", heroImage: "/model-banners/foger-switch-pro-pod-hero.jpg", dbSearchQuery: "Switch Pro Pod", price: 20.99 },
  { slug: "fume-extra", name: "Fume Extra 1,500 Puffs", shortName: "Fume Extra", brand: "FUME", brandSlug: "fume", puffs: "1,500", nicotine: "50mg (5%)", heroImage: "/model-banners/fume-extra-hero.jpg", dbSearchQuery: "Fume Extra", price: 11.99 },
  { slug: "fume-hookah", name: "Fume Hookah 20,000 Puffs", shortName: "Fume Hookah", brand: "FUME", brandSlug: "fume", puffs: "20,000", nicotine: "50mg (5%)", heroImage: "/model-banners/fume-hookah-hero.jpg", dbSearchQuery: "Fume Hookah", price: 16.79 },
  { slug: "fume-infinity", name: "Fume Infinity 3,500 Puffs", shortName: "Fume Infinity", brand: "FUME", brandSlug: "fume", puffs: "3,500", nicotine: "50mg (5%)", heroImage: "/model-banners/fume-infinity-hero.jpg", dbSearchQuery: "Fume Infinity", price: 14.99 },
  { slug: "fume-nb-super-k", name: "Fume NB Super-K 20,000 Puffs", shortName: "Fume NB Super-K", brand: "FUME", brandSlug: "fume", puffs: "20,000", nicotine: "50mg (5%)", heroImage: "/model-banners/fume-nb-super-k-hero.jpg", dbSearchQuery: "NB Super", price: 18.89 },
  { slug: "fume-pro", name: "Fume Pro 30,000 Puffs", shortName: "Fume Pro", brand: "FUME", brandSlug: "fume", puffs: "30,000", nicotine: "50mg (5%)", heroImage: "/model-banners/fume-pro-hero.jpg", dbSearchQuery: "Fume Pro", price: 18.99 },
  { slug: "fume-recharge-zero", name: "Fume Recharge Zero 5,000 Puffs", shortName: "Fume Recharge Zero", brand: "FUME", brandSlug: "fume", puffs: "5,000", nicotine: "0% Nicotine Free", heroImage: "/model-banners/fume-recharge-zero-hero.jpg", dbSearchQuery: "Recharge Zero", price: 14.99 },
  { slug: "geek-bar-meloso", name: "Geek Bar Meloso 30,000 Puffs", shortName: "Geek Bar Meloso", brand: "Geek Bar", brandSlug: "geek-bar", puffs: "30,000", nicotine: "50mg (5%)", heroImage: "/model-banners/geek-bar-meloso-hero.jpg", dbSearchQuery: "Meloso", price: 19.99 },
  { slug: "geek-bar-meloso-mini", name: "Geek Bar Meloso Mini 1,500 Puffs", shortName: "Geek Bar Meloso Mini", brand: "Geek Bar", brandSlug: "geek-bar", puffs: "1,500", nicotine: "50mg (5%)", heroImage: "/model-banners/geek-bar-meloso-mini-hero.jpg", dbSearchQuery: "Meloso Mini", price: 12.99 },
  { slug: "geek-bar-pulse-x", name: "Geek Bar Pulse X 25,000 Puffs", shortName: "Geek Bar Pulse X", brand: "Geek Bar", brandSlug: "geek-bar", puffs: "25,000", nicotine: "50mg (5%)", heroImage: "/model-banners/geek-bar-pulse-x-hero.jpg", dbSearchQuery: "Pulse X", price: 23.99 },
  { slug: "geek-bar-pulse", name: "Geek Bar Pulse 15,000 Puffs", shortName: "Geek Bar Pulse", brand: "Geek Bar", brandSlug: "geek-bar", puffs: "15,000", nicotine: "50mg (5%)", heroImage: "/model-banners/geek-bar-pulse-hero.jpg", dbSearchQuery: "Geek Bar Pulse", price: 19.99 },
  { slug: "hqd-cuvie-bar", name: "HQD Cuvie Bar 7,000 Puffs", shortName: "HQD Cuvie Bar", brand: "HQD", brandSlug: "hqd", puffs: "7,000", nicotine: "50mg (5%)", heroImage: "/model-banners/hqd-cuvie-bar-hero.jpg", dbSearchQuery: "Cuvie Bar", price: 15.90 },
  { slug: "hqd-cuvie-glaze", name: "HQD Cuvie Glaze 15,000 Puffs", shortName: "HQD Cuvie Glaze", brand: "HQD", brandSlug: "hqd", puffs: "15,000", nicotine: "50mg (5%)", heroImage: "/model-banners/hqd-cuvie-glaze-hero.jpg", dbSearchQuery: "Cuvie Glaze", price: 17.80 },
  { slug: "hqd-cuvie-mars", name: "HQD Cuvie Mars 8,000 Puffs", shortName: "HQD Cuvie Mars", brand: "HQD", brandSlug: "hqd", puffs: "8,000", nicotine: "50mg (5%)", heroImage: "/model-banners/hqd-cuvie-mars-hero.jpg", dbSearchQuery: "Cuvie Mars", price: 12.99 },
  { slug: "hqd-cuvie-plus", name: "HQD Cuvie Plus 1,200 Puffs", shortName: "HQD Cuvie Plus", brand: "HQD", brandSlug: "hqd", puffs: "1,200", nicotine: "50mg (5%)", heroImage: "/model-banners/hqd-cuvie-plus-hero.jpg", dbSearchQuery: "Cuvie Plus", price: 11.99 },
  { slug: "hqd-cuvie-slick", name: "HQD Cuvie Slick 6,000 Puffs", shortName: "HQD Cuvie Slick", brand: "HQD", brandSlug: "hqd", puffs: "6,000", nicotine: "50mg (5%)", heroImage: "/model-banners/hqd-cuvie-slick-hero.jpg", dbSearchQuery: "Cuvie Slick", price: 11.99 },
  { slug: "hqd-everest", name: "HQD Everest 25,000 Puffs", shortName: "HQD Everest", brand: "HQD", brandSlug: "hqd", puffs: "25,000", nicotine: "50mg (5%)", heroImage: "/model-banners/hqd-everest-hero.jpg", dbSearchQuery: "HQD Everest", price: 20.99 },
  { slug: "hqd-shisha", name: "HQD Shisha 20,000 Puffs", shortName: "HQD Shisha", brand: "HQD", brandSlug: "hqd", puffs: "20,000", nicotine: "50mg (5%)", heroImage: "/model-banners/hqd-shisha-hero.jpg", dbSearchQuery: "HQD Shisha", price: 18.99 },
  { slug: "juice-bar-jb5000", name: "Juice Bar JB5000 5,000 Puffs", shortName: "Juice Bar JB5000", brand: "Juicy Bar", brandSlug: "juicy-bar", puffs: "5,000", nicotine: "50mg (5%)", heroImage: "/model-banners/juice-bar-jb5000-hero.jpg", dbSearchQuery: "JB5000", price: 14.30 },
  { slug: "juice-bar-jb7500", name: "Juice Bar JB7500 Pro 7,500 Puffs", shortName: "Juice Bar JB7500", brand: "Juicy Bar", brandSlug: "juicy-bar", puffs: "7,500", nicotine: "50mg (5%)", heroImage: "/model-banners/juice-bar-jb7500-hero.jpg", dbSearchQuery: "JB7500", price: 15.89 },
  { slug: "juice-bar-jb25000", name: "Juice Bar JB25000 Pro Max 25,000 Puffs", shortName: "Juice Bar JB25000", brand: "Juicy Bar", brandSlug: "juicy-bar", puffs: "25,000", nicotine: "50mg (5%)", heroImage: "/model-banners/juice-bar-jb25000-hero.jpg", dbSearchQuery: "JB25000", price: 17.90 },
  { slug: "lost-mary-mo20000", name: "Lost Mary MO20000 Pro 20,000 Puffs", shortName: "Lost Mary MO20000", brand: "Lost Mary", brandSlug: "lost-mary", puffs: "20,000", nicotine: "50mg (5%)", heroImage: "/model-banners/lost-mary-mo20000-hero.jpg", dbSearchQuery: "MO20000", price: 16.89 },
  { slug: "lost-mary-nera-fullview", name: "Lost Mary Nera Fullview Kit 70,000 Puffs", shortName: "Lost Mary Nera Fullview", brand: "Lost Mary", brandSlug: "lost-mary", puffs: "70,000", nicotine: "50mg (5%)", heroImage: "/model-banners/lost-mary-nera-fullview-hero.jpg", dbSearchQuery: "Nera Fullview", price: 23.99 },
  { slug: "lost-mary-nera-pureview", name: "Lost Mary Nera Pureview Kit 40,000 Puffs", shortName: "Lost Mary Nera Pureview", brand: "Lost Mary", brandSlug: "lost-mary", puffs: "40,000", nicotine: "50mg (5%)", heroImage: "/model-banners/lost-mary-nera-pureview-hero.jpg", dbSearchQuery: "Nera Pureview", price: 23.99 },
  { slug: "lost-mary-turbo", name: "Lost Mary Turbo 35,000 Puffs", shortName: "Lost Mary Turbo", brand: "Lost Mary", brandSlug: "lost-mary", puffs: "35,000", nicotine: "50mg (5%)", heroImage: "/model-banners/lost-mary-turbo-hero.jpg", dbSearchQuery: "Lost Mary Turbo", price: 20.99 },
  { slug: "lost-mary-ultrasonic", name: "Lost Mary Ultrasonic 35,000 Puffs", shortName: "Lost Mary Ultrasonic", brand: "Lost Mary", brandSlug: "lost-mary", puffs: "35,000", nicotine: "50mg (5%)", heroImage: "/model-banners/lost-mary-ultrasonic-hero.jpg", dbSearchQuery: "Ultrasonic", price: 20.99 },
  { slug: "oxbar-astro-maze", name: "OXBAR Astro Maze 50,000 Puffs", shortName: "OXBAR Astro Maze", brand: "Oxbar", brandSlug: "oxbar", puffs: "50,000", nicotine: "50mg (5%)", heroImage: "/model-banners/oxbar-astro-maze-hero.jpg", dbSearchQuery: "Astro Maze", price: 19.89 },
  { slug: "oxbar-ice-nic", name: "OXBAR ICE-NIC Control 35,000 Puffs", shortName: "OXBAR ICE-NIC", brand: "Oxbar", brandSlug: "oxbar", puffs: "35,000", nicotine: "50mg (5%)", heroImage: "/model-banners/oxbar-ice-nic-hero.jpg", dbSearchQuery: "ICE-NIC", price: 22.29 },
  { slug: "oxbar-ice-nic-pod-juice", name: "OXBAR x Pod Juice ICE-NIC 35,000 Puffs", shortName: "OXBAR x Pod Juice", brand: "Oxbar", brandSlug: "oxbar", puffs: "35,000", nicotine: "50mg (5%)", heroImage: "/model-banners/oxbar-ice-nic-pod-juice-hero.jpg", dbSearchQuery: "ICE-NIC", price: 22.29 },
  { slug: "raz-dc25000", name: "RAZ DC25000 Disposable Vape", shortName: "RAZ DC25000", brand: "Raz", brandSlug: "raz", puffs: "25,000", nicotine: "50mg (5%)", heroImage: "/model-banners/raz-ltx-dc25000-v2-hero.jpg", dbSearchQuery: "RAZ DC25000 Disposable", price: 23.99 },
  { slug: "raz-dc25000-zero", name: "RAZ DC25000 ZERO Nicotine Free", shortName: "RAZ DC25000 ZERO", brand: "Raz", brandSlug: "raz", puffs: "25,000", nicotine: "0% Nicotine Free", heroImage: "/model-banners/raz-ltx-dc25000-hero.jpg", dbSearchQuery: "ZERO - RAZ DC25000", price: 23.99 },
  { slug: "raz-tn9000", name: "RAZ TN9000 Disposable Vape", shortName: "RAZ TN9000", brand: "Raz", brandSlug: "raz", puffs: "9,000", nicotine: "50mg (5%)", heroImage: "/model-banners/raz-tn9000-hero.jpg", dbSearchQuery: "RAZ TN", price: 21.00 },
  { slug: "raz-vue-50k", name: "RAZ Vue 50,000 Puffs", shortName: "RAZ Vue 50K", brand: "Raz", brandSlug: "raz", puffs: "50,000", nicotine: "50mg (5%)", heroImage: "/model-banners/raz-vue-50k-hero.jpg", dbSearchQuery: "RAZ Vue", price: 23.99 },
  { slug: "viho-supercharge", name: "VIHO Supercharge 20,000 Puffs", shortName: "VIHO Supercharge", brand: "VIHO", brandSlug: "viho", puffs: "20,000", nicotine: "50mg (5%)", heroImage: "/model-banners/viho-supercharge-hero.jpg", dbSearchQuery: "Viho Supercharge", price: 18.99 },
  { slug: "viho-supercharge-pro", name: "VIHO Supercharge Pro 20,000 Puffs", shortName: "VIHO Supercharge Pro", brand: "VIHO", brandSlug: "viho", puffs: "20,000", nicotine: "50mg (5%)", heroImage: "/model-banners/viho-supercharge-pro-hero.jpg", dbSearchQuery: "Supercharge Pro", price: 19.69 },
  { slug: "viho-supercharge-zero", name: "VIHO Supercharge Zero 20,000 Puffs", shortName: "VIHO Supercharge Zero", brand: "VIHO", brandSlug: "viho", puffs: "20,000", nicotine: "0% Nicotine Free", heroImage: "/model-banners/viho-supercharge-zero-hero.jpg", dbSearchQuery: "Supercharge Zero", price: 17.89 },
  { slug: "x-posed-35k", name: "X-POSED 35,000 Puffs Kit", shortName: "X-POSED 35K", brand: "X-Posed", brandSlug: "x-posed", puffs: "35,000", nicotine: "50mg (5%)", heroImage: "/model-banners/x-posed-35k-hero.jpg", dbSearchQuery: "X-POSED", price: 16.99 },
  { slug: "x-posed-pod-35k", name: "X-POSED POD 35,000 Puffs", shortName: "X-POSED POD", brand: "X-Posed", brandSlug: "x-posed", puffs: "35,000", nicotine: "50mg (5%)", heroImage: "/model-banners/x-posed-pod-35k-hero.jpg", dbSearchQuery: "X-POSED Pod", price: 16.99 },
];

export function getModelBySlug(slug: string): ModelConfig | undefined {
  return MODELS.find(m => m.slug === slug);
}

export function getModelsByBrand(brandSlug: string): ModelConfig[] {
  return MODELS.filter(m => m.brandSlug === brandSlug);
}
