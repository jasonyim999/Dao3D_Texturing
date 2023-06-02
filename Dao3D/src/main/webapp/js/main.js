/**
 * 
 */
var gl;
var canvas;
var shaderProgram;
var sky;
var skyImg;

function createGLContext(canvas){
	var names = ["webgl", "experimental-webgl"]
	var context = null;
	for(var i=0; i<names.length; i++){
		try{
			context = canvas.getContext(names[i]);
		} catch(e){
			if(context){
				break;
			}
		}
		if(context){
			context.viewportWidth = canvas.width;
			context.viewportHeight = canvas.height;
		} else{
			alert("Failed to create WebGLcontext");
		}
		return context;
	}
}


let camera = null;




function draw(){

//	camera.setView();

	gl.clear(gl.COLOR_BUFFER_BIT);
	camera.initialMatrix();
	dao_mdl.initialBuffer();
	camera.lookAtView();
	camera.initialMatrix();
	dao_mdl.initialBuffer();
	sky.initialMatrix();
	camera.lookAtView();

	dao_mdl.mdlDraw();

	gl.frontFace(gl.CW);
	sky.setupTopImgBuffer();
	sky.drawSphere();
	gl.frontFace(gl.CCW);

}



function startup(){
	canvas = document.getElementById("myGLCanvas");
	gl = createGLContext(canvas);
	setupShaders();
	gl.clearColor(0.8, 0.8, 0.9, 1.0);
	gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
//	gl.frontFace(gl.CW);
	gl.enable(gl.CULL_FACE);
	gl.enable(gl.DEPTH_TEST);


	camera = new Camera();

	dao_mdl = new Dao();
	dao_mdl.setUpBuffer();
	
	sky = new Sphere();
	sky.scale = [500, 500, 500];
	sky.translate[1] = -100;
	sky.rotate[0] = -90;
	
	skyImg = new Image();
	skyImg.src = 'img/sky.jpg';
	sky.topImg = skyImg;
	
	canvas.addEventListener("mousedown", function(mouse){
		mDown(mouse)}, false);
	
	canvas.addEventListener("mousemove", function(mouse){
		mMove(mouse), false});
	
	canvas.addEventListener("mouseup", function(mouse){
		mUp(mouse), false});
		
	canvas.addEventListener("wheel", function(mouse){
		mScroll(mouse), false});
	

	draw();

}