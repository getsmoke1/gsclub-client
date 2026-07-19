#!/bin/bash
# GetSmoke CDN Warmup Script
# Run after every deployment to prevent ISR cold starts
# Usage: bash scripts/warmup.sh [base_url]

BASE="${1:-https://getsmoke.com}"

PAGES=(
  "/"
  "/vapes"
  "/brands/geek-bar"
  "/brands/hqd"
  "/brands/lost-mary"
  "/brands/raz"
  "/brands/viho"
  "/brands/fume"
  "/brands/foger"
  "/brands/juicy-bar"
  "/models/geek-bar-pulse-2-25000-puffs"
  "/models/geek-bar-pulse-15000-puffs"
  "/models/geek-bar-pulse-x-25000-puffs"
  "/models/hqd-cuvie-glaze-15000-puffs"
  "/models/hqd-cuvie-bar-7000-puffs"
  "/models/hqd-cuvie-slick-6000-puffs"
  "/models/hqd-everest-25000-puffs"
  "/models/lost-mary-turbo-35000-puffs"
  "/models/lost-mary-mo20000-20000-puffs"
  "/models/lost-mary-ultrasonic-35000-puffs"
  "/models/raz-dc25000-25000-puffs"
  "/models/raz-vue-50k-50000-puffs"
  "/models/raz-tn9000-9000-puffs"
  "/models/viho-supercharge-20000-puffs"
  "/models/viho-supercharge-pro-20000-puffs"
  "/models/fume-pro-30000-puffs"
  "/models/fume-hookah-20000-puffs"
  "/models/foger-bit-35000-puffs"
  "/models/juice-bar-jb25000-25000-puffs"
  "/models/adjust-mycool-40000-puffs"
  "/models/beri-crush-50000-puffs"
  "/models/ebcreate-bc-pro-40000-puffs"
  "/models/fifty-bar-black-series-20000-puffs"
  "/models/geek-bar-meloso-30000-puffs"
  "/models/hqd-cuvie-mars-8000-puffs"
  "/models/hqd-shisha-20000-puffs"
  "/models/oxbar-astro-maze-50000-puffs"
  "/models/oxbar-ice-nic-35000-puffs"
  "/models/lost-mary-nera-fullview-70000-puffs"
  "/models/x-posed-35k-35000-puffs"
  "/new-in-stock"
  "/best-disposable-vapes"
  "/25000-puff-vapes"
  "/20000-puff-vapes"
)

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Starting GetSmoke warmup (${#PAGES[@]} pages)..."
SUCCESS=0
FAIL=0

for PAGE in "${PAGES[@]}"; do
  URL="${BASE}${PAGE}"
  TTFB=$(curl -s -o /dev/null -w "%{time_starttransfer}" --max-time 10 "$URL" 2>/dev/null)
  if [ -z "$TTFB" ] || [ "$TTFB" = "0.000000" ]; then
    echo "  ❌ FAIL - $PAGE"
    FAIL=$((FAIL+1))
  else
    echo "  ✅ ${TTFB}s - $PAGE"
    SUCCESS=$((SUCCESS+1))
  fi
done

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Done: ${SUCCESS} ok, ${FAIL} failed"
