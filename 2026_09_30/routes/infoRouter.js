const {Router} = require('express')
const path = require('path')

const infoRouter = Router()

infoRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', "views", "index.html"))
})

infoRouter.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '..', "views", "about.html"))
})

module.exports = infoRouter
