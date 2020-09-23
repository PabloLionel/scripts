const { MONGO_URI } = require('../config');
const {MongoClient} = require('mongodb');
const uri = MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
var connection
async function connectDB() {
  if (connection) return connection
  try {
    connection = (await client.connect()).db('demo');
    return connection
  } catch (err) {
    console.log('Cloud not connect to db ', err);
    process.exit(1);
  }
}

module.exports = connectDB;
