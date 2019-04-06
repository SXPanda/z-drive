import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default,
    },
    {
      path: '/explorer',
      name: 'explorer',
      component: require('@/components/pages/explorer/Explorer').default,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
