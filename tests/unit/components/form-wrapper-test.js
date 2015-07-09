import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { renderingTests } from '../../helpers/unit/component';

const { typeOf } = Ember;

let component;

moduleForComponent('form-wrapper', 'Unit | Component | form wrapper', {
  unit: true,

  beforeEach: function() {
    component = setupComponent(this);
  },
});

test('Rendering', function(assert) {

  assert.expect(2);

  renderingTests(assert, this, component);
});

test('Properties', function(assert) {

  assert.expect(5);

  assert.notOk(component.get('novalidate'),
    'The novalidate property should be false by default because Ember Validation provides client-side validations');

  assert.ok(!!compoennt.get('className'),
    'The component should have a default class name');

  assert.ok(typeOf(component.get('formIsSubmitted')) === 'boolean',
    'The component should have a boolean formIsSubmitted property bound for ease of use');

  assert.ok(typeOf(component.get('formController')) === 'instance',
    'The component should have a formController instance bound');

  this.render();

  assert.ok(component.$().hasClass(component.get('className')),
    'The className property should be bound');

});

test('Methods', function() {
    /* TODO - use inline template compiler to check autofocus functionality */
  });
