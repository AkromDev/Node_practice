const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const errorController = require('./controllers/error')
const sequelize = require('./util/database')
const User = require('./models/user')
const Product = require('./models/product')
const app = express()
app.set('view engine', 'ejs')
app.set('views', 'views')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')

const PORT = 4000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      console.log('user ', user)
      req.body.user = user
      next()
    })
    .catch((err) => {
      console.log(err)
    })
})
app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use(errorController.get404)

User.hasMany(Product, { constraints: true, onDelete: 'CASCADE' })
User.hasOne(Cart)
Cart.belongsTo(User)
Cart.belongsToMany(Product, { through: CartItem })
Product.belongsToMany(Cart, { through: CartItem })

sequelize
  // .sync({ force: true }) // drops previos tables thus should be used like this in prod
  .sync()
  .then((result) => {
    // console.log(result);
    return User.findByPk(1)
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: 'Akrom', email: 'test@test.com' })
    }
    return user
  })
  .then((user) => {
    console.log('user ', user)
    app.listen(PORT, () => {
      console.log(`Server is listening to Port ${PORT}`)
    })
  })
  .catch()
  .catch()
  .catch((err) => {
    console.log(err)
  })
