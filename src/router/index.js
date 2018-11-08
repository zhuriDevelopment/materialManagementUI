import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/views/Hello';
import Home from '@/views/Home';
import MtrInfo from '@/views/MtrInfo';
import MtrTypeModify from '@/views/MtrTypeModify';
import Warehouse from '@/views/Warehouse/Warehouse';
import WarehouseUsage from '@/views/Warehouse/Usage';
import WarehouseAdjust from '@/views/Warehouse/Adjust';
import WarehouseAssembly from '@/views/Warehouse/Assembly';
import WarehouseSplit from '@/views/Warehouse/Split';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: '/materialmanagement',
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
    {
      path: '/MtrTypeModify',
      name: 'MtrTypeModify',
      component: MtrTypeModify,
    },
    {
      path: '/Warehouse',
      name: 'Warehouse',
      component: Warehouse,
    },
    {
      path: '/WarehouseUsage',
      name: 'WarehouseUsage',
      component: WarehouseUsage,
    },
    {
      path: '/WarehouseAdjust',
      name: 'WarehouseAdjust',
      component: WarehouseAdjust,
    },
    {
      path: '/WarehouseAssembly',
      name: 'WarehouseAssembly',
      component: WarehouseAssembly,
    },
    {
      path: '/WarehouseSplit',
      name: 'WarehouseSplit',
      component: WarehouseSplit,
    }
  ],
});
