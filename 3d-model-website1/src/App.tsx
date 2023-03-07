import './App.css';
import * as THREE from "three";
import { useEffect } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function App() {
  let canvas: HTMLCanvasElement;
  let model: THREE.Group;

  useEffect(() => {

    canvas = document.getElementById("canvas") as HTMLCanvasElement;

    const sizes = {
      width: innerWidth,
      height: innerHeight,
    };
    //scene
    const scene: THREE.Scene = new THREE.Scene();

    //camera
    const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      2000
    );
    camera.position.set(-1.2, 0.2, 2.1);

    //renderer
    const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(window.devicePixelRatio);

    // const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    // const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    // const cube = new THREE.Mesh( geometry, material );
    // scene.add( cube );

    //3dモデルのインポート
    const gltfLoader = new GLTFLoader();

    gltfLoader.load("./models/yumelog2.glb", (gltf) => {
      model = gltf.scene;
      scene.add(model);
      model.scale.set(0.23, 0.23, 0.23);
      model.rotation.x = Math.PI / 7;
      model.rotation.y = -Math.PI / 4.1;
      model.rotation.z = Math.PI / 90;
    })

    //ライト
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xd1ffff, 1, 100);
    scene.add(pointLight);
    const light = new THREE.DirectionalLight(0xffffff);
    light.intensity = 1; // 光の強さ
    light.position.set(-20, 40, 1);
    // シーンに追加
    scene.add(light);

    //アニメーション
    const tick = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    };
    tick();
  }, []);
  return (
    <>
      <canvas id="canvas"></canvas>
      <div className="mainContent">
        <h3>test</h3>
        <p>testtest</p>
      </div>
    </>
  );
}

export default App;
