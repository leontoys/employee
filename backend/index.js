//load modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

//set up
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
const url = process.env.MONGODB_URI;
console.log("url", url);

//use middleware
app.use(cors());
app.use(express.json());
app.use(express.static('dist'))

//db connect
mongoose
  .connect(url)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error(error));

//create Schema, Model etc
const EmployeeSchema = new mongoose.Schema({
  name: String,
  position: String,
  level: String,
});
//model
const Employee = mongoose.model("Employee", EmployeeSchema);

//base
app.get("/", (req, res) => {
  res.send("Hello from NodeJS");
});

//routes
//get all employees
app.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error });
  }
});

//get a specific employee
app.get("/employees/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error });
  }
});

//create a new employee
app.post("/employees", async (req, res) => {
  try {
    const newEmployee = new Employee({
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    });
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (error) {
    res.status(500).json({ error });
  }
});

//update an employee
app.patch("/employees/:id", async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
      },
      { new: true } //return the updated document
    );
    return res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ error });
  }
});

//delete by id
app.delete("/employees/:id", async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedEmployee);
  } catch (error) {
    res.status(500).json({ error });
  }
});

//start server
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}/`);
});
