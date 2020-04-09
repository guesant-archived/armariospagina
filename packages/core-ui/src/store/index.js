import Vue from 'vue'
import Vuex from 'vuex'
import settings from './modules/settings'
import gallery from './modules/gallery'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    gallery,
    settings,
  },
  strict: debug
})
