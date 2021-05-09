import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { vuexfireMutations } from 'vuexfire'
import auth from './auth'
import loading from './loading'
import logs from './logs'
import user from './user'
import notes from './notes'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */
let store = null
export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      auth,
      loading,
      logs,
      user,
      notes
    },
    mutations: {
      ...vuexfireMutations
    },
    plugins: [
      createPersistedState({
        key: 'quasar-projects-storage',
        paths: ['auth.user']
      })
    ],
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })
  store = Store
  return Store
}

export { store }
