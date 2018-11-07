/**
 * Declare Variable
 */
const state = {
  isAuthorized: false,
  email: ''
}
const getters = {
  isAuthorized: state => state.isAuthorized,
  email: state => state.email
}
const actions = {
  login ({commit}, payload) {
    commit('LOGIN_SUCCESS', payload)
  },
  logout ({commit}) {
    commit('LOGOUT')
  }
}
const mutations = {
  LOGIN_SUCCESS (state, {email}) {
    state.isAuthorized = true
    state.email = email
  },
  LOGOUT (state) {
    state.isAuthorized = false
    state.email = ''
  }
}

/**
 * Export
 */
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
