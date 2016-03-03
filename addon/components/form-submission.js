import Ember from 'ember';
import FormSubmissionClassNameMixin from 'ember-easy-form-extensions/mixins/components/form-submission-class-name';
import layout from '../templates/components/form-submission';

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

  classNameBindings: ['className', 'submissionClassName'],
  formIsSubmitted: false,
  layout: layout,

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

  /* CPs */

  submissionClassName: computed('className', 'formIsSubmitted',
    function() {
      const className = this.get('className');
      const formIsSubmitted = this.get('formIsSubmitted');

      if (formIsSubmitted) {
        return `${className}-submitted`;
      } else {
        return null;
      }
    }
  ),


});
