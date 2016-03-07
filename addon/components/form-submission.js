import Ember from 'ember';
import layout from '../templates/components/form-submission';

const { computed } = Ember;

export default Ember.Component.extend({

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
      this.sendAction('deleteAction');
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
