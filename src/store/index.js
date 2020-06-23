import Vue from 'vue'
import Vuex from 'vuex'
import Experts from './Experts'
import dr from './Deliveryrecord'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    username:'',
    usergrade:'',
    thisname:'',
    userrealname:'',
    thisusergrade:''

  },
  mutations: {

    set_username: (state, username) => {
      state.username = username
      console.log( state.username)
    },
    set_thisusergrade: (state, thisusergrade) => {
      state.thisusergrade = thisusergrade
      console.log( state.thisusergrade)
    },
    set_userrealname: (state, userrealname) => {
      state.userrealname = userrealname
      console.log( state.userrealname)
    },
    set_usergrade: (state, usergrade) => {
      state.usergrade = usergrade
      console.log( state.usergrade)
    },
    set_thisname: (state, thisname) => {
      state.thisname = thisname
      console.log( state.thisname)
    }
  },
  actions: {
  },
  modules: {
    Experts,
    dr,
  }
})
