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
  servicesList: [],
  ruta: [], // almacena la ruta a la cual se va a buscar el pasaje
  listaServicios: [], // tiene los servicios disponibles en una ruta para una fecha especifica
  cargandoPeticion: false
}

const getters = {
  current: state => state.search,
  changed: state => state.change,
  service: state => state.service,
  selected: state => state.selected,
  ruta: state => state.ruta,
  listaServicios: state => state.listaServicios,
  cargandoPeticion: state => state.cargandoPeticion
  
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
    commit('SET_DATE', {search: payload.search, direction: payload.direction})
  },
  set_ruta ({commit}, payload) {
    commit('SET_RUTA', {ruta: payload.ruta})
  },
  set_listaServicios ({commit}, payload) {
    commit('SET_LISTASERVICIOS', {listaServicios: payload.listaServicios})
  },
  set_cargandoPeticion({commit}, payload) {
    commit('SET_CARGANDOPETICION', {cargandoPeticion: payload.cargandoPeticion})
  },


}

const mutations = {
  SELECT_SERVICE: (state, {selected}) => {
    state.selected = selected
  },
  SET_SERVICE: (state, {service}) => {
    state.service = service
  },
  SET_PLACE: (state, {search, direction}) => {
    console.log(search)
    state.search[direction].place = search
    state.change = !state.change
  },
  SET_DATE: (state, {search, direction}) => {
    state.search[direction].date = search
    state.change = !state.change
  },
  SET_RUTA: (state, {ruta}) => {
    state.ruta = ruta
  },
  SET_LISTASERVICIOS: (state, {listaServicios }) => {
    state.listaServicios = listaServicios
  },
  SET_CARGANDOPETICION: (state, {cargandoPeticion }) => {
    state.cargandoPeticion = cargandoPeticion
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
