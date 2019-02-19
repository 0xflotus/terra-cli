exports.command = ["stat", "st"];

exports.describe = "List API Statistics";

exports.builder = _yargs => {};

exports.handler = _argv => {
  require("https").get(
    `https://forex.1forge.com/1.0.3/quota?api_key=${require("../utils").getApiKey()}`,
    res => {
      res
        .on("data", d => {
          const data = JSON.parse(d);
          console.log(
            "There are %d API calls free in the next %d hours",
            data.quota_remaining,
            data.hours_until_reset
          );
        })
        .on("end", () => {
          process.exit(0);
        })
        .on("error", _err => {
          console.log(_err);
        });
    }
  );
};
