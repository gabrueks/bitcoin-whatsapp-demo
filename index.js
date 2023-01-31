import express from "express";
import bodyParser from "body-parser";
import Twilio from "twilio";
import fetch from 'node-fetch';

async function precoBitcoin() {
    const URL = "https://api.binance.com/api/v3/avgPrice?symbol=BTCBRL"
    const response = await fetch(URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        
        },
      });
    const parsedJson = await response.json();
    return parsedJson.price;
}

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Olá mundo!");
});

app.post("/mensagem", async (req, res) => {
    if (req.body && req.body.Body === "cotação") {
        const twiml = new Twilio.twiml.MessagingResponse();
        const cotacao = await precoBitcoin();

        twiml.message(`O preço do bitcoin é R$ ${cotacao}`);
        res.writeHead(200, {'Content-Type': 'text/xml'});
        return res.end(twiml.toString());
    }
    res.status(200).end();
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});


