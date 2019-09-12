[![Build Status](https://travis-ci.org/0xflotus/terra-cli.svg?branch=master)](https://travis-ci.org/0xflotus/terra-cli)

# terra-cli

An exchange rate tool for the command line using the [Exchange Rate API of the European Bank][1] API.

_Terra_ is the name of a possible world currency. See [Wikipedia][2]

### Install

`npm i -g terra-cli` or `yarn global add terra-cli` or download the [latest][3] binary.

### Examples

`terra --from USD --to EUR --amount 34`  
`terra -f USD -t GBP -a 99`  
`terra`  
`terra -f GBP -a 4`  

### Usage

See `terra -h`

### List of currently supported currencies

See `terra -l`

[1]: https://exchangeratesapi.io/
[2]: <https://en.wikipedia.org/wiki/Terra_(currency)>
[3]: https://github.com/0xflotus/terra-cli/releases/latest
