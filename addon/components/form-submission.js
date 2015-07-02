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
    const controller = this.nearestWithProperty('isFormController');
  }),

  actions: {
    cancel: function() {
      this.sendAction();
    },

    submit: function() {
      this.sendAction();
    },
  },

});
