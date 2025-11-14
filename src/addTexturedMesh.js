import * as THREE from "three";

export const addTexturedMesh = () => {

    const tLoader = new THREE.TextureLoader();

    const color = tLoader.load('/texture/color.png');
    const normal = tLoader.load('/texture/normal.png');
    const displace = tLoader.load('/texture/displace.png');
    const ao = tLoader.load('/texture/ao.png');


    const geometry = new THREE.SphereGeometry(1, 256, 256);

    const material = new THREE.MeshPhysicalMaterial({
        map: color,
        normalMap: normal,
        displacementMap: displace,
        displacementScale: 0.3,
        aoMap: ao,
        aoMapIntensity: 5,
        roughness: 0,
        metalness: 0.1,
        transmission: 0.5,
        ior: 2.33,
    })

    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
}