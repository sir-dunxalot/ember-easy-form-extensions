import Ember from 'ember';
import layout from '../templates/components/form-controls';
import softAssert from '../utils/observers/soft-assert';

const { computed } = Ember;

export default Ember.Component.extend({
  attributeBindings: ['legend'],
  className: 'controls',
  classNameBindings: ['className'],
  layout: layout,
  legend: null,
  modelPath: 'model',
  tagName: 'fieldset',
  checkForLegend: softAssert('legend'),

  isFormControls: computed(function() {
    return true;
  }).readOnly(),

});
