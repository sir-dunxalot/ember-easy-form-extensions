import Ember from 'ember';

export function initialize(/* container, application */) {

  Ember.Component.reopen({
    attributeBindings: ['dataTest:data-test'],
    dataTest: null,
  });

}

export default {
  name: 'components',
  initialize: initialize
};
