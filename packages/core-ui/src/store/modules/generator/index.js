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
  async preview({ state, commit }) {
    commit('setMessage', 'Gerando preview...');
    const { default: armariosCore } = await import(/* webpackPrefetch: true */ '@armariospagina/core');

    return armariosCore({
      template: state.selectedTemplate.data,
      sources: state.selectedTemplate.sources,
      stringRequestLoader: src => {
        console.log('using image loader polyfill...')
        return new Promise((resolve, reject) => {
          const image = new Image;
          image.crossOrigin = 'Anonymous';
          image.addEventListener('load', () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = image.naturalWidth;
            canvas.height = image.naturalHeight;
            ctx.drawImage(image, 0, 0);
            canvas.toBlob(blob => {
              return resolve(URL.createObjectURL(blob));
            }, 'image/png', 0.95);
          }, false);
          image.addEventListener('error', reject);
          image.src = src;
        });
      },
    })
      .then(image => image.getBase64Async('image/jpeg'))
      .then(b64 => commit('setPreview', b64))
      .then(() => commit('setMessage', ''))
      .catch(r => {
        console.log(r);
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
      sources: Array(state.selectedTemplate.data.sources.length).fill('').map(() => ([1, 1, '#FFFF']))
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