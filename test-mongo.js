const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://breakforlife11_db_user:QquUd2ELnz3b7Rer@cluster0.if2afgb.mongodb.net/getsmoke?retryWrites=true&w=majority&appName=Cluster0&maxPoolSize=5';
const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
client.connect()
  .then(() => client.db('getsmoke').collection('Product').countDocuments())
  .then(count => { console.log('OK, products:', count); client.close(); })
  .catch(e => { console.log('ERROR:', e.message); process.exit(1); });
