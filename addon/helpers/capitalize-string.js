import Ember from 'ember';

export function capitalizeString(params) {
  const string = params[0];

  return Ember.String.capitalize(string);
}

export default Ember.HTMLBars.makeBoundHelper(capitalizeString);
