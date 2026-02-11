import * as THREE from "three";

/**
 * Преобразование широты/долготы (градусы) в точку на сфере (радиус r).
 * lon: восточная долгота положительна.
 */
export function latLonToVec3(latDeg: number, lonDeg: number, r = 1) {
  const lat = THREE.MathUtils.degToRad(latDeg);
  const lon = THREE.MathUtils.degToRad(lonDeg);

  const x = r * Math.cos(lat) * Math.sin(lon);
  const y = r * Math.sin(lat);
  const z = r * Math.cos(lat) * Math.cos(lon);

  return new THREE.Vector3(x, y, z);
}

export function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}
