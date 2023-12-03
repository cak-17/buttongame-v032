const warningLabel = {
    color: '33',
    state: '0',
    content: 'WARN',
}

const errorLabel = {
    color: '31',
    state: '0',
    content: 'ERROR'
}

const debugLabel = {
    color: '35',
    state: '0',
    content: 'DEBUG'
}

const infoLabel = {
    color: '34',
    state: '0',
    content: 'INFO'
}

const levels = {
    DEBUG: 3,
    INFO: 2,
    WARN: 1,
    ERROR: 0,
}

const config = {
    level: levels.INFO
}

class LogLabel {
    #fLabel
    #getASCII
    #label

    constructor(label) {
        this.#label = label
        this.#fLabel = `⇢ [${this.#label.content}]`
        this.#getASCII = `${this.#label.state};${this.#label.color}`

    }

    colored = () => {
        const COLRESET = '\x1b[0m'
        return `\x1b[${this.#getASCII}m${this.label()}${COLRESET}`
    }

    label = () => {
        return this.#fLabel.padStart(10,' ')
    }
}
const labels = {
    INFO: new LogLabel(infoLabel),
    WARN: new LogLabel(warningLabel),
    DEBUG: new LogLabel(debugLabel),
    ERROR: new LogLabel(errorLabel),
}

class Logger {
    #level

    constructor(level) {
        this.#level = level | config.level
    }

    setLevel = (lvl) => {
        if (lvl >= -1) {
            this.#level = lvl;
            this.debug(`Log Level Changed to ${lvl}`)
        }
        else
            this.error('Wrong Level value.', lvl)
    }

    debugFn = (fn, log) => {
        const msg = `${fn.name}() /\n\t${log}`
        this.#level >= levels.DEBUG && console.log(labels.DEBUG.colored(), msg)
    }
    debug = (...msg) => {
        this.#level >= levels.DEBUG && console.log(labels.DEBUG.colored(), ...msg)
    }
    info = (...msg) => {
        this.#level >= levels.INFO && console.log(labels.INFO.label().padStart(7), ...msg)
    }
    warn = (...msg) => {
        this.#level >= levels.WARN && console.warn(labels.WARN.colored(), ...msg)
    }
    error = (...msg) => {
        this.#level >= levels.ERROR && console.error(labels.ERROR.colored(), ...msg)
    }
    apiCall = (method, ...msg) => {
        this.#level >= levels.INFO && console.log(`[${method}]`.padStart(10, "."), ...msg)
    }
    pause = () => {
        return this.#level = -1
    }
}

const logger = new Logger();

module.exports = {
    logger: logger,
    levels: levels
}

