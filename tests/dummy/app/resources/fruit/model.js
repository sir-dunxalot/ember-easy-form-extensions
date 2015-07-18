import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
  color: attr('string', {
    defaultValue() {
      return 'orange';
    }
  }), // Select
  numberOfSeeds: attr('number', {
    defaultValue() {
      return 10;
    }
  }),
  description: attr('string'), // Textarea
  isTropical: attr('boolean', {
    defaultValue() {
      return false;
    }
  }),
  name: attr('string'),
  pickedOn: attr('date', {
    defaultValue() {
      return moment('2008-06-24').toDate();
    }
  }),
});
