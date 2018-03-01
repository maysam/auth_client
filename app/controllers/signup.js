import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  session: service('session'),

  actions: {
    save(user){
      user.save().then(()=>{
        var credentials = {identification: user.get('email'), password: user.get('password')},
          authenticator = 'authenticator:jwt';

        this.get('session').authenticate(authenticator, credentials).catch((reason)=>{
          this.set('errorMessage', reason.error || reason);
        });
      }).catch((adapterError) => {
        window.console.log(adapterError)
        if (adapterError.errors) {
          this.set('errorMessage', adapterError.errors)
        }
      })
    }
  }
});