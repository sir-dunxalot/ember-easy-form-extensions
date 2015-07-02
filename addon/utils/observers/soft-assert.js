/**
Checks whether a property is present on a class and shows a warning to the developer when it is not. In production environments this does nothing.

Options can be pased as a second parameter:

```js
Ember.Component.extend({
  checkForDescription: softAssert('descriptions', {
    eventName: 'didInsertElement', // Defaults to 'init'
    onTrue: function() {
      this.set('hasCorrectProperties', true);
    },
    onFalse: function() {
      this.set('hasCorrectProperties', false);
    }
  });
});
```

@method Utils.computed.softAssert
@param {String} dependentKey The name of the Ember property to observe
@param {Object} options An object containing options for your assertion
*/

import defaultFor from '../default-for';
import Ember from 'ember';
// import ENV from '../../config/environment';

var macro;

// TODO
// if (ENV.environment === 'development') {

  macro = function(dependentKey, options) {
    var eventName;

    options = defaultFor(options, {});
    eventName = defaultFor(options.eventName, 'init');

    return Ember.on(eventName, Ember.observer(dependentKey, function() {
      var value = defaultFor(this.get(dependentKey), '');
      var constructor;

      if (!value) {
        constructor = this.get('constructor').toString();

        Ember.warn(
          'You failed to pass a ' + dependentKey +' property to ' + constructor
        );

        if (options.onTrue) {
          options.callbacks.onTrue().bind(this);
        }
      } else if (options.onFalse) {
        options.callbacks.onFalse().bind(this);
      }
    }));
  };
// } else {
//   macro = Ember.K
// }

export default macro;
