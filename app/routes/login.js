// import Ember from 'ember';
import Route from '@ember/routing/route';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Route.extend(UnauthenticatedRouteMixin, {

  beforeModel: function(){
    let controller = this.controllerFor(this.routeName);
    controller.set('errorMessage', null)
  }

});