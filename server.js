var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.set('view engine', 'ejs');


var server = app.listen(8081, function() {
	var host = server.address().address
	var port = server.address().port

	console.log("Example app listening at http://%s:%s", host, port)
})

io.on('connection', function(socket){
  console.log('a user connected');
});


app.get('/', function (req, res) {
	res.render('main.ejs', {})
})
