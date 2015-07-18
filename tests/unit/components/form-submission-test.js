import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import {
  renderingTests,
  setupComponent,
  setOnComponent
} from '../../helpers/unit/component';
import selectorFor from '../../helpers/selector-for';

const { run, typeOf } = Ember;

let component;

moduleForComponent('form-submission', 'Unit | Component | form submission', {
  needs: ['component:form-submission-button'],
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

  assert.expect(15);

  /* Check default properties */

  assert.strictEqual(component.get('formIsSubmitted'), false,
    'Form is submitted should be false by default');

  assert.ok(typeOf(component.get('formController')) === 'instance',
    'The component should have a formController binding');

  /* Check cancel, cancelAction, and cancelText, etc */

  ['cancel', 'delete', 'submit'].forEach(function(buttonType) {
    const actionProperty = `${buttonType}Action`;
    const existsByDefault = buttonType !== 'delete';
    const expectedButtonText = Ember.String.capitalize(buttonType);
    const textProperty = `${buttonType}Text`;

    assert.equal(component.get(buttonType), existsByDefault,
      `The ${buttonType} property should be ${existsByDefault} by default`);

    assert.equal(component.get(actionProperty), buttonType,
      `The ${actionProperty} property should refer to the ${buttonType} action`);

    assert.equal(component.get(textProperty), expectedButtonText,
      `The ${textProperty} property should be ${expectedButtonText}`);

    assert.ok(typeOf(component.get(`_actions.${buttonType}`)) === 'function',
      `The ${buttonType} action should exist on the component`);

  });

  this.render();

  assert.ok(component.$().hasClass(component.get('className')),
    'The class name should be bound to the element');

});

test('The DOM', function(assert) {
  const submittingText = 'Submitting...';

  assert.expect(11);

  this.render();

  /* Check the template before any submitting */

  assert.ok(component.$().html().indexOf(submittingText) === -1,
    'The template should reflect that the form has not been submitted');

  /* Check in button in turn */

  ['cancel', 'delete', 'submit'].forEach(function(action, i) {
    const selector = selectorFor(`button-for-${action}`);

    doneArray.push(assert.async());

    setOnComponent(component, action, true);

    setOnComponent(component, `_actions.${action}`, function() {

      assert.ok(true,
        `The ${action} action should be called after clicking the button`);

    });

    const $button = component.$(selector);

    assert.ok(!!$button,
      'The ${action} button should exist in the template');

    $button.click();

    setOnComponent(component, action, false);

    assert.notOk(component.$(selector).length,
      'The ${action} button should no longer exist in the template');

  }, this);

  /* Fake submission and check the template */

  setOnComponent(component, 'formIsSubmitted', true);

  assert.ok(component.$().html().indexOf(submittingText) > -1,
    'The template should reflect that the form is submitting');

});
