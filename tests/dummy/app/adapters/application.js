import DS from 'ember-data';

export default DS.FixtureAdapter.extend({
  simulateRemoteResponse: false,

  /**
  By default, Ember Data does not implement a method with which to query features. Thus, we have to add it ourselves.

  @todo Return single object if only one record is found
  */

  queryFixtures: function(records, query /*, type */) {
    return records.filter(function(record) {
      for (var key in query) {
        var value;

        if (!query.hasOwnProperty(key)) {
          continue;
        }

        value = query[key];

        if (record[key] !== value) {
          return false;
        }
      }
      return true;
    });
  }
});
