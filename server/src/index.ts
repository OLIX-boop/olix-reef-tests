import express from 'express';
import DB from './database';
import cors from 'cors';
import colors from 'colors';

interface Tests {
    KH: string,
    CA: string,
    MG: string,
    NO2: string,
    NO3: string,
    PO4: string
};

const app = express();
    app.use( cors() );
    app.use( express.json() );

const port:number = 1080;

const filterTests = (data:Tests):object => {
    var newElement = data;
    if (typeof data.KH === "string") newElement.KH=data.KH.replace(',', '.');
    if (typeof data.CA === "string") newElement.CA=data.CA.replace(',', '.');
    if (typeof data.MG === "string") newElement.MG=data.MG.replace(',', '.');
    if (typeof data.NO2 === "string") newElement.NO2=data.NO2.replace(',', '.');
    if (typeof data.NO3 === "string") newElement.NO3=data.NO3.replace(',', '.');
    if (typeof data.PO4 === "string") newElement.PO4=data.PO4.replace(',', '.');
    return newElement;
}

app.get('/', async (req, res) => {
    const result = await DB.fetchData();
    console.log(`${colors.blue(req.ip)} ${colors.green("[GET]")} REQUEST RECIVED - ${new Date().toJSON()}`);
    res.send(result);
});

app.post('/newtest', async (req, res) => {
    const body = filterTests(req.body);
    const result = await DB.insertNewTest(body);
    console.log(`${colors.blue(req.ip)} ${colors.cyan("[POST]")} REQUEST - INSERTED NEW DATA - ${new Date().toJSON()}`);
    res.send(result);
});


app.listen(port, () => {
    console.log("--------------------------------------------")
    console.log(`Server ${colors.red('listening')} at http://localhost:${colors.green(port+"")} 🚀`)
    console.log("--------------------------------------------")
});