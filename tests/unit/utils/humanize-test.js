import humanize from 'ember-easy-form-extensions/utils/humanize';
import { module, test } from 'qunit';

module('Unit | Utility | to words');

// Replace this with your real tests.
test('it works', function(assert) {
  const expectedResult = 'i am an orange banana';
  const versions = [
    'I am an orange banana',
    'I-am-an-orange-banana',
    'i_am_an_orange_banana',
    'iAmAnOrangeBanana',
    'i.am.an.orange.banana',
    'I AM AN ORANGE BANANA',
    'I-am_an-orange.banana',
    'iAm-an_orange-banana',
  ];

  assert.expect(versions.length);

  versions.forEach(function(version) {

    assert.equal(humanize(version), expectedResult,
      `"${version}" should be turned into "${expectedResult}"`);

  });

});
