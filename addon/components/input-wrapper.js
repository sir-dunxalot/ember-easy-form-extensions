import defaultFor from '../utils/default-for';
import Ember from 'ember';
import layout from '../templates/components/input-wrapper';
import toWords from '../utils/to-words';

var typeOf = Ember.typeOf;
var run = Ember.run;

export default Ember.Component.extend({
  as: null,
  layout: layout,
  property:  Ember.computed.oneWay('valueBinding._label'),
  showError: false,
  showValidity: false,
  value: null,

  classNameBindings: [
    'easyForm.inputWrapperClass',
    'showValidity:control-valid'
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

  fullPropertyPath: Ember.computed('parentView.modelPath', 'property',
    function() {
      var modelPath = defaultFor(
        this.get('parentView.modelPath'),
        'model'
      );

      // return modelPath + '.' + this.get('property');
      return this.get('property');
    }
  ),

  label: Ember.computed('property', function() {
    var property = defaultFor(this.get('property'), '');

    return toWords(property.replace('model.', ''));
  }),

  type: Ember.computed('as', function() {
    var as = this.get('as');
    var property = this.get('property');
    var type, value;

    if (!as) {
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
    } else {
      var inputType = this.get('easyForm.inputTypes.' + property);

      if (inputType) {
        type = inputType;
      }

      type = as;
    }

    return type;
  }),

  setInvalidToValid: Ember.observer('showError', function() {
    // If we go from error to no error
    if (!this.get('showError') && this.get('canShowValidationError')) {
      run.debounce(this, function() {
        var hasAnError = this.get('formForModel.errors.' + this.get('property') + '.length');

        if (!hasAnError && !this.get('isDestroying')) {
          this.set('showValidity', true);

          run.later(this, function() {
            if (!this.get('isDestroying')) {
              this.set('showValidity', false);
            }
          }, 2000);
        }
      }, 50);
    }
  }),

  /**
  An override of easyForm's default `focusOut` method to ensure validations are not shown when the user clicks cancel.

  @method focusOut
  */

  focusOut: function() {

    /* Hacky - delay check so focusOut runs after the cancel action */

    run.later(this, function() {
      var cancelClicked = this.get('parentView.cancelClicked');
      var isDestroying = this.get('isDestroying');

      if (!cancelClicked && !isDestroying) {
        this.set('hasFocusedOut', true);
        this.showValidationError();
      }
    }, 100);
  },

  showValidationError: Ember.K
});