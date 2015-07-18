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

  delete: false,
  deleteAction: 'delete',
  deleteText: 'Delete',

  save: true,
  saveAction: 'save',
  saveText: 'Save',

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

    delete() {
      this.sendAction('delete');
    },

    save() {
      this.sendAction('saveAction');
    },

  },


});
