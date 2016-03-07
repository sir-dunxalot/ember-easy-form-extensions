import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('form-submission-button', 'Integration | Component | form submission button', {
  integration: true
});

test('it renders', function(assert) {

  assert.expect(7);

  /* Test basic button attributes */

  this.render(hbs`{{form-submission-button text='burger' action='wasClicked'}}`);

  const $button = this.$().find('.button');

  assert.ok($button[0],
    'Should have a public class name');

  assert.equal($button.attr('type'), 'button',
    'Should have a type button');

  assert.equal(this.$().text().trim(), 'burger',
    'Should render with text');

  /* Test clicking the button */

  this.on('wasClicked', () => {
    assert.ok(true, 'Passed action should be called when clicked');
  });

  $button.click();

  /* Test block form */

  this.render(hbs`
    {{#form-submission-button}}
      hotdog
    {{/form-submission-button}}
  `);

  assert.equal(this.$().text().trim(), 'hotdog',
    'Should render with text in block form');

  this.render(hbs`{{form-submission-button disabled=true type='reset' action='onDisabledClick'}}`);

  const $button2 = this.$().find('.button');

  assert.equal($button2.attr('disabled'), 'disabled',
    'The disabled attribute should be bound');

  assert.equal($button2.attr('type'), 'reset',
    'The type attribute should be bound');

  this.on('onDisabledClick', () => {

    /* We test this using asser.expect to make sure the
    suite passes when this action isn't called */

    assert.ok(true, 'The action should not be sent when the button is disabled');
  });

  $button2.click();

});
