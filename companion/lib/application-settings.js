/**
 * @file Reusable access to companion app settings.
 */

import { settingsStorage } from 'settings';

const getSettingKeys = () => {
  const keys = [];
  for (let index = 0; index < settingsStorage.length; index++) {
    keys.push(settingsStorage.key(index));
  }
  return keys.filter(Boolean);
};

/**
 * Get an array of all configured settings.
 * @return object[] - array of `{key:value}` objects
 */
export const getSettings = () =>
  getSettingKeys()
    .map((key) => ({
      key,
      value: settingsStorage.getItem(key),
    }));

/** Remove a setting. */
export const removeSetting = (key) =>
  settingsStorage.removeItem(key);

/** Register a callback to be fired whenever settings are changed. */
export const onChange = (cb) =>
  // TODO: Add a storage event listener
  settingsStorage.onchange = cb;
