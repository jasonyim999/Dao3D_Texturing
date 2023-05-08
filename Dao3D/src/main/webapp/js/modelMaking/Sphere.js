/**
 * 
 */

class Sphere {

	constructor() {
		this.n = 18;
		this.m = 9;
		this.d = 1;
		this.h = 1;

		this.color = [0.28, 0.50, 0.65];
		this.wireColor = [0.2, 0.4, 0.5];
		

		this.topVertexBuffer = null;
		this.bottomVertexBuffer = null;
		this.topIdxBuffer = null;
		this.bottomIdxBuffer = null;
		this.wireIdxBuffer = null;
		this.topTexCoordBuffer = null;
		this.bottomTexCoordBuffer = null;

		this.topImg = null;
		this.bottomImg = null;

		this.translate = [0, 0, 0];
		this.scale = [80, 80, 80];
		this.rotate = [0, 0, 0];
		this.moveCenter = [0, 0, 0];
		
		this.mdlMatrix = [
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
		];

		this.setupBuffers();
	}
	
	initialMatrix(){
		this.mdlMatrix = [
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
		];
	}

	setupTopImgBuffer(){
		if(this.topImg == null){
			return;
		}else{
			this.topTexCoordBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, this.topTexCoordBuffer);
			var texCoord = [];
			ModelUtil.makeSphereTexturingVertexArray(this.n, this.m, texCoord);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoord), gl.STATIC_DRAW);
			
			var texture = gl.createTexture();
			gl.bindTexture(gl.TEXTURE_2D, texture);
			
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.topImg);
			
		}
	}
	
	setupBottomImgBuffer(){
		if(this.bottomImg == null){
			return;
		}else{
			this.bottomTexCoordBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, this.bottomTexCoordBuffer);
			var texCoord = [];
			ModelUtil.makeSphereTexturingVertexArray(this.n, this.m, texCoord);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoord), gl.STATIC_DRAW);
			
			var texture = gl.createTexture();
			gl.bindTexture(gl.TEXTURE_2D, texture);
			
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.bottomImg);
		}
	}

	setupTopBuffer() {
		this.topVertexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.topVertexBuffer);

		var mesh6AngleVertex = [];
		ModelUtil.makeSphereVertexArray(this.n, this.m, this.h, this.d, 1, mesh6AngleVertex);

		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mesh6AngleVertex), gl.STATIC_DRAW);
		this.topVertexBuffer.itemSize = 3;
		this.topVertexBuffer.numberOfItems = mesh6AngleVertex.length;


		this.topIdxBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.topIdxBuffer);

		var mesh6AngleIndex = [];
		ModelUtil.makeColumnIndexArray(this.n, this.m, mesh6AngleIndex);

		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(mesh6AngleIndex), gl.STATIC_DRAW);
		this.topIdxBuffer.itemSize = 1;
		this.topIdxBuffer.numberOfItems = mesh6AngleIndex.length;

		this.wireIdxBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.wireIdxBuffer);

		var mesh6AngleWireFrameIndex = [];
		ModelUtil.makeFigureWireFrameIndexArray(this.n, this.m, mesh6AngleWireFrameIndex);

		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(mesh6AngleWireFrameIndex), gl.STATIC_DRAW);
		this.wireIdxBuffer.itemSize = 1;
		this.wireIdxBuffer.numberOfItems = mesh6AngleWireFrameIndex.length;
	}
	
	setupBottomBuffer(){
		this.bottomVertexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.bottomVertexBuffer);
	
		var mesh6AngleBottomVertex = [];
		ModelUtil.makeSphereVertexArray(this.n,this.m,-this.h,this.d,-1,mesh6AngleBottomVertex);
	
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mesh6AngleBottomVertex), gl.STATIC_DRAW);
		this.bottomVertexBuffer.itemSize = 3;
		this.bottomVertexBuffer.numberOfItems = mesh6AngleBottomVertex.length;
	
		
		this.bottomIdxBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bottomIdxBuffer);
	
		var mesh6AngleBottomIndex = [];
		ModelUtil.makeColumnIndexArray(this.n,this.m,mesh6AngleBottomIndex);
	
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(mesh6AngleBottomIndex), gl.STATIC_DRAW);
		this.bottomIdxBuffer.itemSize = 1;
		this.bottomIdxBuffer.numberOfItems = mesh6AngleBottomIndex.length;
	}
	
	setupBuffers(){
		this.setupTopBuffer();
		this.setupBottomBuffer();
	}
	
	drawSphere(){
		this.mdlMatrix = mat4.translate(this.mdlMatrix, this.translate[0], this.translate[1], this.translate[2]);
		this.mdlMatrix = mat4.xRotate(this.mdlMatrix, degToRad(this.rotate[0]));
		this.mdlMatrix = mat4.yRotate(this.mdlMatrix, degToRad(this.rotate[1]));
		this.mdlMatrix = mat4.zRotate(this.mdlMatrix, degToRad(this.rotate[2]));
		this.mdlMatrix = mat4.scale(this.mdlMatrix, this.scale[0], this.scale[1], this.scale[2]);
		this.mdlMatrix = mat4.translate(this.mdlMatrix, this.moveCenter[0], this.moveCenter[1], this.moveCenter[2]);
		this.mdlMatrix = mat4.getCanvasTm(this.mdlMatrix);
		
		this.mdlMatrix = mat4.multiply(this.mdlMatrix, dao_mdl.mdlMatrix);
		gl.uniformMatrix4fv(shaderProgram.matrixLocation, false, this.mdlMatrix);


		gl.bindBuffer(gl.ARRAY_BUFFER, this.topVertexBuffer);
		gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.topVertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.wireIdxBuffer);
	 	gl.vertexAttrib4f(shaderProgram.vertexColorAttribute, this.wireColor[0], this.wireColor[1], this.wireColor[2], 1.0);
//		gl.drawElements(gl.LINE_STRIP, this.wireIdxBuffer.numberOfItems, gl.UNSIGNED_SHORT, 0);

		gl.bindBuffer(gl.ARRAY_BUFFER, this.bottomVertexBuffer);
		gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.bottomVertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.wireIdxBuffer);	
	 	gl.vertexAttrib4f(shaderProgram.vertexColorAttribute, this.wireColor[0], this.wireColor[1], this.wireColor[2], 1.0);	
		gl.drawElements(gl.LINE_STRIP, this.wireIdxBuffer.numberOfItems, gl.UNSIGNED_SHORT, 0);
	
		gl.enableVertexAttribArray(shaderProgram.texCoordLocation);
		gl.bindBuffer(gl.ARRAY_BUFFER, this.topVertexBuffer);
		gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.topVertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.topIdxBuffer);	
	 	gl.vertexAttrib4f(shaderProgram.vertexColorAttribute, this.color[0], this.color[1], this.color[2], 1.0);
		if(this.topImg != null){
			gl.bindBuffer(gl.ARRAY_BUFFER, this.topTexCoordBuffer);
			gl.vertexAttribPointer(shaderProgram.texCoordLocation, 2, gl.FLOAT, false, 0, 0);	
		}
		gl.drawElements(gl.TRIANGLES, this.topIdxBuffer.numberOfItems, gl.UNSIGNED_SHORT, 0);
		gl.disableVertexAttribArray(shaderProgram.texCoordLocation);
	
		
		gl.bindBuffer(gl.ARRAY_BUFFER, this.bottomVertexBuffer);
		gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.bottomVertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bottomIdxBuffer);
	 	gl.vertexAttrib4f(shaderProgram.vertexColorAttribute, this.color[0], this.color[1], this.color[2], 1.0);
		if(this.bottomImg != null){
			gl.bindBuffer(gl.ARRAY_BUFFER, this.bottomTexCoordBuffer);
			gl.vertexAttribPointer(shaderProgram.texCoordLocation, 2, gl.FLOAT, false, 0, 0);
		}
		gl.drawElements(gl.TRIANGLES, this.bottomIdxBuffer.numberOfItems, gl.UNSIGNED_SHORT, 0);

	}
	
}

