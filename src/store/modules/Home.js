/**
 * Declare
 */
const state = {
  menuOptions: [
    {
      menu: 0,
      text: 'login'
    },
    {
      menu: 1,
      text: 'signup'
    },
    {
      menu: 2,
      text: 'forgotpassword'
    }
  ],
  menuSelection: {
    menu: 0,
    text: 'login'
  }
}

const getters = {
  menuSelection: state => state.menuSelection
}

const actions = {
  set_menu ({commit}, menu) {
    commit('SET_MENU', menu)
  }
}

const mutations = {
  SET_MENU: (state, {menu}) => {
    state.menuSelection = state.menuOptions[menu]
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
