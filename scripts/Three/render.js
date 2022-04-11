import * as THREE from '../../node_modules/three/build/three.module.js';
import * as dat from '../../node_modules/lil-gui/dist/lil-gui.esm.js'

export function renderMap() {
    const canvas = document.querySelector('canvas.webgl')

    // console.log(dat);

    const gui = new dat.GUI()

    // Sizes
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }
    
    // Scene
    const scene = new THREE.Scene()

    // Texture
    const textureLoader = new THREE.TextureLoader()

    const colorMap = textureLoader.load('../../assets/images/map/map-color.jpg')
    const alphaMap = textureLoader.load('../../assets/images/map/map-alpha.jpg')


    // object
    // Alphamap werkt nog niet lekker.
    const geometry = new THREE.BoxGeometry(1, 0.05, 1);
    const material = new THREE.MeshBasicMaterial( { map: colorMap} );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    

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
    camera.position.x = 0.86
    camera.position.y = 0.79
    camera.position.z = 0.71

    // gui.add(camera.position, 'x', - 3, 3, 0.01);
    // gui.add(camera.position, 'y', - 3, 3, 0.01);
    // gui.add(camera.position, 'z', - 3, 3, 0.01);
    scene.add(camera)



    // Renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


    /**
     * Animate
     */
    const clock = new THREE.Clock()

    const tick = () =>
    {

        camera.lookAt(cube.position)
        const elapsedTime = clock.getElapsedTime()

        // Render
        renderer.render(scene, camera)

        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
    }

    tick()
}
