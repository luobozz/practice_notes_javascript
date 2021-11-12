/**
 * @author chenlingyu
 */

function initSceneObjs(scene,...objs) {
    objs.forEach(o=>{
        console.log(`add obj-${o.uuid}`,o)
        scene.add(o)
    })
}

function render() {
    console.log(`render`)
    obj.cb.rotation.x += 0.1;
    obj.cb.rotation.y += 0.1;
    renderer.clear();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

function getRenderer() {
    var renderer;
    width = document.getElementById('canvas-frame').clientWidth;
    height = document.getElementById('canvas-frame').clientHeight;
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(width, height);
    document.getElementById('canvas-frame').appendChild(renderer.domElement);
    renderer.setClearColor(0xFFFFFF, 1.0);

    return renderer;
}

function getCamera() {
    // var camera;
    // camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    // camera.position.x = 0;
    // camera.position.y = 1000;
    // camera.position.z = 0;
    // camera.up.x = 0;
    // camera.up.y = 0;
    // camera.up.z = 1;
    // camera.lookAt({
    //     x: 0,
    //     y: 0,
    //     z: 0
    // });
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    return camera;
}

function getScene() {
    return new THREE.Scene();
}

