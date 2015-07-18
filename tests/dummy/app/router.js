import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {

  this.route('fruit', function() {
    this.route('form');
    this.route('model-path');
  });

});

export default Router;
