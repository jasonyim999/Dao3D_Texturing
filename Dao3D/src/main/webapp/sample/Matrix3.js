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

/**
 * @class aconif.cmn.geo.Matrix
 * @public
 * @description 매트릭스 데이터 및 연산 기능을 제공한다.
 * @license ACONIF-2.0
 */
class Matrix3{
	static get clssid() { return __clssid; }

	//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
	// implementation

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
			set(tm, src);
		} else if (src._identical) {
			// nothing to do
		} else {
			// 기존 매트릭스 값을 임시변수에 복사
			let e00 = tm[_00];
			let e01 = tm[_01];
			let e02 = tm[_02];
			let e10 = tm[_10];
			let e11 = tm[_11];
			let e12 = tm[_12];

			// 변환 매트릭스
			let t00 = src[_00];
			let t01 = src[_01];
			let t02 = src[_02];
			let t10 = src[_10];
			let t11 = src[_11];
			let t12 = src[_12];

			// 기존 매트릭스 뒤에 변환 매트릭스 곱하기
			// [ e00, e01, e02 ]   [ t00, t01, t02 ]   [ e00 * t00 + e01 * t10, e00 * t01 + e01 * t11, e00 * t02 + e01 * t12 + e02 ]
			// [ e10, e11, e12 ]   [ t10, t11, t12 ]   [ e10 * t00 + e11 * t10, e10 * t01 + e11 * t11, e10 * t02 + e11 * t12 + e12 ]
			// [   0,   0,   1 ] x [   0,   0,   1 ] = [                     0,                     0,                           1 ]
			tm[_00] = e00 * t00 + e01 * t10; tm[_01] = e00 * t01 + e01 * t11; tm[_02] = e00 * t02 + e01 * t12 + e02;
			tm[_10] = e10 * t00 + e11 * t10; tm[_11] = e10 * t01 + e11 * t11; tm[_12] = e10 * t02 + e11 * t12 + e12;
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
	 * @description 매트릭스 내용이 identical 상태인지 재확인하고 상태값을 얻는다.
	 */
	static checkIdentical(tm) {
		tm._identical = (
			tm[_00] == 1.0 && tm[_01] == 0.0 && tm[_02] == 0.0 &&
			tm[_10] == 0.0 && tm[_11] == 1.0 && tm[_12] == 0.0);
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
		return (tm[_00] * tm[_11] - tm[_10] * tm[_01]);
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
				&& tm1[_10] == tm2[_10]
				&& tm1[_11] == tm2[_11]
				&& tm1[_12] == tm2[_12]
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
		let p0 = [0, 0];
		let p1 = [1, 0];
		transformPoint(tm, p0, p0);
		transformPoint(tm, p1, p1);
		return Geom.dsts(p0[0], p0[1], p1[0], p1[1]);
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
			let e10 = tm[_10];
			let e11 = tm[_11];
			let e12 = tm[_12];

			// 변환 매트릭스
			let t00 = src[_00];
			let t01 = src[_01];
			let t02 = src[_02];
			let t10 = src[_10];
			let t11 = src[_11];
			let t12 = src[_12];

			// 기존 매트릭스 앞에 변환 매트릭스 곱하기
			// [ t00, t01, t02 ]   [ e00, e01, e02 ]   [ t00 * e00 + t01 * e10, t00 * e01 + t01 * e11, t00 * e02 + t01 * e12 + t02 ]
			// [ t10, t11, t12 ]   [ e10, e11, e12 ]   [ t10 * e00 + t11 * e10, t10 * e01 + t11 * e11, t10 * e02 + t11 * e12 + t12 ]
			// [   0,   0,   1 ] x [   0,   0,   1 ] = [                     0,                     0,                           1 ]
			tm[_00] = t00 * e00 + t01 * e10; tm[_01] = t00 * e01 + t01 * e11; tm[_02] = t00 * e02 + t01 * e12 + t02;
			tm[_10] = t10 * e00 + t11 * e10; tm[_11] = t10 * e01 + t11 * e11; tm[_12] = t10 * e02 + t11 * e12 + t12;
			Matrix.checkIdentical(tm);
		}
	}

	/**
	 * @method rotate
	 * @public
	 * @static
	 * @param {aconif.cmn.geo.Matrix} tm - 기존 매트릭스
	 * @param {number} deg - 회전할 각도 (도 단위) 
	 * @param {number} x - 회전 중심점의 X 좌표
	 * @param {number} y - 회전 중심점의 Y 좌표
	 * @param {boolean} prefix - 값이 true이면 회전 매트릭스를 현재 매트릭스 앞에 곱하고,
	 *		값이 false이면 뒤에 곱한다.
	 * @description 현재 매트릭스 내용을 (x, y)를 중심으로 deg 만큼 회전한 매트릭스를 곱한 매트릭스로 변경한다. 
	 */
	static rotate(tm, deg, x, y, prefix) {
		let rd = deg * Geom.TO_RAD;
		let c = Math.cos(rd);
		let s = Math.sin(rd);

		if (tm._identical) {
			tm[_00] = c;
			tm[_01] = -s;
			tm[_02] = x * (1 - c) + y * s;
			tm[_10] = s;
			tm[_11] = c;
			tm[_12] = y * (1 - c) - x * s;

		} else {
			// 기존 매트릭스 값을 임시변수에 복사
			let e00 = tm[_00];
			let e01 = tm[_01];
			let e02 = tm[_02];
			let e10 = tm[_10];
			let e11 = tm[_11];
			let e12 = tm[_12];

			// T(x, y) * R(deg) * T(-x, -y) 변환 매트릭스 값 계산
			let t00 = c;
			let t01 = -s;
			let t02 = x * (1 - c) + y * s;
			let t10 = s;
			let t11 = c;
			let t12 = y * (1 - c) - x * s;

			if (prefix) {
				// 기존 매트릭스 앞에 변환 매트릭스 곱하기
				// [ t00, t01, t02 ]   [ e00, e01, e02 ]   [ t00 * e00 + t01 * e10, t00 * e01 + t01 * e11, t00 * e02 + t01 * e12 + t02 ]
				// [ t10, t11, t12 ]   [ e10, e11, e12 ]   [ t10 * e00 + t11 * e10, t10 * e01 + t11 * e11, t10 * e02 + t11 * e12 + t12 ]
				// [   0,   0,   1 ] x [   0,   0,   1 ] = [                     0,                     0,                           1 ]
				tm[_00] = t00 * e00 + t01 * e10; tm[_01] = t00 * e01 + t01 * e11; tm[_02] = t00 * e02 + t01 * e12 + t02;
				tm[_10] = t10 * e00 + t11 * e10; tm[_11] = t10 * e01 + t11 * e11; tm[_12] = t10 * e02 + t11 * e12 + t12;
			} else {
				// 기존 매트릭스 뒤에 변환 매트릭스 곱하기
				// [ e00, e01, e02 ]   [ t00, t01, t02 ]   [ e00 * t00 + e01 * t10, e00 * t01 + e01 * t11, e00 * t02 + e01 * t12 + e02 ]
				// [ e10, e11, e12 ]   [ t10, t11, t12 ]   [ e10 * t00 + e11 * t10, e10 * t01 + e11 * t11, e10 * t02 + e11 * t12 + e12 ]
				// [   0,   0,   1 ] x [   0,   0,   1 ] = [                     0,                     0,                           1 ]
				tm[_00] = e00 * t00 + e01 * t10; tm[_01] = e00 * t01 + e01 * t11; tm[_02] = e00 * t02 + e01 * t12 + e02;
				tm[_10] = e10 * t00 + e11 * t10; tm[_11] = e10 * t01 + e11 * t11; tm[_12] = e10 * t02 + e11 * t12 + e12;
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
	Matrix.rotate(tm, ang, refp[0], refp[1], false);
	Matrix.transformCoord(tm, ptSrc, ptDst, srcOff, dstOff, count);
}

	/**
	 * @method scale
	 * @public
	 * @static
	 * @param {aconif.cmn.geo.Matrix} tm - 기존 매트릭스
	 * @param {number} sx - X축 방향 확대/축소 배율 
	 * @param {number} sy - Y축 방향 확대/축소 배율 
	 * @param {number} x - 확대/축소 기준점의 X 좌표
	 * @param {number} y - 확대/축소 기준점의 Y 좌표
	 * @param {boolean} prefix - 값이 true이면 확대/축소 매트릭스를 현재 매트릭스 앞에 곱하고,
	 *		값이 false이면 뒤에 곱한다.
	 * @description 현재 매트릭스 내용을 (x, y)를 중심으로 확대/축소한 만큼 회전한 매트릭스를 곱한 매트릭스로 변경한다. 
	 */
	static scale(tm, sx, sy, x, y, prefix) {
		if (tm._identical) {
			tm[_00] = sx;
			tm[_02] = x * (1 - sx);
			tm[_11] = sy;
			tm[_12] = y * (1 - sy);

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
				// 기존 매트릭스 앞에 변환 매트릭스 곱하기
				// [ t00, t01, t02 ]   [ e00, e01, e02 ]   [ t00 * e00 + t01 * e10, t00 * e01 + t01 * e11, t00 * e02 + t01 * e12 + t02 ]
				// [ t10, t11, t12 ]   [ e10, e11, e12 ]   [ t10 * e00 + t11 * e10, t10 * e01 + t11 * e11, t10 * e02 + t11 * e12 + t12 ]
				// [   0,   0,   1 ] x [   0,   0,   1 ] = [                     0,                     0,                           1 ]
				tm[_00] = t00 * e00 + t01 * e10; tm[_01] = t00 * e01 + t01 * e11; tm[_02] = t00 * e02 + t01 * e12 + t02;
				tm[_10] = t10 * e00 + t11 * e10; tm[_11] = t10 * e01 + t11 * e11; tm[_12] = t10 * e02 + t11 * e12 + t12;
			} else {
				// 기존 매트릭스 뒤에 변환 매트릭스 곱하기
				// [ e00, e01, e02 ]   [ t00, t01, t02 ]   [ e00 * t00 + e01 * t10, e00 * t01 + e01 * t11, e00 * t02 + e01 * t12 + e02 ]
				// [ e10, e11, e12 ]   [ t10, t11, t12 ]   [ e10 * t00 + e11 * t10, e10 * t01 + e11 * t11, e10 * t02 + e11 * t12 + e12 ]
				// [   0,   0,   1 ] x [   0,   0,   1 ] = [                     0,                     0,                           1 ]
				tm[_00] = e00 * t00 + e01 * t10; tm[_01] = e00 * t01 + e01 * t11; tm[_02] = e00 * t02 + e01 * t12 + e02;
				tm[_10] = e10 * t00 + e11 * t10; tm[_11] = e10 * t01 + e11 * t11; tm[_12] = e10 * t02 + e11 * t12 + e12;
			}
		}
		Matrix.checkIdentical(tm);
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
			tm[_10] = src[_10];
			tm[_11] = src[_11];
			tm[_12] = src[_12];
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
		tm[_10] = 0.0;
		tm[_11] = 1.0;
		tm[_12] = 0.0;
		tm._identical = true;
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
		let tm10 = tm[_10];
		let tm11 = tm[_11];
		let tm12 = tm[_12];
		let inx;
		for (inx = 0; inx < cnt; inx++ , srcOff++ , dstOff++) {
			p = src.getAt(srcOff, p);
			dst.setAt(dstOff, tm00 * p[0] + tm01 * p[1] + tm02, tm10 * p[0] + tm11 * p[1] + tm12);
		}
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
		//[ _00, _01, _02 ]   [ x ]   [ _00 * x + _01 * y + _02 ]
		//[ _10, _11, _12 ]   [ y ]   [ _10 * x + _11 * y + _12 ]
		//[   0,   0,   1 ] x [ 1 ] = [                       1 ]
		let x = tm[_00] * p[0] + tm[_01] * p[1] + tm[_02];
		let y = tm[_10] * p[0] + tm[_11] * p[1] + tm[_12];
		ret[0] = x;
		ret[1] = y;
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
		//[ _00, _01, _02 ]   [ x ]   [ _00 * x + _01 * y + _02 ]
		//[ _10, _11, _12 ]   [ y ]   [ _10 * x + _11 * y + _12 ]
		//[   0,   0,   1 ] x [ 1 ] = [                       1 ]

		let x, y;
		let pa = Array.isArray(p);
		let ra = Array.isArray(ret);

		if (pa && ra) {
			let count = p.length;
			let idx;
			let tm00 = tm[_00];
			let tm01 = tm[_01];
			let tm02 = tm[_02];
			let tm10 = tm[_10];
			let tm11 = tm[_11];
			let tm12 = tm[_12];

			for (idx = 0; idx < count; idx++) {
				x = p[idx].x;
				y = p[idx].y;
				ret[idx].x = tm00 * x + tm01 * y + tm02;;
				ret[idx].y = tm10 * x + tm11 * y + tm12;;
			}
		} else if (!pa && !ra) {
			x = p.x;
			y = p.y;
			ret.x = tm[_00] * x + tm[_01] * y + tm[_02];
			ret.y = tm[_10] * x + tm[_11] * y + tm[_12];
		} else {
			// throw exception
		}
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
		let p0 = [src.x, src.y];
		let p1 = [src.x + src.w, src.y];
		let p2 = [src.x, src.y + src.h];
		let p3 = [src.x + src.w, src.y + src.h];

		transformPoint(tm, p0, p0);
		transformPoint(tm, p1, p1);
		transformPoint(tm, p2, p2);
		transformPoint(tm, p3, p3);

		ret.x = Math.min(p0[0], p1[0], p2[0], p3[0]);
		ret.w = Math.max(p0[0], p1[0], p2[0], p3[0]) - Math.min(p0[0], p1[0], p2[0], p3[0]);
		ret.y = Math.min(p0[1], p1[1], p2[1], p3[1]);
		ret.h = Math.max(p0[1], p1[1], p2[1], p3[1]) - Math.min(p0[1], p1[1], p2[1], p3[1]);

		if (ret.angle) {
			ret.angle = Geom.angle_ur_rccw(p0[0], p0[1], p1[0], p1[1], false, null);
		}
		//TODO - x, y, w, h 계산 오류 보완 필요 - 네 점으로 계산해서 min/max 찾도록 
/*		ret.x = p0[0];
		ret.y = p0[1];
		ret.w = Geom.dsts(p0[0], p0[1], p1[0], p1[1]);
		ret.h = Geom.dsts(p1[0], p1[1], p2[0], p2[1]);

		if (ret.angle) {
			ret.angle = Geom.angle_ur_rccw(p0[0], p0[1], p1[0], p1[1], false, null);
		}
-*/
	}

	/**
	 * @method translate
	 * @public
	 * @static
	 * @param {aconif.cmn.geo.Matrix} tm - 기존 매트릭스.
	 * @param {number} tx - X축 방향 이동 거리 
	 * @param {number} ty - Y축 방향 이동 거리 
	 * @param {boolean} prefix - 값이 true이면 이동 매트릭스를 현재 매트릭스 앞에 곱하고,
	 *		값이 false이면 뒤에 곱한다.
	 * @description 현재 매트릭스 내용을 (tx, ty)만큼 이동한 매트릭스를 곱한 매트릭스로 변경한다. 
	 */
	static translate(tm, tx, ty, prefix) {
		if (prefix) {
			// [   1,   0,  tx ]   [ _00, _01, _02 ]   [ _00, _01, _02 + tx ]
			// [   0,   1,  ty ]   [ _10, _11, _12 ]   [ _10, _11, _12 + ty ]
			// [   0,   0,   1 ] x [   0,   0,   1 ] = [   0,   0,        1 ]
			tm[_02] += tx;
			tm[_12] += ty;
		} else { // affix
			// [ _00, _01, _02 ]   [ 1, 0, tx ]   [ _00, _01, _00 * tx + _01 * ty + _02 ]
			// [ _10, _11, _12 ]   [ 0, 1, ty ]   [ _10, _11, _10 * tx + _11 + ty + _12 ]
			// [   0,   0,   1 ] x [ 0, 0,  1 ] = [   0,   0,                         1 ]
			tm[_02] += tm[_00] * tx + tm[_01] * ty;
			tm[_12] += tm[_10] * tx + tm[_11] * ty;
		}
		Matrix.checkIdentical(tm);
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
		return [ tm[_00], tm[_10], tm[_01], tm[_11], tm[_02], tm[_12] ];
	}
}

// static 변수 저장

// element 참조 인덱스
let _00 = 0;
let _01 = 1;
let _02 = 2;
let _10 = 3;
let _11 = 4;
let _12 = 5;

// @ACONIF register implement
//aconif.Inf.impl("...", __clssid, true);

//// @ACONIF export
//aconif.Clss.exprt(__clssid, Matrix);