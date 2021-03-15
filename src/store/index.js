import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn:false,
  },
  mutations: {
    CHANGE_LOGIN(state,payload){
      state.isLoggedIn=payload;
    },
  },
  actions: {
  change_login(store,payload){
      store.commit('CHANGE_LOGIN',payload);
    },
  }
})
