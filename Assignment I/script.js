import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { gsap } from "gsap";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  55,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 20, -30);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("canvas"),
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const grassMaterial = new THREE.MeshBasicMaterial({ color: "green" });
const roadMaterial = new THREE.MeshBasicMaterial({ color: "gray" });
const skyBlueBuildingMaterial = new THREE.MeshBasicMaterial({
  color: "#87CEEB",
});

const groundGrass = new THREE.Mesh(
  new THREE.PlaneGeometry(80, 80),
  grassMaterial
);
groundGrass.rotation.x = -Math.PI / 2;
scene.add(groundGrass);

const centralCircle = new THREE.Mesh(
  new THREE.CircleGeometry(6, 32),
  roadMaterial
);
centralCircle.rotation.x = -Math.PI / 2;
centralCircle.position.y = 0.02;
scene.add(centralCircle);

const roadLength = 12;
const radialRoad1 = new THREE.Mesh(
  new THREE.PlaneGeometry(3, roadLength + 2),
  roadMaterial
);
radialRoad1.rotation.x = -Math.PI / 2;
radialRoad1.position.set(0, 0.01, -roadLength / 2 - 5);
scene.add(radialRoad1);

const radialRoad1New = new THREE.Mesh(
  new THREE.PlaneGeometry(3, roadLength + 5),
  roadMaterial
);
radialRoad1New.rotation.x = -Math.PI / 2;
radialRoad1New.rotation.z = -Math.PI / 1.05;
radialRoad1New.position.set(18, 0.01, -roadLength / 2 - 6);
scene.add(radialRoad1New);

const radialRoad2 = new THREE.Mesh(
  new THREE.PlaneGeometry(3, roadLength + 15),
  roadMaterial
);
radialRoad2.rotation.x = -Math.PI / 2;
radialRoad2.position.set(roadLength / 2 + 6, 0.01, -3);
radialRoad2.rotation.z = -Math.PI / 2.2;
scene.add(radialRoad2);

const helperradialRoad2 = new THREE.Mesh(
  new THREE.PlaneGeometry(3, roadLength + 3),
  roadMaterial
);
helperradialRoad2.rotation.x = -Math.PI / 2;
helperradialRoad2.position.set(roadLength / 2 + 0, 0.01, 5);
helperradialRoad2.rotation.z = Math.PI / 4;
scene.add(helperradialRoad2);

const radialRoad3 = new THREE.Mesh(
  new THREE.PlaneGeometry(3, roadLength + 10),
  roadMaterial
);
radialRoad3.rotation.x = -Math.PI / 2;
radialRoad3.position.set(0, 0.01, roadLength / 2 + 6);
scene.add(radialRoad3);

const radialRoadup3 = new THREE.Mesh(
  new THREE.PlaneGeometry(3, 9),
  roadMaterial
);
radialRoadup3.rotation.x = -Math.PI / 2;
radialRoadup3.position.set(9, 0.01, roadLength / 2 + 7);
scene.add(radialRoadup3);

const radialRoadupHelper3 = new THREE.Mesh(
  new THREE.PlaneGeometry(3, 5),
  roadMaterial
);
radialRoadupHelper3.rotation.x = -Math.PI / 2;
radialRoadupHelper3.position.set(-3, 0.01, -10);
radialRoadupHelper3.rotation.z = -Math.PI / 1.9;
scene.add(radialRoadupHelper3);

const radialRoadupHelper4 = new THREE.Mesh(
  new THREE.PlaneGeometry(3, 5),
  roadMaterial
);
radialRoadupHelper4.rotation.x = -Math.PI / 2;
radialRoadupHelper4.position.set(-12, 0.01, 12);
radialRoadupHelper4.rotation.z = Math.PI / 0.9;
scene.add(radialRoadupHelper4);

const additionalRoad = new THREE.Mesh(
  new THREE.PlaneGeometry(3, 18),
  roadMaterial
);
additionalRoad.rotation.x = -Math.PI / 2;
additionalRoad.position.set(-10, 0.02, 8);
additionalRoad.rotation.z = -Math.PI / 3.2;
scene.add(additionalRoad);

function createBuilding(x, z, width, height, depth, rotationY = 0) {
  const building = new THREE.Mesh(
    new THREE.BoxGeometry(width, height, depth),
    skyBlueBuildingMaterial
  );
  building.position.set(x, height / 2, z);
  building.rotation.y = rotationY;
  scene.add(building);
  return building;
}

const building1 = createBuilding(-10, 15, 4, 3, 15, -Math.PI / 3);
addLabel(building1, "305");

const building2 = createBuilding(5.5, 15, 5, 3, 12, -Math.PI / 1.04);
addLabel(building2, "400");

const building3 = createBuilding(18, 20, 4, 3, 23, -Math.PI / 7);
addLabel(building3, "804");

const building4 = createBuilding(-6, -15, 4, 3, 15, -Math.PI / 1);
addLabel(building4, "814");

const building5 = createBuilding(12, 1, 4, 3, 9, -Math.PI / 2.2);
addLabel(building5, "304");

const building6 = createBuilding(10, -14, 4, 3, 7, -Math.PI / 2.2);
addLabel(building6, "LH1");

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

const sphereMaterial = new THREE.MeshBasicMaterial({ color: "red" });
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 32, 32),
  sphereMaterial
);

sphere.position.set(0, 0.5, 0);
scene.add(sphere);

gsap.to(sphere.position, {
  duration: 20,
  repeat: -1,
  ease: "linear",
  keyframes: [
    { x: 0, z: 0, duration: 1 },
    { x: -12, z: 10, duration: 1 },
    { x: -10, z: 15, y: 1.5, duration: 1 },
    { x: -13, z: 10, y: 0.5, duration: 1 },
    { x: -2, z: 3, duration: 1 },
    { x: 2, z: -2, y: 0.5, duration: 1 },
    { x: 12, z: -2.2, y: 0.5, duration: 1 },
    { x: 12, z: 0, y: 1.5, duration: 1 },
    { x: 12, z: -4, y: 0.5, duration: 1 },
    { x: 0, z: -1, duration: 1 },
    { x: 0, z: -10, duration: 1 },
    { x: -5, z: -10, duration: 1 },
    { x: 0, z: -10, y: 0.5, duration: 1 },
    { x: 0, z: 0, duration: 1 },
  ],
});

function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
