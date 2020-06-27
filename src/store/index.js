import Vue from 'vue'
import Vuex from 'vuex'
import Experts from './Experts'
import dr from './Deliveryrecord'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    username:'',
    usergrade:''

  },
  mutations: {

    set_username: (state, username) => {
      state.username = username
      console.log( state.username)
    },
    set_usergrade: (state, usergrade) => {
      state.usergrade = usergrade
      console.log( state.usergrade)
    }
  },
  actions: {
  },
  modules: {
    Experts,
    dr
  }
})
