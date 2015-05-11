import Ember from 'ember';
import layout from '../templates/components/label-field';

export default Ember.Component.extend({
  classNameBindings: ['easyForm.labelClass'],
  label: null,
  layout: layout,
  tagName: 'label',
});
