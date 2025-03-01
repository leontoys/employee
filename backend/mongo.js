const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)

mongoose.connect(url)

const employeeSchema = new mongoose.Schema({
  name: String,
  position: String,
  level: String
})

const Employee = mongoose.model('Employee', employeeSchema)

const employee = new Employee({
  name: "Jane Doe",
  position: "Frontend Developer",
  level: "Juniori"
})

employee.save().then(result => {
  console.log('employee saved!')
  mongoose.connection.close()
})