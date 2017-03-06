/*jshint esversion:6*/
var express = require('express');
var app = express();

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static('public'));

app.listen(8000, () => {
	console.log('server started on port 8000');
});

