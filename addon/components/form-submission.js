import Ember from 'ember';
import layout from '../templates/components/form-submission';

const { computed } = Ember;

export default Ember.Component.extend({

  /* Options */

  cancel: true,
  cancelAction: 'cancel',
  cancelText: 'Cancel',
  className: 'form-submission',
  submit: true,
  submitAction: 'submit',
  submitText: 'Save',

  /* Properties */

  classNameBindings: ['className'],
  formIsSubmitted: computed.oneWay('formController.formIsSubmitted'),
  layout: layout,

  formController: computed(function() {
    const hasFormController = this.nearestWithProperty('formController');

    return hasFormController.get('formController');
  }),

  /* Actions */

  actions: {
    cancel() {
      this.sendAction('cancelAction');
    },

    submit() {
      this.sendAction('submitAction');
    },
  },

});
