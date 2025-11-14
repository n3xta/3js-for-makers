import * as THREE from "three";

export const addRockMesh = () => {

    const tLoader = new THREE.TextureLoader();

    const color = tLoader.load('/rock/Rock035_2K-PNG_Color.png');
    const normal = tLoader.load('/rock/Rock035_2K-PNG_NormalGL.png');
    const displace = tLoader.load('/rock/Rock035_2K-PNG_Displacement.png');
    const ao = tLoader.load('/rock/Rock035_2K-PNG_AmbientOcclusion.png');
    const roughness = tLoader.load('/rock/Rock035_2K-PNG_Roughness.png');


    const geometry = new THREE.SphereGeometry(1, 256, 256);

    const material = new THREE.MeshPhysicalMaterial({
        map: color,
        normalMap: normal,
        displacementMap: displace,
        displacementScale: 0.3,
        aoMap: ao,
        aoMapIntensity: 5,
        roughness: roughness,
        metalness: 0.1,
        transmission: 0.5,
        ior: 2.33,
    })

    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
}