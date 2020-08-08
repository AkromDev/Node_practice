const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

let _db

const mongoConnect = callback => {
  MongoClient.connect(
    'mongodb+srv://akrom:akrom@cluster0.3sj7k.mongodb.net/shop?retryWrites=true&w=majority',
    { useUnifiedTopology: true }
  )
    .then(client => {
      console.log('Connected!')
      _db = client.db()
      callback()
    })
    .catch(err => {
      console.log(err)
      throw err
    })
}

const getDb = () => {
  if (_db) {
    return _db
  }
  // eslint-disable-next-line no-throw-literal
  throw 'No database found!'
}

exports.mongoConnect = mongoConnect
exports.getDb = getDb
