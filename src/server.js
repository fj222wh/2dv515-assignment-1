import express from 'express'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import router from './routes/index.js'

const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))

app.set('trust proxy', 1)
app.use((req, res, next) => {
    res.set('X-Served-By', process.env.HOSTNAME ?? 'local')
    next()
})

app.use(express.json())
app.use(express.static(join(__dirname, '..', 'public')))
app.use(router)

const PORT = process.env.PORT ?? 3000
const server = app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`)
})

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use`)
    process.exit(1)
  }
  throw err
})

function shutdown(signal) {
  console.log(`Received ${signal}, shutting down`)
  setTimeout(() => {
    console.warn('Forced exit after timeout')
    process.exit(1)
  }, 5000).unref()
  server.close(async () => {
    process.exit(0)
  })
}

process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT', () => shutdown('SIGINT'))