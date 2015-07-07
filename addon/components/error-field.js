import Ember from 'ember';
import layout from '../templates/components/error-field';
import toWords from '../utils/to-words';

const { computed, on } = Ember;

export default Ember.Component.extend({

  /* Options */

  className: 'error',
  label: computed.oneWay('property'),
  property: null,

  /* Properties */

  shouldShowError: false,
  bindingForErrors: null,
  classNameBindings: ['className', 'visible'],
  errors: null,
  layout: layout,
  tagName: 'span',
  visible: computed.and('shouldShowError', 'errors.length'),

  formController: computed(function() {
    const hasFormController = this.nearestWithProperty('formController');

    return hasFormController.get('formController');
  }),

  text: computed('error', 'label', function() {
    const { error, label } = this.getProperties(
      [ 'error', 'label' ]
    );
    const humanizedProperty = toWords(label);

    return `${humanizedProperty} ${error}`;
  }),

  /* Methods */

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
