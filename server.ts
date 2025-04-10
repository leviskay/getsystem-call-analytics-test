import http from 'http'
import fs from 'fs'
import { IncomingMessage, ServerResponse } from 'http'
import path from 'path'

const PORT = 3500
const FILE_PATH = 'events.jsonl'

const server = http.createServer(async (req: IncomingMessage, res: ServerResponse) => {
  if (req.method === 'POST' && req.url === '/event') {
    let body = ''
    req.on('data', chunk => {
      body += chunk
    })
    req.on('end', () => {
      try {
        const data = JSON.parse(body)
        fs.appendFileSync(FILE_PATH, JSON.stringify(data) + '\n')
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ status: 'ok' }))
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: 'Invalid JSON' }))
      }
    })
  } else if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ status: 'running' }))
  } else if (req.method === 'GET' && req.url === '/events') {
    const filePath = path.resolve(FILE_PATH)
    if (fs.existsSync(filePath)) {
      const fileStream = fs.createReadStream(filePath)
      res.writeHead(200, { 'Content-Type': 'application/octet-stream' })
      fileStream.pipe(res)
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: 'File not found' }))
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Not found' }))
  }
})

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
