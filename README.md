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

| ISO-4217 |       Currency       |
| -------: | :------------------: |
|      AUD |  Australian Dollar   |
|      BCH |     Bitcoin Cash     |
|      BTC |       Bitcoin        |
|      CAD |   Canadian Dollar    |
|      CHF |     Swiss franc      |
|      CNH |   Chinese Renminbi   |
|      DKK |     Danish Krone     |
|      DSH |       Dashcoin       |
|      EUR |         Euro         |
|      GBP |    Pound Sterling    |
|      HKD |   Hong Kong Dollar   |
|      JPY |     Japanese Yen     |
|      LTC |       Litecoin       |
|      MXN |     Mexican Peso     |
|      NOK |   Norwegian Krone    |
|      NZD |  New Zealand Dollar  |
|      PLN |     Polish złoty     |
|      RUB |    Russian Ruble     |
|      SEK |    Swedish Krona     |
|      SGD |   Singapore Dollar   |
|      TRY |     Turkish Lira     |
|      USD |      US Dollar       |
|      XAG | Troy ounce of silver |
|      XAU |  Troy ounce of gold  |
|      XRP |        Ripple        |
|      ZAR |  South African Rand  |

### Debug

For debugging information use `terra -v`
