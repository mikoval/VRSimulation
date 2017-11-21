
function socketLoop(){
	var obj = {};
	obj.p = camera.position;
	socket.emit('testMessage', "hi from computer");
	setTimeout(socketLoop, 30);
}