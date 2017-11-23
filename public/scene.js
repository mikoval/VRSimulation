function initScene(){
	effect = undefined;
	WIDTH = $(document).width();
	HEIGHT = $(document).height();

	// Set some camera attributes.
	const VIEW_ANGLE = 45;
	const ASPECT = WIDTH / HEIGHT;
	const NEAR = 0.01;
	const FAR = 100000;
	controls = undefined;


	renderer = new THREE.WebGLRenderer();
	
	renderer.shadowMapEnabled = true;   
	//renderer.shadowMapSoft = true;
	//renderer.shadowMapType = THREE.PCFShadowMap;


	camera =
	    new THREE.PerspectiveCamera(
	        VIEW_ANGLE,
	        ASPECT,
	        NEAR,
	        FAR
	    );

	cameraVR = new THREE.PerspectiveCamera(
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
	element.className += "canvas";
	element.style.width = "100%";
	element.style.height = "100%";

	var rng = CustomRandom(23);
	for(var i = 0; i < 1000; i++){
		var sphereMat = new THREE.MeshPhongMaterial({color:rng.next() * 0xffffff});
		var SphereGeo = new THREE.SphereGeometry(3, 16,16);
		var sphere = new THREE.Mesh(SphereGeo, sphereMat);
		sphere.position.x = (rng.next()  - 0.5 )* -1000;
		sphere.position.y = (rng.next()  ) * 200 + 6;
		sphere.position.z =(rng.next()  - 0.5 ) * 1000;
		//shading for spheres
		sphere.castShadow = true;
		//sphere.receiveShadow = true;
		scene.add(sphere);
	}

	var planeMat = new THREE.MeshPhongMaterial();
	var planeGeo = new THREE.PlaneGeometry(1000, 1000,  16,16);
	var plane = new THREE.Mesh(planeGeo, planeMat);
	plane.rotation.x = -3.14/2;
	plane.position.y = -5
	plane.receiveShadow = true;
	scene.add(plane);

	
	// mess around with this point light, play with spheres and play with plane 
	var light = new THREE.PointLight(0xffffff, 1.0, 0, 2);
	light.position.set( 100, 200, -100 );
	light.castShadow = true;

	//light.shadowBias = 0.0001;
	//light.shadowDarkness = 0.2;
	light.shadowMapWidth = 1024;
	light.shadowMapHeight = 1024;

	scene.add( light );


	var light = new THREE.AmbientLight(0x404040);
	scene.add( light );

	
	console.log(window.location.host);
	socket =  io(window.location.host);

	if(!mobile){

		controls = new THREE.PointerLockControls( camera );
		controls.enabled = true;
		controls.getObject()
		scene.add( controls.getObject() );

		
	}
	else{
		effect= new THREE.StereoEffect(renderer);
	
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
		//console.log(controls);
		if(controls != undefined){
			controls.update();

			if(quaternion != undefined){
				var quat = new  THREE.Quaternion()
				
				quat.multiplyQuaternions (quaternion, cameraVR.quaternion )
				

				
			
				camera.quaternion._x = quat._x;
				camera.quaternion._y = quat._y;
				camera.quaternion._z = quat._z;
				camera.quaternion._w = quat._w;
				
			}
			
		}

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



