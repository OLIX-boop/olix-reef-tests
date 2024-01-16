import express from 'express';
import DB from './database';
import cors from 'cors';

const app = express().use(cors());
const port:number = 1080;

app.get('/', async (req, res) => {
    const result = await DB.fetchData();
    console.log("GET REQUEST RECIVED - "+ new Date().toJSON());
    res.send(result);
});

app.listen(port, () => console.log(`Server listening at http://localhost:${port} 🚀`));