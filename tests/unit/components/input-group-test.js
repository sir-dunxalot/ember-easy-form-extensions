import { moduleForComponent, test } from 'ember-qunit';
import { setupComponent } from '../../helpers/unit/component';

let component;

moduleForComponent('input-group', 'Unit | Component | input group', {
  needs: [
    'component:hint-field',
    'component:error-field',
    'component:label-field',
    'helper:capitalize-string',
    'template:form-inputs/default',
  ],
  unit: true,

  beforeEach: function() {
    component = setupComponent(this);

    component.set('property', 'fake-property');
  },
});

test('it renders', function(assert) {

  assert.equal(component._state, 'preRender',
    'The component instance should be created');

  this.render();

  assert.equal(component._state, 'inDOM',
    'The component should be inserted into the DOM after render');
});
