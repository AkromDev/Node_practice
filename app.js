const http = require("http")
const express = require("express")
const bodyParser = require('body-parser')
const aboutRoute = require('./routes/about')
const formRoute = require('./routes/form')
const messageRoute = require('./routes/message')
const homeRoute = require('./routes')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/about', aboutRoute)
app.use('/form', formRoute)
app.use('/message', messageRoute)
app.use(homeRoute)
app.use((req,res) => {
  res.send('<h2>Page not found, dude</h2>')
})
const server = http.createServer(app)
const PORT = 4000;
server.listen(PORT, () => console.log(`Started server at port ${PORT}`))