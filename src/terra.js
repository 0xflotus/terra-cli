const { getApiKey, handleError } = require("./utils");
const { parserConfig, options } = require("./conf");

const yargs = require("yargs")
  .options(options)
  .help("h")
  .alias("V", "version")
  .usage("Usage: $0 -f [from] -t [to] -a [amount]")
  .example("$0 -f USD -t EUR -a 24")
  .example("$0 -t JPY")
  .epilog("Published under MIT LICENSE by 0xflotus 2019")
  .parserConfiguration(parserConfig)
  .command(require("./stat"))
  .parse();

const AMOUNT = yargs.amount;
const TO_CURRENCY = yargs.to;
const FROM_CURRENCY = yargs.from;

if (FROM_CURRENCY === TO_CURRENCY) {
  handleError("Please specify two different currencies\n");
}

require("https").get(
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
