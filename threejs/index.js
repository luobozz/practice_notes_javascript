let renderer, scene, camera;
let obj = {
    lt: getLight(),
    ln: getLine(),
    cb: getCube()
}
$(function () {
    renderer = getRenderer()
    scene = getScene()
    camera = getCamera()
    initSceneObjs(scene, obj.cb)
    render()
})
