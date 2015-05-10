import Ember from 'ember';
import layout from '../templates/components/hint-field';

export default Ember.Component.extend({
  classNameBindings: ['easyForm.hintClass'],
  layout: layout,
  tagName: 'span',
  text: null,
});
