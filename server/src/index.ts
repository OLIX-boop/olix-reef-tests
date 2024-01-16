import express from 'express';
import cors from 'cors';
import DB from './database';

const app = express().use(cors());
const port:number = 4000;

app.get('/', async (req, res) => {
    const result = await DB.fetchData();
    res.send(result);
});

app.listen(port, () => console.log(`Server listening at http://localhost:${port} 🚀`));