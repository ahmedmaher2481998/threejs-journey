// TODO continue lesson 9 ,stopped at 22:40
import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

const canvas = document.querySelector("canvas#webgl") as HTMLCanvasElement;
const gui = new GUI();
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};
if (!canvas) alert("canvas is not defined");

const scene = new THREE.Scene();

const getAspect = () => size.width / size.height;
const angel = 75; // field of view preferred between 45-75
const near = 0.1;
const far = 100;
const camera = new THREE.PerspectiveCamera(angel, getAspect(), near, far);

camera.position.z = 2;
scene.add(camera);
const material = new THREE.MeshBasicMaterial({
  color: "#ff0000",
  wireframe: false,
});
const box = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1);
const cube1 = new THREE.Mesh(box, material);

gui.add(cube1.position, "y").min(-3).max(3).step(0.01).name("elevation");
gui.add(cube1.position, "x").min(-3).max(3).step(0.01).name("sliding");
gui.add(cube1.position, "z").min(-3).max(3).step(0.01).name("push-pull");
gui.add(material, "wireframe").name("wireframe");
gui.add(cube1, "visible").name("visible");
gui
  .addColor(material.color, "color")
  .onChange((value: THREE.Color) => {
    console.log(value.getHex());
    // value.set(value.getHexString());
  })
  .name("cube color");
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
