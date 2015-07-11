import Ember from 'ember';
import ControllersConditionalValidationsMixin from 'ember-easy-form-extensions/mixins/controllers/conditional-validations';
import { module, test } from 'qunit';

const { run } = Ember;

let controller;

function set(key, value) {
  run(function() {
    controller.set(key, value);
  });
}

function trigger(event) {
  run(function() {
    controller.trigger(event);
  });
}

module('Unit | Mixin | controllers/conditional validations', {
  unit: true,

  beforeEach: function() {
    const ControllersConditionalValidationsObject = Ember.Controller.extend(
      ControllersConditionalValidationsMixin,
      Ember.Evented, {

      validate: function() {
        Ember.warn("It looks like you forgot to set validate() with an assertion in your test. For example controller.set('validate', function() { assert.ok(...) });");
      }
    });

    controller = ControllersConditionalValidationsObject.create();
  },
});

test('Revalidation calls to validate', function(assert) {
  const property = 'bananas';

  assert.expect(1);

  set('revalidateFor', ['bananas']);

  set('validate', function() {

    assert.ok(true,
      `validate() should be called when the ${property} property changes`);

  });

  trigger('routeDidTransition');

  set('bananas', 'some value');

  /* Remove observer with willTransition and check the validate
  method is not called again */

  trigger('routeWillTransition');

  set('bananas', 'some value');

});
