const express = require('express')

const router = express.Router()

router.get('/add-product',(req, res) => {
    res.send(
      `<form action="/admin/add-product" method="POST">
        <label for="product">Add Product</label>
        <input name="product"/>
        <button type="submit">Add</button>
      </form>
    `)
  })
  router.post('/add-product', (req,res) => {
      console.log('req ', req.body.product)
      res.redirect('/')
  })
module.exports = router;