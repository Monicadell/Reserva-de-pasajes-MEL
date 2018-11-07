/**
 * Import Dependency
 */
import i18n from '../../locales'

/**
 * Declare
 */
const state = {
  language: ''
}

const getters = {

}

const actions = {
  switchI18n ({commit}, language) {
    commit('SET_LANGUAGE', {language: language})
  }
}

const mutations = {
  SET_LANGUAGE: (state, {language}) => {
    state.language = language
    i18n.locale = language
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
