/**
 * Declare
 */
import axios from 'axios'


const state = {
  change: false,
  search: {
    from: {
      date: new Date().toISOString().substring(0, 10),
      place: null
    },
    to: {
      date: new Date().toISOString().substring(0, 10),
      place: null
    }
  },
  selected: false,
  service: {},
  servicesList: []
}

const getters = {
  current: state => state.search,
  changed: state => state.change,
  service: state => state.service,
  selected: state => state.selected
}

const actions = {
  select ({commit}, payload) {
    commit('SELECT_SERVICE', {selected: payload.selected})
  },
  set_service ({commit}, payload) {
    commit('SET_SERVICE', {service: payload.service})
  },
  set_place ({commit}, payload) {
    commit('SET_PLACE', {search: payload.search, direction: payload.direction})
  },
  set_date ({commit}, payload) {
    console.log('aqui hago request')
    axios.get('http://192.168.11.146:4000/api/users')
  .then(function (response) {
    // handle success
    console.log(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
    commit('SET_DATE', {search: payload.search, direction: payload.direction})
  }
}

const mutations = {
  SELECT_SERVICE: (state, {selected}) => {
    state.selected = selected
  },
  SET_SERVICE: (state, {service}) => {
    state.service = service
  },
  SET_PLACE: (state, {search, direction}) => {
    state.search[direction].place = search
    state.change = !state.change
  },
  SET_DATE: (state, {search, direction}) => {
    console.log(state.service)
    state.search[direction].date = search
    state.change = !state.change
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
