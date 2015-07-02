import Ember from 'ember';

export default function(string) {
  const underscored = Ember.String.underscore(string);
  const spaced = underscored.split('_').join(' ');

  return spaced.replace('.', ' ');
}
