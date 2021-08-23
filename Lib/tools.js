// JavaScript source code
class BoundingRect {

	x;
	y;
	height;
	width;

	constructor(x, y, height, width) {
		this.x = x;
		this.y = y; 
		this.height = height;
		this.width = width;
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