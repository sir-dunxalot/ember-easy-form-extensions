import Ember from 'ember';
import FormSubmissionClassNameMixin from '../../../mixins/form-submission-class-name';
import { module, test } from 'qunit';

module('Unit | Mixin | form submission class name');

// Replace this with your real tests.
test('it works', function(assert) {
  var FormSubmissionClassNameObject = Ember.Object.extend(FormSubmissionClassNameMixin);
  var subject = FormSubmissionClassNameObject.create();
  assert.ok(subject);
});
