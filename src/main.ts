import * as THREE from "three";
import gsap from "gsap";
const canvas = document.querySelector("canvas#webgl") as HTMLCanvasElement;
console.log(`🚀 canvas is defined:${Boolean(canvas)}`);
if (!canvas) alert("canvas is not defined");

const scene = new THREE.Scene();

const size = {
  width: 800,
  height: 600,
};

const aspect = size.width / size.width;
const angel = 75;
const camera = new THREE.PerspectiveCamera(angel, aspect);
const i = 2;

camera.position.set(1, 0, i);
// camera.position.z = 3;
scene.add(camera);
// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({
    color: 0xff0000,
  })
);
scene.add(cube1);
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(size.width, size.height);
renderer.render(scene, camera);
const clock = new THREE.Clock();
const animate = () => {
  const elapsedTime = clock.getElapsedTime();
  cube1.rotation.y = elapsedTime;
  renderer.render(scene, camera);
  camera.lookAt(cube1.position);
  requestAnimationFrame(animate);
};
// renderer.setAnimationLoop(animate);
animate();
gsap.to(cube1.position, {
  duration: 1,
});
