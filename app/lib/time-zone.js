/**
 * @file Example of a strongly typed model, backed by persistent app storage.
 */

import { getValue, setValue } from './app-settings';

const SETTING_NAME = 'time-zone-index';

const Zones = [
  {name: 'San Fran', utcOffset: -7},
  {name: 'London', utcOffset: 1},
  {name: 'Perth', utcOffset: 8},
];

let index = getValue(SETTING_NAME, 0);

export const getZone = () =>
  Zones[index];

export const changeZone = () => {
  index = (index + 1) % Zones.length;
  setValue(SETTING_NAME, index);
  return getZone();
};
