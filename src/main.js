import * as THREE from "three";
import { generateMazeJCA } from "./maze";
import { Position } from "./position";

const MAZE_WIDTH = 64;
const MAZE_HEIGHT = 48;

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;
camera.position.x = MAZE_WIDTH;
camera.position.y = MAZE_HEIGHT;

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a geometry
const geometry = new THREE.BoxGeometry();

// Create a material
//const material = new THREE.MeshBasicMaterial({ color: 0x4a7c59 });
const material = new THREE.MeshPhongMaterial({ color: 0xff9500 });

// Create Maze and Add cubes to the scene
const maze = generateMazeJCA(MAZE_WIDTH, MAZE_HEIGHT);

for (let y = 0; y < maze.length; y++) {
  for (let x = 0; x < maze[y].length; x++) {
    if (maze[y][x].item === "wall") {
      const cube = new THREE.Mesh(geometry, material);
      cube.position.x = x;
      cube.position.y = y;
      cube.position.z = 0;
      scene.add(cube);
    }
  }
}

const ballGeo = new THREE.SphereGeometry(0.5);
const ballMat = new THREE.MeshPhongMaterial({ color: 0xffffff });
const ball = new THREE.Mesh(ballGeo, ballMat);
ball.position.x = 1;
ball.position.y = 1;
scene.add(ball);

const light = new THREE.PointLight(0xffffff);
light.position.set(MAZE_WIDTH, MAZE_HEIGHT, 20);
light.power = 9000;
scene.add(light);

const checkPositionAvailable = (y, x) => {
  const label = `Checking position (${y}, ${x}): ${maze[x][y].item}`;
  console.log(label);
  return maze[x][y].item === "way";
};

const camPosition = new Position(1, 1, 0.5);
camPosition.setAvailable(checkPositionAvailable);

// Animation loop
function animate() {
  camera.position.x = camPosition.getX();
  camera.position.y = camPosition.getY();

  ball.position.x = camPosition.getX();
  ball.position.y = camPosition.getY();

  renderer.render(scene, camera);

  requestAnimationFrame(animate);

  // // Rotate all cubes
  // scene.children.forEach((child) => {
  //   if (child instanceof THREE.Mesh) {
  //     child.rotation.x += 0.01;
  //     child.rotation.y += 0.01;
  //   }
  // });
}

animate();
