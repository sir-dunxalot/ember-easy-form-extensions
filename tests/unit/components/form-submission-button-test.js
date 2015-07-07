import { moduleForComponent, test } from 'ember-qunit';
import {
  initAttrs,
  renderingTests,
  setPropertiesOnComponent,
} from '../../helpers/unit/component';

let component;

moduleForComponent('form-submission-button', 'Unit | Component | form submission button', {
  unit: true,

  beforeEach: function() {
    component = this.subject();
  },
});

test('Rendering', function(assert) {

  assert.expect(2);

  renderingTests(assert, this, component);
});

test('Properties', function(assert) {
  const $element = this.$(); // Render
  const className = 'button-primary';
  const type = 'reset';

  assert.expect(7);

  assert.strictEqual(component.get('disabled'), false,
    'The component should not be disabled by default');

  assert.equal($element.prop('tagName').toLowerCase(), 'button',
    'The component should be a button');

  assert.equal($element.attr('type'), 'button',
    'The component should have a default type attribute');

  assert.ok($element.hasClass('button'),
    'The component should have a default button class name');

  /* Update the properties to check bindings */

  setPropertiesOnComponent(component, {
    className,
    disabled: true,
    type
  });

  assert.equal($element.attr('type'), type,
    'The component should have the new type attribute');

  assert.ok($element.attr('disabled'),
    'The component should have the disabled attribute bound');

  assert.ok($element.hasClass(className),
    'The component should have the new button class name bound');

});

test('The DOM', function(assert) {
  const text = 'Submit me!';

  assert.expect(1);

  setPropertiesOnComponent(component, {
    text,
  });

  initAttrs(component);

  this.render();

  const layout = component.$().html().trim();

  assert.equal(layout, text,
    'The component should show text on the button');

});

test('Actions', function(assert) {

  expect(1);

  setPropertiesOnComponent(component, {
    action: 'orderBigMacs',

    sendAction() {

      assert.ok(true,
        'The action should call the sendAction method');

    }
  });

  this.render();

  component.$().click();
});
