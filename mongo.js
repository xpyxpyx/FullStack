const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}


if (process.argv.length < 2) {
    console.log('give mongo.js and password as argument')
    process.exit(1)
}


if (process.argv.length < 1) {
    console.log('give node, mongo.js and password as arguments')
    process.exit(1)
}

const password = process.argv[2]
const personName = process.argv[3]
const personNumber = process.argv[4]

const url =
    `mongodb+srv://xpyxpyx:${password}@cluster0-9abuh.mongodb.net/person-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: Number,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: personName,
    number: personNumber
})

if (process.argv.length == 3) {
    console.log('Phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
}

if (process.argv.length >= 4) {
    person.save().then(response => {
        console.log('Added', personName, personNumber, 'to the phonebook');
        mongoose.connection.close();
    })
}