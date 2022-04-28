const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
require('dotenv').config()
const objectId = require('mongodb').ObjectId;
const app = express();
const port = process.env.PORT || 5000;


//middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gt16r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const database = client.db("laptopecomerce-1");
        // const usersCollection = database.collection("users");
        const productsCollection = database.collection("products")    
        // const result = await usersCollection.insertOne(user)
        // console.log(result);

        // Get Api
        app.get('/products', async(req, res)=>{
            const cursor = productsCollection.find({});
           const product = await cursor.toArray();
           res.send(product);
        })
        app.get('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: objectId(id) };
            const singleProduct = await productsCollection.findOne(query);
            res.json(singleProduct);
      
          })

    } finally {
        // await client.close();
    }
}
run().catch(console.dir);





app.get('/', (req, res) => {
    res.send('laptop ecomerce server is running ohh okk ');
})

app.listen(port, () => {
    console.log('server is running at port', port);
})