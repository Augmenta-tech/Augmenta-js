# Augmenta-js

A [Javascript](https://developer.mozilla.org/fr/docs/Web/JavaScript) library for [Augmenta Tracking](https://augmenta-tech.com/) using [Websocket](https://developer.mozilla.org/fr/docs/Web/API/WebSockets_API), created by [Théoriz Studio](https://www.theoriz.com/fr/bienvenue/).

## Demo

Try the live examples [here](http://augmenta-js.augmenta.tech/)

![flocking_1](https://user-images.githubusercontent.com/64955193/138885250-88a95bab-3b4b-487a-a001-5e674ea2b7d7.gif)

## Examples 

To run the examples you can click [here](http://augmenta-js.augmenta.tech/) or run them locally on a web server for local development such as [Servez](https://greggman.github.io/servez/) and open the repo's folder.

There is two examples : a very simple one using no other librairies than this one, and a more complex example adapted from a [three js example](https://threejs.org/examples/?q=gpgp#webgl_gpgpu_birds).
- Augmenta-js/Simple Example/simpleExample.html
- Augmenta-js/three js example/examples/webgl_gpgpu_bird.html 

> **Important note :** 
> 
> If you run AugmentaFusion and the examples on a local server (such as [Servez](https://greggman.github.io/servez/)) on the same computer you will be able to use both secure connection and regular connection. However - as AugmentaFusion is not able to send secure connection to browsers - if you want to run the examples on a different computer you will have to set your local server in http instead of https. You will also have to make sure secure connections are disabled on both client (these examples or your own example) and server (AugmentaFusion) sides. If you want to try the examples on the github page you will just have to disbale secure connections in the example interface and in AugmentaFusion ([the github page](https://augmenta-tech.github.io/Augmenta-js/) is set in http by default for that matter).

## Documentation
  
### Initialize augmenta manager and open websocket connection
  
```javascript
var augmentaManager = new AugmentaManager()
augmentaManager.startAugmentaWebsocket()
```  

Default websocket url : ws://127.0.0.1:8080. 

Once the connection is opened, the augmenta manager receives and parses all the messaged from the websocket address.  
    
### Change websocket url

You can change the websocket's address either by changing the port and/or the ip or by changing the entire url directly. The websocket connection will be automatically closed and reopened if the address is valid. Make sure the address is the same as your websocket output running in fusion.

```javascript 
augmentaManager.changePort(port)
```
```javascript
augmentaManager.changeIP(ip)
```
```javascript
augmentaManager.websocketurl = websocketurl
```  
With ```port``` a number or a string, ```ip``` a string and ```websocketurl``` a string
```javascript
augmentaManager.useSecureConnection = true
```  
Allows you to enable or disable secure conection (by default disablbed)
  
### Custom functions for augmenta's event

You can change the default functions called whenever the augmenta manager receives a message or closes/opens a websocket connection.
  
```javascript
augmentaManager.setObjectEntered(objectEntered)
```
```javascript
augmentaManager.setObjectUpdated(objectEntered)
```
```javascript
augmentaManager.setObjectWillLeave(objectEntered)
```
With ```objectEntered```, ```objectUpdated``` and ```objectWillLeave``` javascript functions taking an instance of class AugmentaObject as only argument.
  
```javascript
augmentaManager.setWebsocketOpened(websocketOpened)
```
```javascript
augmentaManager.setWebsocketClosed(websocketClosed)
```  
With ```websocketOpened``` and ```websocketClosed``` javascript functions taking no argument.

```javascript
augmentaManager.setFusionUpdated(objectEntered)
```
With ```fusionUpdated``` a javascript function taking an instance of class Fusion as only argument.
  
### Extra

You can change the time an inactive object is stored by the augmenta manager. 
``` javascript
augmentaManager.timeOut = timeOut
```  
With ```timeOut``` the number of frame an object can remain inactive before being removed from the scene.

### Access augmenta and fusion's info
  
For instances of class ```AugmentaManager``` you can access :  
- ```augmentaObjects```  
A dictionary containing all augmenta objects in the current frame of type ```AugmentaObject``` indexed by their ```oid```.  
- ```newestObject```  
The youngest augmenta object of type ```AugmentaObject``` in the current frame
- ```oldestObject```  
The oldest augmenta object of type ```AugmentaObject``` in the current frame
- ```augmentaScene```  
The current augmenta scene of class ```AugmentaScene```.  
- ```fusion```  
An instance of class ```Fusion``` storing fusion's informations.  
  
For instances of class ```AugmentaObject``` you can access: 
- ```frame```
- ```id```
- ```oid```
- ```age```
- ```centroid``` (of class ```vec2```)
- ```velocity``` (of class ```vec2```)
- ```orientation```
- ```boundingRect``` (of class ```BoundingRect```)
- ```height```
  
- ```lastSeen``` the scene's frame it was last seen in

- ```color``` (for display purposes only)

If extra data are also sent you can also access:

- ```highest``` the position of the highest point (of class ```vec2```)
- ```distance```
- ```reflectivity```
  
For instances of class ```AugmentaScene``` you can access:
- ```frame```
- ```objectCount```
- ```scene``` (of class ```vec2```)  

For instances of class ```Fusion``` you can access:
- ```offset``` the offset in scene in meters (of class ```vec2```)
- ```videoOut``` the size of the video output in meters (of class ```vec2```)
- ```videoOutInPixels``` the size of the video output in pixels (of class ```vec2```)
  
Other informations you might need :
  
```javascript
augmentaManager.getPixelPerMeter()
```    
To know the pixel density in width and height.  

```javascript
augmentaManager.getObjectRelativePosition(oid)
```
To get an object's relative position in the scene. Returns a ```vec2```.  
