const express = require('express')
const { PrismaClient } = require('@prisma/client')

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({ content: 'to jest strona główna' })
})

app.listen(3000, () => {
    console.log('App is running on http://localhost:3000')
})
