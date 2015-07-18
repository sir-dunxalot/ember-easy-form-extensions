import Ember from 'ember';

export default Ember.Object.create({
  color: 'yellow',
  description: 'A big yellow fruit with leaves',
  isTropical: true,
  name: 'Pinapple',
  numberOfSeeds: 70,
  writtenOn: moment('1995-12-25'),
});
