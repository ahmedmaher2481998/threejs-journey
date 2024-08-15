import * as T from "three";

const canvas = document.querySelector("canvas#webgl") as HTMLCanvasElement;
console.log("🚀 ~ webgl:", canvas);
if (!canvas) alert("no canvas found in the dom ");
const scene = new T.Scene();
const geo = new T.BoxGeometry(1, 1, 1);
const material = new T.MeshBasicMaterial({
  color: "red",
});

const mesh = new T.Mesh(geo, material);
const size = {
  width: 800,
  height: 600,
};
const aspect = size.width / size.width;
const camera = new T.PerspectiveCamera(75, aspect);
camera.position.z = 2;
// camera.rotateZ(45);
scene.add(mesh);
scene.add(camera);

const renderer = new T.WebGLRenderer({
  canvas,
});
renderer.setSize(size.width, size.height);
renderer.render(scene, camera);
