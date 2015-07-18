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
  const name = 'Banana';

  assert.expect(2);

  visit('/fruit/model-path');

  fillInInputFor('name', name);

  andThen(function() {

    assert.equal(inspectInputFor('name').val(), name,
      `The name value should be updated on the input element`);

    assert.equal(inspectModelValueFor('fruit-name'), name,
      `The name value should be updated on model`);

  });
});
