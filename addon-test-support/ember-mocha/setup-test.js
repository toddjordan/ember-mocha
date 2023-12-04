import { beforeEach, afterEach } from 'mocha';
import { setupContext, teardownContext } from '@ember/test-helpers';
import { resolve } from 'rsvp';

const _assign = Object.assign;

function chainHooks(hooks, context) {
    return hooks.reduce(
        (promise, fn) => promise.then(fn.bind(context)),
        resolve()
    );
}

function setupPauseTest(context) {
    let originalPauseTest = context.pauseTest;
    context.pauseTest = function Mocha_pauseTest() {
        context.timeout(0); // prevent the test from timing out

        return originalPauseTest.call(context);
    };
}

export default function setupTest(options) {
    let originalContext;
    let beforeEachHooks = [];
    let afterEachHooks = [];

  beforeEach(async function () {
    originalContext = _assign({}, this);
    let context = new Proxy(this, {});
    this._emberContext = context;
    await setupContext(this._emberContext, options);
    await setupPauseTest(this);
    await chainHooks(beforeEachHooks, this);
  });

  afterEach(async function () {
    await chainHooks(afterEachHooks, this)
    await teardownContext(this._emberContext);
    for (let key in this) {
      if (!(key in originalContext)) {
        delete this[key];
      }
    }

    //copy over the original values
    _assign(this, originalContext);

  });

    /**
     * Provide a workaround for the inconvenient FIFO-always order of beforeEach/afterEach calls
     *
     * ```js
     * let hooks = setupTest();
     * hooks.beforeEach(function() { ... });
     * hooks.afterEach(function() { ... });
     * ```
     *
     * beforeEach hooks are called after setupUnitTest#beforeEach in FIFO (first in first out) order
     * afterEach hooks are called before setupUnitTest#afterEach in LIFO (last in first out) order
     *
     * @type {{beforeEach: (function(*)), afterEach: (function(*))}}
     */
    let hooks = {
        beforeEach(fn) {
            beforeEachHooks.push(fn);
        },
        afterEach(fn) {
            afterEachHooks.unshift(fn);
        },
    };

    return hooks;
}
