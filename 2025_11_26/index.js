const express = require('express')
const postsRouter = require('./api/posts')
const categoriesRouter = require('./api/categories')
const commentsRouter = require('./api/comments')
const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')
const { MongoClient } = require('mongodb')

const myenv = dotenv.config({ path: '.env' })
dotenvExpand.expand(myenv)

const mongoUrl = process.env.MONGO_URL

const host = process.env.APP_HOST
const port = process.env.APP_PORT

const app = express()

const mongoClient = new MongoClient(mongoUrl)

function add0(a) {
    if (a < 10) {
        return `0${a}`
    } else {
        return a
    }
}

const initMongo = async () => {
    try {
        const conn = await mongoClient.connect()
        console.log('Connected to mongo')
        const dbo = await conn.db('mydb')
        try {
            await dbo.createCollection('accessLogs')
        } catch (e) {
            console.error(e)
        }
        await conn.close()
    } catch (e) {
        console.error(e)
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

app.use(async (req, res, next) => {
    try {
        const conn = await mongoClient.connect()

        const dbo = await conn.db('mydb')
        try {
            const myObj = {
                method: req.method,
                url: req.originalUrl,
                headers: req.headers,
                body: req.body,
                timestamp: new Date()
            }
            await dbo.collection('accessLogs').insertOne(myObj)
            console.log('1 document created')
        } catch (e) {
            console.error(e)
            res.sendStatus(500).end()
        }
        await conn.close()
        next()
    } catch (e) {
        console.error(e)
        res.sendStatus(500)
    }
})

app.use('/api/v1/posts', postsRouter)
app.use('/api/v1/categories', categoriesRouter)
app.use('/api/v1/comments', commentsRouter)

app.use(async (err, req, res, next) => {
    if (err) {
        console.error(err)
        res.sendStatus(err.status || 500)
    } else {
        next()
    }
})

app.get('/', (req, res) => {
    res.status(200).json({ content: 'to jest strona główna' })
})

app.get('/get-mongo-logs', async (req, res, next) => {
    try {
        const conn = await mongoClient.connect()
        const dbo = await conn.db('mydb')

        try {
            const result = await dbo.collection('accessLogs').find({}).toArray()
            res.json(result)
            res.status(200)
        } catch (e) {
            next(e)
        } finally {
            await conn.close()
        }
    } catch (e) {
        next(e)
    }
})

app.all('*', async (req, res) => {
    res.sendStatus(404)
})
;(async () => {
    await initMongo()
    app.listen(port, () => {
        console.log(`App is running on http://${host}:${port}`)
    })
})().catch((err) => {
    console.error('Failed to initialize Mongo: ', err)
    process.exit(1)
})
