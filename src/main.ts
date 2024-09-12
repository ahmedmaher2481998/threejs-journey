// TODO continue lesson 10 texture  ,stopped at 50:40
import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
const loadManager = new THREE.LoadingManager();

// loadManager.onStart = () => {
//   console.log("on start");
// };

// loadManager.onProgress = () => {
//   console.log("onProgress");
// };

// loadManager.onLoad = () => {
//   console.log("onLoad");
// };

// loadManager.onError = () => {
//   console.log("onError");
// };

const textureLoader = new THREE.TextureLoader(loadManager);

const colorTexture = textureLoader.load("/textures/door/color.jpg");
// const alphaTexture = textureLoader.load("/textures/door/alpha.jpg");
// const metalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
// const roughnessTexture = textureLoader.load("/textures/door/roughness.jpg");
// const normalTexture = textureLoader.load("/textures/door/normal.jpg");
// const heightTexture = textureLoader.load("/textures/door/height.jpg");
// const ambientOcclusionTexture = textureLoader.load(
//   "/textures/door/ambientOcclusion.jpg"
// );
// colorTexture.repeat.x = 2;
// colorTexture.repeat.y = 3;
// colorTexture.wrapS = THREE.RepeatWrapping;
// colorTexture.wrapT = THREE.RepeatWrapping;
// colorTexture.offset.x = 0.5;
// colorTexture.offset.y = 0.5;
// colorTexture.wrapS = THREE.MirroredRepeatWrapping;
// colorTexture.wrapT = THREE.MirroredRepeatWrapping;
// rotation happens at uv 0,0 we move the center of rotation to the .5 x & .5 y of the cube
colorTexture.rotation = Math.PI * 0.25;
colorTexture.center.x = 0.5;
colorTexture.center.y = 0.5;

const canvas = document.querySelector("canvas#webgl") as HTMLCanvasElement;
const gui = new GUI({
  title: "my first debug ui",
  width: 350,
  closeFolders: false,
});
gui.hide();
const debugObject = {
  color: "",
  spin: () => null,
  subdivisions: 2,
};
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
  getAspect() {
    return this.width / this.height;
  },
};
if (!canvas) alert("canvas is not defined");

const scene = new THREE.Scene();

const angel = 75; // field of view preferred between 45-75
const near = 0.1;
const far = 100;
const camera = new THREE.PerspectiveCamera(angel, size.getAspect(), near, far);

camera.position.z = 2;
scene.add(camera);
// const color = new THREE.Color("#ff0000");
debugObject.color = "#a778d8";
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ map: colorTexture });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

camera.lookAt(mesh.position);
const renderer = new THREE.WebGLRenderer({
  canvas,
});

renderer.setSize(size.width, size.height);

renderer.render(scene, camera);

window.addEventListener("resize", (e) => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;
  camera.aspect = size.getAspect();
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(size.width, size.height);
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
// adding debug ui
const cubeTweak = gui.addFolder("cube controls");
cubeTweak.add(mesh.position, "y").min(-3).max(3).step(0.01).name("elevation");
cubeTweak.add(mesh.position, "x").min(-3).max(3).step(0.01).name("sliding");
cubeTweak.add(mesh.position, "z").min(-3).max(3).step(0.01).name("push-pull");
cubeTweak.add(material, "wireframe").name("wireframe");
cubeTweak.add(mesh, "visible").name("visible");
cubeTweak
  .addColor(debugObject, "color")
  .onChange((value: string) => {
    material.color.set(debugObject.color);
    // value.set(value.getHexString());
  })
  .name("cube color");
debugObject.spin = () => {
  console.log("spin.");
  gsap.to(mesh.rotation, {
    y: mesh.rotation.y + Math.PI * 2,
    duration: 2,
  });
  return null;
};

cubeTweak.add(debugObject, "spin");
cubeTweak
  .add(debugObject, "subdivisions")
  .min(1)
  .max(20)
  .step(1)
  .onFinishChange(() => {
    mesh.geometry.dispose();
    material.wireframe = true;
    let x,
      y,
      z = debugObject.subdivisions;
    mesh.geometry = new THREE.BoxGeometry(1, 1, 1, x, y, z);
  });
window.addEventListener("keydown", (event: KeyboardEvent) => {
  event.preventDefault();
  if (event.key === "h") {
    if (!gui._hidden) gui.hide();
    else gui.show();
  }
});
