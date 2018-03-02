import { inject as service } from '@ember/service';
import RSVP from 'rsvp';
import { isEmpty } from '@ember/utils';
import Service from '@ember/service';

export default Service.extend({
  session: service('session'),
  store: service(),

  loadCurrentUser() {
    return new RSVP.Promise((resolve, reject) => {
      const token = this.get('session.data.authenticated.token');
      if (isEmpty(token)) {
        resolve()
      } else {
        return this.get('store').queryRecord('user', {me: true}, token).then((user) => {
          this.set('account', user);
          resolve();
        }, reject);
      }
    });
  }
});