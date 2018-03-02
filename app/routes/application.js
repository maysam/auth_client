import Ember from 'ember';
import Route from '@ember/routing/route';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import { isEmpty } from '@ember/utils';
const { service } = Ember.inject;
import Configuration from 'ember-simple-auth/configuration';

export default Route.extend(ApplicationRouteMixin, {
  sessionAccount: service('session-account'),
  fb: Ember.inject.service(),
  session: Ember.inject.service('session'),
  routeAfterAuthentication: 'login',
  beforeModel() {
    this.get('fb').FBInit();
    return this._loadCurrentUser();
  },

  sessionInvalidated() {
    if (!Ember.testing) {
      if (this.get('_isFastBoot')) {
        this.transitionTo(Configuration.authenticationRoute);
      } else {
        window.location.replace(Configuration.authenticationRoute);
      }
    }
  },

  model() {
    this._loadCurrentUser();
  },

  sessionAuthenticated() {
    const token = this.get('session.data.authenticated.token');
    Promise.resolve(!isEmpty(token))

    this._loadCurrentUser().then(()=>{
        this.transitionTo('/');
      }).catch((err) => {
        this.get('session').invalidate()
      }
    );
  },

  _loadCurrentUser() {
    return this.get('sessionAccount').loadCurrentUser();
  },

  actions: {
    invalidateSession: function() {
      this.get('session').invalidate()
    }
  }
});