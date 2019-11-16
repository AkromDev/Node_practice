const http = require("http")
const express = require("express")

const app = express()
app.use('/about', (req, res, next) => {
  console.log('You will be directed to home page')
  next()
})
app.use('/', (req, res) => {
  res.send('<h2>Sup my dude ? <h/2>')
})

const server = http.createServer(app)
const PORT = 4000;
server.listen(PORT, () => console.log(`Started server at port ${PORT}`))