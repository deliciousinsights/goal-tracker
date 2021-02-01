import apiServer from './features/api.mjs'
import bodyParser from 'body-parser'
import chalk from 'chalk-template'
import cors from 'cors'
import { createServer } from 'http'
import express from 'express'
import logger from 'morgan'

const app = express()
const server = createServer(app)

app.use(cors())
app.use(bodyParser.json())
app.use(logger('dev'))

app.use('/api/v1', apiServer)

server.listen(process.env.PORT || 3001, () => {
  console.log(
    chalk`{green 👍  API server listening on} {cyan.underline http://localhost:${
      server.address().port
    }}`,
    '\n'
  )
})
