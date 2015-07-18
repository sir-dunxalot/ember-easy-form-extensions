import Ember from 'ember';
import FormSubmissionClassNameMixin from 'ember-easy-form-extensions/mixins/components/form-submission-class-name';
import layout from '../templates/components/form-wrapper';

const { computed, on } = Ember;

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

  /* Properties */

  /* A shim to enabled use with controller and components
  moving forward */

  formController: Ember.computed(function() {
    const routeController = this.get('targetObject');

    if (this.get('hasFormMixin')) {
      return this;
    } else if (routeController.get('hasFormMixin')) {
      return routeController;
    } else {
      return null;
    }
  }),

  /* Methods */

  /* Autofocus on the first input.

  TODO - move to form component
  mixin when routeable components land */

  autofocus: on('didInsertElement', function() {
    var input = this.$().find('input').first();

    if (!Ember.$(input).hasClass('datepicker')) {
      input.focus();
    }
  }),

});
