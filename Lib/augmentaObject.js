// JavaScript source code
import {BoundingRect, vec2} from './tools.js'

/**
* AugmentaObject : to store all information received from fusion about a given augmenta object
*/

class AugmentaObject {

	#_initialized;

	//Last augmenta scene frame it was seen on
	#_lastSeen;

	//Augmenta info
	#_frame;
	#_id;
	#_oid;
	#_age;
	#_centroid;
	#_velocity;
	#_orientation;
	#_boundingRect;
	#_height;
	//extra
	#_highest;
	#_distance;
	#_reflectivity;

	//For display 
	#_color;

	constructor() {

		this.#_initialized = false;

	}
	
	initialize() {

		//Choose a random color 
		this.#_color = '#'+Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
		this.#_initialized = true;

	}

	// Parsing of the received messages and update info

	//On update message
	updateAugmentaObject(message) 
	{	

		if (!this.#_initialized) {
			this.initialize();
		}

		let msg = JSON.parse(message.data);

		this.#_frame = msg.object.update.frame;
		this.#_id = msg.object.update.id;
		this.#_oid = msg.object.update.oid;
		this.#_age = msg.object.update.age;
		this.#_centroid = new vec2(msg.object.update.centroid.x, msg.object.update.centroid.y);
		this.#_velocity = new vec2(msg.object.update.velocity.x, msg.object.update.velocity.y);
		this.#_orientation = msg.object.update.orientation;
		this.#_boundingRect = new BoundingRect(msg.object.update.boundingRect.x, msg.object.update.boundingRect.y, msg.object.update.boundingRect.height, msg.object.update.boundingRect.width, msg.object.update.boundingRect.rotation);
		this.#_height = msg.object.update.height;
		// extra
		this.#_highest = new vec2(msg.object.update.extra.highest.x, msg.object.update.extra.highest.y);
		this.#_distance = msg.object.update.extra.distance;
		this.#_reflectivity = msg.object.update.extra.reflectivity;

	}

	//On enter message
	initializeAugmentaObject(message) 
	{	
		this.initialize();

		let msg = JSON.parse(message.data);

		this.#_frame = msg.object.enter.frame;
		this.#_id = msg.object.enter.id;
		this.#_oid = msg.object.enter.oid;
		this.#_age = msg.object.enter.age;
		this.#_centroid = new vec2(msg.object.enter.centroid.x, msg.object.enter.centroid.y);
		this.#_velocity = new vec2(msg.object.enter.velocity.x, msg.object.enter.velocity.y);
		this.#_orientation = msg.object.enter.orientation;
		this.#_boundingRect = new BoundingRect(msg.object.enter.boundingRect.x, msg.object.enter.boundingRect.y, msg.object.enter.boundingRect.height, msg.object.enter.boundingRect.width, msg.object.enter.boundingRect.rotation);
		this.#_height = msg.object.enter.height;
		// extra
		this.#_highest = new vec2(msg.object.enter.extra.highest.x, msg.object.enter.extra.highest.y);
		this.#_distance = msg.object.enter.extra.distance;
		this.#_reflectivity = msg.object.enter.extra.reflectivity;
	}

	//Augmenta info
	get frame () {
		return this.#_frame;
	}
	get id () {
		return this.#_id;
	}
	get oid () {
		return this.#_oid;
	}
	get age () {
		return this.#_age;
	}
	get centroid () {
		return this.#_centroid;
	}
	get velocity () {
		return this.#_velocity;
	}
	get orientation () {
		return this.#_orientation;
	}
	get boundingRect () {
		return this.#_boundingRect;
	}
	get height () {
		return this.#_height;
	}
	//extra
	get highest () {
		return this.#_highest;
	}
	get distance () {
		return this.#_distance;
	}
	get reflectivity () {
		return this.#_reflectivity;
	}

	//For display 
	get color () {
		return this.#_color;
	}

	get lastSeen () {
		return this.#_lastSeen;
	}
	set lastSeen (lastSeen) {
		this.#_lastSeen = lastSeen;
	}

};

export { AugmentaObject };