const express = require('express')
const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')
const { PrismaClient } = require('@prisma/client')

const myenv = dotenv.config({ path: '.env' })
dotenvExpand.expand(myenv)

const router = express.Router()
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
    const categories = await prisma.category.findMany()
    console.log(categories)
    res.status(200).json(categories)
})

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id)

    const category = await prisma.category.findFirst({
        where: { id: id }
    })
    console.log(category)
    if (category) {
        res.status(200).json(category)
    } else {
        res.sendStatus(404)
    }
})

module.exports = router
