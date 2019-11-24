const http = require("http")
const express = require("express")
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/about', (req, res, next) => {
  res.send(
    `<h2>Sup homie in about ? </h2>
    <a href="/">Go home</a>
    `)
})
app.get('/form', (req, res, next) => {
  res.send(
    `<form action="/message" method="POST">
        <label for="message">Message</label>
        <input type="text" name="message">
        <button type="submit">Send</button>
    </form>
    <a href="/">Back Home</a>    
    `
  )
})
app.post('/message', (req, res, next) => {
  console.log('request body ', req.body)
  res.send(
    `<h1>You have submitted ur trash successfully, thanks</h1>
    <a href="/">Go Home Now</a>    
    `
  )
})
app.use('/', (req, res) => {
  res.send(
    `<h2>Sup my dude ? <h/2>
    <a href="/form">Submit ur trash</a>
  `)
})

const server = http.createServer(app)
const PORT = 3000;
server.listen(PORT, () => console.log(`Started server at port ${PORT}`))