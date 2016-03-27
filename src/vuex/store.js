import Vue from 'vue'
import Vuex from 'vuex'
import {
  SET_INITIAL_FILE
} from './mutation-types'

// Make vue aware of vuex
Vue.use(Vuex)

// We create an object to hold the initial state when
// the app starts up
const initialFile = {
  fileName: '未命名文档'
}
const state = {
  initialFile
}

// Create an object storing various mutations. We will write the mutation
const mutations = {
  SET_INITIAL_FILE(state, file) {
    state.initialFile = file
  }
}

// We combine the intial state and the mutations to create a vuex store.
// This store can be linked to our app.
export default new Vuex.Store({
  state,
  mutations
})
