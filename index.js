
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors')
const jwt = require('jsonwebtoken');
require('dotenv').config()
app.use(cors())
app.use(express.json())
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


// user:task-manager
// password: QVCDFzcYuRzdtCsr
const uri = `mongodb+srv://task-manager:QVCDFzcYuRzdtCsr@cluster0.ei8vvcb.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const userCollection = client.db('task-manager').collection('users');
        const taskCollection = client.db('task-manager').collection('mytask');
        const completedTashCollection = client.db('task-manager').collection('completed-task')
        app.post('/users', async (req, res) => {
            const users = req.body;
            const result = await userCollection.insertOne(users);
            res.send(result)
        })
        app.post('/mytask', async (req, res) => {
            const task = req.body;
            const result = await taskCollection.insertOne(task)
            res.send(result)
        })
        app.get('/mytask/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const result = await taskCollection.find(query).toArray();
            res.send(result)
        })
        app.delete('/mytask/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const result = await taskCollection.deleteOne(filter);
            res.send(result)
        })
        app.post('/completedtask', async (req, res) => {
            const completed = req.body;
            const result = await completedTashCollection.insertOne(completed)
            res.send(result)
        })
        app.get('/completedtask/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            const result = await completedTashCollection.find(query).toArray()
            res.send(result)
        })
        app.delete('/completedtask/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: id };
            const result = await completedTashCollection.deleteOne(filter);
            res.send(result)
        })

    }
    finally {

    }
}
run().catch(error => console.error(error))


app.get('/', (req, res) => {
    res.send('Server is running')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
