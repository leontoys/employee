const express = require("express");
const app = express();
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

let employees = [];

//custom middleware
const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

//use middlewares
app.use(express.static('dist'))//for serving dist folder
app.use(cors())
app.use(express.json());
app.use(requestLogger);

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/employees", (request, response) => {
  response.json(employees);
});

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/`);
});
