const mongoose  = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery', false)

const uri = process.env.MONGODB_URI
if (!uri || uri === 'undefined') {
  console.error('MONGODB_URI is not a valid string.')
  process.exit(1)
}

console.log("connecting to", uri)
mongoose.connect(uri, { family : 4})
    .then( () => {
        console.log("connected to mongoDB.")
    })
    .catch(err => {
        console.log("error while connecting to mongodb:", err.message)
    })

const phoneNumberSchema = new mongoose.Schema({
    name: String,
    number: String
})

phoneNumberSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('phoneNumber', phoneNumberSchema)