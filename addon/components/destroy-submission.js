import Ember from 'ember';
import FormSubmissionClassNameMixin from 'ember-easy-form-extensions/mixins/components/form-submission-class-name';
import layout from '../templates/components/destroy-submission';

const { computed } = Ember;

export default Ember.Component.extend(
  FormSubmissionClassNameMixin, {

  /* Options */

  className: 'destroy-submission',
  destroyAction: 'destroy',
  destroyText: 'Delete',

  /* Properties*/

  classNameBindings: ['className'],
  formIsSubmitted: computed.oneWay('formController.formIsSubmitted'),
  layout: layout,

  formController: computed(function() {
    const hasFormController = this.nearestWithProperty('formController');

    return hasFormController.get('formController');
  }),

  /* Actions */

  actions: {
    destroy() {
      this.sendAction('destroy');
    }
  },
});
