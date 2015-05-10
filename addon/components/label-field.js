import Ember from 'ember';
import layout from '../templates/components/label-field';

export default Ember.Component.extend({
  classNameBindings: ['easyForm.labelClass'],
  layout: layout,
  tagName: 'label',
  text: Ember.computed.oneWay('parentView.property'),
});
