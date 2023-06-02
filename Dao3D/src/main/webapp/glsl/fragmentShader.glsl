var fragmentShaderSource = '\
\
precision mediump float;\
varying vec4 vColor;\
varying vec2 vTextureCoordinates;\
uniform sampler2D uSampler;\
void main(){\
	gl_FragColor = texture2D(uSampler, vTextureCoordinates);\
}\
\
';