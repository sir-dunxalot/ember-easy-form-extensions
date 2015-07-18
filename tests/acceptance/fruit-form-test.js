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
  const defaultValue = 'orange';

  visit('/fruit/form');

  /* Check the default value */

  andThen(function() {

    assert.equal(inspectInputFor('color', 'select').val(), defaultValue,
      `The default value of the selected option should be set by default on the model`);

    assert.equal(inspectModelValueFor('color'), defaultValue,
      `Default select values should be bound to the model`);

  });

  fillInInputFor('color', color, 'select');

  /* Then check changing the select works */

  andThen(function() {

    assert.equal(inspectInputFor('color', 'select').val(), color,
      `The value of the selected option should be updated on the select`);

    assert.equal(inspectModelValueFor('color'), color,
      `Select values should be bound to the model`);

  });

});

test('Binding checkbox values', function(assert) {

  visit('/fruit/form');

  clickInputFor('isTropical');

  andThen(function() {

    assert.equal(inspectInputFor('isTropical').prop('checked'), isTropical,
      `The value of isTropical should be updated on the checkbox`);

    assert.equal(inspectModelValueFor('isTropical'), isTropical.toString(),
      `Checkbox values should be bound to the model`);

  });

});

// TODO - Dates - coming soon

// test('Binding dates', function(assert) {

//   visit('/fruit/form');

//   fillInInputFor('pickedOn', pickedOn);

//   andThen(function() {


//   });

// });
