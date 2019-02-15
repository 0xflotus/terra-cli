const https = require("https");

const AMOUNT = parseInt(process.argv.slice(2)[1]) || 1;
const CURRENCY = process.argv.slice(2)[0];

try {
  var APIKEY = require("./api.json").api_key;
} catch (e) {
  console.log("Please specify an api_key in api.json");
  process.exit();
}

https.get(
  `https://forex.1forge.com/1.0.3/quotes?pairs=EUR${CURRENCY}&api_key=${APIKEY}`,
  res => {
    res.on("data", d => {
      console.log(
        "%d EUR -> %d %s",
        AMOUNT,
        (JSON.parse(d)[0].bid * AMOUNT).toFixed(2),
        CURRENCY
      );
    });
  }
);
