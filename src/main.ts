import * as T from "three";

const canvas = document.querySelector("canvas#webgl") as HTMLCanvasElement;
console.log("🚀 ~ webgl:", canvas);
if (!canvas) alert("no canvas found in the dom ");
const scene = new T.Scene();
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
const camera = new T.PerspectiveCamera(75, aspect);
const axesHelper = new T.AxesHelper(2);

camera.position.z = 5;
// camera.rotateZ(45);
const group = new T.Group();

const cube1 = new T.Mesh(
  new T.BoxGeometry(1, 1, 1),
  new T.MeshBasicMaterial({
    color: 0xff0000,
  })
);
const cube2 = new T.Mesh(
  new T.BoxGeometry(1, 1, 1),
  new T.MeshBasicMaterial({
    color: 0x00ff00,
  })
);
cube2.position.set(2, 0, 0);
const cube3 = new T.Mesh(
  new T.BoxGeometry(1, 1, 1),
  new T.MeshBasicMaterial({
    color: 0x0000ff,
  })
);
cube3.position.set(-2, 0, 0);
group.add(cube1);
group.add(cube2);
group.add(cube3);

scene.add(group);
scene.add(camera);
scene.add(axesHelper);
const renderer = new T.WebGLRenderer({
  canvas,
});
renderer.setSize(size.width, size.height);
// mesh.rotation.x = pi * 0.1;
// mesh.rotation.y = pi * 0.1;
// mesh.rotation.z = pi * 0.1;

group.scale.y = 2;
group.rotation.y = 1;
renderer.render(scene, camera);
// let i = 0;
// const animate = () => {
//   console.log("first");
//   const pi = Math.PI;
//   mesh.rotation.x = pi * i * 2;
//   mesh.rotation.y = pi * i;
//   mesh.rotation.z = pi * i;
//   i += 0.005;
//   renderer.render(scene, camera);
//   requestAnimationFrame(animate);
// };
// animate();
