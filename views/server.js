var express = require('express');
var app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
	res.send('hello world');
})

app.post('/', function(req, res) {
	console.log('Got a POST request for the homepage');
	res.send('Hello POST');
})

app.delete('/del_user', function(req, res) {
	console.log('Got a DELETE request for the /list_user');
	res.send('Page Listing');
})

// This responds a GET request for the /list_user page.
app.get('/list_user', function (req, res) {
   console.log('Got a GET request for /list_user');
   res.send('Page Listing');
})

// This responds a GET request for abcd, abxcd, ab123cd, and so on
app.get('/ab*cd', function(req, res) {   
   console.log('Got a GET request for /ab*cd');
   res.send('Page Pattern Match');
})

var server = app.listen(8081, function() {
	var host = server.address().address
	var port = server.address().port

	console.log("Example app listening at http://%s:%s", host, port)
})