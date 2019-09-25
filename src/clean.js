require('dotenv').config()
const fs = require('fs')
const modelsPath = `./models`
const  removeExtensionFromFile  = file => {
  return file
    .split('.')
    .slice(0, -1)
    .join('.')
    .toString()
}
mongoose = require('mongoose'),
MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/react-express-jwt',
mongoose.set('useCreateIndex', true)
mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, (err) => {
	console.log(err || `Connected to MongoDB.`)
})

// Loop models path and loads every file as a model except index file
const models = fs.readdirSync(modelsPath).filter(file => {
  return removeExtensionFromFile(file) !== 'index'
})

const deleteModelFromDB = model => {
  return new Promise((resolve, reject) => {
    model = require(`./models/${model}`)
    model.deleteMany({}, (err, row) => {
      if (err) {
        reject(err)
      } else {
        resolve(row)
      }
    })
  })
}

const clean = async () => {
  try {
    const promiseArray = models.map(
      async model => await deleteModelFromDB(model)
    )
    await Promise.all(promiseArray)
    console.log('Cleanup complete!')
    process.exit(0)
  } catch (err) {
    console.log(err)
    process.exit(0)
  }
}

clean()
