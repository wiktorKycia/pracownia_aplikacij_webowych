const express = require('express')
const dotenv = require('dotenv')
dotenv.config({ path: './.env' })

const host = process.env.APP_HOST
const port = process.env.APP_PORT

const app = express()

app.listen(3000, () => {
    console.log(`App is running on http://${host}:${port}`)
})
