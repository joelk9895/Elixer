const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

// MongoDB URI
const uri = "mongodb+srv://joelk9895:qysguc-tuJpat-2woctu@opinio.qkbdnis.mongodb.net/?retryWrites=true&w=majority&appName=opinio";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}
connectDB();

// Route to fetch data from 'dispatch' collection
app.get('/admin', async (req, res) => {
    try {
        const database = client.db('elixer');
        const collection = database.collection('dispatch');
        const users = await collection.find({}).toArray();
        console.log(users);
        res.send(users);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Route to fetch data from 'consult' collection
app.get('/consult', async (req, res) => {
    try {
        const database = client.db('elixer');
        const collection = database.collection('consult');
        const users = await collection.find({}).toArray();
        console.log(users);
        res.send(users);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Route to fetch data from 'consult' collection based on _id
app.post('/details', async (req, res) => {
    const data = req.body.id;
    console.log(data);
    try {
        const database = client.db('elixer');
        const collection = database.collection('consult');
        const query = { _id: new ObjectId(data) };
        const user = await collection.findOne(query);
        console.log(user);
        res.send(user);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
