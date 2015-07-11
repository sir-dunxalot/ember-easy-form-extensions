import Ember from 'ember';
import layout from '../templates/components/error-field';

const { computed, observer, on } = Ember;

export default Ember.Component.extend({

  /* Options */

  className: 'error',
  label: computed.oneWay('property'),
  property: null,

  /* Properties */

  bindingForErrors: null,
  classNameBindings: ['className', 'showError'],
  errors: null,
  invalidAction: 'setGroupAsInvalid',
  layout: layout,
  tagName: 'span',
  validAction: 'setGroupAsValid',
  showError: false,

  text: computed('errors.firstObject', 'label', function() {
    const error = this.get('errors.firstObject');
    const label = this.get('label');

    return `${label} ${error}`;
  }),

  formController: computed(function() {
    const hasFormController = this.nearestWithProperty('formController');

    return hasFormController.get('formController');
  }),

  /* Methods */

  // TODO - update from observer to event when possible

  notifyChangeInValidity: observer('showError', function() {
    const actionProperty = this.get('showError') ? 'invalidAction' : 'validAction';

    this.sendAction(actionProperty);
  }),

  addBindingForErrors: on('didInitAttrs', function() {
    const property = this.get('property');

    Ember.assert('You must set a property attribute on the {{error-field}} component', property);

    const formController = this.get('formController');
    const validations = formController.get('validations');
    const validationsForProperty = !!validations[property];

    if (validationsForProperty && !this.get('bindingForErrors')) {
      const errorPath = `formController.errors.${property}`;
      const binding = Ember.oneWay(this, 'errors', errorPath);

      this.set('bindingForErrors', binding);
    }
  }),

  removeBindingForErrors: Ember.on('willDestroyElement', function() {
    const property = 'bindingForErrors';

    if (this.get(property)) {
      this.get(property).disconnect(this);
      this.set(property, null);
    }
  }),
});
