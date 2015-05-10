import Ember from 'ember';
import layout from '../templates/components/form-control';

var typeOf = Ember.typeOf;

export default Ember.Component.extend({
  as: null,
  layout: layout,
  property: null,
  showError: false,

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
});
