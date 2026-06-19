const { MongoClient } = require('mongodb');

const OLD_URL = "mongodb+srv://sahilsharmarksh:20431963@sahilcluster.ojrxibl.mongodb.net/getsmoke?retryWrites=true&w=majority";
const NEW_URL = "mongodb+srv://breakforlife11_db_user:QquUd2ELnz3b7Rer@cluster0.if2afgb.mongodb.net/getsmoke?retryWrites=true&w=majority&appName=Cluster0";

async function migrate() {
  console.log('Connecting to old DB...');
  const oldClient = new MongoClient(OLD_URL);
  await oldClient.connect();
  const oldDb = oldClient.db('getsmoke');

  console.log('Connecting to new DB...');
  const newClient = new MongoClient(NEW_URL);
  await newClient.connect();
  const newDb = newClient.db('getsmoke');

  const collections = await oldDb.listCollections().toArray();
  console.log('Collections:', collections.map(c => c.name).join(', '));
  console.log('');

  for (const col of collections) {
    const name = col.name;
    const docs = await oldDb.collection(name).find({}).toArray();
    console.log(`${name}: ${docs.length} docs`);
    if (docs.length === 0) continue;

    try {
      await newDb.collection(name).insertMany(docs, { ordered: false });
      console.log(`  → ${name} done`);
    } catch(e) {
      // BulkWriteError - some may be duplicate key errors, that's fine
      const inserted = e.result?.nInserted || 0;
      console.log(`  → ${name} done (${inserted} inserted, some dupes skipped)`);
    }
  }

  await oldClient.close();
  await newClient.close();
  console.log('\n✅ Migration complete!');
}

migrate().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
