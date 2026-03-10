import express from 'express'
import { MongoClient } from 'mongodb'

const dbName = "school";
const url ="mongodb://localhost:27017";


const client = new MongoClient(url)

async function dbconnect(){

 await client.connect()
 const db = client.db(dbName);
 const collection = db.collection('students')
 const result = await collection.find().toArray()
 console.log(result)
}

dbconnect()
const app = express();
app.listen(3500);