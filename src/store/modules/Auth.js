/**
 * Declare Variable
 */
const state = {
  isAuthorized: false,
  user: null,
  credential: null,
  role: null,
  username: null,
  useremail: null
}
const getters = {
  isAuthorized: state => state.isAuthorized,
  user: state => state.user,
  credential: state => state.credential,
  username: state => state.username,
  useremail: state => state.useremail,
  role: state => state.role,
}
const actions = {
  login ({commit}, payload) {
    // console.log('action login')
    commit('LOGIN_SUCCESS', {user: payload.user, credential: payload.credential})
  },
  login ({commit}, payload) {
    // console.log('action login')
    commit('LOGIN_SUCCESS', {user: payload.user, credential: payload.credential})

  },
  setData ({commit}, payload) {
    commit('SET_USER_ADDONS', {
      role: payload.role,
      username: payload.username,
      useremail: payload.useremail
    })
  },
  logout ({commit}) {
    commit('LOGOUT')
  }
}
const mutations = {
  LOGIN_SUCCESS (state, {user, credential}) {
    // console.log('login success', user, credential)
    state.isAuthorized = true
    state.user = user
    state.credential = credential
  },
  SET_USER_ADDONS: (state, {role, username, useremail}) => {
    state.role = role
    state.username = username
    state.useremail = useremail
  },
  LOGOUT (state) {
    state.isAuthorized = false
    state.user = ''
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
