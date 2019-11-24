const express = require('express')

const router = express.Router()

router.get('/',(req, res, next) => {
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

module.exports = router