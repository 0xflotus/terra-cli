const https = require("https");

const AMOUNT = parseInt(process.argv.slice(2)[1]) || 1;
const CURRENCY = process.argv.slice(2)[0];

try {
  const explorer = require("cosmiconfig")("terra-cli");
  const loaded = explorer.loadSync(`${require("os").homedir}/.terrarc`).config;
  var APIKEY = loaded.api_key;
} catch (e) {
  console.log("Please specify an api_key in ~/.terrarc");
  process.exit(-1);
}

if ("EUR" === CURRENCY) {
  console.log("Please do not use EUR");
  process.exit(-1);
}

https.get(
  `https://forex.1forge.com/1.0.3/convert?from=EUR&to=${CURRENCY}&quantity=${AMOUNT}&api_key=${APIKEY}`,
  res => {
    res.on("data", d => {
      console.log("%d EUR -> %d %s", AMOUNT, JSON.parse(d).value, CURRENCY);
    });
  }
);
