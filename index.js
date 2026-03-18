import express from 'express'
import { MongoClient,ObjectId } from 'mongodb'

const dbName = "school";
const url ="mongodb://localhost:27017";

const client = new MongoClient(url)
const app = express();
app.set('view engine','ejs')

app.get("/",async (req,resp)=>{
 await client.connect()
 const db = client.db(dbName);
 const collection = db.collection('students')
 const result = await collection.find().toArray()
 console.log(result)

resp.render("student",{result})

})

app.get("/delete/:id", async (req, resp) => {
  await client.connect();

  const db = client.db(dbName);
  const collection = db.collection('students');

  const result = await collection.deleteOne({
    _id: new ObjectId(req.params.id)
  });

  if (result.deletedCount > 0) {
    resp.send("Delete Success");
  } else {
    resp.send("Delete Unsuccess");
  }
});



app.listen(3500);