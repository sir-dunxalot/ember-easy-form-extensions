import defaultFor from '../utils/default-for';
import Ember from 'ember';
import layout from '../templates/components/input-wrapper';
import toWords from '../utils/to-words';
import WalkViews from '../mixins/views/walk-views';

var typeOf = Ember.typeOf;
var run = Ember.run;

export default Ember.Component.extend(
  WalkViews, {

  isInputWrapper: true, // Static
  isNewlyValid: false,
  isValid: true,
  layout: layout,
  modelPath: Ember.computed.oneWay('parentView.modelPath'),
  property:  Ember.computed.oneWay('valueBinding._label'),
  shouldShowError: false,

  classNameBindings: [
    'easyForm.inputWrapperClass',
    'validityClass'
  ],

  /* Input attributes */

  collection: null,
  optionValuePath: null,
  optionLabelPath: null,
  selection: null,
  value: null,
  multiple: null,
  name: Ember.computed.oneWay('property'),
  placeholder: null,
  prompt: null,
  disabled: null,

  cleanProperty: Ember.computed('property', 'modelPath',
    function() {
      return this.get('property').replace(this.get('modelPath'), '');
    }
  ),

  inputId: Ember.computed(function() {
    return this.get('elementId') + '-input';
  }),

  inputPartial: Ember.computed('type', function() {
    var type = this.get('type');
    var partialName = this.get('easyForm.inputTypePartials.' + type);

    return defaultFor(partialName, 'form-inputs/default');
  }),

  label: Ember.computed('property', function() {
    var property = defaultFor(this.get('cleanProperty'), '');

    return toWords(property);
  }),

  type: Ember.computed(function() {
    var property = this.get('cleanProperty');
    var type, value;

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
    } else {
      value = this.get('value');

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

  validityClass: Ember.computed('easyForm.inputWrapperClass', 'isNewlyValid', 'isValid',
    function() {
      var baseClass = this.get('easyForm.inputWrapperClass');
      var modifier;

      if (this.get('isNewlyValid')) {
        modifier = 'newly-valid';
      } else if(this.get('isValid')) {
        modifier = 'valid';
      } else {
        modifier = 'error';
      }

      return baseClass + '-' + modifier;
    }
  ),

  actions: {
    showError: function() {
      this.set('shouldShowError', true);
    },
  },

  listenForNewlyValid: Ember.observer('isValid', function() {
    if (this.get('isValid')) {
      this.set('isNewlyValid', true);
    }

    Ember.run.later(this, function() {
      this.set('isNewlyValid', false);
    }, 3000);
  }),

  listenForSubmit: Ember.on('init', function() {
    this.get('formView').on('submission', function() {
      this.send('showError');
    }.bind(this));
  }),

});
