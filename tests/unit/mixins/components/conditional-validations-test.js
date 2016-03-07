import Ember from 'ember';
import ControllersConditionalValidationsMixin from 'ember-easy-form-extensions/mixins/components/conditional-validations';
import { module, test } from 'qunit';

module('Unit | Mixin | controllers/conditional validations');

// Replace this with your real tests.
test('it works', function(assert) {
  let ControllersConditionalValidationsObject = Ember.Object.extend(ControllersConditionalValidationsMixin);
  let subject = ControllersConditionalValidationsObject.create();
  assert.ok(subject);
});
