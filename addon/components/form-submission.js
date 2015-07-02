import Ember from 'ember';
import layout from '../templates/components/form-submission';
import WalkViews from 'ember-easy-form-extensions/mixins/views/walk-views';

const { computed, observer } = Ember;

export default Ember.Component.extend(
  WalkViews, {

  cancel: true,
  cancelText: 'Cancel',
  classNames: ['buttons', 'submission'],
  formSubmitted: computed.readOnly('formView.formSubmitted'),
  layout: layout,
  submit: true,
  submitText: 'Save',

  actions: {
    cancel: function() {
      this.get('formView').send('cancel');
    }
  },

  _watchForEmptyComponent: observer('cancel', 'submit',
    function() {
      Ember.warn(
        'The {{form-submission}} component is not showing the submit or the cancel button.',
        this.get('cancel') || this.get('submit')
      );
    }
  ),

});
