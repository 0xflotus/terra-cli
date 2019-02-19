const { showHelp, exit } = require("yargs");

function handleError(message, help = true) {
  console.log(message);
  if (help) {
    showHelp();
  }
  exit(-1);
}

function getApiKey() {
  if ("API_KEY" in process.env) {
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
