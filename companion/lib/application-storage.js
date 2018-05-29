/**
 * @file An example of persistent companion application data.
 */

import { localStorage } from 'local-storage';

const Keys = {
    Foo: 'Foo',
};

const ApplicationStorage = {
  getFoo: () => localStorage.getItem(Keys.Foo),
  setFoo: (value) => localStorage.setItem(Keys.Foo, value),
  removeFoo: () => localStorage.removeItem(Keys.Foo),
};

export default ApplicationStorage;
