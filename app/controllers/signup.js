import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  session: service('session'),

  actions: {
    save(user){
      const _this = this
      user.save().then(()=>{
        const credentials = {identification: user.get('email'), password: user.get('password')};
        const authenticator = 'authenticator:jwt';

        this.get('session').authenticate(authenticator, credentials)
        .catch((error)=>{
          _this.set('errorMessage', [{detail: error.statusText}]);
        });
      }).catch((adapterError) => {
        if (adapterError.errors) {
          _this.set('errorMessage', adapterError.errors)
        } else {
          _this.set('errorMessage', [{detail: adapterError.statusText}]);
        }
      })
    }
  }
});