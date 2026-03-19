import express from 'express'
import { MongoClient,ObjectId } from 'mongodb'

const dbName = "school";
const url ="mongodb://localhost:27017";

const client = new MongoClient(url)
const app = express();
app.use(express.urlencoded({extended:true})) 
app.set('view engine','ejs')


client.connect().then((connection)=>{

    const db= connection.db(dbName);



app.get("/",async (req,resp)=>{
 const collection = db.collection('students')
 const result = await collection.find().toArray()
 console.log(result)

resp.render("student",{result})

})


 app.get('/add',(req,resp)=>{
   resp.render('addstudent')

  })



  app.post('/create-student', async (req,resp)=>{
   const collection = db.collection('students')
   const result = await collection.insertOne(req.body)
   console.log(result)

  resp.send("Data Save !")

  })





app.get("/delete/:id", async (req, resp) => {
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




app.get('/edit/:id',async (req,resp)=>{
  const collection = db.collection('students');
  const result = await collection.findOne({_id: new ObjectId(req.params.id)})
  resp.render('updatestudent',{result})

})


app.post("/update/:id",(req,resp)=>{
  const collection = db.collection('students');
  const filter = {_id: new ObjectId(req.params.id)}
  const update ={$set:req.body}
  const result  = collection.updateOne(filter,update)
  if(result){
  resp.send("Data Update !")
  }else{
  resp.send("Data not update !")
  }
resp.send('update');
})



})


app.listen(3500);