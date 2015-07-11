import defaultFor from '../utils/default-for';
import Ember from 'ember';
import layout from '../templates/components/input-group';
import toWords from '../utils/to-words';

const { computed, observer, on, run, typeOf } = Ember;

export default Ember.Component.extend({

  /* Options */

  className: 'input-wrapper',
  hint: null,
  pathToInputPartials: 'form-inputs',
  property: null,
  newlyValidDuration: 3000,

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

  attributeBindings: ['dataTest:data-test'],
  bindingForValue: null, // Avoid xBinding naming convention
  classNameBindings: ['className', 'validityClass'],
  formControls: null,
  isInvalid: computed.not('isValid'),
  isNewlyValid: false,
  isValid: true,
  layout: layout,
  modelPath: computed.oneWay('formControls.modelPath'),
  registerAction: 'registerInputGroup',
  showError: false,
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
    const { container, pathToInputPartials, type } = this.getProperties(
      [ 'container', 'pathToInputPartials', 'type' ]
    );

    /* Remove leading and trailing slashes for consistency */

    const dir = pathToInputPartials.replace(/^\/|\/$/g, '');

    if (!!container.lookup(`template:${dir}/${type}`)) {
      return `${dir}/${type}`;
    } else {
      return `${dir}/default`;
    }
  }),

  isInputWrapper: computed(function() {
    return true;
  }).readOnly(),

  label: computed('property', function() {
    const property = defaultFor(this.get('propertyWithoutModel'), '');

    return toWords(property);
  }),

  type: computed('content', 'propertyWithoutModel', 'value', function() {
    const property = this.get('propertyWithoutModel');

    let type;

    if (this.get('content')) {
      type = 'select';
    } else if (property.match(/password/)) {
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
      } else if (this.get('isValid')) {
        modifier = 'valid';
      } else {
        modifier = 'error';
      }

      if (modifier) {
        return `${className}-${modifier}`;
      } else {
        return className;
      }
    }
  ),

  /* Actions */

  actions: {

    showError() {
      this.set('showError', true);
    },

    setGroupAsInvalid() {
      this.set('isValid', false);
    },

    setGroupAsValid() {
      this.set('isValid', true);
    },

  },

  /* Public methods - avoid xBinding syntax */

  listenForNewlyValid: observer('isValid', function() {
    if (this.get('isValid')) {
      this.set('isNewlyValid', true);
    }

    run.later(this, function() {
      if (!this.get('isDestroying')) {
        this.set('isNewlyValid', false);
      }
    }, this.get('newlyValidDuration'));
  }),

  removeBindingForValue: on('willDestroyElement', function() {
    const property = 'bindingForValue';

    if (this.get(property)) {
      this.get(property).disconnect(this);
      this.set(property, null);
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
