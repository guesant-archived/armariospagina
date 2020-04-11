import * as armarios from '@/lib/armarios'

const state = {
  preview: '',
  message: '',
  selectedTemplate: {
    data: {
      base: '',
      sources: []
    },
    sources: []
  }
}

// getters
const getters = {
  dataSources(state) {
    if (state.selectedTemplate.data) {
      return state.selectedTemplate.data.sources || [];
    }
    return [];
  },
  sources(state) {
    return state.selectedTemplate.sources || [];
  },
}

// actions
const actions = {
  async preview({ rootState, state, commit }) {
    commit('setMessage', 'Gerando preview...');

    const options = {
      template: state.selectedTemplate.data,
      sources: state.selectedTemplate.sources,
    }
    return await (armarios[rootState.settings.options.canvas ? 'canvasRender' : 'serverRender'])(options)
      .then(img => commit('setPreview', img))
      .then(() => commit('setMessage', ''))
      .catch(() => {
        commit('setMessage', 'Houve um erro na geração do preview')
      });
  },
  async autoPreview({ dispatch, rootState }) {
    if (rootState.settings.options.preview) {
      await dispatch('preview')
    }
  },
  loadTemplate({ commit, state, dispatch }, templateData) {
    commit('changeTemplate', { data: typeof templateData === 'string' ? JSON.parse(templateData) : templateData })

    commit('changeTemplate', {
      data: state.selectedTemplate.data,
      sources: Array(state.selectedTemplate.data.sources.length).fill('')//.map(() => ('blanco'))
    })
    dispatch('preview');
  },
  resetTemplate({ commit }) {
    commit('changeTemplate', { data: false })
  },
  async updateSources({ commit, state, dispatch }, sources) {
    commit('changeTemplate', { data: state.selectedTemplate.data, sources })
    await dispatch('autoPreview');
  },
}

// mutations
const mutations = {
  changeTemplate(state, t) {
    state.selectedTemplate = t;
  },
  setPreview(state, preview) {
    state.preview = preview;
  },
  setMessage(state, message) {
    state.message = message;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}