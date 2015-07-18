import Ember from 'ember';
import layout from '../templates/components/hint-field';

export default Ember.Component.extend({
  className: ['hint'],
  classNameBindings: ['className'],
  layout: layout,
  tagName: 'span',
  text: null,
});
