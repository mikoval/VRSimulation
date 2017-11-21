var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(9000);

app.use(express.static('public'));

app.set('view engine', 'ejs');

var server = app.listen(process.env.PORT || 8080)

io.on('connection', function(socket){
  socket.on('testMessage', function(msg){
    socket.broadcast.emit("testMessage", msg);
  });
});


app.get('/', function (req, res) {
	res.render('main.ejs', {})
})
app.get('/phone', function (req, res) {
	res.render('phone.ejs', {})
})
