const { handleError } = require("../utils");

exports.command = ["$0", "one"];

exports.describe = "use 1forge.com API";

exports.builder = _yargs => {};

exports.handler = argv => {
  if (argv.verbose) {
    handleError(argv, false);
  }

  const AMOUNT = argv.amount;
  const TO_CURRENCY = argv.to.toUpperCase();
  const FROM_CURRENCY = argv.from.toUpperCase();

  if (FROM_CURRENCY === TO_CURRENCY) {
    handleError("Please specify two different currencies\n");
  }

  if (
    [FROM_CURRENCY, TO_CURRENCY].some(
      currency => !Object.keys(require("../conf").currencies).includes(currency)
    )
  ) {
    handleError("You use an unsupported ISO 4217 Code\n");
  }

  require("https").get(
    `https://forex.1forge.com/1.0.3/convert?from=${FROM_CURRENCY}&to=${TO_CURRENCY}&quantity=${AMOUNT}&api_key=${require("../utils").getApiKey()}`,
    res => {
      res
        .on("data", d => {
          try {
            console.log(
              "%d %s -> %d %s",
              ...[
                AMOUNT,
                FROM_CURRENCY,
                JSON.parse(d).value.toFixed(2),
                TO_CURRENCY
              ]
            );
          } catch (_err) {
            handleError("An error occurred after parsing the response\n");
          }
        })
        .on("error", _err => {
          handleError("An error occurred while fetching data", false);
        });
    }
  );
};
