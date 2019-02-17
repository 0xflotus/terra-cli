const https = require("https");

const yargs = require("yargs")
  .options({
    a: {
      alias: "amount",
      default: 1,
      describe: "The quantity to convert",
      type: "number",
      nargs: 1
    },
    f: {
      alias: "from",
      default: "EUR",
      describe: "The Source Currency",
      type: "string",
      nargs: 1
    },
    t: {
      alias: "to",
      default: "USD",
      describe: "The Target Currency",
      type: "string",
      nargs: 1
    }
  })
  .help("h")
  .alias("h", "help")
  .alias("V", "version")
  .usage("Usage: $0 -f GBP -t EUR -a 23")
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
