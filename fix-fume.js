const { MongoClient, ObjectId } = require('mongodb');
const uri = 'mongodb+srv://breakforlife11_db_user:QquUd2ELnz3b7Rer@cluster0.if2afgb.mongodb.net/getsmoke?retryWrites=true&w=majority&appName=Cluster0&maxPoolSize=5';
MongoClient.connect(uri).then(async client => {
  const db = client.db('getsmoke');
  
  // Get the 8 Fume Hookah products
  const fumeProducts = await db.collection('Product').find({
    name: { $regex: 'Fume Hookah 2%', $options: 'i' },
    isArchived: false,
    productType: 'VAPES'
  }).toArray();
  
  console.log('Fume Hookah products:');
  fumeProducts.forEach(p => console.log(' ', p._id.toString(), '|', p.name, '| flavorId:', p.flavorId));
  
  // Extract flavor names from product names
  const flavorsMap = fumeProducts.map(p => {
    const match = p.name.match(/Fume Hookah 2% Nic 20000 Puffs\s*-?\s*(.*)/i);
    return { product: p, flavorName: match ? match[1].trim() : null };
  });
  
  console.log('\nExtracted flavor names:');
  flavorsMap.forEach(f => console.log(f.flavorName));
  
  // Check which flavors exist in DB
  const allFlavors = await db.collection('Flavor').find({}).toArray();
  console.log('\nTotal flavors in DB:', allFlavors.length);
  
  for (const { product, flavorName } of flavorsMap) {
    if (!flavorName) continue;
    const flavor = allFlavors.find(f => f.name.toLowerCase().includes(flavorName.toLowerCase()) || flavorName.toLowerCase().includes(f.name.toLowerCase()));
    console.log(flavorName, '->', flavor ? 'FOUND: ' + flavor._id + ' (' + flavor.name + ')' : 'NOT FOUND');
  }
  
  await client.close();
});
