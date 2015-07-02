import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'ember-easy-form-extensions/tests/helpers/start-app';

var application;

module('Acceptance | form layout', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /form-layout', function(assert) {
  visit('/form-layout');

  andThen(function() {
    assert.equal(currentURL(), '/form-layout');
  });
});
