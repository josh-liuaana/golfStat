import express from 'express'

import rounds from './routes/rounds'

const server = express()

server.use(express.json())

server.use('/api/v1/rounds', rounds)

if (process.env.NODE_ENV === 'production') {
  server.use('/assets', express.static('/app/dist/assets'))
  server.get('*', (req, res) => {
    res.sendFile('/app/dist/index.html')
  })
}

export default server