const { PrismaClient } = require('@prisma/client');

const OLD_URL = "mongodb+srv://sahilsharmarksh:20431963@sahilcluster.ojrxibl.mongodb.net/getsmoke?retryWrites=true&w=majority";
const NEW_URL = "mongodb+srv://breakforlife11_db_user:QquUd2ELnz3b7Rer@cluster0.if2afgb.mongodb.net/getsmoke?retryWrites=true&w=majority&appName=Cluster0";

const oldPrisma = new PrismaClient({ datasources: { db: { url: OLD_URL } } });
const newPrisma = new PrismaClient({ datasources: { db: { url: NEW_URL } } });

async function migrateCollection(name, fetchFn, createFn) {
  const data = await fetchFn();
  console.log(`${name}: ${data.length} records`);
  if (data.length === 0) return;
  try {
    const result = await createFn(data);
    console.log(`  → ${name} done`);
    return result;
  } catch(e) {
    console.log(`  → ${name} error: ${e.message.slice(0, 100)}`);
  }
}

async function migrate() {
  console.log('Connecting...');
  await oldPrisma.$connect();
  await newPrisma.$connect();
  console.log('Connected!\n');

  // Brands first (products depend on them)
  await migrateCollection('Brands', 
    () => oldPrisma.brand.findMany(),
    (data) => newPrisma.brand.createMany({ data, skipDuplicates: true })
  );

  // Flavors
  await migrateCollection('Flavors',
    () => oldPrisma.flavor.findMany(),
    (data) => newPrisma.flavor.createMany({ data, skipDuplicates: true })
  );

  // Nicotines
  await migrateCollection('Nicotines',
    () => oldPrisma.nicotine.findMany(),
    (data) => newPrisma.nicotine.createMany({ data, skipDuplicates: true })
  );

  // Products (in batches of 100)
  const products = await oldPrisma.product.findMany();
  console.log(`Products: ${products.length}`);
  for (let i = 0; i < products.length; i += 100) {
    const batch = products.slice(i, i + 100);
    try {
      await newPrisma.product.createMany({ data: batch, skipDuplicates: true });
    } catch(e) { console.log(`  batch ${i} error: ${e.message.slice(0, 80)}`); }
    console.log(`  Products ${Math.min(i + 100, products.length)}/${products.length}`);
  }

  // Images
  await migrateCollection('Images',
    () => oldPrisma.image.findMany(),
    (data) => newPrisma.image.createMany({ data, skipDuplicates: true })
  );

  // ProductPuffs
  try {
    await migrateCollection('ProductPuffs',
      () => oldPrisma.productPuffs.findMany(),
      (data) => newPrisma.productPuffs.createMany({ data, skipDuplicates: true })
    );
  } catch(e) { console.log('ProductPuffs: skip'); }

  // ProductFlavors
  try {
    await migrateCollection('ProductFlavors',
      () => oldPrisma.productFlavors.findMany(),
      (data) => newPrisma.productFlavors.createMany({ data, skipDuplicates: true })
    );
  } catch(e) { console.log('ProductFlavors: skip'); }

  // Blog articles (in batches)
  const blogs = await oldPrisma.blogArticle.findMany();
  console.log(`BlogArticles: ${blogs.length}`);
  for (let i = 0; i < blogs.length; i += 50) {
    const batch = blogs.slice(i, i + 50);
    try {
      await newPrisma.blogArticle.createMany({ data: batch, skipDuplicates: true });
    } catch(e) { console.log(`  blog batch ${i} error: ${e.message.slice(0, 80)}`); }
    console.log(`  Blogs ${Math.min(i + 50, blogs.length)}/${blogs.length}`);
  }

  // FAQs
  try {
    await migrateCollection('FAQs',
      () => oldPrisma.faq.findMany(),
      (data) => newPrisma.faq.createMany({ data, skipDuplicates: true })
    );
  } catch(e) { console.log('FAQs: skip -', e.message.slice(0,50)); }

  // WP Pages
  try {
    await migrateCollection('WpPages',
      () => oldPrisma.wpPage.findMany(),
      (data) => newPrisma.wpPage.createMany({ data, skipDuplicates: true })
    );
  } catch(e) { console.log('WpPages: skip -', e.message.slice(0,50)); }

  // Users
  try {
    await migrateCollection('Users',
      () => oldPrisma.user.findMany(),
      (data) => newPrisma.user.createMany({ data, skipDuplicates: true })
    );
  } catch(e) { console.log('Users: skip -', e.message.slice(0,50)); }

  await oldPrisma.$disconnect();
  await newPrisma.$disconnect();
  console.log('\n✅ Migration complete!');
}

migrate().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
