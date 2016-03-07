import Ember from 'ember';
import ComponentsConditionalValidationsMixin from 'ember-easy-form-extensions/mixins/components/conditional-validations';
import ComponentsFormMixin from 'ember-easy-form-extensions/mixins/components/form';
import { module, test } from 'qunit';

const { run } = Ember;

let subject;

module('Unit | Mixin | components/conditional validations', {

  beforeEach() {
    const ComponentsConditionalValidationsObject = Ember.Object.extend(
      ComponentsFormMixin,
      ComponentsConditionalValidationsMixin, {

      bananas: null,
      revalidateFor: ['bananas'],
    });

    subject = ComponentsConditionalValidationsObject.create();
  },

});

test('Calls to validate', function(assert) {
  const done = assert.async();

  assert.expect(3);

  subject.validate = function() {
    assert.ok(true, 'Validate should be called when bananas changes');
  };

  assert.ok(subject.hasObserverFor('bananas'), 'Should add observers on init');

  subject.set('bananas', true);

  run(this, function() {
    subject.destroy();


    run.next(this, function() {
      assert.notOk(subject.hasObserverFor('bananas'), 'Should remove observers on destroy');
      done();
    });
  });

});
