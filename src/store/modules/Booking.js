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
  cargandoPeticion: false,
  reservaRealizada: false,
  servicioSeleccionado: {}, // almaceno el servicio seleccionado en la tabla List -> solo para mostrar el detalle. 
  fechaSeleccionada: '',
  anular: false,    // maneja esta visible del modal anular
  servicioAnular: {}, // almaceno el servicio seleccionado para ser anulado
  actualizarReservas: false, // variable para refrescar la vista de las reservas del usuario cada vez que se haga una reserva nueva o se cancele alguna
  confirmar: false, //  maneja estado visible del modal confirmar ticket
  servicioConfirmar: {}, // almaceno el servicio seleccionado para ser confirmado
  e1: 1, // pasos del step
  detalle: false,  //  maneja estado visible del modal confirmar ticket
  servicioDetalle: {}, // almaceno el servicio seleccionado para mostrar detalle
  estadoTickete: ' ', // almacena el estado del servicio seleccionado para mostrar el detalle -> no se guarda directamente en servicioDetalle para hacer la logica antes de que se muestre el componente
}

const getters = {
  current: state => state.search,
  changed: state => state.change,
  service: state => state.service,
  selected: state => state.selected,
  ruta: state => state.ruta,
  listaServicios: state => state.listaServicios,
  cargandoPeticion: state => state.cargandoPeticion,
  reservaRealizada: state => state.reservaRealizada,
  servicioSeleccionado: state => state.servicioSeleccionado,
  fechaSeleccionada: state => state.fechaSeleccionada,
  anular: state => state.anular,
  servicioAnular: state => state.servicioAnular,
  actualizarReservas: state => state.actualizarReservas,
  confirmar: state => state.confirmar,
  servicioConfirmar: state => state.servicioConfirmar,
  e1: state => state.e1,
  detalle: state => state.detalle,
  servicioDetalle: state => state.servicioDetalle,
  estadoTickete: state => state.estadoTickete
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
  set_reservaRealizada ({commit}, payload) {
    commit ('SET_RESERVAREALIZADA', {reservaRealizada: payload.reservaRealizada})
  }, 
  set_servicioSeleccionado ({commit}, payload) {
   // console.log(`seleccionaron el servicio ${payload}`)
    commit ('SET_SERVICIOSELECCIONADO', {servicioSeleccionado: payload.servicioSeleccionado})
  }, 
  set_fechaSeleccionada({commit}, payload) {
    commit ('SET_FECHASELECCIONADA', {fechaSeleccionada: payload.fechaSeleccionada})
  },
  set_anular({commit}, payload) {
    commit('SET_ANULAR', {anular: payload.anular})
  },
  set_servicioAnular ({commit}, payload) {
    commit('SET_SERVICIOANULAR', {servicioAnular: payload.servicioAnular})
  },
  set_actualizarReservas ({commit}, payload) {
    commit('SET_ACTUALIZARRESERVAS', {actualizarReservas: payload.actualizarReservas})
  },
  set_confirmar({commit}, payload) {
    console.log(payload)
    commit('SET_CONFIRMAR', {confirmar: payload.confirmar})
  },
  set_servicioConfirmar ({commit}, payload) {
    commit('SET_SERVICIOCONFIRMAR', {servicioConfirmar: payload.servicioConfirmar})
  },
  set_e1 ({commit}, payload) {
    commit('SET_E1', {e1: payload.e1})
  },
  set_detalle ({commit}, payload) {
    commit('SET_DETALLE', {detalle: payload.detalle})
  },
  set_servicioDetalle ({commit}, payload) {
    commit('SET_SERVICIODETALLE', {servicioDetalle: payload.servicioDetalle})
  },
  set_estadoTickete({commit}, payload) {
    commit('SET_ESTADOTICKETE', {estadoTickete: payload.estadoTickete})
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
  SET_RESERVAREALIZADA: (state, {reservaRealizada}) => {
    state.reservaRealizada = reservaRealizada
  },
  SET_SERVICIOSELECCIONADO: (state, {servicioSeleccionado}) => {
    state.servicioSeleccionado = servicioSeleccionado
  },
  SET_FECHASELECCIONADA: (state, {fechaSeleccionada}) => {
    state.fechaSeleccionada = fechaSeleccionada
  },
  SET_ANULAR: (state, {anular}) => {
    state.anular = anular
  },
  SET_SERVICIOANULAR: (state, {servicioAnular}) => {
    state.servicioAnular = servicioAnular
  },
  SET_ACTUALIZARRESERVAS: (state, {actualizarReservas}) => {
    state.actualizarReservas = actualizarReservas
  },
  SET_CONFIRMAR: (state, {confirmar}) => {
    state.confirmar = confirmar
  },
  SET_SERVICIOCONFIRMAR: (state, {servicioConfirmar}) => {
    state.servicioConfirmar = servicioConfirmar
  },
  SET_E1: (state, {e1}) => {
    state.e1 = e1
  },
  SET_DETALLE: (state, {detalle}) => {
    state.detalle = detalle
  },
  SET_SERVICIODETALLE: (state, {servicioDetalle}) => {
    state.servicioDetalle = servicioDetalle
  },
  SET_ESTADOTICKETE: (state, {estadoTickete}) => {
    state.estadoTickete = estadoTickete
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
