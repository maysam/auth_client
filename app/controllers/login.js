import Ember from 'ember';
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  session: service(),
  fb: Ember.inject.service(),
  actions: {
    authenticate_fb: function () {
      const _this = this
      const loginToFacebook = function() {
        _this.get('fb')
        .login("public_profile,email,name")
        .then(processFacebookLogin)
        .catch(function(error){
          if(error.statusText) {
            _this.set('errorMessage', [{ detail: error.statusText }])
          }
        })
      }
      const processFacebookLogin = function(response) {
        const authResponse = response.authResponse
        switch(response.status) {
          case 'connected': {
            // the person is logged into Facebook, and has logged into your app
            const authenticator = 'authenticator:jwt';
            _this.get('session')
              .authenticate(authenticator, authResponse)
              .catch((error)=>{
                _this.set('errorMessage', [{detail: error.statusText}]);
              }) // catch
            break;
          }
          case 'not_authorized': {
            // the person is logged into Facebook, but has not logged into your app
            _this.set('errorMessage', [{detail: response.status}]);
            loginToFacebook()
            break;
          }
          case 'unknown': {
            // the person is not logged into Facebook, so you don't know if they've logged into your app
            // or FB.logout() was called before and therefore, it cannot connect to Facebook
            _this.set('errorMessage', [{detail: response.status}]);
            loginToFacebook()
            break;
          }
        }
      }
      this.get('fb').getLoginStatus(true).then(processFacebookLogin).catch(function(error){
        _this.set('errorMessage', [{detail: error.statusText}]);
        loginToFacebook()
      })
    },
    authenticate: function(credentials) {
      const authenticator = 'authenticator:jwt';
      const _this = this;
      this.get('session')
        .authenticate(authenticator, credentials)
        .catch((error)=>{
          _this.set('errorMessage', [{detail: error.statusText}]);
        });
    }
  }
});
