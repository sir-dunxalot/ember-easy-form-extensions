import Ember from 'ember';
import layout from '../templates/components/error-field';

export default Ember.Component.extend({
  classNameBindings: ['easyForm.errorClass'],
  layout: layout,
  tagName: 'span',
  text: null,
});
