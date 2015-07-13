import Ember from 'ember';

/* like click() but runs asyncrously allowing you to
use it outside of an andThen function with the same
stuff in the DOM */

export default Ember.Test.registerAsyncHelper('asyncClick',
  function(app, name) {
    click(inspect(name));
  }
);
