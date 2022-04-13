import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import {
    GLTFLoader
} from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import * as dat from '../../node_modules/lil-gui/dist/lil-gui.esm.js';

export function renderMap() {

    const button = document.querySelector('button');
    console.log(button);

    const canvas = document.querySelector('canvas.webgl')

    const gui = new dat.GUI()

    // Sizes
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    // Scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x1f1e1e);
    let USAMesh
    let rocket

    // Textures
    const textureLoader = new THREE.TextureLoader()

    // Fog
    const fog = new THREE.Fog('#111111', 1, 13)
    scene.fog = fog


    // Objects
    const manager = new THREE.LoadingManager();
    const loader = new GLTFLoader(manager);

    loader.load('../../assets/usa.gltf', function (gltf) {
        USAMesh = gltf.scene
        USAMesh.position.x = 1
        USAMesh.position.y = 1
        USAMesh.position.z = 1

        camera.lookAt(USAMesh.position)
        scene.add(USAMesh);

    }, undefined, function (error) {

        console.error(error);

    });

    loader.load('../../assets/test.gltf', function (gltf) {
        rocket = gltf.scene
        const launchSite01 = [4.3, 1.4, 3.2]
        const launchSite02 = [4, 1.4, 2.8]
        const launchSite03 = [-2.2, 1.4, 1.6]

        rocket.position.set(launchSite01[0], launchSite01[1], launchSite01[2])
        console.log(launchSite01.map(x => x))



        rocket.rotation.y = Math.PI / 1.2
        rocket.traverse(n => {
            if (n.isMesh) {
                n.castShadow = true
                n.receiveShadow = true
                if (n.material.map) n.material.map.anisotropy = 16
            }
        })

        rocket.scale.set(0.03, 0.03, 0.03)
        console.log(rocket);

        button.addEventListener('click', function () {
            // animate
            let succesTl = gsap.timeline();
            succesTl.to(rocket.position, {
                y: 8,
                duration: 1.75
            })
        })

        scene.add(rocket);

    }, undefined, function (error) {

        console.error(error);

    });

    const geometry = new THREE.CylinderGeometry(0.2, 0.2, 0.05, 64);
    const material = new THREE.MeshPhysicalMaterial({
        color: 0x757575,
        metalness: 0.9,
        roughness: 0.1
    });

    const material02 = new THREE.MeshPhysicalMaterial({
        color: 0x757575,
        metalness: 0.9,
        roughness: 0.1
    });

    const material03 = new THREE.MeshPhysicalMaterial({
        color: 0x757575,
        metalness: 0.9,
        roughness: 0.1
    });

    const cylinderFlorida = new THREE.Mesh(geometry, material);
    const cylinderFlorida02 = new THREE.Mesh(geometry, material02);
    const cylinderCalifornia = new THREE.Mesh(geometry, material03);


    cylinderFlorida.position.x = 4.3
    cylinderFlorida.position.y = 1.38
    cylinderFlorida.position.z = 3.2

    cylinderFlorida02.position.x = 4
    cylinderFlorida02.position.y = 1.4
    cylinderFlorida02.position.z = 2.8

    cylinderCalifornia.position.x = -2.2
    cylinderCalifornia.position.y = 1.4
    cylinderCalifornia.position.z = 1.6

    scene.add(cylinderFlorida, cylinderFlorida02, cylinderCalifornia);


    // Responsive
    window.addEventListener('resize', () => {
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

    window.addEventListener('mousemove', (event) => {
        cursor.x = event.clientX / sizes.width - 0.5
        cursor.y = -(event.clientY / sizes.height - 0.5)
    })


    // GUI
    gui.add(camera.position, 'x', -20, 20, 0.1);
    gui.add(camera.position, 'y', -20, 20, 0.1);
    gui.add(camera.position, 'z', -20, 20, 0.1);
    scene.add(camera)


    // Lighting
    const hemisphereLight = new THREE.HemisphereLight(0xb1d9ff, 0x080820, 1);
    scene.add(hemisphereLight);

    const light = new THREE.SpotLight(0xffffff, 4);
    light.position.set(5, 50, 10);
    light.castShadow = true;
    light.shadow.bias = -0.0001
    light.shadow.mapSize.width = 1024 * 4
    light.shadow.mapSize.height = 1024 * 4
    scene.add(light);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.gammaInput = true
    renderer.gammaOutput = true
    renderer.toneMapping = THREE.ReinhardToneMapping
    renderer.toneMappingExposure = 2.3
    renderer.shadowMap.enabled = true


    /**
     * Animate
     */


    const clock = new THREE.Clock()

    const tick = () => {
        const elapsedTime = clock.getElapsedTime()

        // Render
        camera.position.x = cursor.x
        camera.position.y = cursor.y + 6
        renderer.render(scene, camera)
        light.position.set(
            camera.position.x + 10,
            camera.position.y + 10,
            camera.position.z + 10
        )
        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
    }

    tick()
}