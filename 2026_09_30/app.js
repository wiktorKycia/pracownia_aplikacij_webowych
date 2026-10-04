const express = require('express')
const booksRouter = require('./routes/booksRouter')
const infoRouter = require('./routes/infoRouter')

const port = 4000
const host = '127.0.0.1'

const app = express()

app.use('/', booksRouter)
app.use('/', infoRouter)

app.listen(port, host, () => {
    console.log(`Server is listening on http://${host}:${port}`);
})