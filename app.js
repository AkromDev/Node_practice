const http = require("http")
const express = require("express")
const bodyParser = require('body-parser')
const shopRoute = require('./routes/shop')
const adminRoute = require('./routes/admin')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/admin', adminRoute)
app.use(shopRoute)
app.use((req,res) => {
  res.send('<h2>Page not found, dude</h2>')
})
const server = http.createServer(app)
const PORT = 4000;
server.listen(PORT, () => console.log(`Started server at port ${PORT}`))