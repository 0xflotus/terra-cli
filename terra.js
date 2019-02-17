const https = require("https");

const yargs = require("yargs")
  .option("amount", {
    alias: "a",
    default: 1,
    describe: "The quantity to convert"
  })
  .option("from", {
    alias: "f",
    default: "EUR",
    describe: "The Source Currency"
  })
  .option("to", { alias: "t", default: "USD", describe: "The Target Currency" })
  .parse();

const AMOUNT = yargs.amount || yargs._[1];
const TO_CURRENCY = yargs.to || yargs._[0];
const FROM_CURRENCY = yargs.from;

try {
  const explorer = require("cosmiconfig")("terra-cli");
  const loaded = explorer.loadSync(`${require("os").homedir}/.terrarc`).config;
  var APIKEY = loaded.api_key;
} catch (e) {
  console.log("Please specify an api_key in ~/.terrarc");
  process.exit(-1);
}

https.get(
  `https://forex.1forge.com/1.0.3/convert?from=${FROM_CURRENCY}&to=${TO_CURRENCY}&quantity=${AMOUNT}&api_key=${APIKEY}`,
  res => {
    res.on("data", d => {
      console.log(
        "%d %s -> %d %s",
        AMOUNT,
        FROM_CURRENCY,
        JSON.parse(d).value.toFixed(2),
        TO_CURRENCY
      );
    });
  }
);
