import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  facebook_id: DS.attr('string'),
  email: DS.attr('string'),
  password: DS.attr('string'),
  passwordConfirmation: DS.attr('string')
});
