var String = Ember.String;

export default function(string) {
  return String.capitalize(String.underscore(string).split('_').join(' '));
}
