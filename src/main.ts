// TODO cpntinue lesson 6 ,stopped at 20:00
import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
const canvas = document.querySelector("canvas#webgl") as HTMLCanvasElement;
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
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

const getAspect = () => size.width / size.height;
const angel = 75; // field of view preferred between 45-75
const near = 0.1;
const far = 100;
const camera = new THREE.PerspectiveCamera(angel, getAspect(), near, far);

camera.position.z = 2;
scene.add(camera);
const geometry = new THREE.BufferGeometry();

const count = 50;
const numberOfVertexFloats = 3;
const positionsArray = new Float32Array(count * 3 * numberOfVertexFloats);
for (let i = 0; i < positionsArray.length; i++) {
  positionsArray[i] = (Math.random() - 0.5) * 10;
}
const positionAttribute = new THREE.BufferAttribute(
  positionsArray,
  numberOfVertexFloats
);

// const p1 = [0, 0, 0];
// const p2 = [0, 1, 0];
// const p3 = [1, 0, 0];
// const positionsArray = new Float32Array([...p1, ...p2, ...p3, ...p4]);
// const positionAttribute = new THREE.BufferAttribute(positionsArray, 3);
// g.setAttribute("position", positionAttribute);
geometry.setAttribute("position", positionAttribute);
const cube1 = new THREE.Mesh(
  // new THREE.BoxGeometry(1, 1, 1, 1, 1, 1),
  geometry,
  new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true,
  })
);
camera.lookAt(cube1.position);
scene.add(cube1);
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(size.width, size.height);

renderer.render(scene, camera);

window.addEventListener("resize", (e) => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;
  camera.aspect = getAspect();
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(size.width, size.height);
});
// go full screen
window.addEventListener("dblclick", () => {
  const fullscreenElement: any = //@ts-expect-error
    document.fullscreenElement || document.webkitFullscreenElement;
  // we add webkit prefix to handle safari incompatibility
  if (!fullscreenElement) {
    if (document.exitFullscreen) document.exitFullscreen();
    //@ts-expect-error
    else if (canvas.webkitRequestFullscreen) canvas.webkitRequestFullscreen();
  } else {
    if (document.exitFullscreen) document.exitFullscreen();
    //@ts-expect-error
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
  }
});
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.update();

const animate = () => {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};
animate();
