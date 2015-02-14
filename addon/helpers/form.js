import defaultFor from 'ember-easy-form-extensions/utils/default-for';
import wrapBuffer from 'ember-easy-form-extensions/utils/wrap-buffer';

export default function(options) {
  var validate = options.hash.validate;
  var className = defaultFor(options.hash.class, 'form');
  var validateString = validate ? '' : ' novalidate';

  var open = '<form class="' + className + '"' + validateString + '>';
  var close = '</form>';

  return wrapBuffer(open, close, options, this);
}
