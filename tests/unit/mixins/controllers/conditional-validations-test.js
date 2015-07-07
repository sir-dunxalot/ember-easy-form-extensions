import Ember from 'ember';
import ControllersConditionalValidationsMixin from 'ember-easy-form-extensions/mixins/controllers/conditional-validations';
import { module, test } from 'qunit';

module('Unit | Mixin | controllers/conditional validations');

// Replace this with your real tests.
test('it works', function(assert) {
  var ControllersConditionalValidationsObject = Ember.Object.extend(ControllersConditionalValidationsMixin);
  var subject = ControllersConditionalValidationsObject.create();
  assert.ok(subject);
});
