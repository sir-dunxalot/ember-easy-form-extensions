import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../../helpers/start-app';

let application;

module('Acceptance | posts/new', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /posts/new', function(assert) {
  visit('/posts/new');

  andThen(function() {
    assert.equal(currentURL(), '/posts/new');

    fillInInput('title', 'checking');
  });
});
