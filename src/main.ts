import * as THREE from "three";
import gsap from "gsap";
const canvas = document.querySelector("canvas#webgl") as HTMLCanvasElement;
console.log("🚀 ~ webgl:", canvas);
if (!canvas) alert("no canvas found in the dom ");
const scene = new THREE.Scene();
// const geo = new T.BoxGeometry(1, 1, 1);
// const material = new T.MeshBasicMaterial({
//   color: "red",
// });

// const mesh = new T.Mesh(geo, material);
const size = {
  width: 800,
  height: 600,
};
const aspect = size.width / size.width;
const camera = new THREE.PerspectiveCamera(75, aspect);
const axesHelper = new THREE.AxesHelper(2);

camera.position.z = 5;
// camera.rotateZ(45);
const group = new THREE.Group();

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({
    color: 0xff0000,
  })
);
// const cube2 = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial({
//     color: 0x00ff00,
//   })
// );
// cube2.position.set(2, 0, 0);
// const cube3 = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial({
//     color: 0x0000ff,
//   })
// );
// cube3.position.set(-2, 0, 0);
group.add(cube1);
// group.add(cube2);
// group.add(cube3);

// scene.add(group);
scene.add(cube1);
scene.add(camera);
scene.add(axesHelper);
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(size.width, size.height);
// mesh.rotation.x = pi * 0.1;
// mesh.rotation.y = pi * 0.1;
// mesh.rotation.z = pi * 0.1;
// we may need to use reorder Axes when using rotation that's why we prefer using quaternion
// group.scale.y = 2;
// group.rotation.y = 1;
renderer.render(scene, camera);
// let time = Date.now();
const clock = new THREE.Clock();
const animate = () => {
  // const currentTime = Date.now();
  const elapsedTime = clock.getElapsedTime();
  // const deltaTime = currentTime - time;
  // time = currentTime;

  // console.log("delta", deltaTime);
  // group.rotation.y += deltaTime * 0.003;
  //  group.position.y += deltaTime * 0.003;
  // group.rotation.y = (elapsedTime * Math.PI * 2) / 5; // one rotation each 2 sec
  // group.position.y = Math.sin(elapsedTime);
  // group.position.x = Math.sin(elapsedTime);
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};
animate();

gsap.to(cube1.position, {
  duration: 1,
  delay: 1,
  x: 1,
});

gsap.to(cube1.position, {
  duration: 2,
  delay: 2,
  x: -2,
});
