/**
 * 
 */

class Column {
	
	constructor(n = 18){
		
		this.n = n;
		this.m = 1;
		this.h = 1;
		this.hm = 1;
		
		this.color = [0.28, 0.50, 0.65];
		this.wireColor = [0.2, 0.4, 0.5];

		
		this.topVertexBuffer = null;
		this.bottomVertexBuffer = null;
		this.sideVertexBuffer = null;
		this.topIdxBuffer = null;
		this.bottomIdxBuffer = null;
		this.sideIdxBuffer = null;
		this.wireIdxBuffer = null;
		this.sideWireIdxBuffer = null;
		this.texCoordBuffer = null;

		this.img = null;

		
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
	
	setN(n){
		this.n = n;
	}
	
	initialMatrix(){
		this.mdlMatrix = [
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
		];
	}
	
	setupImgBuffer(){
		if(this.img == null){
			return;
		}else{
			this.texCoordBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
			var texCoord = [];
			ModelUtil.makeSphereTexturingVertexArray(this.n, this.m, texCoord);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoord), gl.STATIC_DRAW);
			
			var texture = gl.createTexture();
			gl.bindTexture(gl.TEXTURE_2D, texture);
			
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.img);
			
		}
	}

	
	setupTopBuffer(){
		this.topVertexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.topVertexBuffer);
	
		var mesh6AngleVertex = [];
		ModelUtil.makeColumnVertexArray(this.n,this.m,this.h/2,1,mesh6AngleVertex);
	
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mesh6AngleVertex), gl.STATIC_DRAW);
		this.topVertexBuffer.itemSize = 3;
		this.topVertexBuffer.numberOfItems = mesh6AngleVertex.length;
	
		
		this.topIdxBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.topIdxBuffer);
	
		var mesh6AngleIndex = [];
		ModelUtil.makeFigureStripIndexArray(this.n,this.m,mesh6AngleIndex);
	
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(mesh6AngleIndex), gl.STATIC_DRAW);
		this.topIdxBuffer.itemSize = 1;
		this.topIdxBuffer.numberOfItems = mesh6AngleIndex.length;
	
	
		this.wireIdxBuffer=gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.wireIdxBuffer);
	
		var mesh6AngleWireFrameIndex = [];
		ModelUtil.makeFigureWireFrameIndexArray(this.n,this.m,mesh6AngleWireFrameIndex);
	
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(mesh6AngleWireFrameIndex), gl.STATIC_DRAW);
		this.wireIdxBuffer.itemSize = 1;
		this.wireIdxBuffer.numberOfItems = mesh6AngleWireFrameIndex.length;

	}
	
	setupBottomBuffer(){
		this.bottomVertexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.bottomVertexBuffer);
		
		var mesh6AngleBottomVertex = [];
		ModelUtil.makeColumnVertexArray(this.n,this.m,-this.h/2,-1,mesh6AngleBottomVertex);
		
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mesh6AngleBottomVertex), gl.STATIC_DRAW);
		this.bottomVertexBuffer.itemSize = 3;
		this.bottomVertexBuffer.numberOfItems = mesh6AngleBottomVertex.length;
		
			
		this.bottomIdxBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bottomIdxBuffer);
		
		var mesh6AngleBottomIndex = [];
		ModelUtil.makeFigureStripIndexArray(this.n,this.m,mesh6AngleBottomIndex);
		
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(mesh6AngleBottomIndex), gl.STATIC_DRAW);
		this.bottomIdxBuffer.itemSize = 1;
		this.bottomIdxBuffer.numberOfItems = mesh6AngleBottomIndex.length;
	
	}

	setupSideBuffer(){
		this.sideVertexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.sideVertexBuffer);
		
		var meshSideVertex = [];
		ModelUtil.makeColumnSideVertexArray(this.n,this.hm,this.h,meshSideVertex);
		
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(meshSideVertex), gl.STATIC_DRAW);
		this.sideVertexBuffer.itemSize = 3;
		this.sideVertexBuffer.numberOfItems = meshSideVertex.length;
		
			
		this.sideIdxBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.sideIdxBuffer);
		
		var meshSideIndex = [];
		ModelUtil.makeTriangleIndexArray(this.n,this.hm,meshSideIndex);
		
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(meshSideIndex), gl.STATIC_DRAW);
		this.sideIdxBuffer.itemSize = 1;
		this.sideIdxBuffer.numberOfItems = meshSideIndex.length;
		
		
		this.sideWireIdxBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.sideWireIdxBuffer);
		
		var meshSideWireFrameIndex = [];
		ModelUtil.makeRectWireFrameIndexArray(this.n,this.hm,meshSideWireFrameIndex);
		
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(meshSideWireFrameIndex), gl.STATIC_DRAW);
		this.sideWireIdxBuffer.itemSize = 1;
		this.sideWireIdxBuffer.numberOfItems = meshSideWireFrameIndex.length;
		
	}
	
	setupBuffers(){
		this.setupTopBuffer();
		this.setupBottomBuffer();
		this.setupSideBuffer();
	}
	
	drawColumn(){
		this.mdlMatrix = mat4.translate(this.mdlMatrix, this.translate[0], this.translate[1], this.translate[2]);
		this.mdlMatrix = mat4.xRotate(this.mdlMatrix, degToRad(this.rotate[0]));
		this.mdlMatrix = mat4.zRotate(this.mdlMatrix, degToRad(this.rotate[2]));
		this.mdlMatrix = mat4.yRotate(this.mdlMatrix, degToRad(this.rotate[1]));
		this.mdlMatrix = mat4.scale(this.mdlMatrix, this.scale[0], this.scale[1], this.scale[2]);
		this.mdlMatrix = mat4.translate(this.mdlMatrix, this.moveCenter[0], this.moveCenter[1], this.moveCenter[2]);
		this.mdlMatrix = mat4.getCanvasTm(this.mdlMatrix);
		
		this.mdlMatrix = mat4.multiply(this.mdlMatrix, dao_mdl.mdlMatrix);		
		gl.uniformMatrix4fv(shaderProgram.matrixLocation, false, this.mdlMatrix);
	
	

		gl.bindBuffer(gl.ARRAY_BUFFER, this.sideVertexBuffer);
		gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.sideVertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.sideWireIdxBuffer);
	 	gl.vertexAttrib4f(shaderProgram.vertexColorAttribute, this.wireColor[0], this.wireColor[1], this.wireColor[2], 1.0);
		gl.drawElements(gl.LINE_STRIP, this.sideWireIdxBuffer.numberOfItems, gl.UNSIGNED_SHORT, 0);
		
		gl.bindBuffer(gl.ARRAY_BUFFER, this.topVertexBuffer);
		gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.topVertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.wireIdxBuffer);
	 	gl.vertexAttrib4f(shaderProgram.vertexColorAttribute, this.wireColor[0], this.wireColor[1], this.wireColor[2], 1.0);
		//gl.drawElements(gl.LINE_STRIP, this.wireIdxBuffer.numberOfItems, gl.UNSIGNED_SHORT, 0);
	
		gl.bindBuffer(gl.ARRAY_BUFFER, this.bottomVertexBuffer);
		gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.bottomVertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.wireIdxBuffer);
	 	gl.vertexAttrib4f(shaderProgram.vertexColorAttribute, this.wireColor[0], this.wireColor[1], this.wireColor[2], 1.0);
		//gl.drawElements(gl.LINE_STRIP, this.wireIdxBuffer.numberOfItems, gl.UNSIGNED_SHORT, 0);
	
	
		gl.enableVertexAttribArray(shaderProgram.texCoordLocation);
		gl.bindBuffer(gl.ARRAY_BUFFER, this.topVertexBuffer);
		gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.topVertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.topIdxBuffer);
	 	gl.vertexAttrib4f(shaderProgram.vertexColorAttribute, this.color[0], this.color[1], this.color[2], 1.0);
		if(this.img != null){
			gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
			gl.vertexAttribPointer(shaderProgram.texCoordLocation, 2, gl.FLOAT, false, 0, 0);	
		}
		gl.drawElements(gl.TRIANGLE_STRIP, this.topIdxBuffer.numberOfItems, gl.UNSIGNED_SHORT, 0);
		
		
		gl.bindBuffer(gl.ARRAY_BUFFER, this.bottomVertexBuffer);
		gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.bottomVertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bottomIdxBuffer);
	 	gl.vertexAttrib4f(shaderProgram.vertexColorAttribute, this.color[0], this.color[1], this.color[2], 1.0);
		gl.drawElements(gl.TRIANGLE_STRIP, this.bottomIdxBuffer.numberOfItems, gl.UNSIGNED_SHORT, 0);
		
		
		gl.bindBuffer(gl.ARRAY_BUFFER, this.sideVertexBuffer);
		gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.sideVertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.sideIdxBuffer);
	 	gl.vertexAttrib4f(shaderProgram.vertexColorAttribute, this.color[0], this.color[1], this.color[2], 1.0);
		gl.drawElements(gl.TRIANGLES, this.sideIdxBuffer.numberOfItems, gl.UNSIGNED_SHORT, 0);
		
		gl.disableVertexAttribArray(shaderProgram.texCoordLocation);
		
	}
	
	
	
}




