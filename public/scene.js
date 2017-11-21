function initScene(){
	effect = undefined;
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
	

	var rng = CustomRandom(23);
	for(var i = 0; i < 100; i++){
		var sphereMat = new THREE.MeshPhongMaterial({color:rng.next() * 0xffffff});
		var SphereGeo = new THREE.SphereGeometry(10, 16,16);
		var sphere = new THREE.Mesh(SphereGeo, sphereMat);
		sphere.position.x = (rng.next()  - 0.5 )* -1000;
		sphere.position.y = (rng.next()  ) * 100 + 6;
		sphere.position.z =(rng.next()  - 0.5 ) * 1000;

		scene.add(sphere);
	}

	var planeMat = new THREE.MeshPhongMaterial();
		var planeGeo = new THREE.PlaneGeometry(1000, 1000,  16,16);
		var plane = new THREE.Mesh(planeGeo, planeMat);
		plane.rotation.x = -3.14/2;
		plane.position.y = -5
	scene.add(plane);

	

	var light = new THREE.PointLight();
	light.position.set( 100, 60, -100 );
	scene.add( light );

	var light = new THREE.AmbientLight(0x404040);
	scene.add( light );

	
	
	socket =  io('http://localhost:9000');

	if(!mobile){
		controls = new THREE.PointerLockControls( camera );
		controls.enabled = true;
		controls.getObject()
		scene.add( controls.getObject() );

		
	}
	

	socketLoop();

	animationLoop();

}

function render(){

	renderer.render(scene, camera);
}

function animationLoop(){


	if(!mobile){
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
	}
	


	if(effect){
		effect.render(scene, camera);
	}
	else{
		renderer.render(scene, camera);
	}	
	
	
	prevTime = time;
	setTimeout(animationLoop, 30);
}
var CustomRandom = function(nseed) {

    var seed,
        constant = Math.pow(2, 13)+1,
        prime = 37,
        maximum = Math.pow(2, 50);
 
    if (nseed) {
        seed = nseed;
    }
 
    if (seed == null) {
//if there is no seed, use timestamp
        seed = (new Date()).getTime();
    } 
 
    return {
        next : function() {
            seed *= constant;
            seed += prime;
            seed %= maximum;
            
            return seed/maximum;
        }
    }
}



initScene();



