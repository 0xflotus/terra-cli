exports.command = "$0";

exports.builder = () => {};

exports.handler = argv => {
  const AMOUNT = argv.amount;
  const TO_CURRENCY = argv.to.toUpperCase();
  const FROM_CURRENCY = argv.from.toUpperCase();

  if (FROM_CURRENCY === TO_CURRENCY) {
    require("../utils").handleError(
      "Please specify two different currencies\n"
    );
  }

  if (
    [FROM_CURRENCY, TO_CURRENCY].some(
      currency => !Object.keys(require("../conf").currencies).includes(currency)
    )
  ) {
    require("../utils").handleError("You use an unsupported ISO 4217 Code\n");
  }

  require("https").get(
    `https://forex.1forge.com/1.0.3/convert?from=${FROM_CURRENCY}&to=${TO_CURRENCY}&quantity=${AMOUNT}&api_key=${require("../utils").getApiKey()}`,
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
};
