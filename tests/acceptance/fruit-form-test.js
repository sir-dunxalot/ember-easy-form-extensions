import Ember from 'ember';
import Fruit from '../fixtures/fruit';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

let application;

const {
  color,
  description,
  name,
  numberOfSeeds,
} = Fruit;

module('Acceptance | fruit/form', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('Binding text values to inputs and the model', function(assert) {

  assert.expect(6);

  visit('/fruit/form');

  fillInInputFor('name', name);

  fillInInputFor('description', description, 'textarea');

  fillInInputFor('numberOfSeeds', numberOfSeeds);

  andThen(function() {

    assert.equal(inspectInputFor('name').val(), name,
      `The title value should be updated on the input element`);

    assert.equal(inspectInputFor('description', 'textarea').val(), description,
      `The description value should be updated on the textarea element`);

    assert.equal(inspectInputFor('numberOfSeeds').val(), numberOfSeeds,
      `The numberOfSeeds value should be updated on the input element`);

    [
      'description',
      'name',
      'numberOfSeeds'
    ].forEach(function(property) {

      assert.equal(inspectModelValueFor(property), Fruit.get(property),
        `${property} should be bound to the model`);

    });

  });
});

test('Binding select values and options', function(assert) {

  visit('/fruit/form');

  fillInInputFor('color', color, 'select');

  andThen(function() {

    assert.equal(inspectInputFor('color', 'select').val(), color,
      `The value of the selected option should be updated on the select`);

    assert.equal(inspectModelValueFor('color'), color,
      `color should be bound to the model`);


  });

});
