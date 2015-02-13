// import Ember from 'ember';
import wrapBuffer from 'ember-easy-form-extensions/utils/wrap-buffer';

export default function(options) {
  var validate = options.hash.validate;

  var validateString = validate ? '' : ' novalidate';

  var open = '<form class="form"' + validateString + '>';
  var close = '</form>';

  return wrapBuffer(open, close, options, this);
}
