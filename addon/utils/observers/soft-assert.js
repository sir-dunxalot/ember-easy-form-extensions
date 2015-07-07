/**
Checks whether a property is present on a class and shows a warning to the developer when it is not.

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

import Ember from 'ember';
import defaultFor from '../default-for';

export default function softAssert(dependentKey, options = {}) {
  const eventName = defaultFor(options.eventName, 'init');

  return Ember.on(eventName, function() {
    const value = defaultFor(this.get(dependentKey), '');

    if (!value) {
      const constructor = this.get('constructor').toString();

      Ember.warn(
        'You failed to pass a ' + dependentKey +' property to ' + constructor
      );

      if (options.onTrue) {
        options.callbacks.onTrue().bind(this);
      }
    } else if (options.onFalse) {
      options.callbacks.onFalse().bind(this);
    }
  });
};
