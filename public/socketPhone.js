
function socketLoop(){
	 socket.emit('testMessage', "hi");
	// setTimeout(socketLoop, 30);
}

$(document).ready(function(){
	lastTime = 0;
	socket.on('testMessage', function(data){
		var time = data.t;
	
		if(time > lastTime){
			camera.position.x  = data.p.x;
			camera.position.y  = data.p.y;
			camera.position.z  = data.p.z;
			camera.quaternion._x = data.q._x;
			camera.quaternion._y = data.q._y;
			camera.quaternion._z = data.q._z;
			camera.quaternion._w = data.q._w;
			prevTime = time;
		}
		
	});

})



$(document).on("click", function(){
	console.log("going full screen")
	document.documentElement.webkitRequestFullScreen()
})
$(document).on("tap", function(){
	console.log("going full screen")
	document.documentElement.webkitRequestFullScreen()
	renderer.width
})