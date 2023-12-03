const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const App = require('./app')
const { DEFAULTS } = require('./settings/index')
const {logger, levels} = require('./utils/logger');
const { promptStart } = require('./utils/prompts')


yargs(hideBin(process.argv))
    .command('runserver', 'Start Backend', (yargs) => {
        if (yargs.argv.verbose >= 3 ) {
            logger.setLevel(levels.DEBUG)
        } else if (yargs.argv.verbose === 2) {
            logger.setLevel(levels.INFO)
        } else if (yargs.argv.verbose === 1) {
            logger.setLevel(levels.WARN)
        }
        return yargs

            .usage('Usage: $0 runserver [-hpdv]')
            .example('$0 runserver', 'Starts API Server')
            .example('$0 runserver -p 5454', 'Starts API on custom port: 5454')
            .example('$0 runserver -p 5454 -d', 'Starts API in Development mode')
            .options('dev', {
                alias: 'd',
                description: 'Runs API on dev server'
            })
            .options('input', {
                alias: 'I',
                description: 'Disables User input for Docker'
            })
        }, (argv) => {
            if (argv.port) {
                App.setPort(argv.port)
            }
            if (argv.host) {
                App.setHost(argv.host)
            }
            if (argv.dev) {
                logger.debug('API Server set in Development mode')
                App.setDevEnv();
            }
            if (argv.verbose) logger.debug(`Running Server on :${argv.port}`)
            logger.debug('API Server set in Production mode')
            promptStart()
            App.runServer(argv.input)
    })
    .count("verbose")
    .option('verbose', {
        alias: 'v',
        description: 'Run with verbose logging'
    })
    .options('port', {
        alias: 'p',
        description: 'Select Custom Port (default 8000)'
    })
    .options('host',
    {
        alias: 'h',
        description: 'Select Custom Host (default 0.0.0.0)'
    })
    .argv
