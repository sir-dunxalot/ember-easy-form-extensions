import Ember from 'ember';
import layout from '../templates/components/form-wrapper';

export default Ember.Component.extend({
  attributeBindings: ['novalidate'],
  classNameBindings: ['easyForm.formWrapperClass'],
  layout: layout,
  novalidate: true,
  tagName: 'form',
});
