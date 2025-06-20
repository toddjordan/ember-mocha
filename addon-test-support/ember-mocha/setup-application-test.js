import setupApplicationContext from '@ember/test-helpers/setup-application-context';
import teardownContext from '@ember/test-helpers/teardown-context';

import setupTest from './setup-test';

export default function setupApplicationTest(_options) {
  let options = _options === undefined ? { waitForSettled: true } : Object.assign({ waitForSettled: true }, _options);
  let hooks = setupTest(options);

  hooks.beforeEach(function() {
    return setupApplicationContext(this);
  });
  hooks.afterEach(function() {
    return teardownContext(this);
  });

  return hooks;
}
