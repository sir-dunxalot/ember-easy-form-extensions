import Ember from 'ember';
import { initialize } from 'ember-easy-form-extensions/initializers/routing-events';
import { module, test } from 'qunit';

var container, application;

/* ROUTE INITIALIZER TO BE DEPRECATED */

module('Unit | Initializer | routing events', {
  beforeEach: function() {
    Ember.run(function() {
      application = Ember.Application.create();
      container = application.__container__;
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  initialize(container, application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);

});
