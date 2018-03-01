import Ember from 'ember';
import Component from '@ember/component';

const { service } = Ember.inject;

export default Component.extend({
  session: service('session'),


  actions: {
    submit(){
      let creds = this.getProperties('identification', 'password');
      // console.log(this.get(this, '_triggerAuthenticate'))
      // this.get('_triggerAuthenticate')(creds);
      window.console.log('creds: ',creds)
      this.attrs.triggerAuthenticate(creds);
    },
    authenticate_fb(){
      this.attrs.triggerAuthenticateFB();
    }
 }
});