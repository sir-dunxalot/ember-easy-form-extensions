import defaultFor from 'ember-easy-form-extensions/utils/default-for';
import { module, test } from 'qunit';

module('Unit | Utility | default for');

test('Correct values are returned', function(assert) {

  assert.expect(11);

  /* Test that fallbacks are used for the desired references */

  assert.strictEqual(defaultFor(null, true), true,
    'null should result in fallback');

  assert.strictEqual(defaultFor(undefined, true), true,
    'undefined should result in fallback');

  /* Test what we expect to not need a fallback value */

  [
    'abc',
    123,
    {},
    [],
    function() {},
    new Date(),
    false,
    true,
    0
  ].forEach(function(expectedPositive) {

    assert.strictEqual(defaultFor(expectedPositive, true), expectedPositive,
      'The test should result in no fallback');

  });

});
