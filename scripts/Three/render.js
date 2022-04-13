import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import {GLTFLoader}  from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import * as dat from '../../node_modules/lil-gui/dist/lil-gui.esm.js';

export function renderMap() {
    const canvas = document.querySelector('canvas.webgl')

    const gui = new dat.GUI()

    // Sizes
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }
    
    // Scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color( 0x1f1e1e );
    let USAMesh
    let rocket

    // Textures
    const textureLoader = new THREE.TextureLoader()
    const plasticColor = textureLoader.load('/assets/textures/Plastic_001_COLOR.jpg')
    const plasticRoughness = textureLoader.load('/assets/textures/Plastic_001_ROUGH.jpg')
    const rocketMatcap = textureLoader.load('/assets/matcap.png')


    // Objects
    const manager = new THREE.LoadingManager();
    const loader = new GLTFLoader(manager);

    loader.load( '../../assets/usa.gltf', function ( gltf ) {
        USAMesh = gltf.scene
        USAMesh.position.x = 1 
        USAMesh.position.y = 1
        USAMesh.position.z = 1

        camera.lookAt(USAMesh.position)
        scene.add( USAMesh );   

    }, undefined, function ( error ) {

	    console.error( error );

    });

    loader.load( '../../assets/rocket.gltf', function ( gltf ) {
        rocket = gltf.scene
        rocket.position.x = 4.3
        rocket.position.y = 2
        rocket.position.z = 3.2
        rocket.rotation.y = Math.PI / 1.2

        rocket.scale.set(0.005, 0.005, 0.005)
        console.log(rocket);

        // animate
        let succesTl = gsap.timeline();

        succesTl.to(rocket.position, {
            y: 8,
            repeat: -1,
            duration: 5
        })
        scene.add( rocket );

    }, undefined, function ( error ) {

	    console.error( error );

    });

    const geometry = new THREE.CylinderGeometry( 0.2, 0.2, 0.05, 64 );
    const material = new THREE.MeshStandardMaterial( {
        map: plasticColor,
        roughnessMap: plasticRoughness,
        metalness: 0.1,
        roughness: 0
    });
    const cylinderFlorida = new THREE.Mesh( geometry, material );

    cylinderFlorida.position.x = 4.3
    cylinderFlorida.position.y = 1.38
    cylinderFlorida.position.z = 3.2

    scene.add( cylinderFlorida );
    
    
    // Responsive
    window.addEventListener('resize', () =>
    {
        // Update sizes
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight

        // Update camera
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()

        // Update renderer
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    })


    // Camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
    camera.position.x = 0.8
    camera.position.y = 5.7
    camera.position.z = 6.7

    // Cursor
    const cursor = {
        x: 0,
        y: 0
    }

    window.addEventListener('mousemove', (event) =>
    {
        cursor.x = event.clientX / sizes.width - 0.5
        cursor.y = - (event.clientY / sizes.height - 0.5)
    })


    // GUI
    gui.add(camera.position, 'x', - 20, 20, 0.1);
    gui.add(camera.position, 'y', - 20, 20, 0.1);
    gui.add(camera.position, 'z', - 20, 20, 0.1);
    scene.add(camera)


    // Lighting
    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x000000, 0.9)
    scene.add(hemisphereLight)

    const light = new THREE.PointLight(0xffffff, 1, 0);
    light.position.set(5, 50, 10)
    scene.add(light)


    // Renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.gammaInput = true
    renderer.gammaOutput = true


    /**
     * Animate
     */


    const clock = new THREE.Clock()

    const tick = () =>
    {
        const elapsedTime = clock.getElapsedTime()

        // Render
        camera.position.x = cursor.x 
        camera.position.y = cursor.y + 6
        renderer.render(scene, camera)

        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
    }

    tick()
}
