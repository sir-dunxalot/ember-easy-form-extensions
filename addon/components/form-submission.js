import Ember from 'ember';

export default Ember.Component.extend({
  cancel: true,
  cancelText: 'Cancel',
  classNames: ['buttons', 'submission'],
  formSubmitted: Em.computed.readOnly('parentView.controller.formSubmitted'),
  submit: true,
  submitText: 'Save',

  _checkForParentViewMixin: function() {
    var parentView = this.get('parentView');

    Ember.warn(
      'No submitting mixin has been added to this route\'s view. Your form may not submit correctly.',
      parentView.submit && parentView.resetForm
    );
  }.on('init'),

  _watchForEmptyComponent: function() {
    Ember.warn(
      'The {{form-submission}} component is not showing the submit or the cancel button.',
      this.get('cancel') || this.get('submit')
    );
  }.observes('cancel', 'submit'),

});
