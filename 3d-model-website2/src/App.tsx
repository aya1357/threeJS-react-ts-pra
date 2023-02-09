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
      500,
      sizes.width / sizes.height,
      0.1,
      2000
    );
    camera.position.set(-0.11, 0.2, 0);

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

    let mixer: THREE.AnimationMixer;

    gltfLoader.load("./animations/duck.gltf", (gltf) => {
      model = gltf.scene;
      model.scale.set(0.15, 0.15, 0.15);
      model.rotation.y = -Math.PI / 3;
      scene.add(model);

      mixer = new THREE.AnimationMixer(model);
      const clips = gltf.animations;
      clips.forEach(function(clip) {
        const action = mixer.clipAction(clip);
        action.play();
      })
    });

    //ライト
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 2, 100);
    scene.add(pointLight);

    //アニメーション
    const tick = () => {
      renderer.render(scene, camera);

      if(mixer) {
        mixer.update(0.02)
      }
      requestAnimationFrame(tick);
    };
    tick();
  }, []);
  return (
    <>
      <canvas id="canvas"></canvas>
      <div className="mainContent">
        <h3>cat</h3>
        <p>cat</p>
      </div>
    </>
  );
}

export default App;
