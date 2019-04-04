import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Login from '@/components/Login';
import Dashboard from '@/components/Dashboard';
//ASSETS
import Assets from '@/components/assets/All';
import NewAsset from '@/components/assets/Create';
import EditAsset from '@/components/assets/Edit';
import AssetView from '@/components/assets/AssetView';
import AssetTypes from '@/components/assets/AssetTypes';
import NewAssetType from '@/components/assets/NewAssetType';
import NewSupport from '@/components/assets/SupportNew';
import NewValuation from '@/components/assets/ValuationNew';
import Insurancefirms from '@/components/insurancefirms/All';
import NewInsurancefirm from '@/components/insurancefirms/Create';
//TPS
import Tps from '@/components/tps/All';
import NewTps from '@/components/tps/Create';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
    },
    {
      path: '/assets',
      name: 'Assets',
      component: Assets
    },
    {
      path: '/asset/:assetId',
      name: 'ViewAsset',
      component: AssetView
    },
    {
      path: '/assets/new',
      name: 'New Asset',
      component: NewAsset
    },
    {
      path: '/assets/edit',
      name: 'Edit Asset',
      component: EditAsset
    },
    {
      path: '/assets/types',
      name: 'AssetTypes',
      component: AssetTypes
    },
    {
      path: '/assets/types/new',
      name: 'NewAssetType',
      component: NewAssetType
    },
    {
      path: '/assets/support',
      name: 'NewSupport',
      component: NewSupport
    },
    {
      path: '/assets/valuation',
      name: 'NewValuation',
      component: NewValuation
    },
    {
      path: '/tps',
      name: 'Tps',
      component: Tps
    },
    {
      path: '/tps/new',
      name: 'Tps',
      component: NewTps
    },
    {
      path: '/insurancefirms',
      name: 'Insurances',
      component: Insurancefirms
    },
    {
      path: '/insurancefirms/new',
      name: 'NewInsurance',
      component: NewInsurancefirm
    },
  ],
});
