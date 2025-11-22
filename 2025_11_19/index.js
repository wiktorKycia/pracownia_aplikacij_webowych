const express = require('express')
const postsRouter = require('./api/posts')
const categoriesRouter = require('./api/categories')
const commentsRouter = require('./api/comments')
const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')

const myenv = dotenv.config({ path: '.env' })
dotenvExpand.expand(myenv)

const host = process.env.APP_HOST
const port = process.env.APP_PORT

const app = express()

app.use(express.json())
app.use((req, res, next) => {
    let date = new Date()
    console.log(
        `START ${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} \t [${req.method}] ${req.url}`
    )
    res.on('finish', function () {
        let date = new Date()
        console.log(
            `END ${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} \t [${req.method}] ${req.url} -> ${req.statusCode}`
        )
    })
    next()
})

app.use((err, req, res, next) => {
    if (err) {
        console.error(err)
        res.end(500)
    } else {
        next()
    }
})

app.use('/api/v1/posts', postsRouter)
app.use('/api/v1/categories', categoriesRouter)
app.use('/api/v1/comments', commentsRouter)

app.get('/', (req, res) => {
    res.status(200).json({ content: 'to jest strona główna' })
})

app.all('*', async (req, res) => {
    res.sendStatus(404)
})

app.listen(port, () => {
    console.log(`App is running on http://${host}:${port}`)
})
