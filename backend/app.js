const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const { run } = require('node:test');
const uri = "mongodb+srv://joelk9895:qysguc-tuJpat-2woctu@opinio.qkbdnis.mongodb.net/?retryWrites=true&w=majority&appName=opinio";
const client = new MongoClient(uri);

app.get('/admin', (req, res) => {
    async function run() {
        try {
        await client.connect();
        const database = client.db('elixer');
        const collection = database.collection('dispatch');
        const user = await collection.find({}).toArray();
        console.log(user);
        res.send(user);
        } finally {
        await client.close();
        }
    }
    run().catch(console.dir);
});

app.get('/consult', (req, res) => { 
    async function run() {
        try {
        await client.connect();
        const database = client.db('elixer');
        const collection = database.collection('consult');
        const user = await collection.find({}).toArray();
        console.log(user);
        res.send(user);
        } finally {
        await client.close();
        }
    }
    run().catch(console.dir);
});

app.listen(8080 , () => {
  console.log('Server is running on port 8080');

});