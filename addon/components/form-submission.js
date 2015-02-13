import Ember from 'ember';

export default Ember.Component.extend({
  cancel: true,
  cancelText: 'Cancel',
  classNames: ['buttons', 'submission'],
  formSubmitted: Em.computed.readOnly('parentView.controller.formSubmitted'),
  submit: true,
  submitText: 'Save',

  watchForEmptyComponent: function() {
    if (!this.get('cancel') && !this.get('submit')) {
      Ember.warn('Form submission component: you are not showing the submit or the cancel button');
    }
  }.observes('cancel', 'submit'),

});
