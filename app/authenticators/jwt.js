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
    window.console.log('restore: ', data)
    return new Promise((resolve, reject) => {
      if (!isEmpty(data.token)) {
        resolve(data);
      } else {
        reject();
      }
    });
  },
  authenticateFB(creds) {
    const url = `${config.host}/fb_login`
    window.console.log('authenticate FB: ', creds)
    // const { accessToken, userID } = creds;
    const data = JSON.stringify({ auth: creds });
    const requestOptions = {
      url: url,
      type: 'POST',
      data,
      contentType: 'application/json',
      dataType: 'json'
    };
    return new Promise((resolve, reject) => {
      $.ajax(requestOptions).then((response) => {
        window.console.log('fb posting success', response)
        const { jwt } = response;
        window.console.log('fb jwt: ', jwt)
        // Wrapping aync operation in Ember.run
        run(() => {
          resolve({
            token: jwt
          });
        });
      }, (error) => {
        window.console.log('fb posting error', error)
        // Wrapping aync operation in Ember.run
        run(() => {
          reject(error);
        });
      });
    });
  },
  authenticate(creds) {
    if (creds.accessToken)
      return this.authenticateFB(creds)
    window.console.log('authenticate: ', creds)
    const { identification, password } = creds;
    const data = JSON.stringify({
      auth: {
        email: identification,
        password
      }
    });
    const tokenEndpoint = `${config.host}/user_token`;
    const requestOptions = {
      url: tokenEndpoint,
      type: 'POST',
      data,
      contentType: 'application/json',
      dataType: 'json'
    };
    return new Promise((resolve, reject) => {
      $.ajax(requestOptions).then((response) => {
        window.console.log('posting success', response)
        const { jwt } = response;
        window.console.log('jwt: ', jwt)
        // Wrapping aync operation in Ember.run
        run(() => {
          resolve({
            token: jwt
          });
        });
      }, (error) => {
        window.console.log('posting error', error)
        // Wrapping aync operation in Ember.run
        run(() => {
          reject(error);
        });
      });
    });
  },
  invalidate(data) {
    window.console.log('invalidate: ', data)
    return Promise.resolve(data);
  }
});