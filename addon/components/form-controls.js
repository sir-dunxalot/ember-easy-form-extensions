import defaultFor from '../utils/default-for';
import Ember from 'ember';
import layout from '../templates/components/form-controls';
import softAssert from '../utils/observers/soft-assert';
import WalkViews from '../mixins/views/walk-views';

export default Ember.Component.extend(
  WalkViews, {

  attributeBindings: ['legend'],
  classNameBindings: ['easyForm.formControlsClass'],
  layout: layout,
  legend: null,
  model: null,
  modelPath: Ember.computed.oneWay('modelBinding._label'),
  tagName: 'fieldset',
  checkForLegend: softAssert('legend'),

  modelPath: Ember.computed('modelBinding._label', function() {
    var modelPath = this.get('modelBinding._label');

    return defaultFor(modelPath, 'model') + '.';
  }),

  // findDefaultModel: Ember.on('init', function() {
  //   var isFulfilled, modelIsAPromise;
  //
  //   if (!this.get('model')) {
  //     isFulfilled = this.get('model.isFulfilled');
  //     modelIsAPromise = Ember.typeOf(isFulfilled === 'boolean');
  //
  //     if (!modelIsAPromise) {
  //       this.set('model', this.get('formView.controller.model'));
  //     }
  //   }
  // }),
});
