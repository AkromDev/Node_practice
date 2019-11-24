const express = require('express')

const router = express.Router()

router.get('/',(req, res, next) => {
    res.send(
      `<h2>Sup homie in about ? </h2>
      <a href="/">Go home</a>
      `)
  })

module.exports = router;
