import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['novalidate'],
  classNameBindings: ['easyForm.formWrapperClass'],
  className: 'form',
  novalidate: true,
  tagName: 'form',
});
