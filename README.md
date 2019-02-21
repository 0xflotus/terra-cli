[![Build Status](https://travis-ci.org/0xflotus/terra-cli.svg?branch=master)](https://travis-ci.org/0xflotus/terra-cli)

# terra-cli

An exchange rate tool for the command line using the [1forge.com](https://1forge.com) API.

_Terra_ is the name of a possible world currency. See [Wikipedia](<https://en.wikipedia.org/wiki/Terra_(currency)>)

### Install

`npm i -g terra-cli` or `yarn global add terra-cli` or download the [latest](https://github.com/0xflotus/terra-cli/releases/latest) binary.

### Examples

`terra --from USD --to EUR --amount 34`  
`terra -f USD -t GBP -a 99`  
`terra`  
`terra -f GBP -a 4`  
`terra -f btc`

### Usage

See `terra -h`

### List of currently supported currencies

See `cat package.json | jq .terra.currencies`

| ISO-4217 | Currency             |
| -------: | -------------------- |
|      EUR | Euro                 |
|      USD | US Dollar            |
|      GBP | Pound Sterling       |
|      JPY | Japanese Yen         |
|      CHF | Swiss franc          |
|      AUD | Australian Dollar    |
|      CAD | Canadian Dollar      |
|      NZD | New Zealand Dollar   |
|      SEK | Swedish Krona        |
|      NOK | Norwegian Krone      |
|      MXN | Mexican Peso         |
|      TRY | Turkish Lira         |
|      ZAR | South African Rand   |
|      CNH | Chinese Renminbi     |
|      XAU | Troy ounce of gold   |
|      XAG | Troy ounce of silver |
|      SGD | Singapore Dollar     |
|      RUB | Russian Ruble        |
|      HKD | Hong Kong Dollar     |
|      DKK | Danish Krone         |
|      PLN | Polish złoty         |
|      BTC | Bitcoin              |
|      LTC | Litecoin             |
|      XRP | Ripple               |
|      DSH | Dashcoin             |
|      BCH | Bitcoin Cash         |

### Debug

For debugging information use `terra -v`
