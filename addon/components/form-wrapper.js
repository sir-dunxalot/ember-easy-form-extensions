import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['novalidate'],
  classNameBindings: ['className'],
  className: 'form',
  novalidate: true,
  tagName: 'form',
});
