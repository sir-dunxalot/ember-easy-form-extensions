import defaultFor from '../utils/default-for';
import Ember from 'ember';
import layout from '../templates/components/input-wrapper';
import toWords from '../utils/to-words';

const { computed, observer, run, typeOf } = Ember;

export default Ember.Component.extend({
  className: 'input-wrapper',
  classNameBindings: ['className', 'validityClass'],
  hint: null,
  isInputWrapper: true, // Static
  isInvalid: computed.not('isValid'),
  isNewlyValid: false,
  isValid: true,
  layout: layout,
  modelPath: computed.oneWay('formControls.modelPath'),
  property: null,
  shouldShowError: false,

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

  cleanProperty: computed('property', 'modelPath',
    function() {
      return this.get('property').replace(this.get('modelPath'), '');
    }
  ),

  dataTest: computed('cleanProperty', function() {
    const cleanProperty = Ember.String.dasherize(this.get('cleanProperty'));

    return `input-wrapper-for-${cleanProperty}`;
  }),

  inputId: computed(function() {
    return this.get('elementId') + '-input';
  }),

  inputPartial: computed('type', function() {
    const type = this.get('type');
    const partialName = defaultFor(type, 'default');

    return `form-inputs/${partialName}`;
  }),

  formControls: computed.readOnly(function() {
    return this.nearestWithProperty('isFormControls');
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

  value: computed('property', function() {
    return computed.alias(this.get('property'));
  }),

  /* Actions */

  actions: {
    showError() {
      this.set('shouldShowError', true);
    },
  },

  /* Methods */

  listenForNewlyValid: observer('isValid', function() {
    if (this.get('isValid')) {
      this.set('isNewlyValid', true);
    }

    run.later(this, function() {
      this.set('isNewlyValid', false);
    }, 3000);
  }),

  listenForSubmit: Ember.on('init', function() {
    this.nearestWithProperty('isFormController').on('submission', function() {
      this.send('showError');
    }.bind(this));
  }),

});
