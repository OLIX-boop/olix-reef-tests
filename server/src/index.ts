import express from 'express';
import DB from './database';

const app = express();
const port:number = 4000;

app.get('/', async (req, res) => {
    const result = await DB.sendQuery("SELECT * FROM results");
    res.send(result);
});

app.listen(port, () => console.log(`Server listening at http://localhost:${port} 🚀`));