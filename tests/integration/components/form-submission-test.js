import { moduleForComponent, test } from 'ember-qunit';
import getButton from '../../helpers/get-button';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('form-submission', 'Integration | Component | form submission', {
  integration: true
});

test('it renders', function(assert) {

  assert.expect(10);

  /* Check the buttons can be hidden and shown */

  this.render(hbs`{{form-submission}}`);

  assert.ok(this.$().find('.form-submission').length, 1,
    'Form submission should have a public class');

  assert.ok(getButton(this, 'save'), 'Save button should be present');
  assert.ok(getButton(this, 'cancel'), 'Cancel button should be present');
  assert.notOk(getButton(this, 'delete'), 'Delete button should not be present');

  this.render(hbs`{{form-submission delete=true save=false cancel=false}}`);

  assert.notOk(getButton(this, 'save'), 'Save button should not be present');
  assert.notOk(getButton(this, 'cancel'), 'Cancel button should not be present');
  assert.ok(getButton(this, 'delete'), 'Delete button should be present');

  /* Now check that actions are received */

  this.render(hbs`{{form-submission delete=true}}`);

  this.on('save', () => {
    assert.ok(true, 'Save should be called when the save button is clicked');
  });

  this.on('cancel', () => {
    assert.ok(true, 'Cancel should be called when the cancel button is clicked');
  });

  this.on('delete', () => {
    assert.ok(true, 'Delete should be called when the delete button is clicked');
  });

  getButton(this, 'save', false).click();
  getButton(this, 'cancel', false).click();
  getButton(this, 'delete', false).click();
});
