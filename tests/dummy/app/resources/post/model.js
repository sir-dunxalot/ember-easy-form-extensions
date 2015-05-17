import DS from 'ember-data';
import Ember from 'ember';

var attr = DS.attr;

var PostModel = DS.Model.extend({
  category: attr('string'),
  description: attr('string'),
  published: attr('boolean'),
  title: attr('string'),
  views: attr('number'),
  writtenOn: attr('date'),
});

PostModel.reopenClass({
  FIXTURES: [
    {
      id: 1,
      category: 'ember',
      description: 'This is an introduction on how to Ember. Wow.',
      published: true,
      title: 'How to Ember',
      views: 100,
      writtenOn: moment().subtract(2, 'days')
    }, {
      id: 2,
      category: 'rails',
      description: 'This is an introduction on how to Rails. Wow.',
      published: false,
      title: 'How to Rails',
      views: 0,
      writtenOn: moment().subtract(7, 'days')
    }
  ]
});

export default PostModel;
