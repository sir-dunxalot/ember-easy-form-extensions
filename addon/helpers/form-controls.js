import Ember from 'ember';
import wrapBuffer from 'ember-easy-form-extensions/utils/wrap-buffer';

export default function(options) {
  var legend = options.hash.legend;

  Ember.assert(
    'You must pass a legend (description) to the form-controls helper like {{#form-controls legend=\'Create a new thing\'}}',
    legend && Ember.typeOf(legend) === 'string'
  );

  var open = '<fieldset class="controls"><legend>' + legend + '</legend>';
  var close = '</fieldset>';

  return wrapBuffer(open, close, options, this);
}
