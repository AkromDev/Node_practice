const path = require('path')

const express = require('express')

const router = express.Router()
const rootDir = require('../utils/path');

router.get('/add-product',(req, res) => {
    res.sendFile(path.join(rootDir,'views','add-product.html'))
  })
  router.post('/add-product', (req,res) => {
      console.log('req ', req.body.product)
      res.redirect('/')
  })
module.exports = router;