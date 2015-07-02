import defaultFor from '../utils/default-for';
import Ember from 'ember';
import layout from '../templates/components/input-wrapper';
import toWords from '../utils/to-words';
import WalkViews from '../mixins/views/walk-views';

const { computed, run, typeOf } = Ember;

export default Ember.Component.extend(
  WalkViews, {

  hint: null,
  isInputWrapper: true, // Static
  isInvalid: computed.not('isValid'),
  isNewlyValid: false,
  isValid: true,
  layout: layout,
  modelPath: computed.oneWay('parentView.modelPath'),
  property:  computed.oneWay('valueBinding._label'),
  shouldShowError: false,

  attributeBindings: [
    'dataTest:data-test'
  ],

  classNameBindings: [
    'easyForm.inputGroupClass',
    'validityClass'
  ],

  /* Input attributes */

  collection: null,
  content: null,
  optionValuePath: null,
  optionLabelPath: null,
  selection: null,
  value: null,
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
    const partialName = this.get(`easyForm.inputTypePartials.${type}`);

    return defaultFor(partialName, 'form-inputs/default');
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

  validityClass: computed('easyForm.inputWrapperClass', 'isNewlyValid', 'isValid',
    function() {
      const baseClass = this.get('easyForm.inputWrapperClass');

      let modifier;

      if (this.get('isNewlyValid')) {
        modifier = 'newly-valid';
      } else if(this.get('isValid')) {
        modifier = 'valid';
      } else {
        modifier = 'error';
      }

      return `${baseClass}-${modifier}`;
    }
  ),

  actions: {
    showError() {
      this.set('shouldShowError', true);
    },
  },

  listenForNewlyValid: observer('isValid', function() {
    if (this.get('isValid')) {
      this.set('isNewlyValid', true);
    }

    run.later(this, function() {
      this.set('isNewlyValid', false);
    }, 3000);
  }),

  listenForSubmit: Ember.on('init', function() {
    this.get('formView').on('submission', function() {
      this.send('showError');
    }.bind(this));
  }),

});
