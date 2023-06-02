var vertexShaderSource = '\
\
attribute vec4 aVertexPosition;\
uniform mat4 u_matrix;\
uniform mat4 v_matrix;\
uniform mat4 p_matrix;\
attribute vec4 aVertexColor;\
varying vec4 vColor;\
attribute vec2 aTextureCoordinates;\
varying vec2 vTextureCoordinates;\
\
void main(){\
	gl_Position = p_matrix * v_matrix * u_matrix * aVertexPosition;\
	vColor = aVertexColor;\
	vTextureCoordinates = aTextureCoordinates;\
}\
\
';