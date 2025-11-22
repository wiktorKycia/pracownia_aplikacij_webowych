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

function add0(a) {
    if (a < 10) {
        return `0${a}`
    } else {
        return a
    }
}

app.use(express.json())
app.use((req, res, next) => {
    console.log('======================================')
    let date = new Date()
    console.log(
        `START ${add0(date.getDate())}.${add0(date.getMonth())}.${date.getFullYear()} ${add0(date.getHours())}:${add0(date.getMinutes())}:${add0(date.getSeconds())} \t [${req.method}] ${req.originalUrl}`
    )
    res.on('finish', () => {
        let date = new Date()
        console.log(
            `END   ${add0(date.getDate())}.${add0(date.getMonth())}.${date.getFullYear()} ${add0(date.getHours())}:${add0(date.getMinutes())}:${add0(date.getSeconds())} \t [${req.method}] ${req.originalUrl} -> ${res.statusCode}`
        )
    })
    next()
})

app.use((err, req, res, next) => {
    if (err) {
        console.error(err)
        res.status(500).end()
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
