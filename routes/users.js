import express from "express"
import createError from "http-errors"
import { PrismaClient } from "@prisma/client"

import UserValidator from "../validators/UserValidator.js"

const prisma = new PrismaClient()

const router = express.Router()

router.post('/', async(req, res, next) => {
  let userBody
  try {
    userBody = UserValidator.parse(req.body)
  } catch(error) {
    return res.status(400).json({ errors: error.issues })
  }

  let user
  try {
    user = await prisma.user.create({
      data: {
        ...userBody
      }
    })
  } catch(error) {
    next(createError(500, 'User event could not be created'))
  }

  res.json(user)
})

export default router