// JavaScript source code
import {vec2} from './tools.js'

/**
* 
*/

class Fusion {

	#_textureOffset;
	#_textureBounds;
	#_targetOutSize;

	constructor() {}

	// Parses received message and update fusion's info
	updateFusion(message) {
		let msg = JSON.parse(message.data);

		this.#_textureOffset = new vec2(msg.fusion.textureOffset.x,msg.fusion.textureOffset.y);
		this.#_textureBounds = new vec2(msg.fusion.textureBounds.x,msg.fusion.textureBounds.y);
		this.#_targetOutSize = new vec2(msg.fusion.targetOutSize.x,msg.fusion.targetOutSize.y);

	}

	get textureOffset () {
		return this.#_textureOffset;
	}
	get textureBounds () {
		return this.#_textureBounds;
	}
	get targetOutSize () {
		return this.#_targetOutSize;
	}
};

export { Fusion };