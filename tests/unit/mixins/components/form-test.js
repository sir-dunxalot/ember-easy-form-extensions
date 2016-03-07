import Ember from 'ember';
import ComponentsFormMixin from 'ember-easy-form-extensions/mixins/components/form';
import { module, test } from 'qunit';
import destroyApp from '../../../helpers/destroy-app';
import startApp from '../../../helpers/start-app';

const { RSVP } = Ember;

let subject;

module('Unit | Mixin | components/form', {

  beforeEach() {
    const ComponentsFormObject = Ember.Component.extend(ComponentsFormMixin);

    subject = ComponentsFormObject.create();
  },

});

test('Ember Validations', function(assert) {
  assert.ok(subject.validate, 'Should have Ember Validations mixed in');
  assert.ok(subject.hasFormMixin, 'Should have Form mixed in');
});

test('Action handling', function(assert) {
  const done = assert.async();

  assert.expect(12);

  ['cancel', 'delete', 'save'].forEach((action, i, arr) => {
    const capitalizedAction = Ember.String.capitalize(action);
    const beforeMethodName = `before${capitalizedAction}`;

    assert.notOk(subject.get('formIsSubmitted'), 'Form should not be submitted');

    subject[beforeMethodName] = function() {
      return new RSVP.Promise((resolve) => {
        assert.ok(true, `${beforeMethodName} should be called`);
        resolve();
      });
    };

    subject[action] = function() {
      assert.ok(true, `${action} should be called`);

      if (i === arr.length - 1) {
        done(); // End test
      }
    };

    subject.send(action);

    assert.ok(subject.get('formIsSubmitted'), 'Form should be submitted');

    subject.resetSubmission();
  });

});

test('Validations', function(assert) {
  const App = startApp();
  const ComponentsFormObject = Ember.Component.extend(
    ComponentsFormMixin, {

    container: App.__container__,
    name: null,

    validations: {
      name: {
        presence: true,
      },
    },

  });

  assert.expect(2);

  subject = ComponentsFormObject.create();

  subject.onInvalidSubmission = function() {
    assert.ok(true, 'onInvalidSubmission should be called when the object is invalid');
  };

  subject.send('save');

  /* Now make the object valid and try again */

  subject.onInvalidSubmission = null;

  subject.set('name', 'Dave');

  subject.save = function() {
    assert.ok(true, 'save should be called when the object is valid');
  };

  subject.send('save');

  destroyApp(App);
});
