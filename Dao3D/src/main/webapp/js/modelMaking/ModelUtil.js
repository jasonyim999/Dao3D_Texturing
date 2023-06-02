/**
 * 
 */




class ModelUtil {
	static makeVectorVertexArray(x,y,z,x1,y1,z1,x2,y2,z2,n,m,vertex){
		var v1 = [(x1-x)/(n-1), (y1-y)/(n-1), (z1-z)/(n-1)];
		var v2 = [(x2-x)/(m-1), (y2-y)/(m-1), (z2-z)/(m-1)];
		
		for(var i=0; i<m; i++){
			for(var k=0; k<n; k++){
				var number = i*n + k;
	 			vertex[3*number] = x + v1[0]*k + v2[0]*i;
				vertex[3*number+1] = y + v1[1]*k + v2[1]*i;
				vertex[3*number+2] = z + v1[2]*k + v2[2]*i;
			}
		}
		return vertex;
	}


	static makeTriangleIndexArray(n, m, index){
		for(var i=0; i<m; i++){
			for(var k=0; k<n; k++){
				var number = i*n+k;
				index.push(number + i);
				index.push(number + i + n + 1);
				index.push(number + i + 1);
				index.push(number + i + 1);
				index.push(number + i + n + 1);
				index.push(number + i + n + 2);
			
			}
		}
		return index;
	}

	static makeColumnSideVertexArray(n, hm, h, vertex){
		//hm = 높이를 몇등분할건지
		for(var i=0; i<hm+1; i++){
			for(var k=0; k<n+1; k++){
				var number = i*(n+1) + k;
				vertex[3*number] = Math.cos(degToRad(k*360/n+90));
				vertex[3*number+1] = Math.sin(degToRad(k*360/n+90));
				vertex[3*number+2] = h/2-h*i/hm;
			}
		}
		return vertex;
	}

	static makeHornVertexArray(n, m, h, d, tb, vertex){
		vertex[0] = 0;
		vertex[1] = 0;
		vertex[2] = h
		//tb = 1이면 top, -1이면 bottom
		//d = 깊이 (d=0이면 평)
		for(var i=0; i<m; i++){
			for(var k=0; k<n; k++){
				var number = i*n + k+1;
				vertex[3*number] = Math.cos(degToRad(tb * k*360/n+90))*(i+1)/m;
				vertex[3*number+1] = Math.sin(degToRad(tb * k*360/n+90))*(i+1)/m;
				vertex[3*number+2] = h-d*(i+1)/m;
			}
		}
		return vertex;
	}

	static makeSphereVertexArray(n, m, h, d, tb, vertex){
		vertex.push(0);
		vertex.push(0);
		vertex.push(h);
		//tb = 1이면 top, -1이면 bottom
		//d = 깊이 (d=0이면 평면)
		for(var i=0; i<m; i++){
			for(var k=0; k<n; k++){
				vertex.push(Math.cos(degToRad(tb * k*360/n))*Math.sin(degToRad((i+1)*90/m)));
				vertex.push(Math.sin(degToRad(tb * k*360/n))*Math.sin(degToRad((i+1)*90/m)));
				vertex.push(tb*d*(Math.cos(degToRad((i+1)*90/m))));
			}
		}
		return vertex;
	}
	
	/**
		구 반쪽 면에 Texturing을 위한 vertex 좌표
	 */
	static makeSphereTexturingVertexArray(n, m, vertex){
		vertex.push(0.5);
		vertex.push(0.5);
		let tb = -1;
		//tb = 1이면 top, -1이면 bottom
		//d = 깊이 (d=0이면 평면)
		for(var i=0; i<m; i++){
			for(var k=0; k<n; k++){
				vertex.push(0.5+0.5*Math.cos(degToRad(tb * k*360/n))*Math.sin(degToRad((i+1)*90/m)));
				vertex.push(0.5+0.5*Math.sin(degToRad(tb * k*360/n))*Math.sin(degToRad((i+1)*90/m)));
			}
		}
		return vertex;
	}

	static makeColumnVertexArray(n, m, h, tb, vertex){
		vertex[0] = 0;
		vertex[1] = 0;
		vertex[2] = h
		//tb = 1이면 top, -1이면 bottom
		for(var i=0; i<m; i++){
			for(var k=0; k<n; k++){
				var number = i*n + k+1;
				vertex[3*number] = Math.cos(degToRad(tb * k*360/n+90))*(i+1)/m;
				vertex[3*number+1] = Math.sin(degToRad(tb * k*360/n+90))*(i+1)/m;
				vertex[3*number+2] = h;
			}
		}
		return vertex;
	}

	static makeColumnSideVertexArray(n, hm, h, vertex){
		for(var i=0; i<hm+1; i++){
			for(var k=0; k<n+1; k++){
				vertex.push(Math.cos(degToRad(k*360/n+90)));
				vertex.push(Math.sin(degToRad(k*360/n+90)));
				vertex.push(h/2-h*i/hm);
			}
		}
		return vertex;
	}

	static makeColumnIndexArray(n, m, index){
		for(var k=0; k<n; k++){
			if(k != n-1){
				index.push(0);
				index.push(k+1);
				index.push(k+2);
			}else{
				index.push(0);
				index.push(k+1);
				index.push(1);
			}
			for(var i=0; i<m-1; i++){
				var a = i*n+k+1;
				if(k != n-1){
					index.push(a);
					index.push(a+n);
					index.push(a+1+n);
					index.push(a);
					index.push(a+1+n);
					index.push(a+1);
				}else{
					index.push(a);
					index.push(a+n);
					index.push((i+1)*n+1);
					index.push(a);
					index.push((i+1)*n+1);
					index.push(i*n+1);	
				}
			}
		}
		return index;
	}

	static makeFigureStripIndexArray(n, m, index){
		for(var k=0; k<n; k++){
			var number = 0;
			index.push(0);
			if(k != n-1){
				for(var i=0; i<m; i++){
					number = n*i+k+1;
					index.push(number);
					index.push(number+1);
				}
				index.push(number+1);
				index.push(0);
				index.push(0);
			}else{
				for(var i=0; i<m; i++){
					index.push((i+1)*n);
					index.push(i*n+1);
				}
			}
		}
		return index;
	}

	static makeFigureWireFrameIndexArray(n,m,index){
		for(var i=0; i<m; i++){
			if(i==0){
				for(var k=0; k<n; k++){
					if(k!=n-1){
						index.push(0);
						index.push(k+1);
						index.push(k+2);
					}else{
						index.push(0);
						index.push(n);
						index.push(1);
					}
				}
			}else{
				for(var k=0; k<n; k++){
					if(k!=n-1){
						index.push(i*n+k+2);
						index.push((i-1)*n+k+2);
					}else{
						index.push(1+i*n);
						index.push(1+(i-1)*n);
					}
				}
				for(var k=0; k<n; k++){
					index.push(1+i*n+k);
				}
				index.push(1+i*n);
			}
		}
		
		return index;
	}
	
	static makeRectWireFrameIndexArray(n,m,index){
		for(var i=0; i<m; i++){
			if(i==0){
				for(k=0; k<n+1; k++){
					index.push(n-k);
				}
			}
			for(var k=0; k<n; k++){
				index.push((i+1)*(n+1)+k);
				index.push(i*(n+1)+k+1);
			}
			for(var k=0; k<n+1; k++){
				index.push((i+2)*(n+1)-k-1);
			}
		}
		return index;
	}
	

	
}


