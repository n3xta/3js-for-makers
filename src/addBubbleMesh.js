import * as THREE from "three";

export const addBubbleMesh = () => {
  const tLoader = new THREE.TextureLoader();

  const color = tLoader.load(
    "/bubbles/WaterDropletsMixedBubbled001_COL_2K.jpg"
  );
  const normal = tLoader.load(
    "/bubbles/WaterDropletsMixedBubbled001_NRM_2K.jpg"
  );
  const displace = tLoader.load(
    "/bubbles/WaterDropletsMixedBubbled001_DISP_2K.jpg"
  );
  // const ao = tLoader.load('public/bubbles/WaterDropletsMixedBubbled001_GLOSS_2K.jpg');
  const gloss = tLoader.load(
    "/bubbles/WaterDropletsMixedBubbled001_GLOSS_2K.jpg"
  );
  const alphaMask = tLoader.load(
    "/bubbles/WaterDropletsMixedBubbled001_ALPHAMASKED_2K.png"
  );
  const refl = tLoader.load('/bubbles/WaterDropletsMixedBubbled001_REFL_2K.jpg');

  const geometry = new THREE.SphereGeometry(1, 256, 256);

  const material = new THREE.MeshPhysicalMaterial({
    map: color,
    normalMap: normal,
    displacementMap: displace,
    displacementScale: 0.3,
    transmission: 1,
    ior: 1.33,
    roughness: 0.05,
    metalness: 0,
    alphaMap: alphaMask,
    transparent: true,
    depthWrite: false,
  });

  if ('specularIntensityMap' in material) {
    material.specularIntensityMap = refl; // grayscale REFL
    material.specularIntensity = 1;
    // material.specularColorMap = refl;
    // material.specularIntensity = 1;
  }

  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
};
