
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export const ThreeDViewer = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const meshRef = useRef<THREE.Object3D | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);

  const createPlaceholderHead = () => {
    // Create placeholder head with facial features
    const group = new THREE.Group();
    
    // Head
    const headGeometry = new THREE.SphereGeometry(1, 32, 32);
    const headMaterial = new THREE.MeshPhongMaterial({ color: 0xffdbac });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.scale.set(1, 1.2, 0.9);
    group.add(head);

    // Eyes
    const eyeGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const eyeMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
    
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.3, 0.2, 0.8);
    group.add(leftEye);
    
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.3, 0.2, 0.8);
    group.add(rightEye);

    // Nose
    const noseGeometry = new THREE.ConeGeometry(0.1, 0.3, 8);
    const noseMaterial = new THREE.MeshPhongMaterial({ color: 0xffdbac });
    const nose = new THREE.Mesh(noseGeometry, noseMaterial);
    nose.position.set(0, -0.1, 0.8);
    nose.rotation.x = Math.PI;
    group.add(nose);

    // Mouth
    const mouthGeometry = new THREE.RingGeometry(0.1, 0.2, 16);
    const mouthMaterial = new THREE.MeshPhongMaterial({ color: 0x8b0000 });
    const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial);
    mouth.position.set(0, -0.4, 0.8);
    group.add(mouth);

    return group;
  };

  const loadModelFromDirectory = async (): Promise<THREE.Object3D | null> => {
    const loader = new GLTFLoader();
    const modelFiles = ['head1.glb', 'face.glb', 'head.glb', 'model.glb', 'head1.gltf', 'face.gltf', 'head.gltf', 'model.gltf'];
    
    for (const fileName of modelFiles) {
      try {
        const modelPath = `/models/${fileName}`;
        console.log(`Attempting to load model: ${modelPath}`);
        
        const gltf = await new Promise<any>((resolve, reject) => {
          loader.load(
            modelPath,
            resolve,
            undefined,
            reject
          );
        });
        
        console.log(`Successfully loaded model: ${modelPath}`);
        const model = gltf.scene;
        
        // Center and scale the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        // Move model to center
        model.position.sub(center);
        
        // Scale to fit in scene (similar to placeholder size)
        const maxDimension = Math.max(size.x, size.y, size.z);
        const scale = 2 / maxDimension; // Adjust scale to match placeholder size
        model.scale.setScalar(scale);
        
        return model;
      } catch (error) {
        console.log(`Failed to load ${fileName}:`, error);
        continue;
      }
    }
    
    console.log('No models found in /public/models/, using placeholder');
    return null;
  };

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8f9fa);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.set(0, 0, 4);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(400, 400);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Load model or create placeholder
    const initializeModel = async () => {
      const loadedModel = await loadModelFromDirectory();
      const model = loadedModel || createPlaceholderHead();
      
      meshRef.current = model;
      scene.add(model);
      
      // Initial render
      renderer.render(scene, camera);
    };

    initializeModel();

    // Mouse controls
    const handleMouseDown = (event: MouseEvent) => {
      isDraggingRef.current = true;
      mouseRef.current = { x: event.clientX, y: event.clientY };
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDraggingRef.current || !meshRef.current) return;

      const deltaX = event.clientX - mouseRef.current.x;
      const deltaY = event.clientY - mouseRef.current.y;

      meshRef.current.rotation.y += deltaX * 0.01;
      meshRef.current.rotation.x += deltaY * 0.01;

      mouseRef.current = { x: event.clientX, y: event.clientY };
      renderer.render(scene, camera);
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      camera.position.z += event.deltaY * 0.01;
      camera.position.z = Math.max(2, Math.min(10, camera.position.z));
      renderer.render(scene, camera);
    };

    // Event listeners
    const canvas = renderer.domElement;
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('wheel', handleWheel);

    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current) return;
      const container = mountRef.current;
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.render(scene, camera);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial resize

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (scene && camera && renderer) {
        renderer.render(scene, camera);
      }
    };
    animate();

    // Cleanup
    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="w-full h-96 border-2 border-gray-200 rounded-lg overflow-hidden bg-gray-50"
      style={{ cursor: isDraggingRef.current ? 'grabbing' : 'grab' }}
    />
  );
};
