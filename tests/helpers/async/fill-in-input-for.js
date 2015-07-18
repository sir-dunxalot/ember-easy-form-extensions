import Ember from 'ember';
import selectorFor from '../selector-for';

export default Ember.Test.registerAsyncHelper('fillInInputFor',
  function(app, property, value, tagName = 'input') {
    const dasherizedProperty = Ember.String.dasherize(property);
    const selector = selectorFor(`input-wrapper-for-${dasherizedProperty}`);

    fillIn(`${selector} ${tagName}`, value);
  }
);
