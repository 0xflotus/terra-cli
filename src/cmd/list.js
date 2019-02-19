exports.command = ["list", "ls"];

exports.describe = "List supported ISO 4217 Codes";

exports.builder = ({ argv: { currencies } }) => {
  Object.keys(currencies).forEach((code, index) =>
    console.log("%d. \t%s - %s", index + 1, code, currencies[code])
  );
};

exports.handler = _ => {};
