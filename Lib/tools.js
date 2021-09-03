// JavaScript source code
class BoundingRect {

	x;
	y;
	height;
	width;
	rotation;

	constructor(x, y, height, width, rotation) {
		this.x = x;
		this.y = y; 
		this.height = height;
		this.width = width;
		this.rotation = rotation;
	}
}

class vec2 {

	x;
	y; 

	constructor(x,y) {
		this.x = x;
		this.y = y;
	}
}

export {BoundingRect, vec2}