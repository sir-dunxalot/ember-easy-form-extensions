import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['legend'],
  classNameBindings: ['className'],
  className: 'controls',
  legend: null,
  tagName: 'fieldset',

  checkForLegend: function() {
    Ember.assert(
      'You must pass a legend (description) to the form-controls component like {{#form-controls legend=\'Write a new blog post\'}}',
      this.get('legend')
    );
  }.on('didInsertElement')
});
