import Ember from 'ember';
import FormSubmissionClassNameMixin from 'ember-easy-form-extensions/mixins/components/form-submission-class-name';
import { module, test } from 'qunit';

const { run } = Ember;

let component;

function setProperties(properties) {
  run(function() {
    component.setProperties(properties);
  });
}

module('Unit | Mixin | form submission class name', {

  beforeEach: function() {
    const FormSubmissionClassNameObject = Ember.Component.extend(FormSubmissionClassNameMixin);

    component = FormSubmissionClassNameObject.create();
  },
});

test('Class name bindings', function(assert) {
  const className = 'bananas';
  const property = 'submissionClassName';

  assert.expect(2);

  setProperties({
    className: className,
    formIsSubmitted: true,
  });

  assert.equal(component.get(property), `${className}-submitted`,
    'submissionClassName should reflect that the form is submitted');

  assert.ok(component.get('classNameBindings').indexOf(property) > -1,
    `The ${property} class should be bound to the component`);

});
