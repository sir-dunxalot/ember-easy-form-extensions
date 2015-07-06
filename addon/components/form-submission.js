import Ember from 'ember';
import FormSubmissionClassNameMixin from 'ember-easy-form-extensions/mixins/components/form-submission-class-name';
import layout from '../templates/components/form-submission';

const { computed } = Ember;

export default Ember.Component.extend(
  FormSubmissionClassNameMixin, {

  /* Options */

  className: 'form-submission',

  cancel: true,
  cancelAction: 'cancel',
  cancelText: 'Cancel',

  destroy: false,
  destroyAction: 'destroy',
  destroyText: 'Delete',

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

    destroy() {
      this.sendAction('destroy');
    },

    submit() {
      this.sendAction('submitAction');
    },

  },


});
