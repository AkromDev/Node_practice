const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('5f2e8bddb8bff94df6fab0d4')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    'mongodb+srv://akrom:akrom@cluster0.3sj7k.mongodb.net/shop?retryWrites=true&w=majority',
    { 
      useNewUrlParser: true,
      useUnifiedTopology: true 
    }
  )
  .then(result => {
    User.findOne().then(user => {
      console.log('user',user)
      if (!user) {
        const user = new User({
          name: 'Akrom',
          email: 'akrom@test.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    app.listen(4000);
  })
  .catch(err => {
    console.log(err);
  });
