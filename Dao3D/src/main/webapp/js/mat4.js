var mat4 = {
	
		lookAt: function(cameraPstn, tgt, up) {
			var zAxis = Vec3.normalize(Vec3.sub(cameraPstn, tgt));
			var xAxis = Vec3.normalize(Vec3.cross(up, zAxis));
			var yAxis = Vec3.normalize(Vec3.cross(zAxis, xAxis));


			return [
				xAxis.x, yAxis.x, zAxis.x, cameraPstn.x,
				xAxis.y, yAxis.y, zAxis.y, cameraPstn.y,
				xAxis.z, yAxis.z, zAxis.z, cameraPstn.z,
				0, 0, 0, 1
			];
		},
	
		projection: function(width, height, depth){
			return[
				1/width, 0, 0, -1,
				0, -1/height, 0, 1,
				0, 0, 1/ depth, 0,
				0, 0, 0, 1
			];
		},
		
		ortho: function(left, right, bottom, top, near, far){
			var rl = right - left;
			var tb = top - bottom;
			var nf = near - far;
			
			return [
				2/rl, 0, 0, -(left+right)/rl,
				0, 2/tb, 0, -(bottom+top)/tb,
				0, 0, 2/nf, (near+far)/nf,
				0, 0, 0, 1 
			];
		},
		
		perspective: function(fieldOfViewInRadians, aspect, near, far){
			var f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians);
			var rangeInv = 1.0 / (near - far);
			
			return [
				f / aspect, 0, 0, 0,
				0, f, 0, 0,
				0, 0, (near + far) * rangeInv, near * far * rangeInv * 2,
				0, 0, -1, 0
			];
		},
		
		frustum: function(left, right, bottom, top, near, far){
			var rl = right - left;
			var tb = top - bottom;
			var fn = far - near;
			
			return [
				(near*2)/rl, 0, (right + left)/rl, 0,
				0, (near*2)/tb, (top + bottom)/tb, 0,
				0, 0, -(far + bottom)/fn, -(far * near * 2)/fn,
				0, 0, -1, 0
			];
			
		},
		
		inverse: function(tm, dest){
			if(!dest){dest = tm;}
			
		let e00 = tm[_00];
		let e01 = tm[_01];
		let e02 = tm[_02];
		let e03 = tm[_03];
		
		let e10 = tm[_10];
		let e11 = tm[_11];
		let e12 = tm[_12];
		let e13 = tm[_13];
		
		let e20 = tm[_20];
		let e21 = tm[_21];
		let e22 = tm[_22];
		let e23 = tm[_23];
		
		let e30 = tm[_30];
		let e31 = tm[_31];
		let e32 = tm[_32];
		let e33 = tm[_33];

		let i00 = e11 * e22 * e33 + e12 * e23 * e31 + e13 * e21 * e32 - e13 * e22 * e31 - e12 * e21 * e33 - e11 * e23 * e32
		let i01 = e03 * e22 * e31 + e02 * e21 * e33 + e01 * e23 * e32 - e01 * e22 * e33 - e02 * e23 * e31 - e03 * e21 * e32
		let i02 = e01 * e12 * e33 + e02 * e13 * e31 + e03 * e11 * e32 - e03 * e12 * e31 - e02 * e11 * e33 - e01 * e13 * e32
		let i03 = e03 * e12 * e21 + e02 * e11 * e23 + e01 * e13 * e22 - e01 * e12 * e23 - e02 * e13 * e21 - e03 * e11 * e22

		let i10 = e13 * e22 * e30 + e12 * e20 * e33 + e10 * e23 * e32 - e10 * e22 * e33 - e12 * e23 * e30 - e13 * e20 * e32
		let i11 = e00 * e22 * e33 + e02 * e23 * e30 + e03 * e20 * e32 - e03 * e22 * e30 - e02 * e20 * e33 - e00 * e23 * e32
		let i12 = e03 * e12 * e30 + e02 * e10 * e33 + e00 * e13 * e32 - e00 * e12 * e33 - e02 * e13 * e30 - e03 * e10 * e32
		let i13 = e00 * e12 * e23 + e02 * e13 * e20 + e03 * e10 * e22 - e03 * e12 * e20 - e02 * e10 * e23 - e00 * e13 * e22

		let i20 = e10 * e21 * e33 + e11 * e23 * e30 + e13 * e20 * e31 - e13 * e21 * e30 - e11 * e20 * e33 - e10 * e23 * e31
		let i21 = e03 * e21 * e30 + e01 * e20 * e33 + e00 * e23 * e31 - e00 * e21 * e33 - e01 * e23 * e30 - e03 * e20 * e31
		let i22 = e00 * e11 * e33 + e01 * e13 * e30 + e03 * e10 * e31 - e03 * e11 * e30 - e01 * e10 * e33 - e00 * e13 * e31
		let i23 = e03 * e11 * e20 + e01 * e10 * e23 + e00 * e13 * e21 - e00 * e11 * e23 - e01 * e13 * e20 - e03 * e10 * e21

		let i30 = e12 * e21 * e30 + e11 * e20 * e32 + e10 * e22 * e31 - e10 * e21 * e32 - e11 * e22 * e30 - e12 * e20 * e31
		let i31 = e00 * e21 * e32 + e01 * e22 * e30 + e02 * e20 * e31 - e02 * e21 * e30 - e01 * e20 * e32 - e00 * e22 * e31
		let i32 = e02 * e11 * e30 + e01 * e10 * e32 + e00 * e12 * e31 - e00 * e11 * e32 - e01 * e12 * e30 - e02 * e10 * e31
		let i33 = e00 * e11 * e22 + e01 * e12 * e20 + e02 * e10 * e21 - e02 * e11 * e20 - e01 * e10 * e22 - e00 * e12 * e21

		let det = e00 * (i00) + e10 * (i01) + e20 * (i02) + e30 * (i03)

		dest[_00] = i00 / det;
		dest[_01] = i01 / det;
		dest[_02] = i02 / det;
		dest[_03] = i03 / det;
		
		dest[_10] = i10 / det;
		dest[_11] = i11 / det;
		dest[_12] = i12 / det;
		dest[_13] = i13 / det;

		dest[_20] = i20 / det;
		dest[_21] = i21 / det;
		dest[_22] = i22 / det;
		dest[_23] = i23 / det;

		dest[_30] = i30 / det;
		dest[_31] = i31 / det;
		dest[_32] = i32 / det;
		dest[_33] = i33 / det;
			
			return dest;
		},
		
		multiply: function(tm, src){
			let e00 = tm[_00];
			let e01 = tm[_01];
			let e02 = tm[_02];
			let e03 = tm[_03];
			
			let e10 = tm[_10];
			let e11 = tm[_11];
			let e12 = tm[_12];
			let e13 = tm[_13];
			
			let e20 = tm[_20];
			let e21 = tm[_21];
			let e22 = tm[_22];
			let e23 = tm[_23];
			
			let e30 = tm[_30];
			let e31 = tm[_31];
			let e32 = tm[_32];
			let e33 = tm[_33];
			
			// 변환 매트릭스
			let t00 = src[_00];
			let t01 = src[_01];
			let t02 = src[_02];
			let t03 = src[_03];
			
			let t10 = src[_10];
			let t11 = src[_11];
			let t12 = src[_12];
			let t13 = src[_13];
			
			let t20 = src[_20];
			let t21 = src[_21];
			let t22 = src[_22];
			let t23 = src[_23];
			
			let t30 = src[_30];
			let t31 = src[_31];
			let t32 = src[_32];
			let t33 = src[_33];
			// 기존 매트릭스 뒤에 변환 매트릭스 곱하기
			// [ t00, t01, t02, t03 ] x [ e00, e01, e02, e03 ] = [ t00 * e00 + t01 * e10 + t02 * e20, t00 * e01 + t01 * e11 + t02 * e21, t00 * e02 + t01 * e12 + t02 * e22, t00 * e03 + t01 * e13 + t02 * e23 + t03 ]
			// [ t10, t11, t12, t13 ] x [ e10, e11, e12, e13 ] = [ t10 * e00 + t11 * e10 + t12 * e20, t10 * e01 + t11 * e11 + t12 * e21, t10 * e02 + t11 * e12 + t12 * e22, t10 * e03 + t11 * e13 + t12 * e23 + t13 ]
			// [ t20, t21, t22, t23 ] x [ e20, e21, e22, e23 ] = [ t20 * e00 + t21 * e10 + t22 * e20, t20 * e01 + t21 * e11 + t22 * e21, t20 * e02 + t21 * e12 + t22 * e22, t20 * e03 + t21 * e13 + t22 * e23 + t23 ]
			// [   0,   0,   0,   1 ] x [   0,   0,   0,   1 ] = [ t30 * e00 + t31 * e10 + t32 * e20, t30 * e01 + t31 * e11 + t32 * e21, t30 * e02 + t31 * e12 + t32 * e22, t30 * e03 + t31 * e13 + t32 * e23 + t33 ]
			tm[_00] = e00 * t00 + e01 * t10 + e02 * t20;	tm[_01] = e00 * t01 + e01 * t11 + e02 * t21;	tm[_02] = e00 * t02 + e01 * t12 + e02 * t22;	tm[_03] = e00 * t03 + e01 * t13 + e02 * t23 + e03;
			tm[_10] = e10 * t00 + e11 * t10 + e12 * t20;	tm[_11] = e10 * t01 + e11 * t11 + e12 * t21;	tm[_12] = e10 * t02 + e11 * t12 + e12 * t22;	tm[_13] = e10 * t03 + e11 * t13 + e12 * t23 + e13;
			tm[_20] = e20 * t00 + e21 * t10 + e22 * t20;	tm[_21] = e20 * t01 + e21 * t11 + e22 * t21;	tm[_22] = e20 * t02 + e21 * t12 + e22 * t22;	tm[_23] = e20 * t03 + e21 * t13 + e22 * t23 + e23;
			tm[_30] = e30 * t00 + e31 * t10 + e32 * t20;	tm[_31] = e30 * t01 + e31 * t11 + e32 * t21;	tm[_32] = e30 * t02 + e31 * t12 + e32 * t22;	tm[_33] = e30 * t03 + e31 * t13 + e32 * t23 + e33;
	
			return tm;
		},
		
		scale: function(matrix, sx, sy, sz){
			return mat4.multiply(matrix, mat4.scaling(sx, sy, sz));
		},
		
		scaling: function(sx, sy, sz){
			return[
				sx, 0, 0, 0,
				0, sy, 0, 0,
				0, 0, sz, 0,
				0, 0, 0, 1
			];
		},
		
		translate: function(matrix, tx, ty, tz){
			return mat4.multiply(matrix, mat4.translation(tx, ty, tz));
		},
		
		translation: function(tx, ty, tz){
			return[
				1, 0, 0, tx,
				0, 1, 0, ty,
				0, 0, 1, tz,
				0, 0, 0, 1
			];
		},
		
		xRotate: function(matrix, angleInRadians){
			return mat4.multiply(matrix, mat4.xRotation(angleInRadians));
		},
		
		xRotation: function(angleInRadians){
			var c = Math.cos(angleInRadians);
			var s = Math.sin(angleInRadians);
			
			return [
				1, 0, 0, 0,
				0, c, -s, 0,
				0, s, c, 0,
				0, 0, 0, 1
			];
		},
		
		yRotate: function(matrix, angleInRadians){
			return mat4.multiply(matrix, mat4.yRotation(angleInRadians));
		},
		
		yRotation: function(angleInRadians){
			var c = Math.cos(angleInRadians);
			var s = Math.sin(angleInRadians);
			
			return [
				c, 0, s, 0,
				0, 1, 0, 0,
				-s, 0, c, 0,
				0, 0, 0, 1
			];
		},
		
		zRotate: function(matrix, angleInRadians){
			return mat4.multiply(matrix, mat4.zRotation(angleInRadians));
		},
		
		zRotation: function(angleInRadians){
			var c = Math.cos(angleInRadians);
			var s = Math.sin(angleInRadians);
			
			return [
				c, -s, 0, 0,
				s, c, 0, 0,
				0, 0, 1, 0,
				0, 0, 0, 1
			];
		},
		
		
		
		
		
		getCanvasTm: function(tm) {
			return [ tm[_00], tm[_10], tm[_20], tm[_30],
				tm[_01], tm[_11], tm[_21], tm[_31],
				tm[_02], tm[_12], tm[_22], tm[_32],
				tm[_03], tm[_13], tm[_23], tm[_33] ];
		}
};

function radToDeg(r){
	return r * 180/Math.PI;
}

function degToRad(d){
	return d * Math.PI/180;
}

let _00 = 0;
let _01 = 1;
let _02 = 2;
let _03 = 3;
let _10 = 4;
let _11 = 5;
let _12 = 6;
let _13 = 7;
let _20 = 8;
let _21 = 9;
let _22 = 10;
let _23 = 11;
let _30 = 12;
let _31 = 13;
let _32 = 14;
let _33 = 15;

