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
app.use('/', homeRoute)

const server = http.createServer(app)
const PORT = 3000;
server.listen(PORT, () => console.log(`Started server at port ${PORT}`))