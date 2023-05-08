/**
 * 
 */


let mouseX = 0;
let mouseY = 0;
let drag = false;

function mDown(mouse){
	
	mouseX = mouse.offsetX;
	mouseY = mouse.offsetY;
	drag = true;
	
}

function mMove(mouse){
	
	if(!drag){
		return;
	}
	
	let curX = mouse.offsetX;
	let curY = mouse.offsetY;
	
	cameraMove(mouseX, mouseY, curX, curY);
	
	mouseX = curX;
	mouseY = curY;
	
}

function mUp(mouse){
	drag = false;
}


function cameraMove(mouseX, mouseY, curX, curY){
	let diffX = curX - mouseX;
	let diffY = curY - mouseY;
	
	dao_mdl.rotate[1] = dao_mdl.rotate[1] + diffX;
	let next_angle = dao_mdl.rotate[0] + diffY;
	if(next_angle <= 85 && next_angle >= -30){
		dao_mdl.rotate[0] = dao_mdl.rotate[0] + diffY;
	}
	draw();
}

function mScroll(mouse){
	
	let delta = -mouse.deltaY/600;
	let cur_scale = dao_mdl.scale[0];
	let next_scale = cur_scale + delta;
	
	if(next_scale > 0.2 && next_scale < 6.85){
		dao_mdl.scale[0] += delta;
		dao_mdl.scale[1] += delta;
		dao_mdl.scale[2] += delta;
		draw();
	}
	
}



function RotateX(){
//	yAngle = document.getElementById('b');
	xa.value = parseInt(xb.value);
	dao_mdl.rotate[0] = parseInt(xa.value);
	draw();
}


function RotateY(){
//	yAngle = document.getElementById('b');
	ya.value = parseInt(yb.value);
	dao_mdl.rotate[1] = parseInt(ya.value);
	draw();
}