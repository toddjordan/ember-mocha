
import AbstractTestLoader, {
  addModuleIncludeMatcher,
} from 'ember-cli-test-loader/test-support/index';

addModuleIncludeMatcher(function(moduleName) {
  return moduleName.match(/\.jshint$/);
});

export class TestLoader extends AbstractTestLoader {
  shouldLoadModule(moduleName) {
    return !moduleName.match(/^ember-mocha\//)
      && (moduleName.match(/[-_]test$/) || moduleName.match(/\.jshint$/));
  }

}

/**
 * Load tests following the default patterns:
 *
 * - The module name ends with `-test` or `_test`
 * - The module name ends with `.jshint`
 */
export function loadTests() {
  new TestLoader().loadModules();
}
