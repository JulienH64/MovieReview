import { MongoClient } from 'mongodb';
import { ServerApiVersion } from 'mongodb';
import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import readline from 'readline';

dotenv.config();

const uri = `mongodb+srv://${process.env.MUSERNAME}:${process.env.MPASSWORD}@cluster0.ctmtwrk.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const app = express();

app.use(express.json());
app.use(express.static(process.cwd()));

app.get('/search/:term', async (req, res) => {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${req.params.term}`);
    const data = await response.json();
    res.json(data.results);
});

app.post('/submitReview', async (req, res) => {
    const review = req.body;
    const result = await client.db("reviewsDB").collection("reviews").insertOne(review);
    res.json(result);
});

app.get('/reviews/:title', async (req, res) => {
    const title = req.params.title;
    const reviews = await client.db("reviewsDB").collection("reviews").find({ movieTitle: title }).toArray();
    res.json(reviews);
});

let server;

async function run(port) {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        server = app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
            rl.setPrompt("Type 'exit' to stop the server\n");
            rl.prompt();
        });
    } finally {
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (input) => {
    if (input === 'exit') {
        server.close();
        console.log('Server stopped');
        process.exit(0);
    }
});

const port = process.argv[2] || 3000;
run(port).catch(console.dir);
