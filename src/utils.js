function handleError(message) {
  console.log(message);
  require("yargs").showHelp();
  process.exit(-1);
}

function getApiKey() {
  if (process.env["API_KEY"]) {
    return process.env["API_KEY"];
  }
  try {
    const explorer = require("cosmiconfig")("terra-cli");
    const loaded = explorer.loadSync(`${require("os").homedir}/.terrarc`)
      .config;
    return loaded.api_key;
  } catch (e) {
    handleError("Please specify an api_key in ~/.terrarc\n");
  }
}

module.exports = { handleError, getApiKey };
