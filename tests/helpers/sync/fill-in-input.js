import Ember from 'ember';
import selectorFor from '../selector-for';

export default Ember.Test.registerHelper('fillInInput', function(app, property, value) {
  fillIn(selectorFor(`input-wrapper-for-${property}`) + ' input', value);
});
