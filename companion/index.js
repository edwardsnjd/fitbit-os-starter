import * as messaging from 'messaging';
import { me } from 'companion';

import MessageKeys from '../common/message-keys';

import AppStorage from './lib/application-storage';
import * as AppSettings from './lib/application-settings';

// TRIGGERS - various things that trigger actions

// Periodically poll for something
const POLL_INTERVAL_MS = 1000 * 60 * 5;
const somePollInterval = setInterval(tryToDoSomething, POLL_INTERVAL_MS);
me.onunload = () => clearInterval(somePollInterval);

// MESSAGING

// Watch for connection to device
messaging.peerSocket.onopen = () => {
  // Fake the arrival of all existing settings
  AppSettings.getSettings().forEach(handleSetting);
};

const sendFooMsg = (value) =>
  sendMessageToDevice({
    key: MessageKeys.Foo,
    value,
  });

function sendMessageToDevice(msg) {
  if (!isSocketOpen(messaging.peerSocket)) {
    console.log('Socket is not open, could not send to device.');
    return;
  }

  messaging.peerSocket.send(msg);
}

// SETTINGS

// A user changes settings
AppSettings.onChange(evt =>
  handleSetting({
    key: evt.key,
    value: evt.newValue,
  })
);

function handleSetting({ key, value }) {
  switch (key) {
    case 'Foo':
      return handleFooSetting(value);
    default:
      // Do nothing for unrecognised settings
  }
}

const handleFooSetting = (value) => {
  AppStorage.setFoo(value);
  // TODO: Do something with new foo
};
