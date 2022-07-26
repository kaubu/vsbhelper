//
// Metric functions
//

// X -> kiloX -> megaX -> gigaX -> teraX -> petaX, etc
export function metricUpgrade(unit: number) {
  return unit / 1000;
}

// petaY -> teraY -> gigaY -> megaY -> kiloY -> Y, etc
export function metricDowngrade(unit: number) {
  return unit * 1000;
}

//
// Conversion from Energy to TNT
//

export function joulesToTNT(joules: number) {
  const kilojoules = metricUpgrade(joules);
  const megajoules = metricUpgrade(kilojoules);
  return megajoulesToTNT(megajoules);
}

export function kilojoulesToTNT(kilojoules: number) {
  const megajoules = metricUpgrade(kilojoules);
  return megajoulesToTNT(megajoules);
}

export function megajoulesToTNT(megajoules: number) {
  return megajoules / 4184;
}
