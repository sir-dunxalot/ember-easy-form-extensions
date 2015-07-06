import Ember from 'ember';
import FormSubmissionClassNameMixin from 'ember-easy-form-extensions/mixins/components/form-submission-class-name';
import layout from '../templates/components/form-wrapper';

const { computed } = Ember;

export default Ember.Component.extend(
  FormSubmissionClassNameMixin, {

  /* Options */

  className: 'form',
  novalidate: true,

  /* Properties */

  attributeBindings: ['novalidate'],
  classNameBindings: ['className'],
  formIsSubmitted: computed.oneWay('formController.formIsSubmitted'),
  layout: layout,
  tagName: 'form',

  actions: {

    cancel() {
      this.sendAction();
    },

    destroy() {
      this.sendAction();
    },

    submit() {
      this.sendAction();
    },

  },

  /* Properties */

  /* A shim to enabled use with controller and components
  moving forward */

  formController: Ember.computed(function() {
    const routeController = this.get('targetObject');

    if (this.get('isFormController')) {
      return this;
    } else if (routeController.get('isFormController')) {
      return routeController;
    } else {
      return null;
    }
  }),

});
