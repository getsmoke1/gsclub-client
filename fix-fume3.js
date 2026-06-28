const { MongoClient, ObjectId } = require('mongodb');
const uri = 'mongodb+srv://breakforlife11_db_user:QquUd2ELnz3b7Rer@cluster0.if2afgb.mongodb.net/getsmoke?retryWrites=true&w=majority&appName=Cluster0&maxPoolSize=5';
MongoClient.connect(uri).then(async client => {
  const db = client.db('getsmoke');
  
  const puffs20k_id = new ObjectId('6a273f6d18246c47491c5493'); // 20000
  
  // Flavor IDs from lookup
  const flavorMap = {
    'Strawberry Watermelon': new ObjectId('6a2740299dde15843c7b9fe4'),
    'Mango': new ObjectId('6a273f7e18246c47491c54ae'),
    'Lemon Mint': new ObjectId('6a27424a9dde15843c7ba243'),
    'Peach Ice': new ObjectId('6a27403f9dde15843c7ba000'),
    'Strawberry Banana': new ObjectId('6a273f5218246c47491c5467'),
  };
  
  // Get Watermelon Bubblegum ID
  const wbg = await db.collection('Flavor').findOne({ name: 'Watermelon Bubblegum' });
  if (wbg) flavorMap['Watermelon Bubble Gum'] = wbg._id;
  console.log('Watermelon Bubblegum:', wbg?._id?.toString() || 'NOT FOUND');
  
  // Get the 8 Fume Hookah products
  const fumeProducts = await db.collection('Product').find({
    name: { $regex: 'Fume Hookah 2%', $options: 'i' },
    isArchived: false,
    productType: 'VAPES'
  }).toArray();
  
  console.log('\nFixing', fumeProducts.length, 'Fume Hookah products...');
  
  const now = new Date();
  let ppInserted = 0, flavorUpdated = 0;
  
  for (const product of fumeProducts) {
    // 1. Add ProductPuffs entry
    const existingPP = await db.collection('ProductPuffs').findOne({ productId: product._id });
    if (!existingPP) {
      await db.collection('ProductPuffs').insertOne({
        _id: new ObjectId(),
        productId: product._id,
        puffsId: puffs20k_id,
        puffDesc: '20000',
        createdAt: now,
        updatedAt: now
      });
      ppInserted++;
      console.log('  PP added:', product.name.substring(0, 50));
    } else {
      console.log('  PP exists:', product.name.substring(0, 50));
    }
    
    // 2. Update flavorId if we have a match
    const match = product.name.match(/Fume Hookah 2% Nic 20000 Puffs\s*-?\s*(.*)/i);
    const flavorName = match ? match[1].trim() : null;
    if (flavorName && flavorMap[flavorName] && !product.flavorId) {
      await db.collection('Product').updateOne(
        { _id: product._id },
        { $set: { flavorId: flavorMap[flavorName], updatedAt: now } }
      );
      flavorUpdated++;
      console.log('  Flavor updated:', flavorName, '->', flavorMap[flavorName].toString());
    } else if (flavorName && !flavorMap[flavorName]) {
      console.log('  Flavor not found for:', flavorName);
    }
  }
  
  // 3. Fix Cool Mint - Foger Bit (35000 puffs)
  const fogerBit = await db.collection('Product').findOne({ name: 'Cool Mint - Foger Bit', isArchived: false });
  if (fogerBit) {
    const puffs35k = await db.collection('Puffs').findOne({ name: '35000' });
    const existingPP = await db.collection('ProductPuffs').findOne({ productId: fogerBit._id });
    if (!existingPP && puffs35k) {
      await db.collection('ProductPuffs').insertOne({
        _id: new ObjectId(),
        productId: fogerBit._id,
        puffsId: puffs35k._id,
        puffDesc: '35000',
        createdAt: now,
        updatedAt: now
      });
      console.log('\nForger Bit Cool Mint PP added (35000)');
    }
    
    // Check flavor for Cool Mint
    const mintFlavor = await db.collection('Flavor').findOne({ name: { $regex: 'mint', $options: 'i' } });
    if (!fogerBit.flavorId && mintFlavor) {
      await db.collection('Product').updateOne(
        { _id: fogerBit._id },
        { $set: { flavorId: mintFlavor._id, updatedAt: now } }
      );
      console.log('Foger Bit flavor set to:', mintFlavor.name);
    }
  }
  
  console.log('\n=== DONE ===');
  console.log('ProductPuffs inserted:', ppInserted);
  console.log('Flavor IDs updated:', flavorUpdated);
  
  await client.close();
});
