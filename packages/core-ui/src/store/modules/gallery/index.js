import unfetch from 'unfetch';
const VUE_APP_GALLERY_URL = process.env;
const state = {
  awsinfo: {
    templates: {
      lastItem: 0
    },
    sources: {
      lastItem: 0
    },
    pngFiles: []
  },
  pagination: {
    itemsPerPage: 12,
    templates: {
      currentPage: 1,
      files: []
    },
    sources: {
      currentPage: 1,
      files: []
    }
  }
}

// getters
const getters = {
  lastPage: state => {
    return (resource) => Math.ceil(state.awsinfo[resource].lastItem / state.pagination.itemsPerPage)
  }
}

// actions
const actions = {
  async loadInfo({ commit, dispatch }) {
    await commit('setInfo', await unfetch(`${VUE_APP_GALLERY_URL}/info.json`).then(r => r.json()))

    await dispatch('changePage', { resource: 'templates', page: 1 })
    await dispatch('changePage', { resource: 'sources', page: 1 })
  },
  async loadBaseFiles({ commit, state }, { resource }) {
    const resourceInfo = state.awsinfo[resource];
    const resourcePagn = state.pagination[resource];
    const resourcePath = `gallery/${resource}`;
    const resourcePrefix = ({ templates: 'base-', sources: 'source-' })[resource];

    const listUpTo = resourceInfo.lastItem;
    const { currentPage } = resourcePagn;

    commit('setResourceFiles', {
      resource,
      files: Array(state.pagination.itemsPerPage).fill('')
    })

    Array(listUpTo)
      .fill('')
      .map((_, index) => index)
      .slice((currentPage - 1) * state.pagination.itemsPerPage, (currentPage-1) * state.pagination.itemsPerPage + state.pagination.itemsPerPage)
      .map(index => `${resourcePrefix}${index + 1}`)
      .map(fileName => ([fileName, resource === 'templates' ? 'png' : state.awsinfo.pngFiles.includes(fileName) ? 'png' : 'jpg']))
      .map(([fileName, ext]) => `${VUE_APP_GALLERY_URL}/${resourcePath}/${fileName}.${ext}`)
      .forEach((url, index) => commit('setResourceFile', { resource, url, index }));
  },
  async changePage({ commit, dispatch }, { resource, page }) {
    await commit('setCurrentPage', { resource, page });
    await dispatch('loadBaseFiles', { resource });
  }
}

// mutations
const mutations = {
  setInfo(state, info) {
    state.awsinfo = info;
  },
  setCurrentPage(state, { resource, page }) {
    state.pagination[resource].currentPage = page;
  },
  setResourceFiles(state, { resource, files }) {
    state.pagination[resource].files = files;
  },
  setResourceFile(state, { resource, url, index }) {
    state.pagination[resource].files[index] = url;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
