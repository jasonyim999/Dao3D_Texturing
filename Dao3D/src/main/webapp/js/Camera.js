/**
 * 
 */


class Camera {
	
	constructor(){
		this.projectionMatrix;
		this.matrix = [
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
		];

		this.position = new Vec3(0, 20, 120);
		this.target = new Vec3(0, 7, 0);
		this.up = new Vec3(0, 1, 0);
		
		this.rotate = [degToRad(0), degToRad(0), degToRad(0)];
		this.translate = [this.position.x, this.position.y, this.position.z];
	
		this.fieldOfViewRadians = degToRad(80);
		this.zNear = 25;
		this.zFar = 50000;
		this.aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
	
		this.left = -50;
		this.right = 50;
		this.bottom = -50;
		this.top = 50;
		
			
		var i = 1;
		if(i == 0){
			this.projectionMatrix = mat4.projection(50, 50, 1000);
		}else if(i == 1){
			this.projectionMatrix = mat4.perspective(this.fieldOfViewRadians, this.aspect, this.zNear, this.zFar);
		}else if(i == 2){
			this.projectionMatrix = mat4.frustum(this.left, this.right, this.bottom, this.top, this.zNear, this.zFar);
		}else if(i == 3){
			this.projectionMatrix = mat4.ortho(this.left, this.right, this.bottom, this.top, this.zNear, this.zFar);
		};
	
		this.projectionMatrix = mat4.getCanvasTm(this.projectionMatrix);
		
	}
	
	initialMatrix(){
		this.matrix = [
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
		];
	}
	
	setView(){

		this.matrix = mat4.translate(this.matrix, this.translate[0], this.translate[1], this.translate[2]);
		this.matrix = mat4.zRotate(this.matrix, degToRad(this.rotate[2]));
		this.matrix = mat4.yRotate(this.matrix, degToRad(this.rotate[1]));
		this.matrix = mat4.xRotate(this.matrix, degToRad(this.rotate[0]));	
		this.matrix = mat4.inverse(this.matrix, this.matrix);

		this.matrix = mat4.getCanvasTm(this.matrix);

		gl.uniformMatrix4fv(shaderProgram.projectionMatrixLocation, false, this.projectionMatrix);
		gl.uniformMatrix4fv(shaderProgram.viewMatrixLocation, false, this.matrix);
		
	}
	
	
	lookAtView(){
		
		this.matrix = mat4.lookAt(this.position, this.target, this.up);
		this.matrix = mat4.inverse(this.matrix, this.matrix);

		this.matrix = mat4.getCanvasTm(this.matrix);

		gl.uniformMatrix4fv(shaderProgram.projectionMatrixLocation, false, this.projectionMatrix);
		gl.uniformMatrix4fv(shaderProgram.viewMatrixLocation, false, this.matrix);
	}
	
	
}





