const parserConfig = {
  yargs: {
    "short-option-groups": true,
    "camel-case-expansion": true,
    "dot-notation": true,
    "parse-numbers": true,
    "boolean-negation": true
  }
};

const { defAmount, defFrom, defTo, currencies } = require("yargs")
  .pkgConf("terra")
  .parse();
const options = {
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
};

module.exports = { parserConfig, options, currencies };
