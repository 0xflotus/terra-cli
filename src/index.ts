import * as yargs from 'yargs';
import * as cosmiconfig from 'cosmiconfig';
import axios from 'axios';

(async function () {
    const explorer = cosmiconfig.cosmiconfig('terra');
    const { config } = await explorer.search();
    const supportedCurrencies: string[] = config.currencies;

    const argv = yargs
        .usage('Usage: $0 -f [from] -t [to] -a [amount] -l')
        .default({ f: 'EUR', t: 'USD', a: 1 })
        .boolean('l')
        .nargs({ f: 1, t: 1, a: 1, l: 0 })
        .help('h')
        .alias({ f: 'from', t: 'to', a: 'amount', h: 'help', l: 'list' })
        .describe({ f: 'Start Währung', t: 'Ziel Währung', a: 'Anzahl der Einheiten', l: 'Liste alle verfügbaren Währungen auf' })
        .parse()

    if (argv.l) {
        supportedCurrencies.forEach((currency: string) => console.log(currency));
        process.exit(0);
    }

    if (!(supportedCurrencies.includes(argv.f) && supportedCurrencies.includes(argv.t))) {
        console.log("You provided an unsupported currency.");
        process.exit(403);
    }

    const { data: { rates } } = await axios.get(`${config.baseUrl}?base=${argv.f}&symbols=${argv.t}`);
    console.log(`${argv.a} ${argv.f} -> ${(argv.a * rates[argv.t]).toFixed(2)} ${argv.t}`);
})()
