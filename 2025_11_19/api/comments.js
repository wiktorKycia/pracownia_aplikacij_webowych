const express = require('express')
require('dotenv').config({ path: '/.env' })
const { PrismaClient } = require('@prisma/client')

const router = express.Router()
const prisma = new PrismaClient()

module.exports = router
