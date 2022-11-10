const express = require('express');
const cors = require('cors');
// const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// middle wares
app.use(cors());
app.use(express.json());




const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.t90v0gz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log(uri);

async function run(){
    // onlineTrainer.traningService
    try{
        const traingSeviceCollection =client.db("onlineTrainer").collection("traningService")
        app.get('/services', async (req, res) => {
            const query = {}
            const cursor = traingSeviceCollection.find(query).limit(3);
            const services = await cursor.toArray();
            res.send(services);
        });

        app.get('/serviceall', async (req, res) => {
            const query = {}
            const cursor = traingSeviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });
        // app.get('/services/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = {_id: ObjectId(id) };
        //     const service = await traingSeviceCollection.findOne(query);
        //     res.send(service);
        // });

        app.get("/service/:id",async(req,res)=>{
            const id=req.params.id;
            const query={_id:ObjectId(id)};
            const service = await traingSeviceCollection.findOne(query);
            res.send(service);


        })

    }
    finally{

    }

}
run().catch(error=>console.error(erro))

app.get("/",(req,res)=>{
    res.send("Online Trainer Service Is Running")
})
app.listen(port,()=>{
    console.log(`Online Trainer Service running is on${port}`)
})