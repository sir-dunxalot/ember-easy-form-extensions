import Ember from 'ember';
import selectorFor from '../selector-for';

export default Ember.Test.registerAsyncHelper('clickInputFor',
  function(app, property, value, tagName = 'input') {
    const dasherizedProperty = Ember.String.dasherize(property);
    const dataTest = `input-wrapper-for-${dasherizedProperty}`;

    click(inspect(dataTest).find(tagName));
  }
);
