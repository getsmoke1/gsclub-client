const { MongoClient, ObjectId } = require('mongodb');
const uri = 'mongodb+srv://breakforlife11_db_user:QquUd2ELnz3b7Rer@cluster0.if2afgb.mongodb.net/getsmoke?retryWrites=true&w=majority&appName=Cluster0&maxPoolSize=5';
MongoClient.connect(uri).then(async client => {
  const db = client.db('getsmoke');
  
  // Final audit: VAPES products missing ProductPuffs
  const vapes = await db.collection('Product').find({ isArchived: false, productType: 'VAPES' }).toArray();
  const pp = await db.collection('ProductPuffs').find({}).toArray();
  const linkedIds = new Set(pp.map(p => p.productId.toString()));
  
  const missing = vapes.filter(p => !linkedIds.has(p._id.toString()));
  
  console.log('VAPES missing ProductPuffs:', missing.length);
  if (missing.length > 0) {
    missing.forEach(p => console.log(' ', p.name));
  }
  
  // Also check PODS missing ProductPuffs  
  const pods = await db.collection('Product').find({ isArchived: false, productType: 'PODS' }).toArray();
  const missingPods = pods.filter(p => !linkedIds.has(p._id.toString()));
  console.log('\nPODS missing ProductPuffs:', missingPods.length);
  missingPods.forEach(p => console.log(' ', p.name));
  
  // Check what 70000 puffs look like in filter API now
  // Simulate: get products with productType=VAPES and check what puffs appear
  const vapesWithPP = vapes.filter(p => linkedIds.has(p._id.toString()));
  const vapesIds = vapesWithPP.map(p => p._id.toString());
  const vapePP = pp.filter(p => vapesIds.includes(p.productId.toString()));
  const uniquePuffsIds = [...new Set(vapePP.map(p => p.puffsId.toString()))];
  const puffsOptions = await db.collection('Puffs').find({ _id: { $in: uniquePuffsIds.map(id => new ObjectId(id)) } }).toArray();
  const sorted = puffsOptions.sort((a,b) => parseInt(a.name) - parseInt(b.name));
  console.log('\nVAPES puffs filter options now:', sorted.map(p => p.name).join(', '));
  
  await client.close();
});
