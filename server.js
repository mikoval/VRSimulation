var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(9000);

app.use(express.static('public'));

app.set('view engine', 'ejs');


var server = app.listen(8080, function() {
	var host = server.address().address
	var port = server.address().port

	console.log("Example app listening at http://%s:%s", host, port)
})

io.on('connection', function(socket){
  socket.on('testMessage', function(msg){
    console.log('message: ' + msg);
  });
});


app.get('/', function (req, res) {
	res.render('main.ejs', {})
})
