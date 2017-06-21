
	
		window.addEventListener('DOMContentLoaded', function(){
 
			var canvas = document.getElementById('renderCanvas');
			var engine = new BABYLON.Engine(canvas, true);
		 
			function createScene() {
				var scene = new BABYLON.Scene(engine);
				var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 100, 100), scene);
				//var camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, 150, 0), scene);
				var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 0, new BABYLON.Vector3.Zero(), scene);
				camera.attachControl(canvas, false);
				//var ground = BABYLON.Mesh.CreateGround("ground1", 6000, 6000, 2, scene);
				
				scene.clearColor = new BABYLON.Color3(1, 1, 1);
				
				//Enables Skybox 
				/*
				var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
				var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
				skyboxMaterial.backFaceCulling = false;
				skyboxMaterial.disableLighting = true;
				skybox.material = skyboxMaterial;
				skybox.infiniteDistance = true;
				skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
				skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
				skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/skybox", scene);
				skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
				*/
				
				return scene;
			}
			
			
	 
			var sceneInstance = createScene();
			
			
			
			
			function elementManager(){
			
			
			
			}
			
			
			function physicsElement(mass, positionX, positionY, positionZ, speedX, speedY, speedZ, graphicsElement, name, computePhysics){
										this.graphicsElement	= graphicsElement,
										this.computePhysics		= computePhysics,
										this.mass				= mass,
										this.name				= name,
										
										this.positionX			= positionX,
										this.positionY			= positionY,
										this.positionZ			= positionZ,
										
										this.graphicsElement.position.x = positionX,
										this.graphicsElement.position.y = positionY,
										this.graphicsElement.position.z = positionZ,
										
										this.speedX				= speedX,
										this.speedY				= speedY,
										this.speedZ				= speedZ,
										
										this.move				= function(){
																	//this.calculateAcceleration();
																	this.positionX += this.speedX;
																	this.graphicsElement.position.x += this.speedX;
																	this.positionY += this.speedY;
																	this.graphicsElement.position.y += this.speedY;			
																	this.positionZ += this.speedZ;
																	this.graphicsElement.position.z += this.speedZ;
																	},
																	
										this.calculateAcceleration	= function(elementList, increment){
																		if(this.computePhysics){
																			totalForceX = 0;
																			totalForceY = 0;
																			totalForceZ = 0;
																			for(var i = 0; i < elementList.length; i++){
																				console.log("Calculating forces between " + this.name + " and: " + elementList[i].name);
																				
																
																				distance = Math.sqrt(
																					Math.pow(Math.abs(this.positionX - elementList[i].positionX), 2) +
																					Math.pow(Math.abs(this.positionY - elementList[i].positionY), 2) +
																					Math.pow(Math.abs(this.positionZ - elementList[i].positionZ), 2));
																				var totalForce = ((elementList[i].mass *  this.mass)/distance);
																				
																				totalForceX += totalForce * ((this.positionX - elementList[i].positionX)/distance)
																				totalForceY += totalForce * ((this.positionY - elementList[i].positionY)/distance)
																				totalForceZ += totalForce * ((this.positionZ - elementList[i].positionZ)/distance)
																				}
																			//console.log("Acceleration x = " + totalForceX/this.mass);
																			//console.log("Acceleration y = " + totalForceY/this.mass);
																			//console.log("Acceleration z = " + totalForceZ/this.mass);
																			this.speedX -= totalForceX/this.mass;
																			this.speedY -= totalForceY/this.mass;
																			this.speedZ -= totalForceZ/this.mass;
																			}
																		},
																
										this.accelerate 			= function(x,y,z){
																		this.speedX += x;
																		this.speedY += y;
																		this.speedZ += z;
										
										
										}
											
				}
				
			//var physicsElements = [new physicsElement()];
			
			var physicsElements = [new physicsElement(15,  0, 0, 0,  0, 0, 0, BABYLON.Mesh.CreateSphere("Box1", 16, 15, sceneInstance), "box1", false), 
									new physicsElement(3,  100, 0, 0,  0, 0, 5, BABYLON.Mesh.CreateSphere("Box2", 16,  3, sceneInstance), "box2", true),
									new physicsElement(2,  150, 0, 0,  0, 0, 5, BABYLON.Mesh.CreateSphere("Box3", 16,  2, sceneInstance), "box3", true),
									new physicsElement(4,  400, 0, 0,  0, 0, 2, BABYLON.Mesh.CreateSphere("Box3", 16, 4, sceneInstance), "box3", true)									]
			
			physicsElements[1].graphicsElement.position.x
			
			/** WIP
			function trail = (n){
				
				this.vectorList = []
					for (var i = 0; i < n; i++){
						vectorlist.push(new BABYLON.Vector3(-10, 0, 0),);
					} 
				this.railGraphic var lines = BABYLON.Mesh.CreateLines("lines", [
					
					new BABYLON.Vector3(10, 0, 0),
					new BABYLON.Vector3(0, 0, -10),
					new BABYLON.Vector3(0, 0, 10)
], scene);
			
			
			}
			**/
		 
			engine.runRenderLoop(function() {
				sceneInstance.render();
			});
		 
			window.addEventListener('resize', function() {
				engine.resize();
			});
			
			//function calculateForce()
			
			
			
			
			function incrementPhysics(scene){
				for(var i = 0; i < physicsElements.length; i++){
					modifiedElementList = physicsElements.slice();
					modifiedElementList.splice(i, 1);
					physicsElements[i].calculateAcceleration(modifiedElementList);
					physicsElements[i].move();
					
				}
			}
			
			//Clock manager
			var intervalID = window.setInterval(clock, 40);
			function clock (sceneInstance){
				incrementPhysics(sceneInstance);
			} 
		
		});
