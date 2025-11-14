import './style.css'
//IMPORT THREE.JS SO WE CAN ACCESS IT
import * as THREE from 'three'
//IMPORT OUR ADD DEFAULT MESHES FUNCTION FROM OUR EXTERNAL JS FILE
import { addDefaultMeshes, addStandardMesh } from './addDefaultMeshes'
import { addLight } from './addLight'
import { addBubbleMesh } from './addBubbleMesh'	
import { addRockMesh } from './addRockMesh'

//SET UP OUR ESSENTIALS SCENE, CAMERA, RENDERER
const scene = new THREE.Scene()

//THE FOUR PARAMETERS TO OUR PERSPECTIVE CAMERA ARE: (FOV, ASPECT RATIO, NEAR FRUSTUM, FAR FRUSTUM)
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
)
const renderer = new THREE.WebGLRenderer({ antialias: true })

//SET THE CAMERA Z POSITION TO 5 SO THAT WE'RE NOT ON TOP OF ALL OUR MESHES BY DEFAULT
camera.position.set(0, 0, 5)

//CREATE A GLOBALLY ACCESSIBLE OBJECT TO HOLD ONTO ALL OF OUR MESHES
const meshes = {}
const lights = {}

const clock = new THREE.Clock()

//CALL OUR INIT FUNCTION, OUR SETUP BASICALLY
init()
function init() {
	//DEFAULT SETTINGS FOR OUR RENDERER, WE WANT TO SET THE SIZE OF OUR RENDERER OUTPUT TO BE THE SAME SIZE AND RATIO AS OUR WINDOW
	//WE ALSO WANT OUR RENDERER TO OUTPUT TO OUR WEBPAGE
	renderer.setSize(window.innerWidth, window.innerHeight)
	document.body.appendChild(renderer.domElement)

	//WE WILL ADD ANY AND ALL 3D MESHES TO OUR GLOBAL MESHES OBJECT HERE
	meshes.default = addDefaultMeshes({ xPos: -2 })

	meshes.standard = addStandardMesh({ xPos: 2 })

	//Lights
	lights.default = addLight()

	// meshes.textured = addTexturedMesh()
	meshes.bubble = addBubbleMesh()
	meshes.rock = addRockMesh()

	//HERE WE'LL ADD EACH OBJECT TO OUR SCENE AS WELL
	// scene.add(meshes.default)
	// scene.add(meshes.textured)
	scene.add(meshes.bubble)
	scene.add(meshes.rock)
	// scene.add(meshes.standard)
	scene.add(lights.default)

	//START OUR ANIMATION LOOP
	animate()
}

function animate() {
	//EVERY FRAME WE UPDATE THE POSITION OF OUR meshes.default, meshes.copy, meshes.copy2
	// meshes.standard.rotation.x += 0.01
	// meshes.standard.rotation.y += 0.01
	// meshes.default.rotation.x -= 0.01
	// meshes.default.rotation.y -= 0.02
	// meshes.textured.rotation.x += 0.001
	// meshes.textured.rotation.y += 0.001
	// meshes.bubble.rotation.x += 0.001
	// meshes.bubble.rotation.y += 0.001
	meshes.rock.rotation.x += 0.001
	meshes.rock.rotation.y += 0.001

	// meshes.textured.material.displacementScale = Math.sin(clock.getElapsedTime()) * 0.3 + 0.3
	// meshes.bubble.material.displacementScale = Math.sin(clock.getElapsedTime()) * 0.3 + 0.3
	meshes.rock.material.displacementScale = Math.sin(clock.getElapsedTime()) * 0.3 + 0.3
	meshes.rock.material.roughness = Math.sin(clock.getElapsedTime()) * 0.3 + 0.3
	//RE-START THE LOOP
	requestAnimationFrame(animate)

	//RENDER OUR SCENE VIA CAMERA VIEW TO SCREEN
	renderer.render(scene, camera)
}
