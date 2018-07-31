import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/views/Hello';
import Home from '@/views/Home';
import MtrInfo from '@/views/MtrInfo';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/MtrInfo/:id',
      name: 'MtrInfo',
      component: MtrInfo,
    },
  ],
});
