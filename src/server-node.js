// const http = require('node:http')
// import http from 'node:http'
import { createServer } from 'node:http'

const host = 'localhost'
const port = 8000 

const users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@email.com'
  }, 
  {
    id: 2,
    name: 'Jane Doe',
    email: 'jane.doe@email.com'
  }
]

async function jsonMiddleware(req, res) {
  const buffers = []
  
  for await (const chunk of req) {
    buffers.push(chunk)
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch {
    req.body = null
  }

  res.setHeader('Content-type', 'application/json; charset=utf-8')
}

const server = createServer(async (req, res) => {
  await jsonMiddleware(req, res)

  if(req.url === '/' && req.method === 'GET') {
    res.writeHead(200).end('Welcome to my first Node.js API!')
    return
  }

  if(req.url === '/users') {
    if(req.method === 'GET') {
      res.writeHead(200).end(JSON.stringify(users))
    }

    if(req.method === 'POST') {
      const { name, email } = req.body

      const newUser = {
        id: users.length + 1,
        name,
        email
      }

      users.push(newUser)

      res.writeHead(201).end(JSON.stringify(newUser))
    }
    return
  }

  res.writeHead(404).end('Not Found!')
})

server.listen(port, host, () => {
  console.log(`🐙 Server running on http://${host}:${port}/`)
})