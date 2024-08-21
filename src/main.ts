// TODO cpntinue lesson 6 ,stopped at 20:00
import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three-orbitcontrols-ts";
const canvas = document.querySelector("canvas#webgl") as HTMLCanvasElement;
const size = {
  width: 800,
  height: 600,
};
/**
 * cursor
 */
// const cursor = { x: 0, y: 0 };

// window.addEventListener("mousemove", (e) => {
//   cursor.x = e.clientX / size.width - 0.5;
//   cursor.y = e.clientY / size.height - 0.5;
//   // console.log(cursor);
// });
console.log(`🚀 canvas is defined:${Boolean(canvas)}`);
if (!canvas) alert("canvas is not defined");

const scene = new THREE.Scene();

const aspect = size.width / size.width;
const angel = 75; // field of view preferred between 45-75
const near = 0.1;
const far = 100;
const camera = new THREE.PerspectiveCamera(angel, aspect, near, far);
// to remove the distortion caused by the canvas size
// const camera = new THREE.OrthographicCamera(
//   -1 * aspect,
//   1 * aspect,
//   1,
//   -1,
//   near,
//   far
// );
const i = 2;

// camera.position.set(i, i, i);
camera.position.z = 2;
scene.add(camera);
// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({
    color: 0xff0000,
  })
);
camera.lookAt(cube1.position);
scene.add(cube1);
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(size.width, size.height);
renderer.render(scene, camera);
const clock = new THREE.Clock();

const controls = new OrbitControls(camera, canvas);
// controls.target.y = 2;
controls.enableDamping = true;
controls.update();

const animate = () => {
  const elapsedTime = clock.getElapsedTime();
  // console.log(camera.position);
  // camera.position.x += 0.1;
  // cube1.rotation.y = elapsedTime;
  // camera.lookAt(cube1.position);
  // cube1.rotation.y = elapsedTime;
  // camera.position.x = Math.sin(cursor.x * 2 * Math.PI) * 3;
  // camera.position.z = Math.cos(cursor.x * 2 * Math.PI) * 3;
  // camera.position.y = cursor.y;
  // camera.lookAt(cube1.position);
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};
// renderer.setAnimationLoop(animate);
animate();
// gsap.to(cube1.position, {
//   duration: 1,
// });
