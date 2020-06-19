import Vue from 'vue'
import Vuex from 'vuex'
import Experts from './Experts'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    username:'',
    usergrade:''

  },
  mutations: {
    // updateCoursePage(state,name,grade) {
    //   console.log(name);
    //   console.log(grade);
    //   state.username = name;
    //   state.usergrade=grade;
    // }
  },
  actions: {
  },
  modules: {
    Experts,

  }
})
