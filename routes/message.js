const express = require('express')

const router = express.Router();

router.post('/',(req, res, next) => {
    console.log('request body ', req.body)
    res.send(
      `<h1>You have submitted ur trash successfully, thanks</h1>
      <a href="/">Go Home Now</a>    
      `
    )
  })

  module.exports = router;