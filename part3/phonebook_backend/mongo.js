const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log("Give at least the password as argument")
    process.exit(-1)
}

const password = process.argv[2]
const url = `mongodb+srv://panagiotistsampanis47_db_user:${password}@cluster0.gxtgkdj.mongodb.net/?appName=Cluster0`
mongoose.set('strictQuery', false)
mongoose.connect(url, { family : 4 })

const phoneNumberSchema = new mongoose.Schema({
        name: String,
        number: String
    })

const phoneNumber = mongoose.model('phoneNumber', phoneNumberSchema)

const input_name = process.argv[3]
const input_num  = process.argv[4]

const entry = new phoneNumber({
    name: input_name,
    number: input_num
})

if (process.argv.length > 3) {

    entry.save().then(result => {
        console.log(`added ${input_name} number ${input_num} to notebook`)
        mongoose.connection.close
        process.exit()
    })
}

if (process.argv.length == 3) {

    phoneNumber.find({}).then(result => {
        result.forEach(line => {
            console.log(`${line.name} ${line.number}`)
        })
        mongoose.connection.close()
        process.exit()
    })

}