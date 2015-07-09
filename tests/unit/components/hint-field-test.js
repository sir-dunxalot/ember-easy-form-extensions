import { moduleForComponent, test } from 'ember-qunit';
import {
  renderingTests,
  setOnComponent
} from '../../helpers/unit/component';

let component;

moduleForComponent('hint-field', 'Unit | Component | hint field', {
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
  const hintText = 'This field is required';

  assert.expect(2);

  this.render();

  assert.ok(component.$().hasClass(component.get('className')),
    'The className property should be bound');

  setOnComponent(component, 'text', hintText);

  assert.equal(component.$().html().trim(), hintText,
    'The hint text property should appear in the template');

});
