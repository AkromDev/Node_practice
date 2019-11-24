const express = require('express')

const router = express.Router()

router.get(('/'),(req, res) => {
    res.send(
      `<h2>Sup my dude ? <h/2>
      <br/>
      <a href="/admin/add-product">Add Product</a>
    `)
  })
module.exports = router;