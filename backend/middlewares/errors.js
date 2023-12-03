const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
}

const notFoundMiddleware = (req, res, next) => {
    res.status(404).send("Sorry can't find that!")
}

module.exports = {
    notFoundMiddleware,
    errorMiddleware,
};