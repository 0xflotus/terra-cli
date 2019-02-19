require("yargs")
  .options(require("./conf").options)
  .help("h", "Show usage information")
  .version("V", "Show version", require("../package.json").version)
  .detectLocale(false)
  .locale("en")
  .fail(function(msg, err, { showHelp }) {
    showHelp();
    process.exit(-1);
  })
  .group(["from", "to", "a"], "Conversion:")
  .wrap(require("yargs").terminalWidth())
  .alias("V", "version")
  .usage("Usage: $0 -f [from] -t [to] -a [amount]")
  .example("$0 -f USD -t EUR -a 24")
  .example("$0 -t JPY")
  .epilog("Published under MIT LICENSE by 0xflotus 2019")
  .parserConfiguration(require("./conf").parserConfig)
  .command(require("./cmd/stat"))
  .command(require("./cmd/list"))
  .command(require("./cmd/default"))
  .parse();
