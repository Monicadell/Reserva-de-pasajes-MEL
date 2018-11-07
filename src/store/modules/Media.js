/**
 * Import Dependency
 */
import MOCK_DATA from '@pi/media/MOCK_DATA_G.json'

/**
 * Declare
 */
const state = {
  movies: [],
  tvSeries: [],
  genres: []
}

const getters = {
  Media: state => state.tvSeries.concat(state.movies),
  Movies: state => state.movies,
  TvSeries: state => state.tvSeries,
  Genres: state => state.genres,
  MovieByGender (state, getters, rootState, rootGetters) {
    return state.movies.filter(item => {
      return item.genre.includes(rootGetters['UserPreferences/Movies'].genre)
    })
  },
  TvSeriesByGender (state, getters, rootState, rootGetters) {
    return state.tvSeries.filter(item => {
      return item.genre.includes(rootGetters['UserPreferences/TvSeries'].genre)
    })
  }
}

const actions = {
  delete_media ({commit}) {
    commit('DELETE_MEDIA')
  },
  loadMedia ({commit}) {
    try {
      let movies = MOCK_DATA.filter(m => m.type)
      let tvSeries = MOCK_DATA.filter(m => !m.type)
      let genres = (MOCK_DATA.map(m => m.genre.split('|'))).join().split(',')
      genres = [...new Set(genres)].sort()
      commit('SET_MEDIA', {
        movies: movies,
        tvSeries: tvSeries,
        genres: genres
      })
      return Promise.resolve(MOCK_DATA)
    } catch (e) {
      console.log(e)
      return Promise.reject(e)
    }
  }
}

const mutations = {
  DELETE_MEDIA: (state) => {
    state.media = []
    state.movies = []
    state.tvSeries = []
    state.genres = []
  },
  SET_MEDIA: (state, {movies, tvSeries, genres}) => {
    state.movies = movies
    state.tvSeries = tvSeries
    state.genres = genres
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
