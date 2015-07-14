import Ember from 'ember';
import Fruit from '../fixtures/fruit';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

let application;

const {
  color,
  description,
  isTropical,
  name,
  numberOfSeeds,
  pickedOn,
} = Fruit;

module('Acceptance | model path', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('Binding text values to inputs and the model', function(assert) {

  assert.expect(6);

  visit('/fruit/model-path');

  // fillInInputFor('numberOfSeeds', numberOfSeeds);

  andThen(function() {

    // assert.equal(inspectInputFor('name').val(), name,
    //   `The title value should be updated on the input element`);

  });
});
