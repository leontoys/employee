//load modules
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

//set up
dotenv.config()
const app = express()
const PORT = process.env.PORT || 5001
const url = process.env.MONGODB_URI
console.log("url",url)

//use middleware
app.use(cors())
app.use(express.json())

//db connect
mongoose.connect(url)
.then(()=>console.log('MongoDB connected'))
.catch((error)=>console.error(error))

//base
app.get('/',(req,res)=>{
    res.send('Hello from NodeJS')
})

//start server
app.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}/`)
})


