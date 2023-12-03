const { logger } = require('./logger')

const COLORS = {
    reset: '\x1b[0m',
    primary: 33, // lightblue
    secondary: 197, // purple
    success: 34, // bright green
    debug: 171, // light purple
    info: 255, // light purple
    warning: 220, // yellow
    error: 196, // red
}

const STYLES = {
    bold: 1,
    weak: 2,
    ital: 3,
    under: 4,
    lblink: 5,
    fblink: 6,
    invert: 7,
    hide: 8,
    strike: 9
}

const colorString = (str, fmt) => {
    const { style, color } = fmt
    let ansi = `${color}`
    if (style || style != 0) {
        ansi += `;${style}`
    }

    logger.debugFn(
        fn=colorString,
        log=`ANSI: ${ansi}`
    )

    return `\x1b[38;5;${ansi}m${str}${COLORS.reset}`
}
