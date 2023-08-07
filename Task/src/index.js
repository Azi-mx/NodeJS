const {MongoClient} = require('mongodb');
const url = "mongodb://127.0.0.1:27017/";
const database = "e-comm";

const client = new MongoClient(url);

const getData = async () =>{

  const result = await client.connect();
  const db = client.db(database);
  const collection = db.collection("products");
  const response = await collection.find({}).toArray();
  console.log(response);

}

getData();
  