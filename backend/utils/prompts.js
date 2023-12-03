const readline = require('readline')
const { DEFAULTS } = require('../settings/index')

const info = (host, port) => {
    console.log()
    formatCli(` \x1b[1;37mHost:  \x1b[0;34mhttp://${host}:${port}\x1b[0m`)
    formatCli(' \x1b[1;37mState:  \x1b[5;32mRUNNING\x1b[0m')
};

const help = () => {
    console.log()
    formatHelp('u', 'to show the server url.')
    formatHelp('q', 'or \x1b[1;37m[ctrl+c]\x1b[0;30m to quit.')
}

const formatHelp = (key, msg) => {
    console.log('⇢'.padStart(3) + ` \x1b[0;30mpress \x1b[1;37m[${key}] \x1b[0;30m${msg}\x1b[0m`)
}

const formatCli = (msg) => {
    console.log('⇢'.padStart(3) + msg)
}

const promptStart = () => {
    console.log(`\n=== ${DEFAULTS.APP_NAME} ===\n`);
}

const promptListen = (server) => {

    const host = server.address().address;
    const port = server.address().port;

    info(host, port);
    console.log('⇢'.padStart(3) + ` \x1b[0;30mpress \x1b[1;37m[h]\x1b[0;30m to show help\x1b[0m\n`)

    readline.emitKeypressEvents(process.stdin);
    process.stdin.on('keypress', (ch, key) => {
        if (key.name == 'q' || key.sequence === '\x03') {
            server.close(() => {formatCli(' \x1b[1;37mState:  \x1b[5;31mSTOPPED\x1b[0m')});
            process.stdin.pause();
            formatCli(' \x1b[1;37mState:  \x1b[5;33mTERMINATING\x1b[0m')
        }
        if (ch === 'u') {
            info(host, port);
        }
        if (ch === 'h') {
            help();
        }
    });
    process.stdin.setRawMode(true);

}

module.exports = {
    promptStart,
    promptListen,
    formatCli
}
