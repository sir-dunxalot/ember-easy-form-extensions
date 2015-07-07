import Ember from 'ember';
import RoutesDirtyRecordHandlerMixin from 'ember-easy-form-extensions/mixins/routes/dirty-record-handler';
import { module, test } from 'qunit';

module('Unit | Mixin | routes/dirty record handler');

// Replace this with your real tests.
test('it works', function(assert) {
  var RoutesDirtyRecordHandlerObject = Ember.Object.extend(RoutesDirtyRecordHandlerMixin);
  var subject = RoutesDirtyRecordHandlerObject.create();
  assert.ok(subject);
});
