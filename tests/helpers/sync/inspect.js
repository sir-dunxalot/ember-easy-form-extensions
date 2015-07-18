import Ember from 'ember';
import selectorFor from '../selector-for';

export default Ember.Test.registerHelper('inspect',
  function(app, name, context) {
    const selector = selectorFor(name);

    let element;

    if (context) {
      element = find(selector, context);
    } else {
      element = find(selector);
    }

    return element;
  }
);
