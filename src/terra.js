const https = require("https");
const { getApiKey, handleError } = require("./utils");

const { defAmount, defFrom, defTo } = require("yargs")
  .pkgConf("terra")
  .parse();
const yargs = require("yargs")
  .options({
    a: {
      alias: "amount",
      default: defAmount,
      describe: "The quantity to convert",
      type: "number",
      nargs: 1
    },
    f: {
      alias: "from",
      default: defFrom,
      describe: "The Source Currency",
      type: "string",
      nargs: 1
    },
    t: {
      alias: "to",
      default: defTo,
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
  .parserConfiguration({
    yargs: {
      "short-option-groups": true,
      "camel-case-expansion": true,
      "dot-notation": true,
      "parse-numbers": true,
      "boolean-negation": true
    }
  })
  .command(
    "stat",
    "List API Statistics",
    () => {},
    argv => {
      const APIKEY = getApiKey();
      https.get(
        `https://forex.1forge.com/1.0.3/quota?api_key=${APIKEY}`,
        res => {
          res.on("data", d => {
            const data = JSON.parse(d);
            console.log(
              "There are %d API calls free in the next %d hours",
              data.quota_remaining,
              data.hours_until_reset
            );
            process.exit(0);
          });
        }
      );
    }
  )
  .parse();

const AMOUNT = yargs.amount;
const TO_CURRENCY = yargs.to;
const FROM_CURRENCY = yargs.from;

if (FROM_CURRENCY === TO_CURRENCY) {
  handleError("Please specify two different currencies\n");
}

https.get(
  `https://forex.1forge.com/1.0.3/convert?from=${FROM_CURRENCY}&to=${TO_CURRENCY}&quantity=${AMOUNT}&api_key=${getApiKey()}`,
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
