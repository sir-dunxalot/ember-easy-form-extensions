import Ember from 'ember';
import layout from '../templates/components/label-field';

export default Ember.Component.extend({
  attributeBindings: ['for'],
  className: 'label',
  classNameBindings: ['className'],
  for: null,
  label: null,
  layout: layout,
  tagName: 'label',
});
