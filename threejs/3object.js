/**
 * @author chenlingyu
 */

function getLight() {
    var light = new THREE.DirectionalLight(0xFF0000, 1.0, 0);
    light.position.set(100, 100, 200);
    return light;
}

function getLine(){
    var geometry = new THREE.Geometry();
    var material = new THREE.LineBasicMaterial({vertexColors: THREE.VertexColors});
    var color1 = new THREE.Color(0x444444), color2 = new THREE.Color(0xFF0000);

    // 线的材质可以由2点的颜色决定
    var p1 = new THREE.Vector3(_.random(-100,100), 0, _.random(-100,100));
    var p2 = new THREE.Vector3(_.random(-100,100), 0, _.random(-100,100));
    geometry.vertices.push(p1);
    geometry.vertices.push(p2);
    geometry.colors.push(color1, color2);

    var line = new THREE.Line(geometry, material, THREE.LinePieces);
    return line;
}

function getCube(){
    var geometry = new THREE.CubeGeometry(1,1,1);
    var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    var cube = new THREE.Mesh(geometry, material);
    return cube;
}