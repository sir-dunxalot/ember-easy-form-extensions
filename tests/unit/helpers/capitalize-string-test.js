import { capitalizeString } from 'ember-easy-form-extensions/helpers/capitalize-string';
import { module, test } from 'qunit';

module('Unit | Helper | capitalize string');

test('It capitalizes a string', function(assert) {
  const resultOne = capitalizeString(['hello']);

  assert.equal(resultOne, 'Hello',
    'It should capitalize the first letter of a string');

  const resultTwo = capitalizeString(['Hello']);

  assert.equal(resultTwo, 'Hello',
    'It should not change the first letter of a string');
});
