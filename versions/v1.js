import express from "express"
import trackerEvents from '../routes/trackerEvents.js'
import users from '../routes/users.js'

const router = express.Router()

router.use('/trackerevents', trackerEvents)
router.use('/users', users)

export default router