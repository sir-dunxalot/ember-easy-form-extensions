import DS from 'ember-data';
import Ember from 'ember';

var attr = DS.attr;

var PostModel = DS.Model.extend({
  title: attr('string'),
  description: attr('string')
});

PostModel.reopenClass({
  FIXTURES: [
    {
      id: 1,
      title: 'How to Ember',
      description: 'This is an introduction on how to Ember. Wow.'
    }
  ]
});

export default PostModel;
