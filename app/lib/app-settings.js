/**
 * @file Generic settings storage over a single JSON file
 * persisted locally on the device (app only).
 */

import { writeFileSync, readFileSync } from 'fs';

const FILE_NAME = 'app-settings.json';

const DefaultSettings = {};

const settings = loadSettingsFile();
console.log('Loaded settings', JSON.stringify(settings));

function loadSettingsFile() {
  try {
    console.log('Loading settings...');
    const result = readFileSync(FILE_NAME, 'json');
    return result;
  } catch (e) {
    console.warn('Ignored error loading settings, continuing with default settings');
    console.warn(e);
    return DefaultSettings;
  }  
}

function saveSettingsFile() {
  try {
    console.log('Saving settings...');
    writeFileSync(FILE_NAME, settings, 'json');
    console.log('Saved settings');
  } catch (e) {
    console.error('Error saving settings');
    console.error(e);
  }
}

// EXPORTS

export const setValue = (key, value) => {
  settings[key] = value;
  saveSettingsFile();
};

export const removeValue = (key) => {
  delete settings[key];
  saveSettingsFile();
};

export const getValue = (key, defaultValue=null) => {
  const value = settings[key];
  return typeof(value) === 'undefined' ? defaultValue : value;
};
