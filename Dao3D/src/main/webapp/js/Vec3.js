/**
 * 
 */

class Vec3 {
	
	constructor(x = 0, y = 0, z = 0){
		this.x = x;
		this.y = y;
		this.z = z;
	}
	
	static scale(v, m){
		v.x = m * v.x;
		v.y = m * v.y;
		v.z = m * v.z;
		return v;
	}
	
	static sub(a, b){
		var res = new Vec3();
		res.x = a.x - b.x;
		res.y = a.y - b.y;
		res.z = a.z - b.z;
		
		return res;
			
	}
	
	static normalize(v){
		var length = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
		
		if(length > 0.0001){
			v.x = v.x/length;
			v.y = v.y/length;
			v.z = v.z/length;
		}else{
			v.x = 0;
			v.y = 0;
			v.z = 0;
		}
		return v;
		
	}
	
	static cross(a, b){
		var res = new Vec3();
		res.x = a.y * b.z - a.z * b.y;
		res.y = a.z * b.x - a.x * b.z;
		res.z = a.x * b.y - a.y * b.x;
		
		return res;
	}
	
	
	
}