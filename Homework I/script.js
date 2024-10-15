import * as THREE from "three";

const myScene = new THREE.Scene();
const myCamera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const myRenderer = new THREE.WebGLRenderer();
myRenderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("scene").appendChild(myRenderer.domElement);

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshBasicMaterial({
  color: 0x9575cd,
  wireframe: true,
});
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
myScene.add(sphereMesh);

myCamera.position.z = 3;

window.addEventListener("resize", () => {
  myCamera.aspect = window.innerWidth / window.innerHeight;
  myCamera.updateProjectionMatrix();
  myRenderer.setSize(window.innerWidth, window.innerHeight);
});

let lastTime = performance.now();

function animateScene(currentTime) {
  requestAnimationFrame(animateScene);
  const timeDifference = (currentTime - lastTime) / 1000;
  lastTime = currentTime;
  sphereMesh.rotation.y += timeDifference * Math.PI * 0.2;
  myRenderer.render(myScene, myCamera);
}

animateScene(lastTime);
