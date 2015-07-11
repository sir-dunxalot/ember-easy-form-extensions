import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import {
  destroy,
  initAttrs,
  renderingTests,
  setOnComponent,
  setPropertiesOnComponent,
  setPropertiesOnController,
  setupComponent
} from '../../helpers/unit/component';

const { run, typeOf } = Ember;

let component;

moduleForComponent('error-field', 'Unit | Component | error field', {
  needs: ['helper:capitalize-string'],
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
  const property = 'bananas';

  assert.expect(8);

  assert.ok(!!component.get('className'),
    'The component should have a default class name');

  assert.notOk(component.get('property'),
    'The component should not have a default property');

  assert.ok(typeOf(component.get('formController')) === 'instance',
    'The component should have a formController binding');

  assert.notOk(component.get('visible'),
    'Visible should be false by default');

  setPropertiesOnComponent(component, { property });

  assert.equal(component.get('property'), property,
    'The component should have a value for property');

  assert.equal(component.get('label'), property,
    'The label should default to the value of property');

  assert.ok(component.get('text').indexOf(property) > -1,
    'The error text should contain the new property name');

  this.render();

  const element = this.$();

  assert.ok(element.hasClass(component.get('className')),
    'The class name should be bound to the element');

});

test('Error binding', function(assert) {
  const property = 'apples';

  assert.expect(3);

  assert.notOk(component.get('bindingForErrors'),
    'The component should not have created a binding for validation errors');

  this.render();

  setPropertiesOnController(component, {
    'validations.apples': {
      presence: true
    }
  });

  setPropertiesOnComponent(component, { property });

  initAttrs(component);

  assert.ok(!!component.get('bindingForErrors'),
    'The component should have created a binding for validation errors');

  destroy(component);

  assert.notOk(!!component.get('bindingForErrors'),
    'The component should remove the binding for validation errors when the component is being destroyed');

});

test('The DOM', function(assert) {
  const property = 'apples';
  const error = 'should be present';

  assert.expect(1);

  setPropertiesOnController(component, {
    'validations.apples': {
      presence: true
    },
    'errors.apples': Ember.A([
      error
    ]),
  });

  setPropertiesOnComponent(component, {
    property,
    showError: true,
  });

  initAttrs(component);

  this.render();

  const layout = component.$().html().trim().toLowerCase();

  assert.equal(layout, `${property} ${error}`,
    'The component should show a user-friendly error message');

});
