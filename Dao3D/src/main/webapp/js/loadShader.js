/**
 * 
 */

function loadShader(type, shaderSource){
	var shader = gl.createShader(type);
	gl.shaderSource(shader, shaderSource);
	gl.compileShader(shader);
	
	if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
		alert("Error compiling shader" + gl.getShaderInfoLog(shader));
		gl.deleteShader(shader);
		return null;
	}
	return shader;
}



function setupShaders(){
			
	var vertexShader = loadShader(gl.VERTEX_SHADER, vertexShaderSource);
	var fragmentShader = loadShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
	shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram, vertexShader);
	gl.attachShader(shaderProgram, fragmentShader);
	gl.linkProgram(shaderProgram);
	
	if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)){
		alert("Failed to setup shaders");
	}
	
	gl.useProgram(shaderProgram);
	
	shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
	shaderProgram.texCoordLocation = gl.getAttribLocation(shaderProgram, "aTextureCoordinates");
	shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
	shaderProgram.matrixLocation = gl.getUniformLocation(shaderProgram, "u_matrix");
	shaderProgram.projectionMatrixLocation = gl.getUniformLocation(shaderProgram, "p_matrix");
	shaderProgram.viewMatrixLocation = gl.getUniformLocation(shaderProgram, "v_matrix");
	
	gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
//	gl.enableVertexAttribArray(shaderProgram.texCoordLocation);
}
