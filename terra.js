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
  .usage("Usage: $0 -f [from] -t [to] -a [amount]")
  .example("$0 -f USD -t EUR -a 24")
  .example("$0 -t JPY")
  .epilog("Published under MIT LICENSE by 0xflotus 2019")
  .parse();

const AMOUNT = yargs.amount;
const TO_CURRENCY = yargs.to;
const FROM_CURRENCY = yargs.from;

function handleError(message) {
  console.log(message);
  require("yargs").showHelp();
  process.exit(-1);
}

if (FROM_CURRENCY === TO_CURRENCY) {
  handleError("Please specify two different currencies\n");
}

try {
  const explorer = require("cosmiconfig")("terra-cli");
  const loaded = explorer.loadSync(`${require("os").homedir}/.terrarc`).config;
  var APIKEY = loaded.api_key;
} catch (e) {
  handleError("Please specify an api_key in ~/.terrarc\n");
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
