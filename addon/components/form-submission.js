import Ember from 'ember';
import layout from '../templates/components/form-submission';
import WalkViews from 'ember-easy-form-extensions/mixins/views/walk-views';

export default Ember.Component.extend(
  WalkViews, {

  cancel: true,
  cancelText: 'Cancel',
  classNames: ['buttons', 'submission'],
  formSubmitted: Ember.computed.readOnly('formView.formSubmitted'),
  layout: layout,
  submit: true,
  submitText: 'Save',

  actions: {
    cancel: function() {
      this.get('formView').send('cancel');
    }
  },

  _watchForEmptyComponent: Ember.observer('cancel', 'submit',
    function() {
      Ember.warn(
        'The {{form-submission}} component is not showing the submit or the cancel button.',
        this.get('cancel') || this.get('submit')
      );
    }
  ),

});
