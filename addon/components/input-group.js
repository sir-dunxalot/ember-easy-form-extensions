import defaultFor from '../utils/default-for';
import Ember from 'ember';
import layout from '../templates/components/input-group';
import toWords from '../utils/to-words';

const { computed, observer, run, typeOf } = Ember;

export default Ember.Component.extend({
  bindingForValue: null, // Avoid xBinding naming convention
  className: 'input-wrapper',
  classNameBindings: ['className', 'validityClass'],
  formControls: null,
  hint: null,
  isInputWrapper: true, // Static
  isInvalid: computed.not('isValid'),
  isNewlyValid: false,
  isValid: true,
  layout: layout,
  modelPath: computed.oneWay('formControls.modelPath'),
  property: null,
  registerAction: 'registerInputGroup',
  shouldShowError: false,
  unregisterAction: 'unregisterInputGroup',
  value: null,

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
  disabled: null,

  cleanProperty: computed('property', 'modelPath', function() {
    const modelPath = this.get('modelPath');

    if (modelPath) {
      return this.get('property').replace(`${modelPath}.`, '');
    } else {
      return this.get('property');
    }
  }),

  dataTest: computed('cleanProperty', function() {
    const cleanProperty = Ember.String.dasherize(this.get('cleanProperty'));

    return `input-wrapper-for-${cleanProperty}`;
  }),

  formController: computed(function() {
    const hasFormController = this.nearestWithProperty('formController');

    return hasFormController.get('formController');
  }),

  inputId: computed(function() {
    return this.get('elementId') + '-input';
  }),

  inputPartial: computed('type', function() {
    const type = this.get('type');
    const partialName = defaultFor(type, 'default');

    return `form-inputs/${partialName}`;
  }),

  setFormControls: Ember.on('init', function() {
    this.set('formControls', this.nearestWithProperty('isFormControls'));
  }),

  label: computed('property', function() {
    const property = defaultFor(this.get('cleanProperty'), '');

    return toWords(property);
  }),

  type: computed(function() {
    const property = this.get('cleanProperty');

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

  /* Methods */

  setValueObserver: Ember.on('didInitAttrs', function() {
    const property = this.get('property');

    Ember.assert('You must set a property attribute on the {{input-group}} component', property);

    const binding = Ember.bind(this, 'value', `formController.${property}`);

    this.set('bindingForValue', binding);
  }),

  removeValueObserver: Ember.on('willDestroyElement', function() {
    console.log(this.get('bindingForValue'));
    this.get('bindingForValue').disconnect(this);
  }),

  listenForNewlyValid: observer('isValid', function() {
    if (this.get('isValid')) {
      this.set('isNewlyValid', true);
    }

    run.later(this, function() {
      this.set('isNewlyValid', false);
    }, 3000);
  }),

  _registerWithFormController: Ember.on('init', function() {
    this.sendAction('registerAction', this);
  }),

  _unregisterWithFormController: Ember.on('willDestroyElement', function() {
    this.sendAction('unregisterAction', this);
  }),

});
