import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import {
  assertClass,
  destroy,
  initAttrs,
  renderingTests,
  sendAction,
  setOnController,
  setOnComponent,
  setPropertiesOnComponent,
  setupComponent,
  testClassNameBinding
} from '../../helpers/unit/component';

const { typeOf, run } = Ember;

let component;

moduleForComponent('input-group', 'Unit | Component | input group', {
  needs: [
    'component:hint-field',
    'component:error-field',
    'component:label-field',
    'helper:capitalize-string',
    'template:form-inputs/checkbox',
    'template:form-inputs/default',
    'template:form-inputs/select',
    'template:form-inputs/textarea',
  ],
  unit: true,

  beforeEach: function() {
    component = setupComponent(this);

    component.set('property', 'fake-property');
  },
});

test('Rendering', function(assert) {

  assert.expect(2);

  renderingTests(assert, this, component);
});

test('Basic properties', function(assert) {
  const modelPath = 'gazumbo';
  const newClassName = 'control-group';
  const propertyName = 'height';
  const property = `${modelPath}.${propertyName}`;

  function checkType(key, type) {
    return typeOf(component.get(key) === type);
  }

  assert.expect(5);

  assert.ok(checkType('formController', 'instance'),
    'The component should have a formController binding');

  assert.ok(checkType('newlyValidDuration', 'number'),
    'The component should have a newlyValidDuration binding in milliseconds');

  setPropertiesOnComponent(component, {
    modelPath,
    property,
  });

  assert.equal(component.get('property'), property,
    "The 'cleaned' property should be a relative reference from the model path");

  this.render();

  testClassNameBinding(assert, component);

  setOnComponent(component, 'className', newClassName);

  assert.ok(component.$().hasClass(newClassName),
    'The component should have the new class name bound');

});

test('Class name bindings', function(assert) {
  const className = component.get('className');
  const done = assert.async(); // Enable async test
  const newlyValidDuration = 100;

  assert.expect(4);

  this.render();

  testClassNameBinding(assert, component);

  setPropertiesOnComponent(component, { newlyValidDuration });

  /* Set as invalid then look at class */

  sendAction(component, 'setGroupAsInvalid');
  assertClass(assert, component, `${className}-error`);

  /* Set as invalid then look at class */

  sendAction(component, 'setGroupAsValid');
  assertClass(assert, component, `${className}-newly-valid`);

  /* Look at class after validity period is over */

  run.later(component, function() {

    sendAction(component, 'setGroupAsValid');
    assertClass(assert, component, `${className}-valid`);

    done();
  }, newlyValidDuration + 100);

});

test('Input attribute properties', function(assert) {

  const properties = [
    'collection',
    'content',
    'optionValuePath',
    'optionLabelPath',
    'selection',
    'multiple',
    'name',
    'placeholder',
    'prompt',
    'disabled',
  ];

  assert.expect(properties.length);

  properties.forEach(function(property) {
    const value = component.get(property);

    assert.ok(value !== undefined,
      `The ipnut group should have a binding for the input attribute ${property}`);

  });

});

test('Type property and partial', function(assert) {
  const inputId = component.get('inputId');
  const done = assert.async();

  assert.expect(33);

  /* Render early so we can check the <input> type attribute */

  this.render();

  /* Check the type attributes we expect to detect based on the
  property (e.g. password, email, etc) for HTML5 inputs */

  const expectedTypeDetects = {
    password: 'password',
    email: 'email',
    url: 'url',
    color: 'color',
    tel: 'tel',
    phone: 'tel',
    search: 'search'
  };

  for (let type in expectedTypeDetects) {
    const expectedType = expectedTypeDetects[type];

    setOnComponent(component, 'property', type);

    assert.equal(component.get('type'), expectedType,
      'Type should be autodetected by string matches when no type is set');

    assert.equal(component.get('inputPartial'), 'form-inputs/default',
      'The form input partial should still be the default');

    assert.equal(component.$(`#${inputId}`).attr('type'), expectedType,
      'The type attribute should be bound to the input element');
  }

  /* Now check for selects */

  setOnComponent(component, 'content', Ember.A([1, 2, 3]));

  assert.equal(component.get('type'), 'select',
    'Type should be set to select when the content property is present (regardless of the property name)');

  assert.equal(component.$(`#${inputId}`).prop('tagName').toLowerCase(), 'select',
    "The type attribute, 'select', should be bound to the input element");

  /* Reset the component for the next set of tests */

  setPropertiesOnComponent(component, {
    content: null,
    property: 'bananas',
  });

  /* Now, for fallbacks, check the type of the value */

  const expectedValueDetects = {
    number: 123,
    date: new Date(),
    checkbox: true,
  };

  this.render();

  for (let type in expectedValueDetects) {
    const partialName = type === 'checkbox' ? type : 'default';
    const value = expectedValueDetects[type];

    setPropertiesOnComponent(component, {
      value,
    });

    assert.equal(component.get('type'), type,
      'Type should be autodetected by matching the type of value when no type is set');

    assert.equal(component.get('inputPartial'), `form-inputs/${partialName}`,
      'The form input partial should reflect the value detect');

    assert.equal(component.$(`#${inputId}`).attr('type'), type,
      'The type attribute should be bound to the input element');
  }

  /* Finally, check setting the type manually using textarea */

  setOnComponent(component, 'type', 'textarea');

  assert.equal(component.$(`#${inputId}`).prop('tagName').toLowerCase(), 'textarea',
    "The type attribute, 'select', should be bound to the input element and setabble manually");

  done();

});

test('Value and property binding', function(assert) {
  const property = 'fruit';
  const value = 'apples';

  assert.expect(6);

  assert.notOk(component.get('bindingForValue'),
    'The component should not have created a binding for the value');

  this.render();

  setOnController(component, property, value);

  setOnComponent(component, 'property', property);

  assert.equal(component.get('label'), property,
    'The label should update once the property is bound');

  initAttrs(component);

  assert.ok(!!component.get('bindingForValue'),
    'The component should have created a binding for the value');

  assert.equal(component.get('value'), value,
    'The property value on the controller should be bound to the input group');

  assert.equal(component.$().data('test'), `input-wrapper-for-${property}`,
    'The component should have the correct testig attribute bound');

  destroy(component);

  assert.notOk(!!component.get('bindingForValue'),
    'The component should remove the binding for the value');

});

test('Validity action routing', function(assert) {

  assert.expect(3);

  /* Ensure properties begin as we want */

  setPropertiesOnComponent(component, {
    isValid: false,
    newlyValidDuration: 0,
    showError: false,
  });

  sendAction(component, 'showError');

  assert.ok(component.get('showError'),
    'Calling the showError() action should set showError to true');

  sendAction(component, 'setGroupAsValid');

  assert.ok(component.get('isValid'),
    'Calling the setGroupAsValid() action should set isValid to true');

  sendAction(component, 'setGroupAsInvalid');

  assert.notOk(component.get('isValid'),
    'Calling the setGroupAsInvalid() action should set isValid to false');

});
