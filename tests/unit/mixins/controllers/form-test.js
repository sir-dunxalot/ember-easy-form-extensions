import Ember from 'ember';
import ControllersFormMixin from 'ember-easy-form-extensions/mixins/controllers/form';
import { module, test } from 'qunit';

module('Unit | Mixin | controllers/form');

// Replace this with your real tests.
test('it works', function(assert) {
  var ControllersFormObject = Ember.Object.extend(ControllersFormMixin);
  var subject = ControllersFormObject.create();
  assert.ok(subject);
});
