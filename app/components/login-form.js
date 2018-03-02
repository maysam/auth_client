import Ember from 'ember';
import Component from '@ember/component';

const { service } = Ember.inject;

export default Component.extend({
  session: service('session'),

  actions: {
    submit(){
      let creds = this.getProperties('identification', 'password');
      this.attrs.triggerAuthenticate(creds);
    },
    authenticate_fb(){
      this.attrs.triggerAuthenticateFB();
    }
 }
});