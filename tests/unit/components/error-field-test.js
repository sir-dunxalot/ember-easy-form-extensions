import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import {
  destroy,
  initAttrs,
  setOnComponent,
  setOnController,
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

  assert.equal(component._state, 'preRender',
    'The component instance should be created');

  this.render();

  assert.equal(component._state, 'inDOM',
    'The component should be inserted into the DOM after render');
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

  setOnComponent(component, { property });

  assert.equal(component.get('property'), property,
    'The component should have a value for property');

  assert.equal(component.get('label'), property,
    'The label should default to the value of property');

  assert.ok(component.get('text').indexOf(property) > -1,
    'The error text should contain the new property name');

  const element = this.$(); // Calls render

  assert.ok(element.hasClass(component.get('className')),
    'The class name should be bound to the element');

});

test('Error binding', function(assert) {
  const property = 'apples';

  assert.expect(3);

  assert.notOk(component.get('bindingForErrors'),
    'The component should not have created a binding for validation errors');

  this.render();

  setOnController(component, {
    'validations.apples': {
      presence: true
    }
  });

  setOnComponent(component, { property });

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

  setOnController(component, {
    'validations.apples': {
      presence: true
    },
    'errors.apples': Ember.A([
      error
    ]),
  });

  setOnComponent(component, { property });

  initAttrs(component);

  this.render();

  const layout = component.$().html().trim().toLowerCase();

  assert.equal(layout, `${property} ${error}`,
    'The component should show a user-friendly error message');

});
