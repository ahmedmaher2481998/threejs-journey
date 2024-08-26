// TODO continue lesson 9 ,stopped at 22:40
import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

const canvas = document.querySelector("canvas#webgl") as HTMLCanvasElement;
const gui = new GUI({
  title: "my first debug ui",
  width: 350,
  closeFolders: false,
});
const debugObject = {
  color: "",
  spin: () => null,
  subdivisions: 2,
};
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
// const color = new THREE.Color("#ff0000");
debugObject.color = "#a778d8";
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: debugObject.color });
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
  camera.aspect = getAspect();
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(size.width, size.height);
});
// go full screen
window.addEventListener("dblclick", (e) => {
  if (e.target !== canvas) return;
  document.fullscreenElement;
  // const fullscreenElement: any = document.fullscreenElement
  //   ? document.fullscreenElement
  // : /*@ts-expect-error */
  // document.webkitFullscreenElement;
  // we add webkit prefix to handle safari incompatibility
  if (document.fullscreenElement) {
    // if (document.exitFullscreen)
    document.exitFullscreen();
    // // @ts-expect-error
    // else if (canvas.webkitRequestFullscreen) canvas.webkitRequestFullscreen();
  } else {
    // if (document.exitFullscreen)
    document.exitFullscreen();
    // //@ts-expect-error
    // else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
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
  if (event.key === "h") {
    event.preventDefault();
    if (gui._hidden) gui.hide();
    else gui.show();
  }
});
