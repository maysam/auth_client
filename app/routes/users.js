import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    // return this.store.findAll('user');
    return ['Marie Curie', 'Mae Jemison', 'Albert Hofmann'];
  }
});
