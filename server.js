var express = require('express')
var app = express();
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
var path = require('path');

var dbURI = 'mongodb://localhost/tasks'
mongoose.connect(dbURI);

var TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: {type:String, default: ''},
    completed:{type:Boolean, default: false},
},{timestamps: true})


app.use(express.static(__dirname + '/myFirstAngularApp/dist'));
var Task = mongoose.model('tasks', TaskSchema);

// configure body-parser to read JSON
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.get('/', function (req, res) {
    Task.find({}, function (err, tasks) {
        if (err) {
            console.log("Returned error", err);
            // respond with JSON
            res.json({ message: "Error", error: err })
        }
        else {
            // respond with JSON
            res.json({ message: "Success", data: tasks })
        }
    })
})

app.post('/new', function (req, res) {
    Task.create({ title: req.params.title, description:req.params.des}, function (err, success) {
        if (err) { errors: err.errors }
        res.redirect('/')
    })
})

app.get('/remove/:title', function (req, res) {
    People.remove({ title: req.params.title }, function (err, success) {
        if (err) { errors: err.errors }
        res.redirect('/')
    })
})

app.get('/:title', function (req, res) {
    People.findOne({ title: req.params.name }, function (err, name) {
        if (err) { errors: err.errors }
        res.json({ message: "Success", data: name })
    })
})

app.listen(8000, function () {
    console.log("Listening on port 8000, and then some...")
})


/* This is in postman

{
	"title":"Use Postman to test my api",
	"description": "When posting, do this bs, and make sure it is in JSON",
	"completed":false
}

*/