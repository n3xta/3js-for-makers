import * as THREE from "three";
import { HDRLoader } from "three/examples/jsm/Addons.js";

export const environment = () => {
  const rgbeLoader = new HDRLoader();
  const hdrMap = rgbeLoader.load("hdri4.hdr", (envMap) => {
    envMap.mapping = EquirectangularReflectionMapping;
    return envMap;
  });
  return hdrMap;
};
