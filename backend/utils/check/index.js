const testColors = () => {
    for (const color in COLORS) {
        if (COLORS.hasOwnProperty.call(COLORS, color)) {
            if (color === 'reset') {
                continue;
            }
            const fmt = {
                color: COLORS[color],
                style: 1,
            }
            console.log(colorString(`Test ${color}`, fmt))

        }
    }
}