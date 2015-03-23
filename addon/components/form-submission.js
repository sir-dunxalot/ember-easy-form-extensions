import Ember from 'ember';
import WalkViews from 'ember-easy-form-extensions/mixins/views/walk-views';

export default Ember.Component.extend(
  WalkViews, {

  cancel: true,
  cancelText: 'Cancel',
  classNames: ['buttons', 'submission'],
  formSubmitted: Ember.computed.readOnly('formView.formSubmitted'),
  submit: true,
  submitText: 'Save',

  actions: {
    cancel: function() {
      this.get('formView').send('cancel');
    }
  },

  _watchForEmptyComponent: function() {
    Ember.warn(
      'The {{form-submission}} component is not showing the submit or the cancel button.',
      this.get('cancel') || this.get('submit')
    );
  }.observes('cancel', 'submit'),

});
