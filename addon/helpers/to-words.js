import Ember from 'ember';

export function toWords(params) {
  var string = params[0];

  return string.underscore().split('_').join(' ').capitalize();
}

export default Ember.HTMLBars.makeBoundHelper(toWords);
