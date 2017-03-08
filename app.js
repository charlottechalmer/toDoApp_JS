/*jshint esversion:6*/
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskModel = require('./task.model')(mongoose);

//deprecation fix for mpromise (mongoose's promise library)
mongoose.Promise = global.Promise;

//connecting to mongo
mongoose.connect('mongodb://localhost'); 

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//GET: all task input
app.get('/tasks', (req, res) => {
	TaskModel.find({}, 
	(err, data) => {
		if(err) {
			res.status(500).send(err);
		}
		res.status(200).send(data);
	});
});

//POST: new task (create)
app.post('/task/new', (req, res) => {
	var newTask = {
		task: req.body.task,
		completed: false
	}
	new TaskModel(newTask).save((err, data) => {
		if(err) {
			res.status(500).send(err);
		}
		res.status(200).send(data);
	});
});

//POST: completed task (update post)
app.post('/task/update', (req, res) => {
	TaskModel.findOneAndUpdate(
		{ _id : req.body.taskId },
		{ $set : { completed:true } },
		(err, data) => {
			if(err) {
				res.status(500).send(err);
			}
			res.status(200).send(data);
		});
});

//POST: delete a completed task
app.post('/task/delete', (req, res) => {
	TaskModel.findOneAndRemove({_id : req.body.taskId } , (err, data) => {
		if (err) {
			res.status(500).send(err);
		}
		res.status(200).send(data);
	});
});


app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static('public'));

app.listen(8000, () => {
	console.log('server started on port 8000');
});

module.exports = app;
