/**
 * Declare
 */
import axios from 'axios'


const state = {

    freqStart: new Date().toISOString().substring(0, 10),
    freqEnd: new Date().toISOString().substring(0, 10)

}

const getters = {
  start: state => state.freqStart,
  end: state => state.freqEnd
  // changed: state => state.change,
  
}

const actions = {


  set_start ({commit}, payload) {
    commit('SET_START', {freqStart: payload.freqStart, direction: payload.direction})
  },
  set_end ({commit}, payload) {
    commit('SET_END', {freqEnd: payload.freqEnd, direction: payload.direction})
  }
}

const mutations = {
 
  SET_START: (state, {freqStart}) => {
    console.log(freqStart)
    state.freqStart = freqStart
  },
  SET_END: (state, {freqEnd}) => {
    console.log(freqEnd)
    state.freqEnd = freqEnd
  }
  // SET_DATE: (state, {search, direction}) => {
  //   state.search[direction].date = search
  // }
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
