import Ember from 'ember';
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

window.statusChangeCallback = function(response)  {
  window.console.log('statusChangeCallback:', response)
}
window.checkLoginState = function() {
  FB.getLoginStatus(function(response) {
    window.console.log('FB.getLoginStatus: ', response)
    window.statusChangeCallback(response);
  });
}


export default Controller.extend({
  session: service(),
  fb: Ember.inject.service(),
  actions: {
    authenticate_fb: function () {
      const _this = this

      this.get('fb').getLoginStatus().then(function(response) {
        const authResponse = response.authResponse
        window.console.log('status: ', response.status)
        switch(response.status) {
          case 'connected': {
            // the person is logged into Facebook, and has logged into your app
            const authenticator = 'authenticator:jwt';
            _this.get('session')
            .authenticate(authenticator, authResponse)
            // .then(function(response){ window.console.log('authenticate with fb then', response)})
            .catch((reason)=>{
              _this.set('errorMessage', reason.error || reason);
            }) // catch
            break;
          }
          case 'not_authorized': {
            // the person is logged into Facebook, but has not logged into your app
            break;
          }
          case 'unknown': {
            // the person is not logged into Facebook, so you don't know if they've logged into your app
            // or FB.logout() was called before and therefore, it cannot connect to Facebook

            break;
          }
        }
      }).catch(function(error){
        window.console.log('error: ', error)
      });
    },
    authenticate: function(credentials) {
      const authenticator = 'authenticator:jwt';
      this.get('session')
          .authenticate(authenticator, credentials)
          // .then(function(response){ window.console.log('authenticate then', response)})
          .catch((reason)=>{
            window.console.log('error reason: ', reason)
            this.set('errorMessage', reason.error || reason);
          });
    }
  }
});
