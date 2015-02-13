import Ember from 'ember';

export default Ember.Component.extend({
  cancel: true,
  cancelText: 'Cancel',
  classNames: ['buttons', 'submission'],
  formSubmitted: Em.computed.readOnly('parentView.controller.formSubmitted'),
  submit: true,
  submitText: 'Save',

  checkForParentViewMixin: function() {
    Ember.warn(
      'You need to add the submitting mixin to this route\'s view',
      this.get('parentView').submit
    );
  }.on('init'),

  watchForEmptyComponent: function() {
    Ember.warn(
      'Form submission component: you are not showing the submit or the cancel button',
      this.get('cancel') || this.get('submit')
    );
  }.observes('cancel', 'submit'),

});
