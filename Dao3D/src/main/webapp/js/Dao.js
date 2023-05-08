/**
 * 
 */

let dao_mdl = null;
let mdl_face = null;
let mdl_left_ear = null;
let mdl_right_ear = null;
let mdl_top_body = null;
let mdl_mid_body = null;
let mdl_belt = null;
let mdl_belt_btn = null;
let mdl_left_glove_edge = null;
let mdl_left_glove = null;
let mdl_right_glove_edge = null;
let mdl_right_glove = null;
let mdl_left_arm = null;
let mdl_right_arm = null;
let mdl_left_leg = null;
let mdl_right_leg = null;
let mdl_left_foot = null;
let mdl_right_foot = null;
let mdl_land = null;

let daoHeadImg = null;
let daoBodyImg = null;
let daoHandImg = null;
let daoBeltImg = null;
let daoSkinImg = null;
let landImg = null;


class Dao{
	
	constructor(){
		this.mdlMatrix = [
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
		];
		
		this.translate = [0, 0, 0];
		this.scale = [1.5, 1.5, 1.5];
		this.rotate = [0, 0, 0];
		this.moveCenter = [0, 0, 0];
		
		this.setUpBuffer();
		
	}
	
	initialMatrix(){
		this.mdlMatrix = [
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
		];
	}
	
	initialBuffer(){
		this.initialMatrix();
		mdl_face.initialMatrix();
		mdl_left_ear.initialMatrix();
		mdl_right_ear.initialMatrix();
		mdl_top_body.initialMatrix();
		mdl_mid_body.initialMatrix();
		mdl_belt.initialMatrix();
		mdl_belt_btn.initialMatrix();
		mdl_left_glove_edge.initialMatrix();
		mdl_left_glove.initialMatrix();
		mdl_right_glove_edge.initialMatrix();
		mdl_right_glove.initialMatrix();
		mdl_left_arm.initialMatrix();
		mdl_right_arm.initialMatrix();
		mdl_left_leg.initialMatrix();
		mdl_right_leg.initialMatrix();
		mdl_left_foot.initialMatrix();
		mdl_right_foot.initialMatrix();
		mdl_land.initialMatrix();

	}
	

	
	setUpBuffer(){
		mdl_face = new Sphere();
		mdl_face.translate[1] = 7;
		mdl_face.scale = [8, 7, 8];
		mdl_face.rotate[0] = 0;
		
		mdl_left_ear = new HemiSphere();
		mdl_left_ear.scale = [5, 5, 5];
		mdl_left_ear.translate[0] = -4.5;
		mdl_left_ear.translate[1] = 8;
		mdl_left_ear.rotate[1] = -80;
		mdl_left_ear.rotate[0] = -90;
		
		mdl_right_ear = new HemiSphere();
		mdl_right_ear.scale = [5, 5, 5];
		mdl_right_ear.translate[0] = 4.5;
		mdl_right_ear.translate[1] = 8;
		mdl_right_ear.rotate[1] = 100;
		mdl_right_ear.rotate[0] = 90;
	
		
		mdl_top_body = new HemiSphere();
		mdl_top_body.scale = [5, 5, 2.5];
		mdl_top_body.translate[1] = -0.5;
		mdl_top_body.rotate[2] = 100;
		mdl_top_body.rotate[0] = -90;
	
		mdl_mid_body = new Column();
		mdl_mid_body.scale = [5, 5, 3];
		mdl_mid_body.translate[1] = -2;
		mdl_mid_body.rotate[0] = -90;
		
		mdl_belt = new Column();
		mdl_belt.color = [0, 0, 0];
		mdl_belt.wireColor = [0.3, 0.3, 0.3];
		mdl_belt.scale = [5.2, 5.2, 1.0];
		mdl_belt.translate[1] = -2;
		mdl_belt.rotate[0] = -90;	
	
		mdl_belt_btn = new HemiSphere();
		mdl_belt_btn.color = [0, 0, 0];
		mdl_belt_btn.wireColor = [0.2, 0.2, 0.2];
		mdl_belt_btn.scale = [1, 1, 0.5];
		mdl_belt_btn.translate[1] = -2;
		mdl_belt_btn.translate[2] = 5;
	
	
		mdl_left_glove_edge = new Horn();
		mdl_left_glove_edge.wireColor = [0.8, 0.8, 0.8];
		mdl_left_glove_edge.scale = [2, 2, 2];
		mdl_left_glove_edge.rotate[1] = -80;
		mdl_left_glove_edge.rotate[2] = 30;
		mdl_left_glove_edge.translate[0] = -6.9;
		mdl_left_glove_edge.translate[1] = -2.2;
		
		mdl_left_glove = new Sphere();
		mdl_left_glove.wireColor = [0.8, 0.8, 0.8];	
		mdl_left_glove.color = [1, 1, 1];
		mdl_left_glove.scale = [2, 2, 2];
		mdl_left_glove.rotate[0] = 90;
		mdl_left_glove.translate[0] = -7;
		mdl_left_glove.translate[1] = -2.3;
		
		
		mdl_right_glove_edge = new Horn();
		mdl_right_glove_edge.wireColor = [0.8, 0.8, 0.8];
		mdl_right_glove_edge.scale = [2, 2, 2];
		mdl_right_glove_edge.rotate[1] = 80;
		mdl_right_glove_edge.rotate[2] = -30;
		mdl_right_glove_edge.translate[0] = 6.9;
		mdl_right_glove_edge.translate[1] = -2.2;
		
		mdl_right_glove = new Sphere();
		mdl_right_glove.wireColor = [0.8, 0.8, 0.8];	
		mdl_right_glove.color = [1, 1, 1];
		mdl_right_glove.scale = [2, 2, 2];
		mdl_right_glove.rotate[0] = 90;
		mdl_right_glove.translate[0] = 7;
		mdl_right_glove.translate[1] = -2.3;
		
		
		mdl_left_arm = new Column();
		mdl_left_arm.color = [0.95, 0.8, 0.6];
		mdl_left_arm.wireColor = [0.8, 0.6, 0.4];
		mdl_left_arm.scale = [1.1, 1.1, 3];
		mdl_left_arm.rotate[1] = 90;
		mdl_left_arm.rotate[2] = 30;
		mdl_left_arm.translate[0] = -5;
		mdl_left_arm.translate[1] = -1;
		
		
		mdl_right_arm = new Column();
		mdl_right_arm.color = [0.95, 0.8, 0.6];
		mdl_right_arm.wireColor = [0.8, 0.6, 0.4];
		mdl_right_arm.scale = [1.1, 1.1, 3];
		mdl_right_arm.rotate[1] = 90;
		mdl_right_arm.rotate[2] = -30;
		mdl_right_arm.translate[0] = 5;
		mdl_right_arm.translate[1] = -1;
		
		
		mdl_left_leg = new Column();
		mdl_left_leg.color = [0.95, 0.8, 0.6];
		mdl_left_leg.wireColor = [0.8, 0.6, 0.4];
		mdl_left_leg.scale = [1.4, 1.4, 4];
		mdl_left_leg.rotate[0] = 90;
		mdl_left_leg.translate[0] = -2;
		mdl_left_leg.translate[1] = -5;

		mdl_right_leg = new Column();
		mdl_right_leg.color = [0.95, 0.8, 0.6];
		mdl_right_leg.wireColor = [0.8, 0.6, 0.4];
		mdl_right_leg.scale = [1.4, 1.4, 4];
		mdl_right_leg.rotate[0] = 90;
		mdl_right_leg.translate[0] = 2;
		mdl_right_leg.translate[1] = -5;
		
		
		mdl_left_foot = new HemiSphere();
		mdl_left_foot.scale = [1.7, 2.5, 2.5];
		mdl_left_foot.rotate[0] = -90;
		mdl_left_foot.translate[0] = -2;
		mdl_left_foot.translate[1] = -7.1;
		mdl_left_foot.translate[2] = 0.5;
		
		mdl_right_foot = new HemiSphere();
		mdl_right_foot.scale = [1.7, 2.5, 2.5];
		mdl_right_foot.rotate[0] = -90;
		mdl_right_foot.translate[0] = 2;
		mdl_right_foot.translate[1] = -7.1;
		mdl_right_foot.translate[2] = 0.5;
		
		mdl_land = new Column(4);
		mdl_land.scale = [100, 100, 0.1];
		mdl_land.rotate[0] = 90;
		mdl_land.rotate[2] = 45;
		mdl_land.translate[1] = -7.1;
		
		
		daoHeadImg = new Image();
		daoHeadImg.src = 'img/daoHead.jpg';
		mdl_face.topImg = daoHeadImg;

		daoBodyImg = new Image();
		daoBodyImg.src = 'img/daoBody.jpg';
		mdl_face.bottomImg = daoBodyImg;
		mdl_mid_body.img = daoBodyImg;
		
		daoBeltImg = new Image();
		daoBeltImg.src = 'img/dark.jpg';
		mdl_belt.img = daoBeltImg;
		
		daoHandImg = new Image();
		daoHandImg.src = 'img/white.jpg';
		mdl_left_glove.topImg = daoHandImg;
		
		daoSkinImg = new Image();
		daoSkinImg.src = 'img/skin.jpg';
		mdl_left_arm.img = daoSkinImg;
		
		landImg = new Image();
		landImg.src = 'img/land.jpg';
		mdl_land.img = landImg;
		
	}
	

	
	mdlDraw(){
		
		this.mdlMatrix = mat4.translate(this.mdlMatrix, this.translate[0], this.translate[1], this.translate[2]);
		
		this.mdlMatrix = mat4.xRotate(this.mdlMatrix, degToRad(this.rotate[0]));
		this.mdlMatrix = mat4.yRotate(this.mdlMatrix, degToRad(this.rotate[1]));
		this.mdlMatrix = mat4.zRotate(this.mdlMatrix, degToRad(this.rotate[2]));
		this.mdlMatrix = mat4.scale(this.mdlMatrix, this.scale[0], this.scale[1], this.scale[2]);
		this.mdlMatrix = mat4.translate(this.mdlMatrix, this.moveCenter[0], this.moveCenter[1], this.moveCenter[2]);
		this.mdlMatrix = mat4.getCanvasTm(this.mdlMatrix);
		

		mdl_face.setupTopImgBuffer();
		mdl_face.drawSphere();
		
		
		mdl_face.setupBottomImgBuffer();
		mdl_mid_body.setupImgBuffer();
		mdl_left_ear.drawHemiSphere();
		mdl_right_ear.drawHemiSphere();
		mdl_top_body.drawHemiSphere();
		mdl_mid_body.drawColumn();
		mdl_left_foot.drawHemiSphere();
		mdl_right_foot.drawHemiSphere();

		
		mdl_belt.setupImgBuffer();
		mdl_belt.drawColumn();
		mdl_belt_btn.drawHemiSphere();
		
		
		mdl_left_glove.setupTopImgBuffer();	
		mdl_left_glove_edge.drawHorn();
		mdl_left_glove.drawSphere();
		mdl_right_glove_edge.drawHorn();
		mdl_right_glove.drawSphere();

		
		mdl_left_arm.setupImgBuffer();
		mdl_left_arm.drawColumn();
		mdl_right_arm.drawColumn();
		mdl_left_leg.drawColumn();
		mdl_right_leg.drawColumn();
		
		mdl_land.setupImgBuffer();
		mdl_land.drawColumn();
		
	}
	
	
	
	
	
	
	
	
	
	
}