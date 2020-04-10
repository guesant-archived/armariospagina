const state = {
  options: {
    preview: true,
    prefetch: true
  }
}

// getters
const getters = {
}

// actions
const actions = {
  loadOptions({ commit }) {
    const options = JSON.parse(localStorage.setItem('options') || '{}');

    commit('setOptions', options);
  },
  saveOptions({ state }) {
    localStorage.setItem('options', JSON.stringify(state.options))
  },
  updateOption({ commit, dispatch }, {option, value}){
    commit('setOption', { option, value });
    dispatch('saveOptions');
  }
}

// mutations
const mutations = {
  setOptions(state, value) {
    state.options = value;
  },
  setOption(state, { option, value }) {
    state.options[option] = value;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}