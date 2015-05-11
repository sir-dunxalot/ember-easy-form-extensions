import Ember from 'ember';
import softAssert from '../utils/observers/soft-assert';

export default Ember.Component.extend({
  attributeBindings: ['legend'],
  classNameBindings: ['className'],
  className: 'controls',
  legend: null,
  tagName: 'fieldset',

  checkForLegend: softAssert('legend')
});
