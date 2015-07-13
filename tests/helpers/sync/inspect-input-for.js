import Ember from 'ember';
import selectorFor from '../selector-for';

export default Ember.Test.registerHelper('inspectInputFor',
  function(app, property, tagName = 'input') {
    const dasherizedProperty = Ember.String.dasherize(property);

    return inspect(`input-wrapper-for-${dasherizedProperty}`).find(tagName);
  }
);

