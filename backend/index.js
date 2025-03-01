const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')

const results = [
    {
    "name" : "alan turing",
    "position" : "junior developer",
    "level" : "junior"
},
{
    "name" : "bob dylan",
    "position" : "intern developer",
    "level" : "intern"
},
{
    "name" : "charless babbage",
    "position" : "senior developer",
    "level" : "senior"
}
]

//custom middlewares
const requestLogger = (req,res,next)=>{
    console.log('Method:',req.method)
    console.log('Path:',req.path)
    console.log('Body:',req.body)
    console.log('---')
}
const unknownEndpoint = (req,res)=>{
    res.status(404).send({error:'Unknown Endpoint'})
}

app.use(cors())
app.use(express.static('dist'))//to server React frontend from dist folder
app.use(express.json())//for post requests to parse json correctly
app.use(requestLogger)

app.get('/',(req,res)=>{
    res.send('Hello Node Express World')
})

app.get('/api/',(req,res)=>{
    res.send(results)
})

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT,()=>{
    console.log(`app is listening at http://localhost:${PORT}/`)
})