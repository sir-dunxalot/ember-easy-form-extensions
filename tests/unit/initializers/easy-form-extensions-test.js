import Ember from 'ember';
import { initialize } from 'ember-easy-form-extensions/initializers/easy-form-extensions';
import { module, test } from 'qunit';

var container, application;

module('Unit | Initializer | easy form extensions', {
  beforeEach: function() {
    Ember.run(function() {
      application = Ember.Application.create();
      container = application.__container__;
      application.deferReadiness();
    });
  }
});

test('Input element basic accessibility', function(assert) {
  initialize(container, application);

  assert.expect(7);

  assert.ok(Ember.Checkbox.create().get('attributeBindings').toString().indexOf('aria-checked') > -1,
    'Ember.Checkbox should have an aria-checked binding');

  ['TextArea', 'TextField', 'Select'].forEach(function(className) {
    const instance = Ember[className].create();
    const attributeBindings = instance.get('attributeBindings').toString();

    assert.ok(attributeBindings.indexOf('aria-invalid') > -1,
      `Ember.${className} should have an aria-invalid binding`);

    assert.ok(attributeBindings.indexOf('aria-required') > -1,
      `Ember.${className} should have an aria-required binding`);

  });
});
