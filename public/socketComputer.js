
function socketLoop(){
	var obj = {};
	obj.p =  controls.getObject().position;
	obj.q =  controls.getObject().quaternion;

	socket.emit('testMessage',obj);
	setTimeout(socketLoop, 30);
}