const { MongoClient, ObjectId } = require('mongodb');
const uri = 'mongodb+srv://breakforlife11_db_user:QquUd2ELnz3b7Rer@cluster0.if2afgb.mongodb.net/getsmoke?retryWrites=true&w=majority&appName=Cluster0&maxPoolSize=5';
MongoClient.connect(uri).then(async client => {
  const db = client.db('getsmoke');
  
  // Get other Fume products WITH flavorId to see the pattern
  const otherFume = await db.collection('Product').find({
    name: { $regex: 'Fume', $options: 'i' },
    isArchived: false,
    flavorId: { $exists: true, $ne: null }
  }).limit(10).toArray();
  
  console.log('Other Fume products with flavorId:');
  const flavorIds = [...new Set(otherFume.map(p => p.flavorId?.toString()).filter(Boolean))];
  const flavors = await db.collection('Flavor').find({ _id: { $in: flavorIds.map(id => new ObjectId(id)) } }).toArray();
  const flavorMap = Object.fromEntries(flavors.map(f => [f._id.toString(), f.name]));
  
  otherFume.forEach(p => {
    const flavorName = p.flavorId ? flavorMap[p.flavorId.toString()] : 'none';
    console.log(' ', p.name.substring(0, 60), '| flavor:', flavorName);
  });
  
  // Now get all 312 flavors to find exact matches
  const allFlavors = await db.collection('Flavor').find({}).toArray();
  
  const targets = ['Strawberry Watermelon', 'Mango', 'Lemon Mint', 'Lady Killer', 'Watermelon Bubble Gum', 'Peach Ice', 'Love', 'Strawberry Banana'];
  
  console.log('\n--- Flavor lookup (exact/partial):');
  for (const target of targets) {
    // Try exact match first
    const exact = allFlavors.find(f => f.name.toLowerCase() === target.toLowerCase());
    if (exact) { console.log(target, '-> EXACT:', exact._id, exact.name); continue; }
    
    // Partial: target contains flavor name or vice versa
    const words = target.toLowerCase().split(' ');
    const matches = allFlavors.filter(f => {
      const fn = f.name.toLowerCase();
      return words.every(w => fn.includes(w)) || fn.split(' ').every(w => target.toLowerCase().includes(w));
    });
    if (matches.length > 0) { console.log(target, '-> PARTIAL:', matches.map(f => f.name).join(', ')); continue; }
    
    // First word match
    const first = allFlavors.find(f => f.name.toLowerCase().includes(words[0]));
    console.log(target, '-> FIRST WORD:', first ? first.name : 'NOT FOUND');
  }
  
  await client.close();
});
