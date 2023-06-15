import express from 'express'

import rounds from './routes/rounds'
import golfers from './routes/golfers'
import courses from './routes/courses'

const server = express()

server.use(express.json())

server.use('/api/v1/rounds', rounds)
server.use('/api/v1/golfers', golfers)
server.use('/api/v1/courses', courses)

if (process.env.NODE_ENV === 'production') {
  server.use('/assets', express.static('/app/dist/assets'))
  server.get('*', (req, res) => {
    res.sendFile('/app/dist/index.html')
  })
}

export default server
