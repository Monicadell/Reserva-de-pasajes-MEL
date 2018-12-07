/**
 * Declare Variable
 */
const state = {
  isAuthorized: false,
  user: null,
  credential: null,
  role: null,
  username: null,
  useremail: null,
  userid: null,
  hidesidebar: false
}
const getters = {
  isAuthorized: state => state.isAuthorized,
  user: state => state.user,
  credential: state => state.credential,
  username: state => state.username,
  useremail: state => state.useremail,
  role: state => state.role,
  userid: state => state.userid,
  hidesidebar: state => state.hidesidebar
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
      useremail: payload.useremail,
      userid: payload.userid
    })
  },
  logout ({commit}) {
    commit('LOGOUT')
  },
  hide ({commit}, payload) {
    // console.log('commit a hide', payload)
    commit('HIDE', {
      hidesidebar: payload.hide
    })
  }
}
const mutations = {
  LOGIN_SUCCESS (state, {user, credential}) {
    // console.log('login success', user, credential)
    state.isAuthorized = true
    state.user = user
    state.credential = credential
  },
  SET_USER_ADDONS: (state, {role, username, useremail, userid}) => {
    state.role = role
    state.username = username
    state.useremail = useremail
    state.userid = userid
  },
  LOGOUT (state) {
    state.isAuthorized= false
    state.user = null
    state.credential = null
    state.role = null
    state.username = null
    state.useremail = null
  },
  HIDE (state, {hidesidebar}){
    // console.log('muta hide', hidesidebar)
    state.hidesidebar = hidesidebar
  },
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
