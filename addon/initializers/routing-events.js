import Ember from 'ember';

export function initialize(/* container, app */) {

  /**
  @class Ember.Controller
  @submodule controllers
  */

  Ember.Controller.reopen(
    Ember.Evented, {

  });

  /**
  @class Ember.Route
  @submodule routes
  */

  Ember.Route.reopen({

    /**
    @ISSUE https://github.com/emberjs/ember.js/issues/5394
    */

    _actions: {

      /**
      Adds the `routeDidTransition` event to the route's controller. The event will trigger everytime the router has finished transitioning into the route - it triggers on the route that has been transitioned into, not the previous route. Thus, it can be used to reliably reset controller properties on 'page load'. For example:

      ```
      App.SomeController = Em.ObjectController.extend({
        templateChosen: false,

        resetTemplateChosen: function() {
          this.set('templateChosen', false);
        }.on('routeDidTransition'),
      });
      ```

      Also triggers `didTransition` on this route so methods can run on the `didTransition` event without overwriting this action.

      @event didTransition
      @return true so the action bubbles
      */

      didTransition: function() {
        this.get('controller').trigger('routeDidTransition');

        return true; // So action bubbles
      },

      /**
      Adds the `routeWillTransition` event to the route's controller. This event will trigger when the user is about to navigate away from the current route. Thus, it can be used to manually remove observers, tear down methods, undo changes, etc.

      Also triggers `willTransition` on this route so methods can run on the `willTransition` event without overwriting this action.

      @event willTransition
      @return true so the action bubbles
      */

      willTransition: function() {
        this.get('controller').trigger('routeWillTransition');

        return true; // So action bubbles
      }
    }
  });

}

export default {
  name: 'routing-events',
  initialize: initialize
};
