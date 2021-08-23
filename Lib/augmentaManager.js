// JavaScript source code
import { AugmentaObject } from './augmentaObject.js';
import { AugmentaScene } from './augmentaScene.js';
import { Fusion } from './fusion.js';

/**
*
* AugmentaManager : connects to a given websocket address, receives and parses websockect messages sent
* Easy acces to all useful info sent by augmentaFusion
* - augmenta objects stored in a dictionary (key: oid, value: augmentaObject)
* - augmenta scene
* - fusion
*
*/
class AugmentaManager {

	#_initialized;
	#_websocketConnected;

	//Number of frame without update before we delete object
	#_augmentaObjectTimeOut;
	
	//Stores all the current info about augmenta
	#_augmentaObjects; //Dictionary containing all augmenta objects on the current frame
	#_augmentaScene; //Augmenta Scene
	#_fusion; //Fusion info

	//Websockect
	#_ip;
	#_port;
	#_websocketurl;
	#_socket;
	#_timerId; //timer, if failed to connect, try again 10 sec after

	//Functions
	
	//Augmenta Event functions
	#_objectEntered;
	#_objectUpdated;
	#_objectWillLeave;

	//Websocket connections functions
	#_websocketOpened;
	#_websocketClosed;

	constructor() {

		this.#_initialized = false;
		this.#_websocketConnected = false;

		this.#_augmentaObjectTimeOut = 20;

		//Default websocket url
		this.#_ip = '127.0.0.1';
		this.#_port = 8080;
		this.#_websocketurl = 'ws://' + this.#_ip + ':' + this.#_port;

		//Augmenta info
		this.#_augmentaObjects = {};
		this.#_augmentaScene = new AugmentaScene();
		this.#_fusion = new Fusion();

		//Default augmenta events functions
		this.#_objectEntered = (augmentaObject) => {
			console.log('Object entered: ' + augmentaObject.oid)
		}
		this.#_objectWillLeave = (augmentaObject) => {
			console.log('Object left: ' + augmentaObject.oid)
		}
		this.#_objectUpdated = (augmentaObject) => {
			console.log('Object updated: ' + augmentaObject.oid)
		}

		//Default websocket functions to check whether it succesfully connected to the websokect address or not
		this.#_websocketOpened = () => {
			console.log('connected')
		}
		this.#_websocketClosed = () => {
			console.log('disconnected')
		}
	}

	/**
	* Initialize connection and receives messages
	* Parsing is handled by Fusion, AugmentaObject and AugmentaScene classes
	*/
	startAugmentaWebsocket() {
		
		//Create the WebSocket object
		//this.#_websocketurl = websocketurl;
		this.#_socket = new WebSocket(this.#_websocketurl);

		//Websocket connection opened
		this.#_socket.onopen = () => {
			this.#_websocketConnected = true;
			if (this.#_websocketOpened != undefined) {
				this.#_websocketOpened();
			}
			
			clearInterval(this.#_timerId);

			this.#_socket.onclose = () => {
				this.#_websocketConnected = false;
				this.#_websocketClosed();
				this.#_timerId = setInterval(() => {
					console.log("trying to connect to " + this.#_websocketurl);
					this.startAugmentaWebsocket(this.#_websocketurl);
				}, 10000);
			};
		}

		//Message received
		this.#_socket.onmessage = (message) => {	
			
			//Three types of message : scene, fusion and object

			if (message.data.charAt(3) == 's') {

				if(this.#_augmentaScene !== undefined) {
					this.#_augmentaScene.updateAugmentaScene(message);
				} else {
					this.#_augmentaScene = new AugmentaScene();
					this.#_augmentaScene.updateAugmentaScene(message);
				}
				
				//Remove inactive objects in case willLeave message wasn't received
				this.#checkAlive();

			}

			if (message.data.charAt(3) == 'f') {

				if(this.#_fusion !== undefined) {
					this.#_fusion.updateFusion(message);
				} else {
					this.#_fusion = new Fusion();
					this.#_fusion.updateFusion(message);
				}

			}

			if (message.data.charAt(3) == 'o') {

				let msg = JSON.parse(message.data);	

				if(message.data.charAt(15) == 'e') { //enter

					let oid = msg.object.enter.oid;

					this.#_augmentaObjects[oid] = new AugmentaObject();
					this.#_augmentaObjects[oid].initializeAugmentaObject(message);
					this.#_objectEntered(this.#_augmentaObjects[oid]);
					this.#_augmentaObjects[oid].lastSeen = this.#_augmentaScene.frame;
				
				} else if(message.data.charAt(15) == 'u') { //update

					let oid = msg.object.update.oid;

					if(this.#_augmentaObjects[oid] !== undefined) {
						this.#_augmentaObjects[oid].updateAugmentaObject(message);
						this.#_objectUpdated(this.#_augmentaObjects[oid]);
						this.#_augmentaObjects[oid].lastSeen = this.#_augmentaScene.frame;
					} else {
						this.#_augmentaObjects[oid] = new AugmentaObject();
						this.#_augmentaObjects[oid].updateAugmentaObject(message);
						this.#_objectEntered(this.#_augmentaObjects[oid]);
						this.#_augmentaObjects[oid].lastSeen = this.#_augmentaScene.frame;
					}

				} else if(message.data.charAt(15) == 'l') { //leave
					
					let oid = msg.object.leave.oid;

					if(this.#_augmentaObjects[oid] !== undefined) {
						this.#_objectWillLeave(this.#_augmentaObjects[oid]);
						delete this.#_augmentaObjects[oid];
					}
				}
			}
		}	
		
		this.#_initialized = true;
	}

	/**For users to change all the default functions for each event : 
	* - objectEntered : when an object enter the scene
	* - objectUpdated : when an object already present in the scene is updated
	* - objectWillLeave : when an object leaves the scene
	* - websockectOpened : when a websocket connection has succesfully been made
	* - websocketClosed : when a websocket connection is closed
	*/

	setObjectEntered (objectEntered) {
		if (objectEntered && {}.toString.call(objectEntered) === '[object Function]') {
			this.#_objectEntered = objectEntered;
		} else {
			console.log("must provide a function as setObjectEntered's argument");
		}
	}

	setObjectUpdated (objectUpdated) {
		if (objectUpdated && {}.toString.call(objectUpdated) === '[object Function]') {
			this.#_objectUpdated = objectUpdated;
		} else {
			console.log("must provide a function as setObjectUpdated's argument");
		}
	}

	setObjectWillLeave (objectWillLeave) {
		if (objectWillLeave && {}.toString.call(objectWillLeave) === '[object Function]') {
			this.#_objectWillLeave = objectWillLeave;
		} else {
			console.log("must provide a function as setObjectWillLeave's argument");
		}
	}

	setWebsocketOpened (websocketOpened) {
		if (websocketOpened && {}.toString.call(websocketOpened) === '[object Function]') {
			this.#_websocketOpened = websocketOpened;
		} else {
			console.log("must provide a function as setWebsocketOpened's argument");
		}
	}

	setWebsocketClosed (websocketClosed) {
		if (websocketClosed && {}.toString.call(websocketClosed) === '[object Function]') {
			this.#_websocketClosed = websocketClosed;
		} else {
			console.log("must provide a function as setWebsocketClosed's argument");
		}
	}

	/**
	* to get fusion pixel's density in width and height
	*/
	getPixelPerMeter() {
		let ppm = new vec2(this.#_fusion.targetOutSize.x/this.#_augmentaScene.scene.x,this.#_fusion.targetOutSize.y/this.#_augmentaScene.scene.y);
		return ppm;
	}

	/**
	* To get an object relative position in the scene 
	* @param oid
	*/
	getObjectRelativePosition(oid) {

		let sceneWidth = this.#_augmentaScene.scene.x;
		let sceneHeight = this.#_augmentaScene.scene.y;

		let posX = this.#_augmentaObjects[oid].centroid.x / sceneWidth + 0.5;
		let posY = this.#_augmentaObjects[oid].centroid.y / sceneHeight + 0.5;

		return (posX,posY);
	}

	/**
	* To change the maximum number of frame an object can stay in the scene without being updated
	*/
	set timeOut(timeOut) {
		if(typeof timeOut == "number") {
			this.#_augmentaObjectTimeOut = timeOut;
		} else {
			console.log("TimeOut must be a number")
		}
	}

	/**
	* 
	* Gives access to augmentaObjects
	*
	* Returns a dictionary containing all augmenta objects 
	* key: oid of the augmenta object
	* value: augmenta object corresponding to this oid
	*
	*/
	get augmentaObjects() {
		return this.#_augmentaObjects;
	}

	/**
	* Gives access to the newest object entered in the scene
	*/
	get newestObject() {

		if(this.#_augmentaScene.objectCount == 0) {
			console.log('No object in scene')
		} else {

			var minOid = Object.keys(this.#_augmentaObjects)[0];
			var minAge = this.#_augmentaObjects[minOid].age;

			for(var oid in this.#_augmentaObjects) {
				
				if(this.#_augmentaObjects[oid].age <= minAge && oid > minOid) {
					minAge = this.#_augmentaObjects[oid].age;
					minOid = oid;
				}
			}

			return this.#_augmentaObjects[minOid];
		}
	}

	/**
	* Gives access to the oldest object entered in the scene
	*/
	get oldestObject() {
	
		if(this.#_augmentaScene.objectCount == 0) {
			console.log('No object in scene')
		} else {

			let maxAge = -1;
			let maxOid;

			for(var oid in this.#_augmentaObjects) {
				if(this.#_augmentaObjects[oid].age > maxAge) {
					maxAge = this.#_augmentaObjects[oid].age;
					maxOid = oid;
				}
			}

			return this.#_augmentaObjects[maxOid]
		}

	}

	/**
	* Gives access to augmentaScene object and its info :
	* - frame : number of the current frame
	* - objectCount : number of augmenta objects on the current frame
	* - scene : dimensions of the augmenta scene
	*	- scene.x = scene's width
	*	- scene.y = scene's height
	*/
	get augmentaScene () {
		return this.#_augmentaScene;
	}

	/**
	* Gives access to fusion object and its info :
	* - textureOffset
	* - textureBounds
	* - targetOutSize
	*/
	get fusion () {
		return this.#_fusion;
	}

	/**
	* To change port in websocket's url
	*/
	changePort(port) {

		// check type
		if (typeof port == "number" || typeof port == "string") {

			this.#_socket.close();		

			this.#_port = port;
			this.#_websocketurl = 'ws://' + this.#_ip + ':' + this.#_port;
			console.log('trying to connect to: ' + this.#_websocketurl);

			this.startAugmentaWebsocket();
			
		} else {
			console.log("port must be a string or number")
		}

	}

	/**
	* To change ip in websockect's url
	*/
	changeIP(ip) {
		
		// check type
		if (typeof ip == "string") {
		
			this.#_socket.close();

			this.#_ip = ip;
			this.#_websocketurl = 'ws://' + this.#_ip + ':' + this.#_port;
			console.log('trying to connect to: ' + this.#_websocketurl);

			setTimeout(this.startAugmentaWebsocket(), 1000);

		} else {
			console.log("ip must be a string")
		}
	}

	set websocketurl (websocketurl) {
		
		// check type
		if (typeof websocketurl == "string") {
		
			this.#_socket.close();

			this.#_websocketurl = websocketurl;
			console.log('trying to connect to: ' + this.#_websocketurl);

			setTimeout(this.startAugmentaWebsocket(), 1000);

		} else {
			console.log("ip must be a string")
		}
	}

	/**
	* Removes inactive objects in case willLeave message wasn't received properly by the websocket listener
	*/
	#checkAlive() {

		let currentFrame = this.#_augmentaScene.frame;

		for(var oid in this.#_augmentaObjects) {
			
			let object = this.#_augmentaObjects[oid];

			if (currentFrame - object.lastSeen > this.#_augmentaObjectTimeOut) {
				this.#_objectWillLeave(this.#_augmentaObjects[oid]);
				delete this.#_augmentaObjects[oid];						
			}
		}
	}
}

export { AugmentaManager };