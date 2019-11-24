const express = require('express')

const router = express.Router()

router.get(('/'),(req, res) => {
    res.send(
      `<h2>Sup my dude ? <h/2>
      <br/>
      <a href="/form">Submit ur trash</a>
      <br/>
      <a href="/about">About page</a>
    `)
  })
module.exports = router;