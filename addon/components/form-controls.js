import Ember from 'ember';
import softAssert from '../utils/observers/soft-assert';
import WalkViews from '../mixins/views/walk-views';

export default Ember.Component.extend(
  WalkViews, {

  attributeBindings: ['legend'],
  classNameBindings: ['easyForm.formControlsClass'],
  legend: null,
  model: null,
  tagName: 'fieldset',
  checkForLegend: softAssert('legend'),

  findDefaultModel: Ember.on('willInsertElement', function() {
    var isFulfilled, modelIsAPromise;

    if (!this.get('model')) {
      isFulfilled = this.get('model.isFulfilled');
      modelIsAPromise = Ember.typeOf(isFulfilled === 'boolean');

      if (!modelIsAPromise) {
        this.set('model', this.get('formView.controller.model'));
      }
    }
  }),
});
