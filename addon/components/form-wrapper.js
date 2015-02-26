import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['novalidate'],
  classNameBindings: ['className'],
  className: 'form',
  tagName: 'form',
  novalidate: true,
});
