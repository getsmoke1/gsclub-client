import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpile packages that use ES2022 private class fields (#field syntax)
  // Required for Safari < 14.1 compatibility
  transpilePackages: [
    "@tanstack/react-query",
    "@tanstack/query-core",
    "@tanstack/react-query-devtools",
  ],

  async redirects() {
    return [
      {
        source: '/product-tag/:brand*',
        destination: '/brands/:brand',
        permanent: true,
      },
      {
        source: '/product-category/vapes:path*',
        destination: '/vapes',
        permanent: true,
      },
      {
        source: '/product-category/hookah:path*',
        destination: '/hookah',
        permanent: true,
      },
      {
        source: '/product-category/disposable-vapes:path*',
        destination: '/vapes',
        permanent: true,
      },
      {
        source: '/product-category/:slug*',
        destination: '/vapes',
        permanent: true,
      },
      {
        source: '/products',
        destination: '/vapes',
        permanent: true,
      },
      {
        source: '/smok-vape',
        destination: '/brands/smok',
        permanent: true,
      },
      {
        source: '/shop:path*',
        destination: '/vapes',
        permanent: true,
      },
      {
        source: '/category/:brand*',
        destination: '/brands/:brand',
        permanent: true,
      },
      {
        source: '/my-account:path*',
        destination: '/login',
        permanent: true,
      },

      {
        source: '/hqd-cuvie-plus-vs-bar-vs-glaze-2026',
        destination: '/blog/hqd-cuvie-plus-vs-bar-vs-glaze-2026',
        permanent: true,
      },
      {
        source: '/juicy-bar-jb7500-vs-jb25000-2026',
        destination: '/blog/juicy-bar-jb7500-vs-jb25000-2026',
        permanent: true,
      },
      {
        source: '/lost-mary-mt15000-vs-mt35000-turbo-2026',
        destination: '/blog/lost-mary-mt15000-vs-mt35000-turbo-2026',
        permanent: true,
      },
      {
        source: '/geek-bar-pulse-vs-pulse-x-2026',
        destination: '/blog/geek-bar-pulse-vs-pulse-x-2026',
        permanent: true,
      },
      {
        source: '/viho-vape-lineup-2026-every-model-compared',
        destination: '/blog/viho-vape-lineup-2026-every-model-compared',
        permanent: true,
      },
      {
        source: '/best-mint-disposable-vapes-2026',
        destination: '/blog/best-mint-disposable-vapes-2026',
        permanent: true,
      },
      {
        source: '/geek-bar-vs-juicy-bar-2026-comparison',
        destination: '/blog/geek-bar-vs-juicy-bar-2026-comparison',
        permanent: true,
      },
      {
        source: '/hqd-vape-lineup-2026-every-model-compared',
        destination: '/blog/hqd-vape-lineup-2026-every-model-compared',
        permanent: true,
      },
      {
        source: '/why-does-my-vape-taste-burnt',
        destination: '/blog/why-does-my-vape-taste-burnt',
        permanent: true,
      },
      {
        source: '/best-25000-puff-disposable-vapes-2026',
        destination: '/blog/best-25000-puff-disposable-vapes-2026',
        permanent: true,
      },
      {
        source: '/fume-vape-lineup-2026-every-model-compared',
        destination: '/blog/fume-vape-lineup-2026-every-model-compared',
        permanent: true,
      },
      {
        source: '/how-many-puffs-vape-equals-cigarette',
        destination: '/blog/how-many-puffs-vape-equals-cigarette',
        permanent: true,
      },
      {
        source: '/strawberry-kiwi-geek-bar-pulse-review',
        destination: '/blog/strawberry-kiwi-geek-bar-pulse-review',
        permanent: true,
      },
      {
        source: '/best-raz-vape-flavors',
        destination: '/blog/best-raz-vape-flavors',
        permanent: true,
      },
      {
        source: '/geek-bar-pulse-vs-raz-dc25000',
        destination: '/blog/geek-bar-pulse-vs-raz-dc25000',
        permanent: true,
      },
      {
        source: '/best-lost-mary-flavors-ranked',
        destination: '/blog/best-lost-mary-flavors-ranked',
        permanent: true,
      },
      {
        source: '/raz-tn9000-review',
        destination: '/blog/raz-tn9000-review',
        permanent: true,
      },
      {
        source: '/can-you-bring-disposable-vape-on-plane',
        destination: '/blog/can-you-bring-disposable-vape-on-plane',
        permanent: true,
      },
      {
        source: '/how-many-puffs-of-vape-equal-one-cigarette-2',
        destination: '/blog/how-many-puffs-of-vape-equal-one-cigarette-2',
        permanent: true,
      },
      {
        source: '/lost-mary-nera-fullview-kit-review',
        destination: '/blog/lost-mary-nera-fullview-kit-review',
        permanent: true,
      },
      {
        source: '/lost-mary-mt15000-review',
        destination: '/blog/lost-mary-mt15000-review',
        permanent: true,
      },
      {
        source: '/do-geek-bars-get-you-high',
        destination: '/blog/do-geek-bars-get-you-high',
        permanent: true,
      },
      {
        source: '/best-geek-bar-pulse-flavors-ranked',
        destination: '/blog/best-geek-bar-pulse-flavors-ranked',
        permanent: true,
      },
      {
        source: '/most-popular-foger-vape-flavors-2026',
        destination: '/blog/most-popular-foger-vape-flavors-2026',
        permanent: true,
      },
      {
        source: '/fume-vape-replacement-texas',
        destination: '/blog/fume-vape-replacement-texas',
        permanent: true,
      },
      {
        source: '/meta-moon-geek-bar-review',
        destination: '/blog/meta-moon-geek-bar-review',
        permanent: true,
      },
      {
        source: '/is-vape-pen-a-felony-in-texas',
        destination: '/blog/is-vape-pen-a-felony-in-texas',
        permanent: true,
      },
      {
        source: '/disposable-vapes-vs-pod-systems-which-is-better-in-2026',
        destination: '/blog/disposable-vapes-vs-pod-systems-which-is-better-in-2026',
        permanent: true,
      },
      {
        source: '/how-to-unclog-a-disposable-vape',
        destination: '/blog/how-to-unclog-a-disposable-vape',
        permanent: true,
      },
      {
        source: '/can-you-vape-in-restaurants-in-texas',
        destination: '/blog/can-you-vape-in-restaurants-in-texas',
        permanent: true,
      },
      {
        source: '/how-to-make-fifty-bar-texas-mint-last-longer',
        destination: '/blog/how-to-make-fifty-bar-texas-mint-last-longer',
        permanent: true,
      },
      {
        source: '/geek-bar-pulse-screen-meaning',
        destination: '/blog/geek-bar-pulse-screen-meaning',
        permanent: true,
      },
      {
        source: '/how-to-change-mode-on-hqd-everest',
        destination: '/blog/how-to-change-mode-on-hqd-everest',
        permanent: true,
      },
      {
        source: '/where-to-buy-fume-vape-near-me-in-houston',
        destination: '/blog/where-to-buy-fume-vape-near-me-in-houston',
        permanent: true,
      },
      {
        source: '/juicy-bar-jb7500-pro-review',
        destination: '/blog/juicy-bar-jb7500-pro-review',
        permanent: true,
      },
      {
        source: '/top-10-best-lost-mary-mt35000-turbo-disposable',
        destination: '/blog/top-10-best-lost-mary-mt35000-turbo-disposable',
        permanent: true,
      },
      {
        source: '/disposable-vape-delivery-in-austin',
        destination: '/blog/disposable-vape-delivery-in-austin',
        permanent: true,
      },
      {
        source: '/can-i-bring-a-vape-through-tsa-in-texas',
        destination: '/blog/can-i-bring-a-vape-through-tsa-in-texas',
        permanent: true,
      },
      {
        source: '/texas-citrus-rush',
        destination: '/blog/texas-citrus-rush',
        permanent: true,
      },
      {
        source: '/how-to-open-a-lost-mary-vape-a-step-by-step-guide',
        destination: '/blog/how-to-open-a-lost-mary-vape-a-step-by-step-guide',
        permanent: true,
      },
      {
        source: '/what-is-the-legal-age-to-vape-in-texas',
        destination: '/blog/what-is-the-legal-age-to-vape-in-texas',
        permanent: true,
      },
      {
        source: '/best-disposable-vapes-dallas',
        destination: '/blog/best-disposable-vapes-dallas',
        permanent: true,
      },
      {
        source: '/real-vs-fake-hqd-authentic-hqd-vapes',
        destination: '/blog/real-vs-fake-hqd-authentic-hqd-vapes',
        permanent: true,
      },
      {
        source: '/juicy-bar-jb5000-charge-texas-weather-impact',
        destination: '/blog/juicy-bar-jb5000-charge-texas-weather-impact',
        permanent: true,
      },
      {
        source: '/how-much-are-hqd-vapes',
        destination: '/blog/how-much-are-hqd-vapes',
        permanent: true,
      },
      {
        source: '/why-is-texas-banning-vapes-from-china',
        destination: '/blog/why-is-texas-banning-vapes-from-china',
        permanent: true,
      },
      {
        source: '/vape-banned-in-dallas',
        destination: '/blog/vape-banned-in-dallas',
        permanent: true,
      },
      {
        source: '/geek-bar-flavors-ranked',
        destination: '/blog/geek-bar-flavors-ranked',
        permanent: true,
      },
      {
        source: '/lost-mary-vape-texas',
        destination: '/blog/lost-mary-vape-texas',
        permanent: true,
      },
      {
        source: '/are-geek-bars-banned-in-texas',
        destination: '/blog/are-geek-bars-banned-in-texas',
        permanent: true,
      },
      {
        source: '/best-disposable-fruity-vapes',
        destination: '/blog/best-disposable-fruity-vapes',
        permanent: true,
      },
      {
        source: '/texas-nicotine-vape-products',
        destination: '/blog/texas-nicotine-vape-products',
        permanent: true,
      },
      {
        source: '/what-vapes-are-not-banned-in-texas',
        destination: '/blog/what-vapes-are-not-banned-in-texas',
        permanent: true,
      },
      {
        source: '/juicy-bar-jb7500-texas-flavors',
        destination: '/blog/juicy-bar-jb7500-texas-flavors',
        permanent: true,
      },
      {
        source: '/where-to-buy-vapes-in-texas',
        destination: '/blog/where-to-buy-vapes-in-texas',
        permanent: true,
      },
      {
        source: '/juicy-bar-mexican-mango-ice',
        destination: '/blog/juicy-bar-mexican-mango-ice',
        permanent: true,
      },
      {
        source: '/juicy-bar-vanilla-tobacco',
        destination: '/blog/juicy-bar-vanilla-tobacco',
        permanent: true,
      },
      {
        source: '/juicy-bar-jb5000-price-review',
        destination: '/blog/juicy-bar-jb5000-price-review',
        permanent: true,
      },
      {
        source: '/does-juicy-bar-watermelon-ice-really-cool-your-tongue',
        destination: '/blog/does-juicy-bar-watermelon-ice-really-cool-your-tongue',
        permanent: true,
      },
      {
        source: '/where-to-buy-geek-bars-online-in-texas',
        destination: '/blog/where-to-buy-geek-bars-online-in-texas',
        permanent: true,
      },
      {
        source: '/strawberry-shortcake-geek-bar-getsmoke',
        destination: '/blog/strawberry-shortcake-geek-bar-getsmoke',
        permanent: true,
      },
      {
        source: '/our-honest-best-5-alternatives-to-fume-vape',
        destination: '/blog/our-honest-best-5-alternatives-to-fume-vape',
        permanent: true,
      },
      {
        source: '/best-hqd-disposable-vape-in-texas',
        destination: '/blog/best-hqd-disposable-vape-in-texas',
        permanent: true,
      },
      {
        source: '/is-juicy-bar-a-good-vape-honest-review',
        destination: '/blog/is-juicy-bar-a-good-vape-honest-review',
        permanent: true,
      },
      {
        source: '/top-5-best-raz-vape-flavors-25000',
        destination: '/blog/top-5-best-raz-vape-flavors-25000',
        permanent: true,
      },
      {
        source: '/raz-vape-9000-review-this-2025',
        destination: '/blog/raz-vape-9000-review-this-2025',
        permanent: true,
      },
      {
        source: '/do-raz-vapes-have-sugar',
        destination: '/blog/do-raz-vapes-have-sugar',
        permanent: true,
      },
      {
        source: '/do-raz-vapes-have-lithium-batteries',
        destination: '/blog/do-raz-vapes-have-lithium-batteries',
        permanent: true,
      },
      {
        source: '/can-i-buy-raz-vapes-online',
        destination: '/blog/can-i-buy-raz-vapes-online',
        permanent: true,
      },
      {
        source: '/can-i-bring-my-raz-vape-on-a-plane',
        destination: '/blog/can-i-bring-my-raz-vape-on-a-plane',
        permanent: true,
      },
      {
        source: '/are-there-fake-raz-vapes',
        destination: '/blog/are-there-fake-raz-vapes',
        permanent: true,
      },
      {
        source: '/are-raz-vapes-refillable',
        destination: '/blog/are-raz-vapes-refillable',
        permanent: true,
      },
      {
        source: '/what-is-a-raz-vape',
        destination: '/blog/what-is-a-raz-vape',
        permanent: true,
      },
      {
        source: '/where-can-i-buy-raz-vapes-near-me',
        destination: '/blog/where-can-i-buy-raz-vapes-near-me',
        permanent: true,
      },
      {
        source: '/how-much-nicotine-is-in-a-raz-vape',
        destination: '/blog/how-much-nicotine-is-in-a-raz-vape',
        permanent: true,
      },
      {
        source: '/how-many-puffs-are-in-a-raz-vape',
        destination: '/blog/how-many-puffs-are-in-a-raz-vape',
        permanent: true,
      },
      {
        source: '/how-to-use-raz-vape',
        destination: '/blog/how-to-use-raz-vape',
        permanent: true,
      },
      {
        source: '/how-to-know-when-raz-vape-is-empty',
        destination: '/blog/how-to-know-when-raz-vape-is-empty',
        permanent: true,
      },
      {
        source: '/how-many-cigarettes-in-a-raz-vape',
        destination: '/blog/how-many-cigarettes-in-a-raz-vape',
        permanent: true,
      },
      {
        source: '/do-raz-vapes-have-thc',
        destination: '/blog/do-raz-vapes-have-thc',
        permanent: true,
      },
      {
        source: '/do-raz-vapes-have-diacetyl',
        destination: '/blog/do-raz-vapes-have-diacetyl',
        permanent: true,
      },
      {
        source: '/do-raz-vapes-have-nicotine',
        destination: '/blog/do-raz-vapes-have-nicotine',
        permanent: true,
      },
      {
        source: '/is-raz-vapes-fda-approved',
        destination: '/blog/is-raz-vapes-fda-approved',
        permanent: true,
      },
      {
        source: '/is-raz-vape-disposable',
        destination: '/blog/is-raz-vape-disposable',
        permanent: true,
      },
      {
        source: '/how-long-until-i-can-vape-after-tooth-extraction',
        destination: '/blog/how-long-until-i-can-vape-after-tooth-extraction',
        permanent: true,
      },
      {
        source: '/what-is-the-best-raz-vape-flavor',
        destination: '/blog/what-is-the-best-raz-vape-flavor',
        permanent: true,
      },
      {
        source: '/are-raz-vapes-salt-nic',
        destination: '/blog/are-raz-vapes-salt-nic',
        permanent: true,
      },
      {
        source: '/is-raz-vape-safe',
        destination: '/blog/is-raz-vape-safe',
        permanent: true,
      },
      {
        source: '/are-raz-vapes-safe',
        destination: '/blog/are-raz-vapes-safe',
        permanent: true,
      },
      {
        source: '/what-is-omg-b-pop-geek-bar',
        destination: '/blog/what-is-omg-b-pop-geek-bar',
        permanent: true,
      },
      {
        source: '/how-long-do-geek-bar-pulse-last',
        destination: '/blog/how-long-do-geek-bar-pulse-last',
        permanent: true,
      },
      {
        source: '/how-long-should-a-geek-bar-pulse-last',
        destination: '/blog/how-long-should-a-geek-bar-pulse-last',
        permanent: true,
      },
      {
        source: '/can-you-hit-a-geek-bar-while-its-charging',
        destination: '/blog/can-you-hit-a-geek-bar-while-its-charging',
        permanent: true,
      },
      {
        source: '/do-geek-bars-stop-charging-when-full',
        destination: '/blog/do-geek-bars-stop-charging-when-full',
        permanent: true,
      },
      {
        source: '/what-flavor-is-skywalker-geek-bar',
        destination: '/blog/what-flavor-is-skywalker-geek-bar',
        permanent: true,
      },
      {
        source: '/what-does-fucking-fab-geek-bar-taste-like',
        destination: '/blog/what-does-fucking-fab-geek-bar-taste-like',
        permanent: true,
      },
      {
        source: '/how-long-does-a-geek-bar-pulse-x-last',
        destination: '/blog/how-long-does-a-geek-bar-pulse-x-last',
        permanent: true,
      },
      {
        source: '/how-long-do-geek-bar-pulse-x-last',
        destination: '/blog/how-long-do-geek-bar-pulse-x-last',
        permanent: true,
      },
      {
        source: '/does-geek-bar-pulse-have-thc-or-thc',
        destination: '/blog/does-geek-bar-pulse-have-thc-or-thc',
        permanent: true,
      },
      {
        source: '/when-did-geek-bar-pulse-come-out',
        destination: '/blog/when-did-geek-bar-pulse-come-out',
        permanent: true,
      },
      {
        source: '/are-geek-bars-good',
        destination: '/blog/are-geek-bars-good',
        permanent: true,
      },
      {
        source: '/what-are-the-best-geek-bar-flavors',
        destination: '/blog/what-are-the-best-geek-bar-flavors',
        permanent: true,
      },
      {
        source: '/whats-the-best-geek-bar-flavor',
        destination: '/blog/whats-the-best-geek-bar-flavor',
        permanent: true,
      },
      {
        source: '/blu-vs-geek-bar',
        destination: '/blog/blu-vs-geek-bar',
        permanent: true,
      },
      {
        source: '/does-geek-bar-pulse-have-thc',
        destination: '/blog/does-geek-bar-pulse-have-thc',
        permanent: true,
      },
      {
        source: '/geek-bar-pulse-flavors-ranked',
        destination: '/blog/geek-bar-pulse-flavors-ranked',
        permanent: true,
      },
      {
        source: '/what-is-the-best-geek-bar-pulse-x-flavor',
        destination: '/blog/what-is-the-best-geek-bar-pulse-x-flavor',
        permanent: true,
      },
      {
        source: '/are-geek-bars-better-than-cigarettes',
        destination: '/blog/are-geek-bars-better-than-cigarettes',
        permanent: true,
      },
      {
        source: '/are-geek-bars-nicotine-or-weed',
        destination: '/blog/are-geek-bars-nicotine-or-weed',
        permanent: true,
      },
      {
        source: '/where-to-buy-geek-bar-pulse-x',
        destination: '/blog/where-to-buy-geek-bar-pulse-x',
        permanent: true,
      },
      {
        source: '/can-you-hit-a-blinker-on-a-geek-bar',
        destination: '/blog/can-you-hit-a-blinker-on-a-geek-bar',
        permanent: true,
      },
      {
        source: '/where-to-buy-geek-bars-online',
        destination: '/blog/where-to-buy-geek-bars-online',
        permanent: true,
      },
      {
        source: '/does-a-geek-bar-get-you-high',
        destination: '/blog/does-a-geek-bar-get-you-high',
        permanent: true,
      },
      {
        source: '/where-can-you-travel-with-a-geek-bar-vape',
        destination: '/blog/where-can-you-travel-with-a-geek-bar-vape',
        permanent: true,
      },
      {
        source: '/how-long-does-a-geek-bar-vape-last-lifespan-usage-tips',
        destination: '/blog/how-long-does-a-geek-bar-vape-last-lifespan-usage-tips',
        permanent: true,
      },
      {
        source: '/black-cherry-geek-bar-pulse-review-rich-smooth-and-full-of-flavor',
        destination: '/blog/black-cherry-geek-bar-pulse-review-rich-smooth-and-full-of-flavor',
        permanent: true,
      },
      {
        source: '/blueberry-watermelon-geek-bar-pulse-review-a-perfect-blend-or-a-missed-mix',
        destination: '/blog/blueberry-watermelon-geek-bar-pulse-review-a-perfect-blend-or-a-missed-mix',
        permanent: true,
      },
      {
        source: '/sour-watermelon-drop-geek-bar-pulse-a-juicy-hit-or-miss-find-out-here',
        destination: '/blog/sour-watermelon-drop-geek-bar-pulse-a-juicy-hit-or-miss-find-out-here',
        permanent: true,
      },
      {
        source: '/sour-gush-geek-bar-pulse-review-does-this-bold-flavor-live-up-to-the-hype',
        destination: '/blog/sour-gush-geek-bar-pulse-review-does-this-bold-flavor-live-up-to-the-hype',
        permanent: true,
      },
      {
        source: '/geek-bar-pulse-sour-cranapple-review-a-tart-twist-worth-trying',
        destination: '/blog/geek-bar-pulse-sour-cranapple-review-a-tart-twist-worth-trying',
        permanent: true,
      },
      {
        source: '/sour-blue-dust-geek-bar-pulse-review-is-this-the-ultimate-sweet-and-sour-vape',
        destination: '/blog/sour-blue-dust-geek-bar-pulse-review-is-this-the-ultimate-sweet-and-sour-vape',
        permanent: true,
      },
      {
        source: '/geek-bar-vape-faqs-answering-your-top-questions',
        destination: '/blog/geek-bar-vape-faqs-answering-your-top-questions',
        permanent: true,
      },
      {
        source: '/how-to-spot-a-fake-geek-bar-vape-and-avoid-scams',
        destination: '/blog/how-to-spot-a-fake-geek-bar-vape-and-avoid-scams',
        permanent: true,
      },
      {
        source: '/how-to-choose-the-right-geek-bar-vape-flavor-for-you',
        destination: '/blog/how-to-choose-the-right-geek-bar-vape-flavor-for-you',
        permanent: true,
      },
      {
        source: '/geek-bar-vape-vs-elf-bar-which-one-should-you-choose',
        destination: '/blog/geek-bar-vape-vs-elf-bar-which-one-should-you-choose',
        permanent: true,
      },
      {
        source: '/best-geek-bar-flavors-ranked-find-your-favorite',
        destination: '/blog/best-geek-bar-flavors-ranked-find-your-favorite',
        permanent: true,
      },
      {
        source: '/what-is-a-geek-bar-disposable-vape-a-beginners-guide',
        destination: '/blog/what-is-a-geek-bar-disposable-vape-a-beginners-guide',
        permanent: true,
      },
      {
        source: '/geek-bar-launches-zero-nicotine-disposables',
        destination: '/blog/geek-bar-launches-zero-nicotine-disposables',
        permanent: true,
      },
      {
        source: '/geek-bar-pulse-zero-nicotine-vape-smarter-zero-nicotine',
        destination: '/blog/geek-bar-pulse-zero-nicotine-vape-smarter-zero-nicotine',
        permanent: true,
      },
      {
        source: '/geek-bar-pulse-zero-nicotine-review',
        destination: '/blog/geek-bar-pulse-zero-nicotine-review',
        permanent: true,
      },
      {
        source: '/torch-thc-vapes-vs-traditional-thc-carts-which-one-hits-better',
        destination: '/blog/torch-thc-vapes-vs-traditional-thc-carts-which-one-hits-better',
        permanent: true,
      },
      {
        source: '/torch-thc-vapes-potency-flavor-and-performance-breakdown',
        destination: '/blog/torch-thc-vapes-potency-flavor-and-performance-breakdown',
        permanent: true,
      },
      {
        source: '/best-juicy-bar-vape-flavors-ranked-which-one-should-you-try-first',
        destination: '/blog/best-juicy-bar-vape-flavors-ranked-which-one-should-you-try-first',
        permanent: true,
      },
      {
        source: '/geek-bar-vs-other-vape-brands-is-it-the-best-choice-for-you',
        destination: '/blog/geek-bar-vs-other-vape-brands-is-it-the-best-choice-for-you',
        permanent: true,
      },
      {
        source: '/geek-bar-vapes-review-the-pros-and-cons-of-this-popular-disposable',
        destination: '/blog/geek-bar-vapes-review-the-pros-and-cons-of-this-popular-disposable',
        permanent: true,
      },
      {
        source: '/are-raz-vapes-any-good-a-comprehensive-review-of-their-best-flavors',
        destination: '/blog/are-raz-vapes-any-good-a-comprehensive-review-of-their-best-flavors',
        permanent: true,
      },
      {
        source: '/raz-vapes-review-a-deep-dive-into-flavor-battery-life-and-vapor-quality',
        destination: '/blog/raz-vapes-review-a-deep-dive-into-flavor-battery-life-and-vapor-quality',
        permanent: true,
      },
      {
        source: '/raz-dc25000-nightcrawler-review',
        destination: '/blog/raz-dc25000-nightcrawler-review',
        permanent: true,
      },
      {
        source: '/is-raz-vape-the-worlds-most-advanced-disposable-vape',
        destination: '/blog/is-raz-vape-the-worlds-most-advanced-disposable-vape',
        permanent: true,
      },
      {
        source: '/top-10-best-disposable-vapes-in-2025-a-comprehensive-guide',
        destination: '/blog/top-10-best-disposable-vapes-in-2025-a-comprehensive-guide',
        permanent: true,
      },
      {
        source: '/what-flavors-of-raz-vapes-are-there',
        destination: '/blog/what-flavors-of-raz-vapes-are-there',
        permanent: true,
      },
      {
        source: '/why-geek-bar-vapes-are-the-ultimate-flavor-experience',
        destination: '/blog/why-geek-bar-vapes-are-the-ultimate-flavor-experience',
        permanent: true,
      },
      {
        source: '/explore-our-ultimate-raz-vapes-review',
        destination: '/blog/explore-our-ultimate-raz-vapes-review',
        permanent: true,
      },
      {
        source: '/explore-the-potent-relaxation-of-torch-thc-vapes',
        destination: '/blog/explore-the-potent-relaxation-of-torch-thc-vapes',
        permanent: true,
      },
      {
        source: '/top-10-juicy-bar-vapes-in-2024',
        destination: '/blog/top-10-juicy-bar-vapes-in-2024',
        permanent: true,
      },
      {
        source: '/top-10-geek-bar-vapes-in-2024',
        destination: '/blog/top-10-geek-bar-vapes-in-2024',
        permanent: true,
      },
      {
        source: '/top-10-raz-vapes-in-2024',
        destination: '/blog/top-10-raz-vapes-in-2024',
        permanent: true,
      },
      {
        source: '/breaking-down-the-fruity-delight-of-white-gummy-juicy-bar',
        destination: '/blog/breaking-down-the-fruity-delight-of-white-gummy-juicy-bar',
        permanent: true,
      },
      {
        source: '/icy-mint-juicy-bar-review-your-guide-to-smooth-cool-vaping',
        destination: '/blog/icy-mint-juicy-bar-review-your-guide-to-smooth-cool-vaping',
        permanent: true,
      },
      {
        source: '/unleash-flavor-packed-adventures-with-juicy-bar-vape-review',
        destination: '/blog/unleash-flavor-packed-adventures-with-juicy-bar-vape-review',
        permanent: true,
      },
      {
        source: '/explore-the-compact-and-easy-to-use-flum-pebble-vapes',
        destination: '/blog/explore-the-compact-and-easy-to-use-flum-pebble-vapes',
        permanent: true,
      },
      {
        source: '/the-ultimate-juicy-bar-cool-mint-review',
        destination: '/blog/the-ultimate-juicy-bar-cool-mint-review',
        permanent: true,
      },
      {
        source: '/juicy-bar-pink-burst-vape-flavor-review-and-experience',
        destination: '/blog/juicy-bar-pink-burst-vape-flavor-review-and-experience',
        permanent: true,
      },
      {
        source: '/tasting-the-unique-mexican-cola-ice-juicy-bar-vape',
        destination: '/blog/tasting-the-unique-mexican-cola-ice-juicy-bar-vape',
        permanent: true,
      },
      {
        source: '/cool-and-fresh-spearmint-juicy-bar-vape-breakdown',
        destination: '/blog/cool-and-fresh-spearmint-juicy-bar-vape-breakdown',
        permanent: true,
      },
      {
        source: '/classic-virginia-tobacco-juicy-bar-vape-review',
        destination: '/blog/classic-virginia-tobacco-juicy-bar-vape-review',
        permanent: true,
      },
      {
        source: '/exploring-the-colombian-coffee-ice-juicy-bar-vape',
        destination: '/blog/exploring-the-colombian-coffee-ice-juicy-bar-vape',
        permanent: true,
      },
      {
        source: '/juicy-bar-argentinian-guava-ice-vape-full-review',
        destination: '/blog/juicy-bar-argentinian-guava-ice-vape-full-review',
        permanent: true,
      },
      {
        source: '/exploring-the-mexican-pina-colada-juicy-bar-vape',
        destination: '/blog/exploring-the-mexican-pina-colada-juicy-bar-vape',
        permanent: true,
      },
      {
        source: '/what-are-the-top-10-juicy-bar-vapes',
        destination: '/blog/what-are-the-top-10-juicy-bar-vapes',
        permanent: true,
      },
      {
        source: '/what-stores-sell-vapes',
        destination: '/blog/what-stores-sell-vapes',
        permanent: true,
      },
      {
        source: '/how-old-do-you-have-to-be-to-vape-legally',
        destination: '/blog/how-old-do-you-have-to-be-to-vape-legally',
        permanent: true,
      },
      {
        source: '/how-to-tell-if-vapes-are-fake',
        destination: '/blog/how-to-tell-if-vapes-are-fake',
        permanent: true,
      },
      {
        source: '/how-long-is-a-puff-on-a-vape',
        destination: '/blog/how-long-is-a-puff-on-a-vape',
        permanent: true,
      },
      {
        source: '/can-you-buy-vapes-under-18',
        destination: '/blog/can-you-buy-vapes-under-18',
        permanent: true,
      },
      {
        source: '/how-many-puffs-of-vape-equal-one-cigarette',
        destination: '/blog/how-many-puffs-of-vape-equal-one-cigarette',
        permanent: true,
      },
      {
        source: '/how-many-puffs-are-there-in-a-vape',
        destination: '/blog/how-many-puffs-are-there-in-a-vape',
        permanent: true,
      },
      {
        source: '/juicy-bar-vape-running-low-heres-how-to-refill-it-easily',
        destination: '/blog/juicy-bar-vape-running-low-heres-how-to-refill-it-easily',
        permanent: true,
      },
      {
        source: '/can-you-use-water-in-a-vape-exploring-the-myths-and-facts',
        destination: '/blog/can-you-use-water-in-a-vape-exploring-the-myths-and-facts',
        permanent: true,
      },
      {
        source: '/learn-how-long-will-your-favorite-geek-bar-vape-last',
        destination: '/blog/learn-how-long-will-your-favorite-geek-bar-vape-last',
        permanent: true,
      },
      {
        source: '/how-much-nicotine-is-in-your-geek-bar-vape-find-out-here',
        destination: '/blog/how-much-nicotine-is-in-your-geek-bar-vape-find-out-here',
        permanent: true,
      },
      {
        source: '/top-10-raz-vape-flavors-for-flavor-fanatics',
        destination: '/blog/top-10-raz-vape-flavors-for-flavor-fanatics',
        permanent: true,
      },
      {
        source: '/nicotine-free-vape-pens-are-they-really-safe-find-out-here',
        destination: '/blog/nicotine-free-vape-pens-are-they-really-safe-find-out-here',
        permanent: true,
      },
      {
        source: '/the-ultimate-guide-to-charging-your-raz-vape',
        destination: '/blog/the-ultimate-guide-to-charging-your-raz-vape',
        permanent: true,
      },
      {
        source: '/top-tips-to-fix-a-burnt-taste-in-your-vape',
        destination: '/blog/top-tips-to-fix-a-burnt-taste-in-your-vape',
        permanent: true,
      },
      {
        source: '/know-about-the-new-wave-in-vaping-mesh-coils',
        destination: '/blog/know-about-the-new-wave-in-vaping-mesh-coils',
        permanent: true,
      },
      {
        source: '/vape-101-breaking-down-the-different-parts-of-your-device',
        destination: '/blog/vape-101-breaking-down-the-different-parts-of-your-device',
        permanent: true,
      },
      {
        source: '/how-much-nicotine-is-really-in-a-juicy-bar-vape',
        destination: '/blog/how-much-nicotine-is-really-in-a-juicy-bar-vape',
        permanent: true,
      },
      {
        source: '/fixing-a-blinking-juicy-bar-vape-troubleshooting-guide',
        destination: '/blog/fixing-a-blinking-juicy-bar-vape-troubleshooting-guide',
        permanent: true,
      },
      {
        source: '/whats-the-difference-between-nic-shots-and-nic-salts',
        destination: '/blog/whats-the-difference-between-nic-shots-and-nic-salts',
        permanent: true,
      },
      {
        source: '/why-is-my-vape-pen-not-working-after-a-charge',
        destination: '/blog/why-is-my-vape-pen-not-working-after-a-charge',
        permanent: true,
      },
      {
        source: '/the-top-5-big-puff-vapes-in-2024',
        destination: '/blog/the-top-5-big-puff-vapes-in-2024',
        permanent: true,
      },
      {
        source: '/where-can-i-buy-a-vape-pen-your-guide-to-the-best-deals',
        destination: '/blog/where-can-i-buy-a-vape-pen-your-guide-to-the-best-deals',
        permanent: true,
      },
      {
        source: '/how-many-hits-does-a-disposable-vape-pen-have',
        destination: '/blog/how-many-hits-does-a-disposable-vape-pen-have',
        permanent: true,
      },
      {
        source: '/what-do-the-colors-on-vape-pens-mean',
        destination: '/blog/what-do-the-colors-on-vape-pens-mean',
        permanent: true,
      },
      {
        source: '/how-to-clean-coils-in-your-vape-pen',
        destination: '/blog/how-to-clean-coils-in-your-vape-pen',
        permanent: true,
      },
      {
        source: '/how-to-clean-your-vape-pen',
        destination: '/blog/how-to-clean-your-vape-pen',
        permanent: true,
      },
      {
        source: '/how-to-use-a-disposable-vape-pen-with-button',
        destination: '/blog/how-to-use-a-disposable-vape-pen-with-button',
        permanent: true,
      },
      {
        source: '/can-you-use-any-charger-for-vape-batteries',
        destination: '/blog/can-you-use-any-charger-for-vape-batteries',
        permanent: true,
      },
      {
        source: '/what-is-the-legal-age-to-smoke-vape',
        destination: '/blog/what-is-the-legal-age-to-smoke-vape',
        permanent: true,
      },
      {
        source: '/how-to-use-a-vape-pen',
        destination: '/blog/how-to-use-a-vape-pen',
        permanent: true,
      },
      {
        source: '/are-hqd-vapes-nicotine-free',
        destination: '/blog/are-hqd-vapes-nicotine-free',
        permanent: true,
      },
      {
        source: '/how-to-charge-a-hqd-vape-cuvie-slick-vape',
        destination: '/blog/how-to-charge-a-hqd-vape-cuvie-slick-vape',
        permanent: true,
      },
      {
        source: '/what-does-hqd-stand-for-vape',
        destination: '/blog/what-does-hqd-stand-for-vape',
        permanent: true,
      },
      {
        source: '/are-hqd-vapes-safe',
        destination: '/blog/are-hqd-vapes-safe',
        permanent: true,
      },
      {
        source: '/are-juicy-bar-vapes-bad-for-you',
        destination: '/blog/are-juicy-bar-vapes-bad-for-you',
        permanent: true,
      },
      {
        source: '/how-to-charge-a-juicy-bar-vape',
        destination: '/blog/how-to-charge-a-juicy-bar-vape',
        permanent: true,
      },
      {
        source: '/can-you-refill-a-juicy-bar-vape',
        destination: '/blog/can-you-refill-a-juicy-bar-vape',
        permanent: true,
      },
      {
        source: '/are-lost-mary-vapes-safe',
        destination: '/blog/are-lost-mary-vapes-safe',
        permanent: true,
      },
      {
        source: '/how-to-charge-lost-mary-vapes',
        destination: '/blog/how-to-charge-lost-mary-vapes',
        permanent: true,
      },
      {
        source: '/what-flavor-is-the-rickey-raz-vape',
        destination: '/blog/what-flavor-is-the-rickey-raz-vape',
        permanent: true,
      },
      {
        source: '/what-flavor-is-violet-raz-vape',
        destination: '/blog/what-flavor-is-violet-raz-vape',
        permanent: true,
      },
      {
        source: '/who-makes-raz-vapes',
        destination: '/blog/who-makes-raz-vapes',
        permanent: true,
      },
      {
        source: '/how-do-i-know-when-my-raz-vape-is-empty',
        destination: '/blog/how-do-i-know-when-my-raz-vape-is-empty',
        permanent: true,
      },
      {
        source: '/what-flavor-is-a-tiffany-raz-vape',
        destination: '/blog/what-flavor-is-a-tiffany-raz-vape',
        permanent: true,
      },
      {
        source: '/how-much-is-a-raz-vape',
        destination: '/blog/how-much-is-a-raz-vape',
        permanent: true,
      },
      {
        source: '/what-flavor-is-ruby-raz-vape',
        destination: '/blog/what-flavor-is-ruby-raz-vape',
        permanent: true,
      },
      {
        source: '/how-long-does-a-juicy-bar-vape-last',
        destination: '/blog/how-long-does-a-juicy-bar-vape-last',
        permanent: true,
      },
      {
        source: '/where-to-buy-juicy-bar-vape',
        destination: '/blog/where-to-buy-juicy-bar-vape',
        permanent: true,
      },
      {
        source: '/how-long-do-lost-mary-vapes-last',
        destination: '/blog/how-long-do-lost-mary-vapes-last',
        permanent: true,
      },
      {
        source: '/how-much-are-lost-mary-vapes',
        destination: '/blog/how-much-are-lost-mary-vapes',
        permanent: true,
      },
      {
        source: '/how-much-is-a-fume-vape',
        destination: '/blog/how-much-is-a-fume-vape',
        permanent: true,
      },
      {
        source: '/where-can-i-buy-fume-vapes',
        destination: '/blog/where-can-i-buy-fume-vapes',
        permanent: true,
      },
      {
        source: '/what-is-fume-vape',
        destination: '/blog/what-is-fume-vape',
        permanent: true,
      },
      {
        source: '/are-fume-vapes-safe',
        destination: '/blog/are-fume-vapes-safe',
        permanent: true,
      },
      {
        source: '/how-many-puffs-on-a-vape-equals-one-cigarette',
        destination: '/blog/how-many-puffs-on-a-vape-equals-one-cigarette',
        permanent: true,
      },
      {
        source: '/which-flavored-vapes-are-the-best-for-women',
        destination: '/blog/which-flavored-vapes-are-the-best-for-women',
        permanent: true,
      },
      {
        source: '/does-vaping-change-your-voice',
        destination: '/blog/does-vaping-change-your-voice',
        permanent: true,
      },
      {
        source: '/what-does-it-mean-when-a-disposable-vape-blinks-10-times',
        destination: '/blog/what-does-it-mean-when-a-disposable-vape-blinks-10-times',
        permanent: true,
      },
      {
        source: '/what-is-vapers-tongue',
        destination: '/blog/what-is-vapers-tongue',
        permanent: true,
      },
      {
        source: '/how-to-choose-the-best-disposable-vape-for-your-needs',
        destination: '/blog/how-to-choose-the-best-disposable-vape-for-your-needs',
        permanent: true,
      },
      {
        source: '/how-to-inhale-a-vape',
        destination: '/blog/how-to-inhale-a-vape',
        permanent: true,
      },
      {
        source: '/how-long-should-a-disposable-vape-last-you',
        destination: '/blog/how-long-should-a-disposable-vape-last-you',
        permanent: true,
      },
      {
        source: '/how-to-know-when-your-disposable-vape-is-almost-empty',
        destination: '/blog/how-to-know-when-your-disposable-vape-is-almost-empty',
        permanent: true,
      },
      {
        source: '/5-best-disposable-vape-dessert-flavors-to-try',
        destination: '/blog/5-best-disposable-vape-dessert-flavors-to-try',
        permanent: true,
      },
      {
        source: '/how-to-use-a-disposable-vape-pen-complete-guide',
        destination: '/blog/how-to-use-a-disposable-vape-pen-complete-guide',
        permanent: true,
      },
      {
        source: '/how-long-do-flum-vapes-last',
        destination: '/blog/how-long-do-flum-vapes-last',
        permanent: true,
      },
      {
        source: '/what-disposable-vape-has-the-most-puffs',
        destination: '/blog/what-disposable-vape-has-the-most-puffs',
        permanent: true,
      },
      {
        source: '/brand-new-disposable-vape-not-working-5-tips',
        destination: '/blog/brand-new-disposable-vape-not-working-5-tips',
        permanent: true,
      },
      {
        source: '/want-to-quit-nicotine-with-ease-explore-our-low-nicotine-disposable-vapes',
        destination: '/blog/want-to-quit-nicotine-with-ease-explore-our-low-nicotine-disposable-vapes',
        permanent: true,
      },
      {
        source: '/disposable-vape-pen-not-working-after-charge-how-to-fix',
        destination: '/blog/disposable-vape-pen-not-working-after-charge-how-to-fix',
        permanent: true,
      },
      {
        source: '/can-vaping-cause-high-blood-pressure',
        destination: '/blog/can-vaping-cause-high-blood-pressure',
        permanent: true,
      },
      {
        source: '/does-vaping-make-you-tired',
        destination: '/blog/does-vaping-make-you-tired',
        permanent: true,
      },
      {
        source: '/why-do-you-need-airflow-for-a-disposable-vape',
        destination: '/blog/why-do-you-need-airflow-for-a-disposable-vape',
        permanent: true,
      },
      {
        source: '/can-vaping-cause-hiccups',
        destination: '/blog/can-vaping-cause-hiccups',
        permanent: true,
      },
      {
        source: '/how-to-use-a-disposable-vape-pen',
        destination: '/blog/how-to-use-a-disposable-vape-pen',
        permanent: true,
      },
      {
        source: '/do-vapes-have-calories',
        destination: '/blog/do-vapes-have-calories',
        permanent: true,
      },
      {
        source: '/how-to-blow-o-rings',
        destination: '/blog/how-to-blow-o-rings',
        permanent: true,
      },
      {
        source: '/exploring-exquisite-vape-flavors-a-flavorful-adventure',
        destination: '/blog/exploring-exquisite-vape-flavors-a-flavorful-adventure',
        permanent: true,
      },
      {
        source: '/what-are-the-best-vapes-to-quit-smoking',
        destination: '/blog/what-are-the-best-vapes-to-quit-smoking',
        permanent: true,
      },
      {
        source: '/how-to-vape-without-coughing',
        destination: '/blog/how-to-vape-without-coughing',
        permanent: true,
      },
      {
        source: '/how-long-does-vape-smoke-stay-in-the-air',
        destination: '/blog/how-long-does-vape-smoke-stay-in-the-air',
        permanent: true,
      },
      {
        source: '/how-to-refill-a-disposable-vape',
        destination: '/blog/how-to-refill-a-disposable-vape',
        permanent: true,
      },
      {
        source: '/what-disposable-vape-lasts-the-longest',
        destination: '/blog/what-disposable-vape-lasts-the-longest',
        permanent: true,
      },
      {
        source: '/why-does-my-new-disposable-vape-taste-burnt',
        destination: '/blog/why-does-my-new-disposable-vape-taste-burnt',
        permanent: true,
      },
      {
        source: '/how-to-get-rid-of-sore-throat-from-vaping',
        destination: '/blog/how-to-get-rid-of-sore-throat-from-vaping',
        permanent: true,
      },
      {
        source: '/can-you-vape-while-breastfeeding',
        destination: '/blog/can-you-vape-while-breastfeeding',
        permanent: true,
      },
      {
        source: '/how-to-vape-without-setting-off-smoke-alarm',
        destination: '/blog/how-to-vape-without-setting-off-smoke-alarm',
        permanent: true,
      },
      {
        source: '/how-long-does-vape-stay-in-your-system',
        destination: '/blog/how-long-does-vape-stay-in-your-system',
        permanent: true,
      },
      {
        source: '/how-to-do-a-ghost-inhale',
        destination: '/blog/how-to-do-a-ghost-inhale',
        permanent: true,
      },
      {
        source: '/how-to-vape-for-the-first-time',
        destination: '/blog/how-to-vape-for-the-first-time',
        permanent: true,
      },
      {
        source: '/how-old-do-you-have-to-be-to-vape',
        destination: '/blog/how-old-do-you-have-to-be-to-vape',
        permanent: true,
      },
      {
        source: '/how-to-do-vape-tricks-for-beginners',
        destination: '/blog/how-to-do-vape-tricks-for-beginners',
        permanent: true,
      },
      {
        source: '/how-to-travel-with-your-vape-on-a-plane',
        destination: '/blog/how-to-travel-with-your-vape-on-a-plane',
        permanent: true,
      },
      {
        source: '/how-much-nicotine-is-in-a-vape',
        destination: '/blog/how-much-nicotine-is-in-a-vape',
        permanent: true,
      },
      // Product slug corrections — SEO records used short slugs, DB has full slugs
      {
        source: '/product/mango-watermelon-hqd-cuvie-bar',
        destination: '/product/mango-watermelon-hqd-cuvie-bar-disposable-vape',
        permanent: true,
      },
      {
        source: '/product/clear-hqd-cuvie-bar',
        destination: '/product/clear-hqd-cuvie-bar-disposable-vape',
        permanent: true,
      },
      {
        source: '/product/raspberry-watermelon-hqd-cuvie-mars',
        destination: '/product/raspberry-watermelon-hqd-cuvie-mars-disposable-vape',
        permanent: true,
      },
      {
        source: '/product/white-gummy-hqd-cuvie-bar',
        destination: '/product/white-gummy-hqd-cuvie-mars',
        permanent: true,
      },
      {
        source: '/product/blueberry-raspberry-hqd-cuvie-bar',
        destination: '/product/blueberry-raspberry-hqd-cuvie-mars',
        permanent: true,
      },
      {
        source: '/product/mexican-mango-ice-juicy-bar-jb5000',
        destination: '/product/mexican-mango-ice-juicy-bar-jb25000-pro-max',
        permanent: true,
      },
      // Model pages: old slug -> puffs-in-URL slug (301)
      {
        source: '/models/adjust-mycool',
        destination: '/models/adjust-mycool-40000-puffs',
        permanent: true,
      },
      {
        source: '/models/adjust-myflavor',
        destination: '/models/adjust-myflavor-40000-puffs',
        permanent: true,
      },
      {
        source: '/models/adjust-mysour',
        destination: '/models/adjust-mysour-40000-puffs',
        permanent: true,
      },
      {
        source: '/models/adjust-mysweet',
        destination: '/models/adjust-mysweet-40000-puffs',
        permanent: true,
      },
      {
        source: '/models/beri-crush',
        destination: '/models/beri-crush-50000-puffs',
        permanent: true,
      },
      {
        source: '/models/ebcreate-bc-pro',
        destination: '/models/ebcreate-bc-pro-40000-puffs',
        permanent: true,
      },
      {
        source: '/models/fifty-bar-black-series',
        destination: '/models/fifty-bar-black-series-20000-puffs',
        permanent: true,
      },
      {
        source: '/models/fruitia-fifty-bar',
        destination: '/models/fruitia-fifty-bar-20000-puffs',
        permanent: true,
      },
      {
        source: '/models/fifty-bar-hidden-hills',
        destination: '/models/fifty-bar-hidden-hills-20000-puffs',
        permanent: true,
      },
      {
        source: '/models/foger-bit',
        destination: '/models/foger-bit-35000-puffs',
        permanent: true,
      },
      {
        source: '/models/foger-switch-pro',
        destination: '/models/foger-switch-pro-30000-puffs',
        permanent: true,
      },
      {
        source: '/models/foger-switch-pro-pod',
        destination: '/models/foger-switch-pro-pod-30000-puffs',
        permanent: true,
      },
      {
        source: '/models/fume-extra',
        destination: '/models/fume-extra-1500-puffs',
        permanent: true,
      },
      {
        source: '/models/fume-hookah',
        destination: '/models/fume-hookah-20000-puffs',
        permanent: true,
      },
      {
        source: '/models/fume-infinity',
        destination: '/models/fume-infinity-3500-puffs',
        permanent: true,
      },
      {
        source: '/models/fume-nb-super-k',
        destination: '/models/fume-nb-super-k-20000-puffs',
        permanent: true,
      },
      {
        source: '/models/fume-pro',
        destination: '/models/fume-pro-30000-puffs',
        permanent: true,
      },
      {
        source: '/models/fume-recharge-zero',
        destination: '/models/fume-recharge-zero-5000-puffs',
        permanent: true,
      },
      {
        source: '/models/geek-bar-meloso',
        destination: '/models/geek-bar-meloso-30000-puffs',
        permanent: true,
      },
      {
        source: '/models/geek-bar-meloso-mini',
        destination: '/models/geek-bar-meloso-mini-1500-puffs',
        permanent: true,
      },
      {
        source: '/models/geek-bar-pulse-x',
        destination: '/models/geek-bar-pulse-x-25000-puffs',
        permanent: true,
      },
      {
        source: '/models/geek-bar-pulse',
        destination: '/models/geek-bar-pulse-15000-puffs',
        permanent: true,
      },
      {
        source: '/models/hqd-cuvie-bar',
        destination: '/models/hqd-cuvie-bar-7000-puffs',
        permanent: true,
      },
      {
        source: '/models/hqd-cuvie-glaze',
        destination: '/models/hqd-cuvie-glaze-15000-puffs',
        permanent: true,
      },
      {
        source: '/models/hqd-cuvie-mars',
        destination: '/models/hqd-cuvie-mars-8000-puffs',
        permanent: true,
      },
      {
        source: '/models/hqd-cuvie-plus',
        destination: '/models/hqd-cuvie-plus-1200-puffs',
        permanent: true,
      },
      {
        source: '/models/hqd-cuvie-slick',
        destination: '/models/hqd-cuvie-slick-6000-puffs',
        permanent: true,
      },
      {
        source: '/models/hqd-everest',
        destination: '/models/hqd-everest-25000-puffs',
        permanent: true,
      },
      {
        source: '/models/hqd-shisha',
        destination: '/models/hqd-shisha-20000-puffs',
        permanent: true,
      },
      {
        source: '/models/juice-bar-jb5000',
        destination: '/models/juice-bar-jb5000-5000-puffs',
        permanent: true,
      },
      {
        source: '/models/juice-bar-jb7500',
        destination: '/models/juice-bar-jb7500-7500-puffs',
        permanent: true,
      },
      {
        source: '/models/juice-bar-jb25000',
        destination: '/models/juice-bar-jb25000-25000-puffs',
        permanent: true,
      },
      {
        source: '/models/lost-mary-mo20000',
        destination: '/models/lost-mary-mo20000-20000-puffs',
        permanent: true,
      },
      {
        source: '/models/lost-mary-nera-fullview',
        destination: '/models/lost-mary-nera-fullview-70000-puffs',
        permanent: true,
      },
      {
        source: '/models/lost-mary-nera-pureview',
        destination: '/models/lost-mary-nera-pureview-40000-puffs',
        permanent: true,
      },
      {
        source: '/models/lost-mary-turbo',
        destination: '/models/lost-mary-turbo-35000-puffs',
        permanent: true,
      },
      {
        source: '/models/lost-mary-ultrasonic',
        destination: '/models/lost-mary-ultrasonic-35000-puffs',
        permanent: true,
      },
      {
        source: '/models/oxbar-astro-maze',
        destination: '/models/oxbar-astro-maze-50000-puffs',
        permanent: true,
      },
      {
        source: '/models/oxbar-ice-nic',
        destination: '/models/oxbar-ice-nic-35000-puffs',
        permanent: true,
      },
      {
        source: '/models/oxbar-ice-nic-pod-juice',
        destination: '/models/oxbar-ice-nic-pod-juice-35000-puffs',
        permanent: true,
      },
      {
        source: '/models/raz-dc25000',
        destination: '/models/raz-dc25000-25000-puffs',
        permanent: true,
      },
      {
        source: '/models/raz-dc25000-zero',
        destination: '/models/raz-dc25000-zero-25000-puffs',
        permanent: true,
      },
      {
        source: '/models/raz-tn9000',
        destination: '/models/raz-tn9000-9000-puffs',
        permanent: true,
      },
      {
        source: '/models/raz-vue-50k',
        destination: '/models/raz-vue-50k-50000-puffs',
        permanent: true,
      },
      {
        source: '/models/viho-supercharge',
        destination: '/models/viho-supercharge-20000-puffs',
        permanent: true,
      },
      {
        source: '/models/viho-supercharge-pro',
        destination: '/models/viho-supercharge-pro-20000-puffs',
        permanent: true,
      },
      {
        source: '/models/viho-supercharge-zero',
        destination: '/models/viho-supercharge-zero-20000-puffs',
        permanent: true,
      },
      {
        source: '/models/x-posed-35k',
        destination: '/models/x-posed-35k-35000-puffs',
        permanent: true,
      },
      {
        source: '/models/x-posed-pod-35k',
        destination: '/models/x-posed-pod-35k-35000-puffs',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        // Proxy R2 images through getsmoke.com to avoid cross-origin CDN issues
        source: '/r2/:path*',
        destination: 'https://pub-e2c8a53d84f146beb67cf9ee9a8f4961.r2.dev/:path*',
      },
    ];
  },

  images: {
    unoptimized: true, // bypass Vercel image optimizer (Hobby plan quota); R2 images already optimized
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "getsmoke.com",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "*.getsmoke.com",
      },
      {
        protocol: "https",
        hostname: "pub-e2c8a53d84f146beb67cf9ee9a8f4961.r2.dev",
      },
    ],
  },
};

export default nextConfig;
