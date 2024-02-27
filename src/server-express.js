import express from "express"

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

const server = express()

server.use(express.json())

server.get('/', (req, res) => {
  res.status(200).json('Welcome to my first Node.js API!')
})

server.get('/users', (req, res) => {
  res.status(200).json(users)
})

server.post('/users', (req, res) => {
  const { name, email } = req.body

  const newUser = {
    id: users.length + 1,
    name,
    email
  }

  users.push(newUser)

  res.status(201).json(newUser)
})

server.use((req, res) => {
  res.status(404).send('Not Found!')
})

server.listen(port, () => {
  console.log(`🐙 Server running on http://${host}:${port}`)
})
