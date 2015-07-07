import { moduleForComponent, test } from 'ember-qunit';
import { setupComponent } from '../../helpers/unit/component';

let component;

moduleForComponent('form-submission', 'Unit | Component | form submission', {
  needs: ['component:form-submission-button'],
  unit: true,

  beforeEach: function() {
    component = setupComponent(this);
  },
});

test('it renders', function(assert) {

  assert.equal(component._state, 'preRender',
    'The component instance should be created');

  this.render();

  assert.equal(component._state, 'inDOM',
    'The component should be inserted into the DOM after render');
});
