// JavaScript source code
import {vec2} from './tools.js'

/**
* Fusion : to store all information received from fusion about fusion settings
*/

class Fusion {

	#_textureOffset;
	#_textureBounds;
	#_targetOutSize;
	#_offset;

	constructor() {}

	// Parses received message and updates fusion's info
	updateFusion(message) {
		let msg = JSON.parse(message.data);

		this.#_textureOffset = new vec2(msg.fusion.textureOffset.x,msg.fusion.textureOffset.y);
		this.#_textureBounds = new vec2(msg.fusion.textureBounds.x,msg.fusion.textureBounds.y);
		this.#_targetOutSize = new vec2(msg.fusion.targetOutSize.x,msg.fusion.targetOutSize.y);

	}

	get textureOffset () {
		return this.#_textureOffset;
	}
	get videoOut () {
		return this.#_textureBounds;
	}
	get videoOutInPixels () {
		return this.#_targetOutSize;
	}
	
	get offset () {
		return this.#_offset;
	}

	set offsetX (offsetX) {
		this.#_offset.x = offsetX;
	}

	set offsetX (offsetY) {
		this.#_offset.x = offsetY;
	}
};

export { Fusion };