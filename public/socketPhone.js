
function socketLoop(){
	 socket.emit('testMessage', "hi");
	// setTimeout(socketLoop, 30);
}
$(document).ready(function(){
	socket.on('testMessage', function(data){
		console.log(data);

	});
})
