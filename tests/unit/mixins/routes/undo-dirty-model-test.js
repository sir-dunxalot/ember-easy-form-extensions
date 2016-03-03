import Ember from 'ember';
import RoutesUndoDirtyModelMixin from 'ember-easy-form-extensions/mixins/routes/undo-dirty-model';
import { module, test } from 'qunit';

module('Unit | Mixin | routes/undo dirty model');

// Replace this with your real tests.
test('it works', function(assert) {
  let RoutesUndoDirtyModelObject = Ember.Object.extend(RoutesUndoDirtyModelMixin);
  let subject = RoutesUndoDirtyModelObject.create();
  assert.ok(subject);
});
