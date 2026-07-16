import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

function toTitleCase(str) {
  return str.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
}

function extractFlavor(name) {
  if (/^Al Fakher Tobacco \d+g/i.test(name)) {
    return name.replace(/^Al Fakher Tobacco \d+g\s*[-\s]*/i, '').trim();
  }
  if (/^HQD Shisha/i.test(name)) {
    const match = name.match(/- (.+)$/);
    return match ? match[1].trim() : null;
  }
  if (/^Fumytech Hookah Air/i.test(name)) {
    const match = name.match(/- (.+)$/);
    return match ? match[1].trim() : null;
  }
  return null;
}

async function main() {
  const products = await prisma.product.findMany({
    where: { productType: 'HOOKAH', isArchived: false },
    select: { id: true, name: true, flavorId: true }
  });

  const noFlavor = products.filter(p => !p.flavorId);
  console.log(`Processing ${noFlavor.length} unlinked hookah products...`);

  let created = 0, linked = 0, skipped = 0;

  for (const product of noFlavor) {
    const raw = extractFlavor(product.name);
    if (!raw) { skipped++; continue; }

    const normalized = toTitleCase(raw);

    let flavor = await prisma.flavor.findFirst({
      where: { name: { equals: normalized, mode: 'insensitive' } }
    });
    if (!flavor) {
      flavor = await prisma.flavor.create({ data: { name: normalized } });
      created++;
    }

    await prisma.product.update({
      where: { id: product.id },
      data: { flavorId: flavor.id }
    });
    linked++;
    process.stdout.write('.');
  }

  console.log(`\nDone! Created: ${created} new flavors, Linked: ${linked} products, Skipped: ${skipped}`);
  await prisma.$disconnect();
}

main().catch(e => { console.error(e.message); process.exit(1); });
