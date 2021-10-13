# Augmenta-js

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
With ```port``` a number or a string, ```ip``` a string and ```websocketurl``` a valid websocket address.  
  
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
- ```offset``` the output offset in pixels (of class ```vec2```)
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
  
## Examples 
  
To run the examples you can either run them locally on web server for local development such as [Servez](https://greggman.github.io/servez/) and open the repo's folder or try them directly by clicking [here](https://theoriz.github.io/Augmenta-js/index.html).

There is two examples : a very simple one using no other librairies than this one, and a more complex example adapted from a [three js example](https://threejs.org/examples/?q=gpgp#webgl_gpgpu_birds).
- Augmenta-js/Simple Example/simpleExample.html
- Augmenta-js/three js example/examples/webgl_gpgpu_bird.html 
