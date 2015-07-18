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

let component;

moduleForComponent('label-field', 'Unit | Component | label field', {
  needs: ['helper:capitalize-string'],
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
  const forId = '#ember-fake-123';
  const text = 'Group of bananas?';

  assert.expect(4);

  this.render();

  testClassNameBinding(assert, component);

  setPropertiesOnComponent(component, {
    for: forId,
    text
  });

  const $component = component.$();

  assert.equal($component.html().trim(), text,
    'The label text property should appear in the template');

  assert.equal($component.attr('for'), forId,
    'The for attribute should be bound to the element');

  assert.equal($component.prop('tagName').toLowerCase(), 'label',
    'The element should be a <label>');

});
