import express from 'express';
import DB from './database';
import cors from 'cors';

const app = express();
    app.use( cors() );
    app.use( express.json() );

const port:number = 1080;

app.get('/', async (req, res) => {
    const result = await DB.fetchData();
    console.log("GET REQUEST RECIVED - "+ new Date().toJSON());
    res.send(result);
});

app.post('/newtest', async (req, res) => {
    const {test} = req.body;

    console.log(test)
    res.send("SEi proprio un coglione: "+test)
});


app.listen(port, () => console.log(`Server listening at http://localhost:${port} 🚀`));