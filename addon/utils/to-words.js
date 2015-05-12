export default function(string) {
  var underscored = Ember.String.underscore(string);
  var spaced = underscored.split('_').join(' ');

  return spaced.replace('.', ' ');
}
