import Ember from 'ember';

export default function(string) {
  const underscored = Ember.String.underscore(string);
  const spaced = underscored.split('_').join(' ');

  /* Replace dots then remove double spaces */

  return spaced.replace(/\./g, ' ').replace(/ +(?= )/g,'');
}
