import DS from 'ember-data';
import Ember from 'ember';

var attr = DS.attr;

var PostModel = DS.Model.extend({
  title: attr('string'),
  description: attr('string'),
  category: attr('string'),
  views: attr('number'),
  published: attr('boolean')
});

PostModel.reopenClass({
  FIXTURES: [
    {
      id: 1,
      title: 'How to Ember',
      description: 'This is an introduction on how to Ember. Wow.',
      category: 'ember'
    }
  ]
});

export default PostModel;
