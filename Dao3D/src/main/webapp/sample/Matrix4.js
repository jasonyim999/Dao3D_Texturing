/**
 * @exports aconif.cmn.geo.Matrix
 * @since 1.0.0
 * @copyright (주)씨엔지솔루션 모든 권리 보유. C&G Solution Inc. All rights reserved.
 */

//let __pkg = "aconif.cmn.geo";
//let __clssid = __pkg + ".Matrix";

//// @ACONIF package
//aconif.Clss.pkg(__pkg);

//// @ACONIF import
//let Geom = aconif.cmn.geo.Geom;


class Matrix4{
	static get clssid(){return __clssid;}
	
	/**
	 * @method affix
	 * @public
	 * @static
	 * @param {aconif.cmn.geo.Matrix} tm - 기존 매트릭스
	 * @param {aconif.cmn.geo.Matrix} src - 변환 매트릭스
	 * @description 기존 매트릭스 뒤에 변환 매트릭스를 곱한다.
	 */
	static affix(tm, src) {
		if (tm._identical) {
			set(tm, src);00
		} else if (src._identical) {
			// nothing to do
		} else {
			// 기존 매트릭스 값을 임시변수에 복사
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
			
			// 변환 매트릭스
			let t00 = src[_00];
			let t01 = src[_01];
			let t02 = src[_02];
			let t03 = scr[_03];
			
			let t10 = src[_10];
			let t11 = src[_11];
			let t12 = src[_12];
			let t13 = src[_13];
			
			let t20 = src[_20];
			let t21 = src[_21];
			let t22 = src[_22];
			let t23 = src[_23];
			
			// 기존 매트릭스 뒤에 변환 매트릭스 곱하기
			// [ e00, e01, e02, e03 ] x [ t00, t01, t02, t03 ] = [ e00 * t00 + e01 * t10 + e02 * t20, e00 * t01 + e01 * t11 + e02 * t21, e00 * t02 + e01 * t12 + e02 * t22, e00 * t03 + e01 * t13 + e02 * t23 + e03 ]
			// [ e10, e11, e12, e13 ] x [ t10, t11, t12, t13 ] = [ e10 * t00 + e11 * t10 + e12 * t20, e10 * t01 + e11 * t11 + e12 * t21, e10 * t02 + e11 * t12 + e12 * t22, e10 * t03 + e11 * t13 + e12 * t23 + e13 ]
			// [ e20, e21, e22, e23 ] x [ t20, t21, t22, t23 ] = [ e20 * t00 + e21 * t10 + e22 * t20, e20 * t01 + e21 * t11 + e22 * t21, e20 * t02 + e21 * t12 + e22 * t22, e20 * t03 + e21 * t13 + e22 * t23 + e23 ]
			// [   0,   0,   0,   1 ] x [   0,   0,   0,   1 ] = [ e30 * t00 + e31 * t10 + e32 * t20, e30 * t01 + e31 * t11 + e32 * t21, e30 * t02 + e31 * t12 + e32 * t22, e30 * t03 + e31 * t13 + e32 * t23 + e33 ]
			tm[_00] = e00 * t00 + e01 * t10 + e02 * t20;	tm[_01] = e00 * t01 + e01 * t11 + e02 * t21;	tm[_02] = e00 * t02 + e01 * t12 + e02 * t22;	tm[_03] = e00 * t03 + e01 * t13 + e02 * t23 + e03;
			tm[_10] = e10 * t00 + e11 * t10 + e12 * t20;	tm[_11] = e10 * t01 + e11 * t11 + e12 * t21; tm[_12] = e10 * t02 + e11 * t12 + e12 * t22;	tm[_13] = e10 * t03 + e11 * t13 + e12 * t23 + e13;
			tm[_20] = e20 * t00 + e21 * t10 + e22 * t20;	tm[_21] = e20 * t01 + e21 * t11 + e22 * t21;	tm[_22] = e20 * t02 + e21 * t12 + e22 * t22;	tm[_23] = e20 * t03 + e21 * t13 + e22 * t23 + e23;
			tm[_30] = e30 * t00 + e31 * t10 + e32 * t20;	tm[_32] = e30 * t01 + e31 * t11 + e32 * t21;	tm[_32] = e30 * t02 + e31 * t12 + e32 * t22;	tm[_33] = e30 * t03 + e31 * t13 + e32 * t23 + e33;
			Matrix.checkIdentical(tm);
		}
	}
	
	/**
	 * @method prefix
	 * @public
	 * @static
	 * @param {aconif.cmn.geo.Matrix} tm - 기존 매트릭스
	 * @param {aconif.cmn.geo.Matrix} src - 변환 매트릭스
	 * @description 기존 매트릭스 앞에 변환 매트릭스를 곱한다.
	 */
	static prefix(tm, src) {
		if (tm._identical) {
			set(tm, src);
		} else if (src._identical) {
			// nothing to do
		} else {
			// 기존 매트릭스 값을 임시변수에 복사
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
			
			// 기존 매트릭스 뒤에 변환 매트릭스 곱하기
			// [ t00, t01, t02, t03 ] x [ e00, e01, e02, e03 ] = [ t00 * e00 + t01 * e10 + t02 * e20, t00 * e01 + t01 * e11 + t02 * e21, t00 * e02 + t01 * e12 + t02 * e22, t00 * e03 + t01 * e13 + t02 * e23 + t03 ]
			// [ t10, t11, t12, t13 ] x [ e10, e11, e12, e13 ] = [ t10 * e00 + t11 * e10 + t12 * e20, t10 * e01 + t11 * e11 + t12 * e21, t10 * e02 + t11 * e12 + t12 * e22, t10 * e03 + t11 * e13 + t12 * e23 + t13 ]
			// [ t20, t21, t22, t23 ] x [ e20, e21, e22, e23 ] = [ t20 * e00 + t21 * e10 + t22 * e20, t20 * e01 + t21 * e11 + t22 * e21, t20 * e02 + t21 * e12 + t22 * e22, t20 * e03 + t21 * e13 + t22 * e23 + t23 ]
			// [   0,   0,   0,   1 ] x [   0,   0,   0,   1 ] = [ t30 * e00 + t31 * e10 + t32 * e20, t30 * e01 + t31 * e11 + t32 * e21, t30 * e02 + t31 * e12 + t32 * e22, t30 * e03 + t31 * e13 + t32 * e23 + t33 ]
			tm[_00] = t00 * e00 + t01 * e10 + t02 * e20;	tm[_01] = t00 * e01 + t01 * e11 + t02 * e21;	tm[_02] = t00 * e02 + t01 * e12 + t02 * e22;	tm[_03] = t00 * e03 + t01 * e13 + t02 * e23 + t03;
			tm[_10] = t10 * e00 + t11 * e10 + t12 * e20;	tm[_11] = t10 * e01 + t11 * e11 + t12 * e21; 	tm[_12] = t10 * e02 + t11 * e12 + t12 * e22;	tm[_13] = t10 * e03 + t11 * e13 + t12 * e23 + t13;
			tm[_20] = t20 * e00 + t21 * e10 + t22 * e20;	tm[_21] = t20 * e01 + t21 * e11 + t22 * e21;	tm[_22] = t20 * e02 + t21 * e12 + t22 * e22;	tm[_23] = t20 * e03 + t21 * e13 + t22 * e23 + t23;
			tm[_30] = t30 * e00 + t31 * e10 + t32 * e20;	tm[_22] = t30 * e01 + t31 * e11 + t32 * e21;	tm[_32] = t30 * e02 + t31 * e12 + t32 * e22;	tm[_33] = t30 * e03 + t31 * e13 + t32 * e23 + t33;
			Matrix.checkIdentical(tm);
		}
	}
	
	
	/**
	 * @method checkIdentical
	 * @public
	 * @static
	 * @param {aconif.cmn.geo.Matrix} tm - 상태를 확인할 매트릭스
	 * @returns {boolean} 매트릭스 내용 재확인 결과 identical 상태이면 true를 리턴하고
	 *		아니면 false를 리턴한다.
	 *
	 * @description 매트릭스 내용이 identical 상태인지 재확인하고 상태값을 얻는다.
	 */
	static checkIdentical(tm) {
		tm._identical = (
			tm[_00] == 1.0 && tm[_01] == 0.0 && tm[_02] == 0.0 && tm[_03] == 0.0 &&
			tm[_10] == 0.0 && tm[_11] == 1.0 && tm[_12] == 0.0 && tm[_13] == 0.0 &&
			tm[_20] == 0.0 && tm[_21] == 0.0 && tm[_22] == 1.0 && tm[_23] == 0.0);
		return tm._identical;
	}

	/**
	 * @method determinant
	 * @public
	 * @static
	 * @param {aconif.cmn.geo.Matrix} tm - determinant 값을 얻을 매트릭스
	 * @returns {number} 매트릭스 내용의 determinant 값을 리턴한다.
	 * @description 매트릭스 내용의 determinant 값을 얻는다.
	 */
	static determinant(tm) {
		/*
		 * determinant
		 *  
		 *	      [ _00, _01, _02 ]     =  _00 * _11 *   1 - _00 *   0 * _12   =  _00 * _11
		 *	      [ _10, _11, _12 ]      + _10 *   0 * _02 -   0 * _11 * _02
		 *	det ( [   0,   0,   1 ] )    +   0 * _01 * _12 - _10 * _01 *   1    - _10 * _01
		 */
		return (tm[_00] * (tm[_11] * (tm[_22] * tm[_33] - tm[_23] * tm[_32]) - tm[_12] * (tm[_21] * tm[_33] - tm[_23] * tm[_31]) + tm[_13] * (tm[_21] * tm[_32] - tm[_22] * tm[_31]))
			  - tm[_01] * (tm[_10] * (tm[_22] * tm[_33] - tm[_23] * tm[_32]) - tm[_12] * (tm[_20] * tm[_33] - tm[_23] * tm[_30]) + tm[_13] * (tm[_20] * tm[_32] - tm[_22] * tm[_30]))
			  + tm[_02] * (tm[_10] * (tm[_21] * tm[_33] - tm[_23] * tm[_31]) - tm[_11] * (tm[_20] * tm[_33] - tm[_23] * tm[_30]) + tm[_13] * (tm[_20] * tm[_31] - tm[_21] * tm[_30]))
			  - tm[_03] * (tm[_10] * (tm[_21] * tm[_32] - tm[_22] * tm[_31]) - tm[_11] * (tm[_20] * tm_[32] - tm[_22] * tm[_30]) + tm[_12] * (tm[_20] * tm[_31] - tm[_21] * tm[_30]))
		);
	} 

	
	/**
	 * @method equals
	 * @public
	 * @static
	 * @param {aconif.cmn.geo.Matrix} tm1 - 기존 매트릭스
	 * @param {aconif.cmn.geo.Matrix} tm2 - 비교대상 매트릭스
	 * @returns {boolean} 기존 매트릭스와 비교대상 매트릭스 내용이 같으면 true를 리턴하고,
	 *		다르면 false를 리턴한다.
	 * @description 기존 매트릭스와 비교대상 매트릭스 내용이 같은지 확인한다.
	 *		비교대상 매트릭스가 null이면 identical로 간주하고 내용이 같은지 확인한다.
	 */
	
	static equals(tm1, tm2) {
		if (tm2 == null) {
			return tm1._identical;
		} else {
			return (tm1._identical == tm2._identical
				&& tm1[_00] == tm2[_00]
				&& tm1[_01] == tm2[_01]
				&& tm1[_02] == tm2[_02]
				&& tm1[_03] == tm2[_03]
				&& tm1[_10] == tm2[_10]
				&& tm1[_11] == tm2[_11]
				&& tm1[_12] == tm2[_12]
				&& tm1[_13] == tm2[_13]
				&& tm1[_20] == tm2[_20]
				&& tm1[_21] == tm2[_21]
				&& tm1[_22] == tm2[_22]
				&& tm1[_23] == tm2[_23]
			);
		}
	}
	
	/**
	 * @method getTransformScale
	 * @public
	 * @static
	 * @param {aconif.cmn.geo.Matrix} tm - scale 되는 크기를 계산할 매트릭스
	 * @returns {number} 매트릭스 적용시 scale 되는 크기를 계산하여 리턴한다.
	 * @description 매트릭스 적용시 scale 되는 크기를 계산한다.
	 *		두 점 (0, 0) ~ (1, 0)을 매트릭스로 변환한 후 거리를 계산하여 리턴한다.
	 */
	static getTransformScale(tm) {
		let p0 = [0, 0, 0];
		let p1 = [1, 0, 0];
		transformPoint(tm, p0, p0);
		transformPoint(tm, p1, p1);
		return Geom.dsts(p0[0], p0[1], p1[0], p1[1]);
	}
	
	/**
	 * @method transformPoint
	 * @public
	 * @static
	 * @param {aconif.cmn.geo.Matrix} tm - 기존 매트릭스.
	 * @param {number}[2] p - 매트릭스 변환 대상 좌표
	 * @param {number}[2] ret - 매트릭스 변환 결과를 저장하여 리턴한다.
	 * @description 한 점을 매트릭스 변환한 좌표를 얻는다.
	 */
	static transformPoint(tm, p, ret) {
		//[ _00, _01, _02, _03 ]   [ x ]   [ _00 * x + _01 * y + _02 * z + _03 ]
		//[ _10, _11, _12, _13 ]   [ y ]   [ _10 * x + _11 * y + _12 * z + _13 ]
		//[ _20, _21, _22, _23 ]   [ z ]   [ _20 * x + _21 * y + _22 * z + _23 ]
		//[   0,   0,   0,   1 ] x [ 1 ] = [                                 1 ]
		let x = tm[_00] * p[0] + tm[_01] * p[1] + tm[_02] * p[2] + tm[_03];
		let y = tm[_10] * p[0] + tm[_11] * p[1] + tm[_12] * p[2] + tm[_13];
		let z = tm[_20] * p[0] + tm[_21] * p[1] + tm[_22] * p[2] + tm[_23];
		ret[0] = x;
		ret[1] = y;
		ret[2] = z;
	}
	
	/**
	 * @method transformPointData
	 * @public
	 * @static
	 * @param {aconif.cmn.geo.Matrix} tm - 기존 매트릭스.
	 * @param {{aconif.cmn.geo.$PointData} || {aconif.cmn.geo.$PointData[]}} p - 매트릭스 변환 대상 좌표
	 * @param {{aconif.cmn.geo.$PointData} || {aconif.cmn.geo.$PointData[]}} ret - 매트릭스 변환 결과를 저장하여 리턴한다.
	 * @description aconif.cmn.geo.$PointData 형식의 한 점을 매트릭스 변환한 좌표를 얻는다. p와 ret의 자료형은 같아야 한다.
	 */
	static transformPointData(tm, p, ret) {
		//[ _00, _01, _02, _03 ]   [ x ]   [ _00 * x + _01 * y + _02 * z + _03 ]
		//[ _10, _11, _12, _13 ]   [ y ]   [ _10 * x + _11 * y + _12 * z + _13 ]
		//[ _20, _21, _22, _23 ]   [ z ]   [ _20 * x + _21 * y + _22 * z + _23 ]
		//[   0,   0,   0,   1 ] x [ 1 ] = [                                 1 ]

		let x, y, z;
		let pa = Array.isArray(p);
		let ra = Array.isArray(ret);

		if (pa && ra) {
			let count = p.length;
			let idx;
			let tm00 = tm[_00];
			let tm01 = tm[_01];
			let tm02 = tm[_02];
			let tm03 = tm[_03];
			let tm10 = tm[_10];
			let tm11 = tm[_11];
			let tm12 = tm[_12];
			let tm13 = tm[_13];
			let tm20 = tm[_20];
			let tm21 = tm[_21];
			let tm22 = tm[_22];
			let tm23 = tm[_23];

			for (idx = 0; idx < count; idx++) {
				x = p[idx].x;
				y = p[idx].y;
				z = p[idx].z;
				ret[idx].x = tm00 * x + tm01 * y + tm02 * z + tm03;
				ret[idx].y = tm10 * x + tm11 * y + tm12 * z + tm13;
				ret[idx].z = tm20 * x + tm21 * y + tm22 * z + tm23;
			}
		} else if (!pa && !ra) {
			x = p.x;
			y = p.y;
			z = p.z;
			ret.x = tm[_00] * x + tm[_01] * y + tm[_02] * z + tm[_03];
			ret.y = tm[_10] * x + tm[_11] * y + tm[_12] * z + tm[_13];
			ret.z = tm[_20] * x + tm[_21] * y + tm[_22] * z + tm[_23];
		} else {
			// throw exception
		}
	}
	
	/**
	 * @method rotate_X
	 * @public
	 * @static
	 * @param {aconif.cmn.geo.Matrix} tm - 기존 매트릭스
	 * @param {number} deg - 회전할 각도 (도 단위) 
	 * @param {number} y - 회전 중심점의 Y 좌표
	 * @param {number} z - 회전 중심점의 Z 좌표
	 * @param {boolean} prefix - 값이 true이면 회전 매트릭스를 현재 매트릭스 앞에 곱하고,
	 *		값이 false이면 뒤에 곱한다.
	 * @description 현재 매트릭스 내용을 (x,y,z)에서 Y축 방향0을 중심으로 deg 만큼 회전한 매트릭스를 곱한 매트릭스로 변경한다. 
	 */
	
	static rotate_Y(tm, deg, y, z, prefix) {
		let rd = deg * Geom.TO_RAD;
		let c = Math.cos(rd);
		let s = Math.sin(rd);

		if (tm._identical) {
			
			tm[_11] = c;
			tm[_12] = -s;
			tm[_13] = y * (1 - c) + z * s;
			tm[_21] = s;
			tm[_22] = c;
			tm[_23] = -y * s + z * (1 - c);
			
		} else {
			// 기존 매트릭스 값을 임시변수에 복사
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

			// T(x, y) * R(deg) * T(-x, -y, -z) 변환 매트릭스 값 계산
			let t00 = 1;
			let t01 = 0;
			let t02 = 0;
			let t03 = 0;
			let t10 = 0;
			let t11 = c;
			let t12 = -s;
			let t13 = y * (1 - c) + z * s;
			let t20 = 0;
			let t21 = s;
			let t22 = c;
			let t23 = -y * s + z * (1 - c);
			
			if (prefix) {
				// 기존 매트릭스 뒤에 변환 매트릭스 곱하기
				// [ t00, t01, t02, t03 ] x [ e00, e01, e02, e03 ] = [ t00 * e00 + t01 * e10 + t02 * e20, t00 * e01 + t01 * e11 + t02 * e21, t00 * e02 + t01 * e12 + t02 * e22, t00 * e03 + t01 * e13 + t02 * e23 + t03 ]
				// [ t10, t11, t12, t13 ] x [ e10, e11, e12, e13 ] = [ t10 * e00 + t11 * e10 + t12 * e20, t10 * e01 + t11 * e11 + t12 * e21, t10 * e02 + t11 * e12 + t12 * e22, t10 * e03 + t11 * e13 + t12 * e23 + t13 ]
				// [ t20, t21, t22, t23 ] x [ e20, e21, e22, e23 ] = [ t20 * e00 + t21 * e10 + t22 * e20, t20 * e01 + t21 * e11 + t22 * e21, t20 * e02 + t21 * e12 + t22 * e22, t20 * e03 + t21 * e13 + t22 * e23 + t23 ]
				// [   0,   0,   0,   1 ] x [   0,   0,   0,   1 ] = [ t30 * e00 + t31 * e10 + t32 * e20, t30 * e01 + t31 * e11 + t32 * e21, t30 * e02 + t31 * e12 + t32 * e22, t30 * e03 + t31 * e13 + t32 * e23 + t33 ]
				tm[_00] = t00 * e00 + t01 * e10 + t02 * e20;	tm[_01] = t00 * e01 + t01 * e11 + t02 * e21;	tm[_02] = t00 * e02 + t01 * e12 + t02 * e22;	tm[_03] = t00 * e03 + t01 * e13 + t02 * e23 + t03;
				tm[_10] = t10 * e00 + t11 * e10 + t12 * e20;	tm[_11] = t10 * e01 + t11 * e11 + t12 * e21; 	tm[_12] = t10 * e02 + t11 * e12 + t12 * e22;	tm[_13] = t10 * e03 + t11 * e13 + t12 * e23 + t13;
				tm[_20] = t20 * e00 + t21 * e10 + t22 * e20;	tm[_21] = t20 * e01 + t21 * e11 + t22 * e21;	tm[_22] = t20 * e02 + t21 * e12 + t22 * e22;	tm[_23] = t20 * e03 + t21 * e13 + t22 * e23 + t23;
			} else {
				// 기존 매트릭스 뒤에 변환 매트릭스 곱하기
				// [ e00, e01, e02, e03 ] x [ t00, t01, t02, t03 ] = [ e00 * t00 + e01 * t10 + e02 * t20, e00 * t01 + e01 * t11 + e02 * t21, e00 * t02 + e01 * t12 + e02 * t22, e00 * t03 + e01 * t13 + e02 * t23 + e03 ]
				// [ e10, e11, e12, e13 ] x [ t10, t11, t12, t13 ] = [ e10 * t00 + e11 * t10 + e12 * t20, e10 * t01 + e11 * t11 + e12 * t21, e10 * t02 + e11 * t12 + e12 * t22, e10 * t03 + e11 * t13 + e12 * t23 + e13 ]
				// [ e20, e21, e22, e23 ] x [ t20, t21, t22, t23 ] = [ e20 * t00 + e21 * t10 + e22 * t20, e20 * t01 + e21 * t11 + e22 * t21, e20 * t02 + e21 * t12 + e22 * t22, e20 * t03 + e21 * t13 + e22 * t23 + e23 ]
				// [   0,   0,   0,   1 ] x [   0,   0,   0,   1 ] = [ e30 * t00 + e31 * t10 + e32 * t20, e30 * t01 + e31 * t11 + e32 * t21, e30 * t02 + e31 * t12 + e32 * t22, e30 * t03 + e31 * t13 + e32 * t23 + e33 ]
				tm[_00] = e00 * t00 + e01 * t10 + e02 * t20;	tm[_01] = e00 * t01 + e01 * t11 + e02 * t21;	tm[_02] = e00 * t02 + e01 * t12 + e02 * t22;	tm[_03] = e00 * t03 + e01 * t13 + e02 * t23 + e03;
				tm[_10] = e10 * t00 + e11 * t10 + e12 * t20;	tm[_11] = e10 * t01 + e11 * t11 + e12 * t21; 	tm[_12] = e10 * t02 + e11 * t12 + e12 * t22;	tm[_13] = e10 * t03 + e11 * t13 + e12 * t23 + e13;
				tm[_20] = e20 * t00 + e21 * t10 + e22 * t20;	tm[_21] = e20 * t01 + e21 * t11 + e22 * t21;	tm[_22] = e20 * t02 + e21 * t12 + e22 * t22;	tm[_23] = e20 * t03 + e21 * t13 + e22 * t23 + e23;
			}
		}
		Matrix.checkIdentical(tm);
	}
	
	
	/**
	 * @method rotate_Y
	 * @public
	 * @static
	 * @param {aconif.cmn.geo.Matrix} tm - 기존 매트릭스
	 * @param {number} deg - 회전할 각도 (도 단위) 
	 * @param {number} x - 회전 중심점의 X 좌표
	 * @param {number} z - 회전 중심점의 Z 좌표
	 * @param {boolean} prefix - 값이 true이면 회전 매트릭스를 현재 매트릭스 앞에 곱하고,
	 *		값이 false이면 뒤에 곱한다.
	 * @description 현재 매트릭스 내용을 (x,y,z)에서 Y축 방향0을 중심으로 deg 만큼 회전한 매트릭스를 곱한 매트릭스로 변경한다. 
	 */
	
	static rotate_Y(tm, deg, x, z, prefix) {
		let rd = deg * Geom.TO_RAD;
		let c = Math.cos(rd);
		let s = Math.sin(rd);

		if (tm._identical) {
			
			tm[_00] = c;
			tm[_02] = s;
			tm[_03] = x * (1 - c) - z * s;
			tm[_20] = -s;
			tm[_22] = c;
			tm[_23] = x * s + z * (1 - c);
			
		} else {
			// 기존 매트릭스 값을 임시변수에 복사
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

			// T(x, y) * R(deg) * T(-x, -y, -z) 변환 매트릭스 값 계산
			let t00 = c;
			let t01 = 0;
			let t02 = s;
			let t03 = x * (1 - c) - z * s;
			let t10 = 0;
			let t11 = 1;
			let t12 = 0;
			let t13 = 0;
			let t20 = -s;
			let t21 = 0;
			let t22 = c;
			let t23 = x * s + z * (1 - c);
			
			if (prefix) {
				// 기존 매트릭스 뒤에 변환 매트릭스 곱하기
				// [ t00, t01, t02, t03 ] x [ e00, e01, e02, e03 ] = [ t00 * e00 + t01 * e10 + t02 * e20, t00 * e01 + t01 * e11 + t02 * e21, t00 * e02 + t01 * e12 + t02 * e22, t00 * e03 + t01 * e13 + t02 * e23 + t03 ]
				// [ t10, t11, t12, t13 ] x [ e10, e11, e12, e13 ] = [ t10 * e00 + t11 * e10 + t12 * e20, t10 * e01 + t11 * e11 + t12 * e21, t10 * e02 + t11 * e12 + t12 * e22, t10 * e03 + t11 * e13 + t12 * e23 + t13 ]
				// [ t20, t21, t22, t23 ] x [ e20, e21, e22, e23 ] = [ t20 * e00 + t21 * e10 + t22 * e20, t20 * e01 + t21 * e11 + t22 * e21, t20 * e02 + t21 * e12 + t22 * e22, t20 * e03 + t21 * e13 + t22 * e23 + t23 ]
				// [   0,   0,   0,   1 ] x [   0,   0,   0,   1 ] = [ t30 * e00 + t31 * e10 + t32 * e20, t30 * e01 + t31 * e11 + t32 * e21, t30 * e02 + t31 * e12 + t32 * e22, t30 * e03 + t31 * e13 + t32 * e23 + t33 ]
				tm[_00] = t00 * e00 + t01 * e10 + t02 * e20;	tm[_01] = t00 * e01 + t01 * e11 + t02 * e21;	tm[_02] = t00 * e02 + t01 * e12 + t02 * e22;	tm[_03] = t00 * e03 + t01 * e13 + t02 * e23 + t03;
				tm[_10] = t10 * e00 + t11 * e10 + t12 * e20;	tm[_11] = t10 * e01 + t11 * e11 + t12 * e21; 	tm[_12] = t10 * e02 + t11 * e12 + t12 * e22;	tm[_13] = t10 * e03 + t11 * e13 + t12 * e23 + t13;
				tm[_20] = t20 * e00 + t21 * e10 + t22 * e20;	tm[_21] = t20 * e01 + t21 * e11 + t22 * e21;	tm[_22] = t20 * e02 + t21 * e12 + t22 * e22;	tm[_23] = t20 * e03 + t21 * e13 + t22 * e23 + t23;
			} else {
				// 기존 매트릭스 뒤에 변환 매트릭스 곱하기
				// [ e00, e01, e02, e03 ] x [ t00, t01, t02, t03 ] = [ e00 * t00 + e01 * t10 + e02 * t20, e00 * t01 + e01 * t11 + e02 * t21, e00 * t02 + e01 * t12 + e02 * t22, e00 * t03 + e01 * t13 + e02 * t23 + e03 ]
				// [ e10, e11, e12, e13 ] x [ t10, t11, t12, t13 ] = [ e10 * t00 + e11 * t10 + e12 * t20, e10 * t01 + e11 * t11 + e12 * t21, e10 * t02 + e11 * t12 + e12 * t22, e10 * t03 + e11 * t13 + e12 * t23 + e13 ]
				// [ e20, e21, e22, e23 ] x [ t20, t21, t22, t23 ] = [ e20 * t00 + e21 * t10 + e22 * t20, e20 * t01 + e21 * t11 + e22 * t21, e20 * t02 + e21 * t12 + e22 * t22, e20 * t03 + e21 * t13 + e22 * t23 + e23 ]
				// [   0,   0,   0,   1 ] x [   0,   0,   0,   1 ] = [ e30 * t00 + e31 * t10 + e32 * t20, e30 * t01 + e31 * t11 + e32 * t21, e30 * t02 + e31 * t12 + e32 * t22, e30 * t03 + e31 * t13 + e32 * t23 + e33 ]
				tm[_00] = e00 * t00 + e01 * t10 + e02 * t20;	tm[_01] = e00 * t01 + e01 * t11 + e02 * t21;	tm[_02] = e00 * t02 + e01 * t12 + e02 * t22;	tm[_03] = e00 * t03 + e01 * t13 + e02 * t23 + e03;
				tm[_10] = e10 * t00 + e11 * t10 + e12 * t20;	tm[_11] = e10 * t01 + e11 * t11 + e12 * t21; 	tm[_12] = e10 * t02 + e11 * t12 + e12 * t22;	tm[_13] = e10 * t03 + e11 * t13 + e12 * t23 + e13;
				tm[_20] = e20 * t00 + e21 * t10 + e22 * t20;	tm[_21] = e20 * t01 + e21 * t11 + e22 * t21;	tm[_22] = e20 * t02 + e21 * t12 + e22 * t22;	tm[_23] = e20 * t03 + e21 * t13 + e22 * t23 + e23;
			}
		}
		Matrix.checkIdentical(tm);
	}
	
	/**
	 * @method rotate_Z
	 * @public
	 * @static
	 * @param {aconif.cmn.geo.Matrix} tm - 기존 매트릭스
	 * @param {number} deg - 회전할 각도 (도 단위) 
	 * @param {number} x - 회전 중심점의 X 좌표
	 * @param {number} y - 회전 중심점의 Y 좌표
	 * @param {boolean} prefix - 값이 true이면 회전 매트릭스를 현재 매트릭스 앞에 곱하고,
	 *		값이 false이면 뒤에 곱한다.
	 * @description 현재 매트릭스 내용을 (x,y,z)에서 Z축 방향0을 중심으로 deg 만큼 회전한 매트릭스를 곱한 매트릭스로 변경한다. 
	 */
	static rotate_Z(tm, deg, x, y, prefix) {
		let rd = deg * Geom.TO_RAD;
		let c = Math.cos(rd);
		let s = Math.sin(rd);

		if (tm._identical) {
			
			tm[_00] = c;
			tm[_01] = -s;
			tm[_03] = x * (1 - c) + y * s;
			tm[_10] = s;
			tm[_11] = c;
			tm[_13] = y * (1 - c) - x * s;

			
		} else {
			// 기존 매트릭스 값을 임시변수에 복사
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

			// T(x, y) * R(deg) * T(-x, -y, -z) 변환 매트릭스 값 계산
			let t00 = c;
			let t01 = -s;
			let t02 = 0;
			let t03 = x * (1 - c) + y * s;
			let t10 = s;
			let t11 = c;
			let t12 = 0;
			let t13 = y * (1 - c) - x * s;
			let t20 = 0;
			let t21 = 0;
			let t22 = 1;
			let t23 = 0;
			
			if (prefix) {
				// 기존 매트릭스 뒤에 변환 매트릭스 곱하기
				// [ t00, t01, t02, t03 ] x [ e00, e01, e02, e03 ] = [ t00 * e00 + t01 * e10 + t02 * e20, t00 * e01 + t01 * e11 + t02 * e21, t00 * e02 + t01 * e12 + t02 * e22, t00 * e03 + t01 * e13 + t02 * e23 + t03 ]
				// [ t10, t11, t12, t13 ] x [ e10, e11, e12, e13 ] = [ t10 * e00 + t11 * e10 + t12 * e20, t10 * e01 + t11 * e11 + t12 * e21, t10 * e02 + t11 * e12 + t12 * e22, t10 * e03 + t11 * e13 + t12 * e23 + t13 ]
				// [ t20, t21, t22, t23 ] x [ e20, e21, e22, e23 ] = [ t20 * e00 + t21 * e10 + t22 * e20, t20 * e01 + t21 * e11 + t22 * e21, t20 * e02 + t21 * e12 + t22 * e22, t20 * e03 + t21 * e13 + t22 * e23 + t23 ]
				// [   0,   0,   0,   1 ] x [   0,   0,   0,   1 ] = [ t30 * e00 + t31 * e10 + t32 * e20, t30 * e01 + t31 * e11 + t32 * e21, t30 * e02 + t31 * e12 + t32 * e22, t30 * e03 + t31 * e13 + t32 * e23 + t33 ]
				tm[_00] = t00 * e00 + t01 * e10 + t02 * e20;	tm[_01] = t00 * e01 + t01 * e11 + t02 * e21;	tm[_02] = t00 * e02 + t01 * e12 + t02 * e22;	tm[_03] = t00 * e03 + t01 * e13 + t02 * e23 + t03;
				tm[_10] = t10 * e00 + t11 * e10 + t12 * e20;	tm[_11] = t10 * e01 + t11 * e11 + t12 * e21; 	tm[_12] = t10 * e02 + t11 * e12 + t12 * e22;	tm[_13] = t10 * e03 + t11 * e13 + t12 * e23 + t13;
				tm[_20] = t20 * e00 + t21 * e10 + t22 * e20;	tm[_21] = t20 * e01 + t21 * e11 + t22 * e21;	tm[_22] = t20 * e02 + t21 * e12 + t22 * e22;	tm[_23] = t20 * e03 + t21 * e13 + t22 * e23 + t23;
			} else {
				// 기존 매트릭스 뒤에 변환 매트릭스 곱하기
				// [ e00, e01, e02, e03 ] x [ t00, t01, t02, t03 ] = [ e00 * t00 + e01 * t10 + e02 * t20, e00 * t01 + e01 * t11 + e02 * t21, e00 * t02 + e01 * t12 + e02 * t22, e00 * t03 + e01 * t13 + e02 * t23 + e03 ]
				// [ e10, e11, e12, e13 ] x [ t10, t11, t12, t13 ] = [ e10 * t00 + e11 * t10 + e12 * t20, e10 * t01 + e11 * t11 + e12 * t21, e10 * t02 + e11 * t12 + e12 * t22, e10 * t03 + e11 * t13 + e12 * t23 + e13 ]
				// [ e20, e21, e22, e23 ] x [ t20, t21, t22, t23 ] = [ e20 * t00 + e21 * t10 + e22 * t20, e20 * t01 + e21 * t11 + e22 * t21, e20 * t02 + e21 * t12 + e22 * t22, e20 * t03 + e21 * t13 + e22 * t23 + e23 ]
				// [   0,   0,   0,   1 ] x [   0,   0,   0,   1 ] = [ e30 * t00 + e31 * t10 + e32 * t20, e30 * t01 + e31 * t11 + e32 * t21, e30 * t02 + e31 * t12 + e32 * t22, e30 * t03 + e31 * t13 + e32 * t23 + e33 ]
				tm[_00] = e00 * t00 + e01 * t10 + e02 * t20;	tm[_01] = e00 * t01 + e01 * t11 + e02 * t21;	tm[_02] = e00 * t02 + e01 * t12 + e02 * t22;	tm[_03] = e00 * t03 + e01 * t13 + e02 * t23 + e03;
				tm[_10] = e10 * t00 + e11 * t10 + e12 * t20;	tm[_11] = e10 * t01 + e11 * t11 + e12 * t21; 	tm[_12] = e10 * t02 + e11 * t12 + e12 * t22;	tm[_13] = e10 * t03 + e11 * t13 + e12 * t23 + e13;
				tm[_20] = e20 * t00 + e21 * t10 + e22 * t20;	tm[_21] = e20 * t01 + e21 * t11 + e22 * t21;	tm[_22] = e20 * t02 + e21 * t12 + e22 * t22;	tm[_23] = e20 * t03 + e21 * t13 + e22 * t23 + e23;
			}
		}
		Matrix.checkIdentical(tm);
	}

	/**
	 * @method rotateAt
	 * @public
	 * @static
	 * @param {number}[2] refp - 회전 중심점
	 * @param {number} ang - 회전 각도(도)
	 * @param {aconif.cmn.geo.Coord} ptSrc - 회전 대상 좌표열
	 * @param {number} srcOff- 회전 대상 좌표 시작 인덱스
	 * @param {aconif.cmn.geo.Coord} ptDst - 회전 결과 저장 좌표열
	 * @param {number} dstOff - 회전 결과 저장 좌표 시작 인덱스
	 * @param {number} count - 회전 대상 점 갯수
	 * @description 회전 중심점(refp)를 중심으로 회전 대상 좌표열(ptSrc)을 회전 각도(ang) 만큼 회전한 좌표를 계산한다.
	 */
	static rotateAt(refp, ang, ptSrc, srcOff, ptDst, dstOff, count) {
		let tm = [];
		Matrix.rotate_X(tm, ang, refp[1], refp[2], false);
		Matrix.rotate_Y(tm, ang, refp[0], refp[3], false);
		Matrix.rotate_Z(tm, ang, refp[0], refp[1], false);
		
		Matrix.transformCoord(tm, ptSrc, ptDst, srcOff, dstOff, count);
	}
	
	/**
	 * @method scale
	 * @public
	 * @static
	 * @param {aconif.cmn.geo.Matrix} tm - 기존 매트릭스
	 * @param {number} sx - X축 방향 확대/축소 배율 
	 * @param {number} sy - Y축 방향 확대/축소 배율 
	 * @param {number} sz - Z축 방향 확대/축소 배율 
	 * @param {number} x - 확대/축소 기준점의 X 좌표
	 * @param {number} y - 확대/축소 기준점의 Y 좌표
	 * @param {number} z - 확대/축소 기준점의 Z 좌표
	 * @param {boolean} prefix - 값이 true이면 확대/축소 매트릭스를 현재 매트릭스 앞에 곱하고,
	 *		값이 false이면 뒤에 곱한다.
	 * @description 현재 매트릭스 내용을 (x, y)를 중심으로 확대/축소한 만큼 회전한 매트릭스를 곱한 매트릭스로 변경한다. 
	 */
	static scale(tm, sx, sy, sz, x, y, z, prefix) {
		if (tm._identical) {
			tm[_00] = sx;
			tm[_03] = x * (1 - sx)
			tm[_11] = sy;
			tm[_13] = y * (1 - sy);
			tm[_22] = sz;
			tm[_23] = z * (1 - sz);

		} else {
			// 기존 매트릭스 값을 임시변수에 복사
			let e00 = tm[_00];
			let e01 = tm[_01];
			let e02 = tm[_02];
			let e10 = tm[_10];
			let e11 = tm[_11];
			let e12 = tm[_12];

			// T(x, y) * S(sx, sy) * T(-x, -y) 변환 매트릭스 값 계산
			let t00 = sx;
			let t01 = 0.0;
			let t02 = x * (1 - sx);
			let t10 = 0.0;
			let t11 = sy;
			let t12 = y * (1 - sy);

			if (prefix) {
				// 기존 매트릭스 뒤에 변환 매트릭스 곱하기
				// [ t00, t01, t02, t03 ] x [ e00, e01, e02, e03 ] = [ t00 * e00 + t01 * e10 + t02 * e20, t00 * e01 + t01 * e11 + t02 * e21, t00 * e02 + t01 * e12 + t02 * e22, t00 * e03 + t01 * e13 + t02 * e23 + t03 ]
				// [ t10, t11, t12, t13 ] x [ e10, e11, e12, e13 ] = [ t10 * e00 + t11 * e10 + t12 * e20, t10 * e01 + t11 * e11 + t12 * e21, t10 * e02 + t11 * e12 + t12 * e22, t10 * e03 + t11 * e13 + t12 * e23 + t13 ]
				// [ t20, t21, t22, t23 ] x [ e20, e21, e22, e23 ] = [ t20 * e00 + t21 * e10 + t22 * e20, t20 * e01 + t21 * e11 + t22 * e21, t20 * e02 + t21 * e12 + t22 * e22, t20 * e03 + t21 * e13 + t22 * e23 + t23 ]
				// [   0,   0,   0,   1 ] x [   0,   0,   0,   1 ] = [ t30 * e00 + t31 * e10 + t32 * e20, t30 * e01 + t31 * e11 + t32 * e21, t30 * e02 + t31 * e12 + t32 * e22, t30 * e03 + t31 * e13 + t32 * e23 + t33 ]
				tm[_00] = t00 * e00 + t01 * e10 + t02 * e20;	tm[_01] = t00 * e01 + t01 * e11 + t02 * e21;	tm[_02] = t00 * e02 + t01 * e12 + t02 * e22;	tm[_03] = t00 * e03 + t01 * e13 + t02 * e23 + t03;
				tm[_10] = t10 * e00 + t11 * e10 + t12 * e20;	tm[_11] = t10 * e01 + t11 * e11 + t12 * e21; 	tm[_12] = t10 * e02 + t11 * e12 + t12 * e22;	tm[_13] = t10 * e03 + t11 * e13 + t12 * e23 + t13;
				tm[_20] = t20 * e00 + t21 * e10 + t22 * e20;	tm[_21] = t20 * e01 + t21 * e11 + t22 * e21;	tm[_22] = t20 * e02 + t21 * e12 + t22 * e22;	tm[_23] = t20 * e03 + t21 * e13 + t22 * e23 + t23;
			} else {
				// 기존 매트릭스 뒤에 변환 매트릭스 곱하기
				// [ e00, e01, e02, e03 ] x [ t00, t01, t02, t03 ] = [ e00 * t00 + e01 * t10 + e02 * t20, e00 * t01 + e01 * t11 + e02 * t21, e00 * t02 + e01 * t12 + e02 * t22, e00 * t03 + e01 * t13 + e02 * t23 + e03 ]
				// [ e10, e11, e12, e13 ] x [ t10, t11, t12, t13 ] = [ e10 * t00 + e11 * t10 + e12 * t20, e10 * t01 + e11 * t11 + e12 * t21, e10 * t02 + e11 * t12 + e12 * t22, e10 * t03 + e11 * t13 + e12 * t23 + e13 ]
				// [ e20, e21, e22, e23 ] x [ t20, t21, t22, t23 ] = [ e20 * t00 + e21 * t10 + e22 * t20, e20 * t01 + e21 * t11 + e22 * t21, e20 * t02 + e21 * t12 + e22 * t22, e20 * t03 + e21 * t13 + e22 * t23 + e23 ]
				// [   0,   0,   0,   1 ] x [   0,   0,   0,   1 ] = [ e30 * t00 + e31 * t10 + e32 * t20, e30 * t01 + e31 * t11 + e32 * t21, e30 * t02 + e31 * t12 + e32 * t22, e30 * t03 + e31 * t13 + e32 * t23 + e33 ]
				tm[_00] = e00 * t00 + e01 * t10 + e02 * t20;	tm[_01] = e00 * t01 + e01 * t11 + e02 * t21;	tm[_02] = e00 * t02 + e01 * t12 + e02 * t22;	tm[_03] = e00 * t03 + e01 * t13 + e02 * t23 + e03;
				tm[_10] = e10 * t00 + e11 * t10 + e12 * t20;	tm[_11] = e10 * t01 + e11 * t11 + e12 * t21; 	tm[_12] = e10 * t02 + e11 * t12 + e12 * t22;	tm[_13] = e10 * t03 + e11 * t13 + e12 * t23 + e13;
				tm[_20] = e20 * t00 + e21 * t10 + e22 * t20;	tm[_21] = e20 * t01 + e21 * t11 + e22 * t21;	tm[_22] = e20 * t02 + e21 * t12 + e22 * t22;	tm[_23] = e20 * t03 + e21 * t13 + e22 * t23 + e23;
			}
		}
		Matrix.checkIdentical(tm);
	}
	
	/**
	 * @method inverse
	 * @public
	 * @static
	 * @param {aconif.cmn.geo.Matrix} tm - 기존 매트릭스.
	 * @param {aconif.cmn.geo.Matrix} dest - 역함수 결과를 저장할 매트릭스. dest 매트릭스가 없으면 tm 매트릭스를 역으로 취한다.
	 * @description 매트릭스 내용을 복사한다. 복사 후 identical 상태를 재확인한다.
	 */
	static inverse(tm, dest){
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
		
		
		let b00 = e00*e11 - e01*e10;
		let b01 = e00*e12 - e02*e10;
		let b02 = e00*e13 - e03*e10;
		let b03 = e01*e12 - e02*e11;
		let b04 = e01*e13 - e03*e12;
		let b05 = e02*e13 - e03*e12;
		let b06 = e20*e31 - e21*e30;
		let b07 = e20*e32 - e22*e30;
		let b08 = e20*e33 - e23*e30;
		let b09 = e21*e32 - e22*e31;
		let b10 = e21*e33 - e23*e31;
		let b11 = e22*e33 - e23*e32;
		
		let invDet = 1/(b00*b11 - b01*b10 + b02*b09 + b03*b08 - b04*b07 + b05*b06);
		
		dest[_00] = (e11*b11 - e12*b10 + e13*b09)*invDet;
		dest[_01] = (-e01*b11 + e02*b10 - e03*b09)*invDet;
		dest[_02] = (e31*b05 - e32*b04 + e33*b03)*invDet;
		dest[_03] = (-e21*b05 + e22*b04 - e23*b03)*invDet;
		dest[_10] = (-e10*b11 + e12*b08 - e13*b07)*invDet;
		dest[_11] = (e00*b11 - e02*b08 + e03*b07)*invDet;
		dest[_12] = (-e30*b05 + e32*b02 - e33*b01)*invDet;
		dest[_13] = (e20*b05 - e32*b02 + e23*b01)*invDet;
		dest[_20] = (e10*b10 - e11*b08 + e13*b06)*invDet;
		dest[_21] = (-e00*b10 + e01*b08 - e03*b06)*invDet;
		dest[_22] = (e30*b04 - e31*b02 + e33*b00)*invDet;
		dest[_23] = (-e20*b04 + e21*b02 - e23*b00)*invDet;
		dest[_30] = (-e10*b09 + e11*b07 + e12*b06)*invDet;
		dest[_31] = (e00*b09 - e01*b07 + e02*b06)*invDet;
		dest[_32] = (-e30*b03 + e31*b01 - e32*b00)*invDet;
		dest[_33] = (e20*b03 - e21*b01 + e22*b00)*invDet;
		
		
		return dest;
	}
	
	
	/**
	 * @method set
	 * @public
	 * @static
	 * @param {aconif.cmn.geo.Matrix} tm - 기존 매트릭스.
	 * @param {aconif.cmn.geo.Matrix} src - 복사할 매트릭스. 값이 null이면 identical 매트릭스로 간주한다.
	 * @description 매트릭스 내용을 복사한다. 복사 후 identical 상태를 재확인한다.
	 */
	static set(tm, src) {
		if (src) {
			tm[_00] = src[_00];
			tm[_01] = src[_01];
			tm[_02] = src[_02];
			tm[_03] = src[_03];
			tm[_10] = src[_10];
			tm[_11] = src[_11];
			tm[_12] = src[_12];
			tm[_13] = src[_13];
			tm[_20] = src[_20];
			tm[_21] = src[_21];
			tm[_22] = src[_22];
			tm[_23] = src[_23];
			Matrix.checkIdentical(tm);
		} else {
			setToIdentity(tm);
		}
	}
	
	/**
	 * @method setToIdentity
	 * @public
	 * @static
	 * @param {aconif.cmn.geo.Matrix} tm - identical 값으로 설정할 매트릭스
	 * @description 매트릭스 내용을 identical 값으로 설정한다.
	 */
	static setToIdentity(tm) {
		tm[_00] = 1.0;
		tm[_01] = 0.0;
		tm[_02] = 0.0;
		tm[_03] = 0.0;
		tm[_10] = 0.0;
		tm[_11] = 1.0;
		tm[_12] = 0.0;
		tm[_13] = 0.0;
		tm[_20] = 0.0;
		tm[_21] = 0.0;
		tm[_22] = 1.0;
		tm[_23] = 0.0;
		tm._identical = true;
	}
	
	/**
	 * @method transformRect
	 * @public
	 * @static
	 * @param {aconif.cmn.geo.Matrix} tm - 기존 매트릭스.
	 * @param {aconif.cmn.geo.$RectData} src - 매트릭스 변환 대상 사각형
	 * @param {aconif.cmn.geo.$RectData, a:{number}} ret - 매트릭스 변환 결과 사각형의 영역 사각형과 회전각
	 * @description 사각형에 매트릭스 변환을 적용한 사각형의 영역 사각형을 얻는다.
	 */
	static transformRect(tm, src, ret) {
		let p0 = [src.x, src.y, src.z];
		let p1 = [src.x + src.w, src.y, src.z];
		let p2 = [src.x, src.y + src.d, src.z];
		let p3 = [src.x + src.w, src.y + src.d, src.z];
		let p4 = [src.x, src.y, src.z + src.h];
		let p5 = [src.x + src.w, src.y, src.z + src.h];
		let p6 = [src.x, src.y + src.d, src.z + src.h];
		let p7 = [src.x + src.w, src.y + src.d, src.z + src.h];

		transformPoint(tm, p0, p0);
		transformPoint(tm, p1, p1);
		transformPoint(tm, p2, p2);
		transformPoint(tm, p3, p3);
		transformPoint(tm, p4, p4);
		transformPoint(tm, p5, p5);
		transformPoint(tm, p6, p6);
		transformPoint(tm, p7, p7);

		ret.x = Math.min(p0[0], p1[0], p2[0], p3[0], p4[0], p5[0], p6[0], p7[0]);
		ret.y = Math.min(p0[1], p1[1], p2[1], p3[1], p4[1], p5[1], p6[1], p7[1]);
		ret.z = Math.min(p0[2], p1[2], p2[2], p3[2], p4[2], p5[2], p6[2], p7[2]);
		ret.w = Math.max(p0[0], p1[0], p2[0], p3[0], p4[0], p5[0], p6[0], p7[0]) - Math.min(p0[0], p1[0], p2[0], p3[0], p4[0], p5[0], p6[0], p7[0]);
		ret.d = Math.max(p0[1], p1[1], p2[1], p3[1], p4[1], p5[1], p6[1], p7[1]) - Math.min(p0[1], p1[1], p2[1], p3[1], p4[1], p5[1], p6[1], p7[1]);
		ret.h = Math.max(p0[2], p1[2], p2[2], p3[2], p4[2], p5[2], p6[2], p7[2]) - Math.min(p0[2], p1[2], p2[2], p3[2], p4[2], p5[2], p6[2], p7[2]);
		
		if (ret.angle) {
			ret.angle = Geom.angle_ur_rccw(p0[0], p0[1], p1[0], p1[1], false, null);
		}
		
		//TODO - x, y, w, h 계산 오류 보완 필요 - 네 점으로 계산해서 min/max 찾도록 
/*		ret.x = p[0];
		ret.y = p[1];
		ret.z = p[2];
		ret.w = Geom.dsts(p0[0], p0[1], p1[0], p1[1]);
		ret.h = Geom.dsts(p1[0], p1[1], p2[0], p2[1]);

		if (ret.angle) {
			ret.angle = Geom.angle_ur_rccw(p0[0], p0[1], p1[0], p1[1], false, null);
		}
*/
	}
	
	/**
	 * @method translate
	 * @public
	 * @static
	 * @param {aconif.cmn.geo.Matrix} tm - 기존 매트릭스.
	 * @param {number} tx - X축 방향 이동 거리 
	 * @param {number} ty - Y축 방향 이동 거리 
	 * @param {number} tz - Z축 방향 이동 거리 
	 * @param {boolean} prefix - 값이 true이면 이동 매트릭스를 현재 매트릭스 앞에 곱하고,
	 *		값이 false이면 뒤에 곱한다.
	 * @description 현재 매트릭스 내용을 (tx, ty, tz)만큼 이동한 매트릭스를 곱한 매트릭스로 변경한다. 
	 */
	static translate(tm, tx, ty, prefix) {
		if (prefix) {
			// [   1,   0,   0,  tx ]   [ _00, _01, _02, _03 ]   [ _00, _01, _02, _03 + tx ]
			// [   0,   1,   0,  ty ]   [ _10, _11, _12, _13 ]   [ _10, _11, _12, _13 + ty ]
			// [   0,   0,   1,  tz ] x [ _20, _21, _22, _23 ] = [   0,   0, _22, _23 + tz ]
			// [   0,   0,   0,   1 ] x [   0,   0,   0,   1 ] = [   0,   0,   0,        1 ]
			tm[_03] += tx;
			tm[_13] += ty;
			tm[_23] += tz;
		} else { // affix
			// [ _00, _01, _02, _03 ]   [ 1, 0, 0, tx ]   [ _00, _01, _02,  _00 * tx + _01 * ty + _02 * tz + _03 ]
			// [ _10, _11, _12, _13 ]   [ 0, 1, 0, ty ]   [ _10, _11, _12,  _10 * tx + _11 + ty + _12 * tz + _13 ]
			// [ _20, _21, _22, _23 ]   [ 0, 0, 1, tz ]   [ _20, _21, _22,  _20 * tx + _21 + ty + _22 * tz + _23 ]
			// [   0,   0,   0,   1 ] x [ 0, 0, 0,  1 ] = [   0,   0,   0,                                     1 ]
			tm[_03] += _00 * tx + _01 * ty + _02 * tz;
			tm[_13] += _10 * tx + _11 + ty + _12 * tz;
			tm[_23] += _20 * tx + _21 + ty + _22 * tz;
			
		}
		Matrix.checkIdentical(tm);
	}
	
	/**
	 * @method transformCoord
	 * @public
	 * @static
	 * @param {aconif.cmn.geo.Matrix} tm - 기존 매트릭스.
	 * @param {aconif.cmn.geo.Coord} src - 매트릭스 변환 대상 좌표열
	 * @param {aconif.cmn.geo.Coord} dst - 매트릭스 변환 결과를 저장하는 좌표열
	 * @param {number} srcOff - 변환 대상 좌표열에서 시작점의 인덱스
	 * @param {number} dstOff - 변환 결과를 저장하는 좌표열에서 시작점의 인덱스
	 * @param {number} cnt - 변환할 좌표 갯수
	 * @description 변환 대상 좌표열을 매트릭스 변환한 좌표열을 얻는다.
	 */
	static transformCoord(tm, src, dst, srcOff, dstOff, cnt) {
		if (srcOff === undefined) {
			srcOff = 0;
			dstOff = 0;
			cnt = src.getCount();
			dst.setCount(cnt, false);
		}

		if (((srcOff + cnt) > src.getCount()) || ((dstOff + cnt) > dst.getCount())) {
			return;
		}

		let p = [];
		let tm00 = tm[_00];
		let tm01 = tm[_01];
		let tm02 = tm[_02];
		let tm03 = tm[_03];
		let tm10 = tm[_10];
		let tm11 = tm[_11];
		let tm12 = tm[_12];
		let tm13 = tm[_13];
		let tm20 = tm[_20];
		let tm21 = tm[_21];
		let tm22 = tm[_22];
		let tm23 = tm[_23];
		let inx;
		for (inx = 0; inx < cnt; inx++ , srcOff++ , dstOff++) {
			p = src.getAt(srcOff, p);
			dst.setAt(dstOff, tm00 * p[0] + tm01 * p[1] + tm02 * p[2] + tm03, tm10 * p[0] + tm11 * p[1] + tm12 * p[2] + tm13, tm20 * p[0] + tm21 * p[1] + tm22 * p[2] + tm23);
		}
	}
	
	
	/**
	 * @method getCanvasTm
	 * @public
	 * @static
	 * @param {aconif.cmn.geo.Matrix} tm - 변환 매트릭스.
	 * @returns {number}[] 변환 매트릭스의 내용을 HTML5 CANVAS의 transform() 함수에 입력되는 순서대로 나열한 배열을 리턴한다.
	 * @description 변환 매트릭스의 내용을 HTML5 CANVAS의 transform() 함수에 입력되는 순서대로 나열한 배열을 얻는다. 
	 */
	static getCanvasTm(tm) {
		return [ tm[_00], tm[_10], tm[_20], tm[_01], tm[_11], tm[_21], tm[_02], tm[_12], tm[_22], tm[_03], tm[_13], tm[_23] ];
	}
	
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
