import Vue from 'vue'
import Vuex from 'vuex'
import generator from './modules/generator'
import settings from './modules/settings'
import gallery from './modules/gallery'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    gallery,
    settings,
    generator
  },
  strict: debug
})
