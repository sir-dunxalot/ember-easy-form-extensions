import Ember from 'ember';
import RoutesDirtyRecordHandlerMixin from 'ember-easy-form-extensions/mixins/routes/dirty-record-handler';
import { module, test } from 'qunit';

const { run } = Ember;

let route;

function setOnModel(properties) {
  run(function() {
    route.get('controller.model').setProperties(properties);
  });
}

function trigger(event) {
  run(function() {
    route.trigger(event);
  });
}

module('Unit | Mixin | routes/dirty record handler', {

  beforeEach: function() {
    const RoutesDirtyRecordHandlerObject = Ember.Route.extend(
      Ember.Evented, // So we can call trigger
      RoutesDirtyRecordHandlerMixin, {

      controller: Ember.Controller.create({
        model: Ember.Object.create({
          isDirty: true,
        }),
      }),

    });

    route = RoutesDirtyRecordHandlerObject.create();
  },

});

test('The model rolls back', function(assert) {

  assert.expect(1);

  /* Set ID as if the record was existing and being edited */

  setOnModel({
    id: 123,
    rollback: function() {

      assert.ok(true,
        'rollback() should be called by rollbackIfDirty');

    },
  });

  trigger('willTransition');

});

test('The model is deleted', function(assert) {

  assert.expect(1);

  /* Don't set an ID as if the record was new */

  setOnModel({
    deleteRecord: function() {

      assert.ok(true,
        'deleteRecord() should be called by rollbackIfDirty');

    },
  });

  trigger('willTransition');

});

test('Using rollbackIfDirty as a public method', function(assert) {

  assert.expect(1);

  /* Don't set an ID as if the record was new */

  setOnModel({
    deleteRecord: function() {

    assert.ok(true,
      'deleteRecord() should be called by rollbackIfDirty');

    },
  });

  route.rollbackIfDirty(route.get('controller.model'));

});
