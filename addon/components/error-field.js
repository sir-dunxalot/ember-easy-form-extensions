import defaultFor from '../utils/default-for';
import Ember from 'ember';
import layout from '../templates/components/error-field';
import toWords from '../utils/to-words';

export default Ember.Component.extend({
  classNameBindings: ['easyForm.errorClass'],
  error: null,
  layout: layout,
  property: null,
  tagName: 'span',

  errorText: Ember.computed('errors.[]', 'value', function() {
    var propertyName = defaultFor(
      this.get('property'),
      this.get('parentView.property')
    );

    return toWords(propertyName) + ' ' + this.get('error');
  }),
});
