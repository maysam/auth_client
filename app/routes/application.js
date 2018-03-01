import Ember from 'ember';
import Route from '@ember/routing/route';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import { isEmpty } from '@ember/utils';

const { service } = Ember.inject;

export default Route.extend(ApplicationRouteMixin, {
  sessionAccount: service('session-account'),
  fb: Ember.inject.service(),

  beforeModel() {
    this._loadCurrentUser();
    return this.get('fb').FBInit();
  },

  beforeModelOld() {
    return this._loadCurrentUser();
  },

  model() {
    return this.get('fb').api('/me');
  },

  sessionAuthenticated() {
    const token = this.get('session.data.authenticated.token');
    Promise.resolve(!isEmpty(token))

    this._loadCurrentUser().then((u)=>{
      window.console.log('_loadCurrentUser then ', u)
      // this.transitionTo('/');
    }).catch((err) => {
      window.console.log('_loadCurrentUser err ', err)
      // this.get('session').invalidate()
    }
    );
  },

  _loadCurrentUser() {
    return this.get('sessionAccount').loadCurrentUser();
  },

  actions: {
    invalidateSession: function() {
        this.get('session').invalidate();
    }
  }
});