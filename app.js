import express from 'express'

import * as dotenv from 'dotenv'
dotenv.config()

import v1 from './versions/v1.js'

const app = express()

app.use(express.json());

app.use('/v1', v1)

app.use((err, req, res, next) => {
  res.status(err.status).json({ error: err.message })
})

const port = 3000

app.listen(port)