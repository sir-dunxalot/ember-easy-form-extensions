import Ember from 'ember';
import layout from '../templates/components/label-field';

export default Ember.Component.extend({
  attributeBindings: ['for'],
  classNameBindings: ['easyForm.labelClass'],
  for: null,
  label: null,
  layout: layout,
  tagName: 'label',
});
