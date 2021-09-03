// JavaScript source code
import {vec2} from './tools.js'

/**
* AugmentaScene : to store all information received from fusion about the augmenta scene
*/

class AugmentaScene {

	#_frame;
	#_objectCount;
	#_scene;

	constructor() {
		this.#_scene = new vec2(1,1);
	}

	// Parses received message and update scene's info
	updateAugmentaScene(message) {
	
		let msg = JSON.parse(message.data);

		this.#_frame = msg.scene.frame;
		this.#_objectCount = msg.scene.objectCount;
		this.#_scene = new vec2(msg.scene.scene.width, msg.scene.scene.height);
	}

	get frame() {
		return this.#_frame;
	}

	get objectCount() {
		return this.#_objectCount;
	}

	get scene() {
		return this.#_scene;
	}
};

export { AugmentaScene };