import DS from 'ember-data';
import Ember from 'ember';

var attr = DS.attr;

var PostModel = DS.Model.extend({
  title: attr('string'),
  description: attr('string')
});

PostModel.reopen({
  FIXTURES: Ember.A()
});

export default PostModel;
