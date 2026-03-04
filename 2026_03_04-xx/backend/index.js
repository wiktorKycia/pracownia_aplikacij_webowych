const express = require('express')
const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')

const myenv = dotenv.config({ path: '.env' })
dotenvExpand.expand(myenv)

const host = process.env.HOST
const port = process.env.PORT

app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({ content: 'strona główna' })
})

app.all('*', (req, res) => {
    res.sendStatus(404)
})

app.listen(port, ()=>{
    console.log(`http://${host}:${port}`);
})