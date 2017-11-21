
function socketLoop(){
	 socket.emit('testMessage', "hi");
	// setTimeout(socketLoop, 30);
}
$(document).ready(function(){
	socket.on('testMessage', function(data){
		camera.position.x  = data.p.x;
		camera.position.y  = data.p.y;
		camera.position.z  = data.p.z;
		camera.quaternion._x = data.q._x;
		camera.quaternion._y = data.q._y;
		camera.quaternion._z = data.q._z;
		camera.quaternion._w = data.q._w;
	});

	//Apply VR stereo rendering to renderer
	effect = new THREE.VREffect( renderer );
	effect.setSize( window.innerWidth, window.innerHeight );
	
	renderer = effect;
})



