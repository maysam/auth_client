import { inject as service } from '@ember/service';
import RSVP from 'rsvp';
import { isEmpty } from '@ember/utils';
import Service from '@ember/service';

export default Service.extend({
  session: service('session'),
  store: service(),

  loadCurrentUser() {
    return new RSVP.Promise((resolve, reject) => {
      window.console.log('loadCurrentUser: ', this.get('session'))
      const token = this.get('session.data.authenticated.token');
      window.console.log('token: ', token)
      if (isEmpty(token)) {
        resolve()
      } else {
        return this.get('store').findRecord('user', 'current-user').then((user) => {
          this.set('account', user);
          resolve();
        }, reject);
      }
    });
  }
});