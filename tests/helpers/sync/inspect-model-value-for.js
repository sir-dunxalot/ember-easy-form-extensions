import Ember from 'ember';
import selectorFor from '../selector-for';

export default Ember.Test.registerHelper('inspectModelValueFor',
  function(app, property) {
    const dasherizedProperty = Ember.String.dasherize(property);

    return inspect(`model-${dasherizedProperty}`).html();
  }
);

