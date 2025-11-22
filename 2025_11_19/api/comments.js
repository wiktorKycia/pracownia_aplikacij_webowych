const express = require('express')
const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')
const { PrismaClient } = require('@prisma/client')

const myenv = dotenv.config({ path: '.env' })
dotenvExpand.expand(myenv)

const router = express.Router()
const prisma = new PrismaClient()

module.exports = router
