import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { gsap } from "gsap";

// Basic Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 10, 30);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("canvas"),
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Camera Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Materials
const materials = {
  grass: new THREE.MeshBasicMaterial({ color: "green" }),
  road: new THREE.MeshBasicMaterial({ color: "gray" }),
  building: new THREE.MeshBasicMaterial({ color: "#87CEEB" }),
  sphere: new THREE.MeshBasicMaterial({ color: "red" }),
};

// Ground and Roads
function createGroundAndRoads() {
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 40),
    materials.grass
  );
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  const roadConfigs = [
    { width: 5, height: 40, x: 0, y: 0.01, z: 0 }, // Vertical road
    { width: 18, height: 5, x: -11, y: 0.01, z: -6 }, // Bottom horizontal road
    { width: 18, height: 5, x: 11, y: 0.1, z: -6 }, // Top horizontal road
  ];

  roadConfigs.forEach(({ width, height, x, y, z }) => {
    const road = new THREE.Mesh(
      new THREE.PlaneGeometry(width, height),
      materials.road
    );
    road.rotation.x = -Math.PI / 2;
    road.position.set(x, y, z);
    scene.add(road);
  });
}

// Buildings with Labels
function createBuilding(x, z, width, height, depth, label, rotationY = 0) {
  const building = new THREE.Mesh(
    new THREE.BoxGeometry(width, height, depth),
    materials.building
  );
  building.position.set(x, height / 2, z);
  building.rotation.y = rotationY;
  scene.add(building);

  addLabel(building, label);
}

// Add text label to buildings
function addLabel(building, text) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  context.font = "70px Arial";
  context.fillStyle = "black";
  context.fillText(text, 50, 50);

  const texture = new THREE.CanvasTexture(canvas);
  const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
  const sprite = new THREE.Sprite(spriteMaterial);
  sprite.scale.set(2, 1, 1);
  sprite.position.set(0, 2, 0);
  building.add(sprite);
}

// Animated Sphere
function createAnimatedSphere() {
  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    materials.sphere
  );
  sphere.position.set(0, 0.5, 0);
  scene.add(sphere);

  gsap.to(sphere.position, {
    duration: 20,
    repeat: -1,
    ease: "linear",
    keyframes: [
      { x: 0, z: 15 },
      { x: -5.5, z: 15 },
      { x: 0, z: 12 },
      { x: 0, z: 2 },
      { x: -5.5, z: 2 },
      { x: 0, z: 2 },
      { x: 0, z: -15 },
      { x: -5.5, z: -15 },
      { x: 0, z: -12 },
      { x: 0, z: 0 },
    ],
  });
}

// Initialize Scene Content
function init() {
  createGroundAndRoads();

  createBuilding(-5.5, 14, 6, 3, 7, "301");
  createBuilding(-5.5, 2, 6, 3, 7, "302");
  createBuilding(-5.5, -14, 6, 3, 7, "303");
  createBuilding(11, 6, 8, 3, 15, "801", Math.PI / 6);

  createAnimatedSphere();
}

// Animation Loop
function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

// Run
init();
animate();
