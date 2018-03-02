// import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import config from '../config/environment';
// const { RSVP: { Promise }, $: { ajax }, run } = Ember;
import { Promise } from 'rsvp';
import { run } from '@ember/runloop';
import { isEmpty } from '@ember/utils';
// import { ajax } from '@ember/ajax';
import $ from 'jquery'

export default Base.extend({
  restore(data) {
    return new Promise((resolve, reject) => {
      if (!isEmpty(data.token)) {
        resolve(data);
      } else {
        reject();
      }
    });
  },
  authenticate(creds) {
    const { identification, password } = creds;
    let data = JSON.stringify({
      auth: {
        email: identification,
        password
      }
    });
    let tokenEndpoint = `${config.host}/user_token`;
    if (creds.accessToken) {
      // fb login
      tokenEndpoint = `${config.host}/fb_login`
      data = JSON.stringify({ auth: creds });
    }

    const requestOptions = {
      url: tokenEndpoint,
      type: 'POST',
      data,
      contentType: 'application/json',
      dataType: 'json'
    };
    return new Promise((resolve, reject) => {
      $.ajax(requestOptions).then((response) => {
        const { jwt } = response;
        // Wrapping aync operation in Ember.run
        run(() => {
          resolve({
            token: jwt
          });
        });
      }, (error) => {
        // Wrapping aync operation in Ember.run
        run(() => {
          reject(error);
        });
      });
    });
  },
  invalidate(data) {
    return Promise.resolve(data);
  }
});