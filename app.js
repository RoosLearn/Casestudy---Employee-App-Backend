// Task1: initiate app and run server at 3000

const path=require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));
app.use(bodyParser.json());
app.use(cors());

const port = 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// Task2: create mongoDB connection 

mongoose.connect('mongodb+srv://paradise:3HGjwlF368ab@cluster0.anppu8q.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

const employeeSchema = new mongoose.Schema({
    name: String,
    location: String,
    position: String,
    salary: Number
});

const Employee = mongoose.model('Employee', employeeSchema);

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below







//TODO: get data from db  using api '/api/employeelist'

app.get('/api/employeelist', async (req, res) => {
    try {
        const employees = await Employee.find({});
        res.send(employees);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});


//TODO: get single data from db  using api '/api/employeelist/:id'

app.get('/api/employeelist/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (employee) {
            res.send(employee);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});



//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post('/api/employeelist', async (req, res) => {
    try {
        const employee = new Employee({
            name: req.body.name,
            location: req.body.location,
            position: req.body.position,
            salary: req.body.salary
        });
        await employee.save();
        res.send(employee);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});





//TODO: delete a employee data from db by using api '/api/employeelist/:id'

app.delete('/api/employeelist/:id', async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (employee) {
            res.send(employee);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});



//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.put('/api/employeelist/:id', async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            location: req.body.location,
            position: req.body.position,
            salary: req.body.salary
        }, { new: true });
        if (employee) {
            res.send(employee);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});


//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});



