const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://joananoack_db_user:${password}@cluster0.g5kmgc9.mongodb.net/?appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Persons = mongoose.model('Persons', personSchema)

const person = new Persons({
  name: 'Test2 Name',
  number: '00123456789',
})
const inputPerson = new Persons({
    name: process.argv[3],
    number: process.argv[4],
})
if(process.argv.length > 3){
    inputPerson.save().then(result =>{
        console.log("added ", result.name, " number ", result.number, " to phonebook")
        mongoose.connection.close()
    })
} else {
    Persons.find({}).then(result=> {
        console.log("phoneboo: ")
        result.forEach(person => {
            console.log(person.name, person.number)
        })
                    mongoose.connection.close()
    })
}

// person.save().then(result => {
//   console.log('person saved!', result)
//   mongoose.connection.close()
// })

// Persons.find({}).then(result => {
//   result.forEach(person => {
//     console.log(person)
//   })
//   mongoose.connection.close()
// })
