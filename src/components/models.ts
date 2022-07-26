// export interface Todo {
//   id: number;
//   content: string;
// }

// export interface Meta {
//   totalCount: number;
// }

import { megajoulesToTNT, metricUpgrade } from './conversion';

export {};

export interface EnergyConversionResult {
  joules: number;
  kilojoules: number;
  megajoules: number;

  tons: number;
  kilotons: number;
  megatons: number;
  gigatons: number;
  teratons: number;
  petatons: number;
}

export function getEnergyFromJoules(joules: number): EnergyConversionResult {
  const kilojoules = metricUpgrade(joules);
  const megajoules = metricUpgrade(kilojoules);

  const tons = megajoulesToTNT(megajoules);
  const kilotons = metricUpgrade(tons);
  const megatons = metricUpgrade(kilotons);
  const gigatons = metricUpgrade(megatons);
  const teratons = metricUpgrade(gigatons);
  const petatons = metricUpgrade(teratons);

  return {
    joules,
    kilojoules,
    megajoules,
    tons,
    kilotons,
    megatons,
    gigatons,
    teratons,
    petatons,
  };
}
