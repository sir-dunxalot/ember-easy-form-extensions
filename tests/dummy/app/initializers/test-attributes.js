import Ember from 'ember';

export function initialize(/* container, application */) {

  ['Checkbox', 'Component', 'TextArea', 'TextField', 'Select'].forEach(function(instanceName) {
    Ember[instanceName].reopen({
      attributeBindings: ['dataTest:data-test'],
      dataTest: null,
    });
  });

}

export default {
  name: 'test-attributes',
  initialize: initialize
};
