import express from "express"
import createError from "http-errors"
import { PrismaClient } from "@prisma/client"

import TrackerEventValidator from "../validators/TrackerEventValidator.js"

const prisma = new PrismaClient()

const router = express.Router()

router.post('/', async(req, res, next) => {
  let eventBody
  try {
    eventBody = TrackerEventValidator.passthrough().parse(req.body)
  } catch(error) {
    return res.status(400).json({ errors: error.issues })
  }

  let event
  try {
    event = await prisma.trackerEvent.create({
      data: {
        ...eventBody,
        user: {
          connect: {
            id: eventBody.user
          }
        }
      }
    })
  } catch(error) {
    return next(createError(500, 'Tracker event could not be created'))
  }

  res.json(event)
})

router.get('/', async(req, res, next) => {
  const events = await prisma.trackerEvent.findMany({
    include: {
      user: true
    },
    take: 100
  })

  res.json(events)
})

export default router