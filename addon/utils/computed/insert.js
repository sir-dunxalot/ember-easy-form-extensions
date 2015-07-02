import Ember from 'ember';

/**
Example usage:

```
App.SomeController = Em.Controller.extend({
  type: 'MultipleChoice',
  questionController: Utils.computed.insert('type', 'App.{{value}}QuestionController')
});
```

`this.get('questionController')` will now return `App.MultipleChoiceQuestionController`.

@method Utils.insert
@param {String} dependentKey The name of the Ember property to observe
@param {String} string The string to insert the value of `dependentKey` into
@return A string equal to `string` but with `{{value}}` replaced by the value of `dependentKey`
*/

export default function(dependentKey, string) {
  return function() {
    const inCorrectFormat = string.indexOf('{{value}}') > -1;

    Ember.assert('You must pass a string in the format "Some stuff {{value}}" as the second argument of Utils.computed.insert', inCorrectFormat);

    return string.replace('{{value}}', this.get(dependentKey));
  }.property(dependentKey);
}
