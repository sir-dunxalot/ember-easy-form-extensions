import Ember from 'ember';

export function initialize(container, app) {
  app.inject('component', 'easyForm', 'service:easy-form');
}

export default {
  name: 'easy-form',
  initialize: initialize
};
