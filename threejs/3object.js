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
    // var geometry = new THREE.CubeGeometry(1,1,1);
    // var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    // var cube = new THREE.Mesh(geometry, material);

    console.log(THREE)

    var group = new THREE.Group();

    var geometry = new THREE.BufferGeometry();
    geometry.addAttribute( 'position', new Float32BufferAttribute( [], 3 ) );

    var lineMaterial = new THREE.LineBasicMaterial( { color: 0xffffff, transparent: true, opacity: 0.5 } );
    var meshMaterial = new THREE.MeshPhongMaterial( { color: 0x156289, emissive: 0x072534, side: DoubleSide, flatShading: true } );

    group.add( new LineSegments( geometry, lineMaterial ) );
    group.add( new Mesh( geometry, meshMaterial ) );

    // var options = chooseFromHash( group );


    return group;
}