import Ember from 'ember';
import layout from '../templates/components/form-submission';

const { computed } = Ember;

export default Ember.Component.extend({
  cancel: true,
  cancelText: 'Cancel',
  className: 'form-submission',
  classNameBindings: ['className'],
  formIsSubmitted: computed.oneWay('formController.formIsSubmitted'),
  layout: layout,
  submit: true,
  submitText: 'Save',

  formController: computed(function() {
    return this.nearestWithProperty('isFormController');
  }),

  actions: {
    cancel() {
      this.sendAction();
    },

    submit() {
      this.sendAction();
    },
  },

});
