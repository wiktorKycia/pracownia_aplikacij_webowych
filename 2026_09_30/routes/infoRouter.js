const {Router} = require('express')

const infoRouter = Router()

infoRouter.get('/', (req, res) => {
    res.status = 200
    res.sendFile(path.join(__dirname, "views", "index.html"))
})

infoRouter.get('/about', (req, res) => {
    // views/about.html
})

module.exports = infoRouter
