const fetch = require('node-fetch');

async function precoBitcoin() {
    const URL = "https://blockchain.info/ticker"
    const response = await fetch(URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
       
        },
      });
    const parsedJson = await response.json();

    return parsedJson.BRL.buy;
 } 

exports.handler = function(_context, event, callback) {
    if (event && event.Body === "cotação") {
        const twiml = new Twilio.twiml.MessagingResponse();
        precoBitcoin()
            .then((cotacao) => {
                twiml.message(`O preço do bitcoin é R$ ${cotacao}`);
                callback(null, twiml);
            });
    }
  };