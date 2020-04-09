import armariosCore from '@armariospagina/core';

const state = {
  preview: '',
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
}

// actions
const actions = {
  async autoPreview({ state, commit, rootState }) {
    if (rootState.settings.options.preview) {
      await armariosCore({
        template: state.selectedTemplate.data,
        sources: state.selectedTemplate.sources
      })
        .then(image => image.getBase64Async('image/jpeg'))
        .then(b64 => commit('setPreview', b64));
    }
  },
  loadTemplate({ commit }, templateData) {
    commit('changeTemplate', { data: JSON.parse(templateData) })
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
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}