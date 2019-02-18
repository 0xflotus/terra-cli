exports.command = ["list", "ls"];

exports.describe = "List supported ISO 4217 Codes";

exports.builder = () => {};

exports.handler = _ => {
  const { currencies } = require("../conf");
  Object.keys(currencies).forEach((code, index) =>
    console.log("%d. \t%s - %s", index + 1, code, currencies[code])
  );
};
