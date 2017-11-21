
function socketLoop(){
	var obj = {};
	obj.p =  controls.getObject().position;
	socket.emit('testMessage',obj);
	setTimeout(socketLoop, 30);
}