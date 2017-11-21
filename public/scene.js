function initScene(){
	WIDTH = $(document).width();
	HEIGHT = $(document).height();

	// Set some camera attributes.
	const VIEW_ANGLE = 45;
	const ASPECT = WIDTH / HEIGHT;
	const NEAR = 0.01;
	const FAR = 100000;



	renderer = new THREE.WebGLRenderer();

	camera =
	    new THREE.PerspectiveCamera(
	        VIEW_ANGLE,
	        ASPECT,
	        NEAR,
	        FAR
	    );

	scene = new THREE.Scene();
	prevTime = performance.now();
	velocity = new THREE.Vector3();
	direction = new THREE.Vector3();
	moveForward = false;
	moveBackward = false;
	moveLeft = false;
	moveRight = false;
	canJump = false;



	// Start the renderer.
	renderer.setSize(WIDTH, HEIGHT);

	document.body.appendChild( renderer.domElement );
	var element = renderer.domElement;
	


	for(var i = 0; i < 100; i++){
		var sphereMat = new THREE.MeshPhongMaterial({color:Math.random() * 0xffffff});
		var SphereGeo = new THREE.SphereGeometry(10, 16,16);
		var sphere = new THREE.Mesh(SphereGeo, sphereMat);
		sphere.position.x = (Math.random()  - 0.5 )* -300;
		sphere.position.y = (Math.random()  - 0.5 ) * -300;
		sphere.position.z =(Math.random()  - 0.5 ) * -300;

		scene.add(sphere);
	}
	

	

	var light = new THREE.PointLight();
	light.position.set( 0, 3, -3 );
	scene.add( light );

	
	
	socket =  io('http://localhost:9000');


	controls = new THREE.PointerLockControls( camera );
	controls.enabled = true;
	controls.getObject()
	scene.add( controls.getObject() );

	socketLoop();

	animationLoop();

}

function render(){

	renderer.render(scene, camera);
}

function animationLoop(){


	var time = performance.now();
	var delta = ( time - prevTime ) / 1000;
	velocity.x -= velocity.x * 10.0 * delta;
	velocity.z -= velocity.z * 10.0 * delta;
	velocity.y =0;
	direction.z = Number( moveForward ) - Number( moveBackward );
	direction.x = Number( moveLeft ) - Number( moveRight );
	direction.normalize(); // this ensures consistent movements in all directions
	if ( moveForward || moveBackward ) velocity.z -= direction.z * 400.0 * delta;
	if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;
	
	controls.getObject().translateX( velocity.x * delta );
	controls.getObject().translateY( velocity.y * delta );
	controls.getObject().translateZ( velocity.z * delta );



	
	renderer.render(scene, camera);
	prevTime = time;
	setTimeout(animationLoop, 30);
}

initScene();

