const express = require('express')
const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')
const { PrismaClient, Prisma } = require('@prisma/client')

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
    if (Number.isNaN(id)) {
        return res.sendStatus(400)
    }

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

router.post('/', async (req, res, next) => {
    const category = req.body

    console.log(req.body)

    try {
        const created = await prisma.category.create({
            data: {
                name: category.name
            },
            include: { posts: true }
        })

        if (created) {
            res.status(201).json(created)
        } else {
            res.json({ message: 'could not create the resource' }).end(500)
        }
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            err.message = 'Database error'
            err.status = 400
        }
        next(err)
    }
})

module.exports = router
