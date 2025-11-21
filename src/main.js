import "./style.css";
//IMPORT THREE.JS SO WE CAN ACCESS IT
import * as THREE from "three";
//IMPORT OUR ADD DEFAULT MESHES FUNCTION FROM OUR EXTERNAL JS FILE
import { addLight } from "./addLight";
import Model from "./model";
import { manager } from "./manager";
import { environment } from "./environment";
import { WheelAdaptor } from "three-story-controls";
import gsap from "gsap";

//SET UP OUR ESSENTIALS SCENE, CAMERA, RENDERER
const scene = new THREE.Scene();
scene.background = environment();
scene.environment = environment();
//THE FOUR PARAMETERS TO OUR PERSPECTIVE CAMERA ARE: (FOV, ASPECT RATIO, NEAR FRUSTUM, FAR FRUSTUM)
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });

//SET THE CAMERA Z POSITION TO 5 SO THAT WE'RE NOT ON TOP OF ALL OUR MESHES BY DEFAULT
camera.position.set(0, 0, 5);

//CREATE A GLOBALLY ACCESSIBLE OBJECT TO HOLD ONTO ALL OF OUR MESHES
const meshes = {};
const lights = {};

const clock = new THREE.Clock();
const loadingManager = manager();

const array_positions = [
  { x: -1.0, y: 0, z: 10 },
  { x: -0.5, y: 0, z: 10 },
  { x: 0, y: 0, z: 10 },
  { x: 0.5, y: 0, z: 10 },
  { x: 1.0, y: 0, z: 10 },
];

const model_count = 5;
const wheel = new WheelAdaptor({ type: "discrete" });
let current_model = 0;
wheel.connect();
wheel.addEventListener("trigger", () => {
  console.log("triggered");
  if (current_model < model_count) {
    current_model++;
  } else {
    current_model = 0;
  }
  console.log(current_model);
  gsap.to(camera.position, {
    x: array_positions[current_model].x,
    y: array_positions[current_model].y,
    z: array_positions[current_model].z,
    duration: 1,
    ease: "power2.inOut",
  });
});

//CALL OUR INIT FUNCTION, OUR SETUP BASICALLY
init();
function init() {
  //DEFAULT SETTINGS FOR OUR RENDERER, WE WANT TO SET THE SIZE OF OUR RENDERER OUTPUT TO BE THE SAME SIZE AND RATIO AS OUR WINDOW
  //WE ALSO WANT OUR RENDERER TO OUTPUT TO OUR WEBPAGE
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  //Lights
  lights.default = addLight();
  scene.add(lights.default);

  //START OUR ANIMATION LOOP
  instances();
  animate();
}

function instances() {

  const bananaduck = new Model({
    name: "bananaduck",
    url: "banana_duck.glb",
    scene: scene,
    meshes: meshes,
    scale: new THREE.Vector3(0.5, 0.5, 0.5),
    position: new THREE.Vector3(-1.5, 0, 0),
    manager: loadingManager,
  });
  bananaduck.init();

  const miku = new Model({
    name: "miku",
    url: "low_poly_miku_hatsune.glb",
    scene: scene,
    meshes: meshes,
    scale: new THREE.Vector3(1.2, 1.2, 1.2),
    position: new THREE.Vector3(0, 0, 0),
    manager: loadingManager,
  });
  miku.init();

  const froggy = new Model({
    name: "froggy",
    url: "animal_crossing_froggy_chair.glb",
    scene: scene,
    meshes: meshes,
    scale: new THREE.Vector3(1.5, 1.5, 1.5),
    position: new THREE.Vector3(1.5, 0, 0),
    manager: loadingManager,
  });
  froggy.init();

  const bananakanata = new Model({
    name: "bananakanata",
    url: "batana.glb",
    scene: scene,
    meshes: meshes,
    scale: new THREE.Vector3(0.00001, 0.00001, 0.00001),
    position: new THREE.Vector3(2, 1, 0),
    manager: loadingManager,
  });
  bananakanata.init();

  const toilet = new Model({
    name: "toilet",
    url: "rigged_toilet.glb",
    scene: scene,
    meshes: meshes,
    scale: new THREE.Vector3(0.5, 0.5, 0.5),
    position: new THREE.Vector3(-2.5, 0, 0),
    manager: loadingManager,
  });
  toilet.init();
}

function animate() {
  //EVERY FRAME WE UPDATE THE POSITION OF OUR meshes.default, meshes.copy, meshes.copy2
  // const delta = clock.getDelta()
  // for (const mixer of mixers) {
  // 	mixer.update(delta)
  // }
  //RE-START THE LOOP
  requestAnimationFrame(animate);

  //RENDER OUR SCENE VIA CAMERA VIEW TO SCREEN
  renderer.render(scene, camera);
}
