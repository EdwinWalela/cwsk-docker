import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex,axios);

export const store = new Vuex.Store({
  state: {
    baseURL:'192.168.99.100:5000',
    // baseURL: 'http://cwsk-api.herokuapp.com',
    //baseURL: 'http://localhost:3000',
    token: '',
    isAuth: false,
    test: 'testing',
    assettypes: null,
    tps: null,
    assets: null
  },
  actions: {
    fetchAssetTypes({commit,state}){
      axios.get(state.baseURL + '/types', { headers: { 'Authorization': "bearer " + state.token }})
      .then(response => {
        if(response.status == 200){
          commit('set_types',response.data.types);
          //console.log(response.data.types);
        }
      })
      .catch(e => {
        console.log(e.response);
      })
    },
    fetchTps({commit,state}){
      axios.get(state.baseURL+'/tps', { headers: { 'Authorization': "bearer " + state.token }})
      .then(response => {
        if(response.status == 200){
          commit('set_tps',response.data.tps);
        }
      })
      .catch(e => {
        console.log( e.response );
        if(e.response.status== 401){
        }
      })
    },
    fetchAssets({commit,state}){
      axios.get(state.baseURL+'/assets', { headers: { 'Authorization': "bearer " + state.token }})
      .then(response => {
        if(response.status == 200){
          commit('set_assets',response.data.assets);
        }
      })
      .catch(e => {
        console.log( e.response );
        if(e.response.status== 401){
        }
      })
    }
  },
  mutations: {
    updateKey(state , newKey) {
      state.token = newKey;
    },
    updateAuth(state, status) {
      state.isAuth = status;
    },
    set_tps(state,tps) {
      state.tps = tps;
    },
    set_types(state,types) {
      state.assettypes = types;
    },
    set_assets(state,assets) {
      state.assets = assets;
    }
  }
});
