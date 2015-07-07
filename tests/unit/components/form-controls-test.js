import { moduleForComponent, test } from 'ember-qunit';
import {
  setOnComponent
} from '../../helpers/unit/component';

const legend = 'This is a form';

let component;

moduleForComponent('form-controls', 'Unit | Component | form controls', {
  unit: true,

  beforeEach: function() {
    component = this.subject({
      legend
    });
  },
});

test('Rendering', function(assert) {

  assert.equal(component._state, 'preRender',
    'The component instance should be created');

  this.render();

  assert.equal(component._state, 'inDOM',
    'The component should be inserted into the DOM after render');

});

test('Properties', function(assert) {

  assert.ok(component.get('isFormControls'),
    'The component should have an isFormControls helper property');

  assert.equal(component.get('modelPath'), 'model',
    'The component should have a default modelPath property');

  assert.ok(!!component.get('className'),
    'The component should have a default class name');

  setOnComponent(component, {
    legend
  });

  const $element = this.$(); // Calls render

  assert.equal($element.attr('legend'), legend,
    'The legend attribute should be bound');

  assert.equal($element.prop('tagName').toLowerCase(), 'fieldset',
    'The component should be a fieldset');

});
