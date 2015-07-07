import defaultFor from '../utils/default-for';
import Ember from 'ember';
import layout from '../templates/components/input-group';
import toWords from '../utils/to-words';

const { computed, observer, on, run, typeOf } = Ember;

export default Ember.Component.extend({

  /* Options */

  className: 'input-wrapper',
  hint: null,
  property: null,

  /* Input attributes */

  collection: null,
  content: null,
  optionValuePath: null,
  optionLabelPath: null,
  selection: null,
  multiple: null,
  name: computed.oneWay('property'),
  placeholder: null,
  prompt: null,
  disabled: false,

  /* Properties */

  bindingForValue: null, // Avoid xBinding naming convention
  classNameBindings: ['className', 'validityClass'],
  formControls: null,
  isInvalid: computed.not('isValid'),
  isNewlyValid: false,
  isValid: true,
  layout: layout,
  modelPath: computed.oneWay('formControls.modelPath'),
  registerAction: 'registerInputGroup',
  shouldShowError: false,
  unregisterAction: 'unregisterInputGroup',
  value: null,

  propertyWithoutModel: computed('property', 'modelPath', function() {
    const modelPath = this.get('modelPath');

    if (modelPath) {
      return this.get('property').replace(`${modelPath}.`, '');
    } else {
      return this.get('property');
    }
  }),

  dataTest: computed('propertyWithoutModel', function() {
    const propertyWithoutModel = this.get('propertyWithoutModel');
    const dasherizedProperty = Ember.String.dasherize(propertyWithoutModel);

    return `input-wrapper-for-${dasherizedProperty}`;
  }),

  formController: computed(function() {
    const hasFormController = this.nearestWithProperty('formController');

    return hasFormController.get('formController');
  }),

  inputId: computed(function() {
    return this.get('elementId') + '-input';
  }),

  inputPartial: computed('type', function() {
    const container = this.get('container');
    const dir = 'form-inputs/';
    const type = this.get('type');

    if (!!container.lookup(`template:${dir}${type}`)) {
      return `${dir}${type}`;
    } else {
      return `${dir}default`;
    }
  }),

  isInputWrapper: computed(function() {
    return true;
  }).readOnly(),

  label: computed('property', function() {
    const property = defaultFor(this.get('propertyWithoutModel'), '');

    return toWords(property);
  }),

  type: computed(function() {
    const property = this.get('propertyWithoutModel');

    let type;

    if (property.match(/password/)) {
      type = 'password';
    } else if (property.match(/email/)) {
      type = 'email';
    } else if (property.match(/url/)) {
      type = 'url';
    } else if (property.match(/color/)) {
      type = 'color';
    } else if (property.match(/^tel/) || property.match(/^phone/)) {
      type = 'tel';
    } else if (property.match(/search/)) {
      type = 'search';
    } else if (this.get('content')) {
      type = 'select';
    } else {
      const value = this.get('value');

      if (typeOf(value) === 'number') {
        type = 'number';
      } else if (typeOf(value) === 'date') {
        type = 'date';
      } else if (typeOf(value) === 'boolean') {
        type = 'checkbox';
      }
    }

    return type;
  }),

  validityClass: computed('className', 'isNewlyValid', 'isValid',
    function() {
      const className = this.get('className');

      let modifier;

      if (this.get('isNewlyValid')) {
        modifier = 'newly-valid';
      } else if(this.get('isValid')) {
        modifier = 'valid';
      } else {
        modifier = 'error';
      }

      return `${className}-${modifier}`;
    }
  ),

  /* Actions */

  actions: {
    showError() {
      this.set('shouldShowError', true);
    },
  },

  /* Public methods - avoid xBinding syntax */

  listenForNewlyValid: observer('isValid', function() {
    if (this.get('isValid')) {
      this.set('isNewlyValid', true);
    }

    run.later(this, function() {
      this.set('isNewlyValid', false);
    }, 3000);
  }),

  removeBindingForValue: on('willDestroyElement', function() {
    const bindingForValue = this.get('bindingForValue');

    if (bindingForValue) {
      bindingForValue.disconnect(this);
    }
  }),

  setBindingForValue: on('didInitAttrs', function() {
    const property = this.get('property');

    Ember.assert('You must set a property attribute on the {{input-group}} component', property);

    const binding = Ember.bind(this, 'value', `formController.${property}`);

    this.set('bindingForValue', binding);
  }),

  setFormControls: on('init', function() {
    this.set('formControls', this.nearestWithProperty('isFormControls'));
  }),

  /* Private methods */

  _registerWithFormController: on('init', function() {
    this.sendAction('registerAction', this);
  }),

  _unregisterWithFormController: on('willDestroyElement', function() {
    this.sendAction('unregisterAction', this);
  }),

});
