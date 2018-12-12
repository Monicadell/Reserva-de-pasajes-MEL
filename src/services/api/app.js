/**
 * Import Dependency
 */
import axios from '../../interceptor'
import endpoints from '../../endpoints'
// import store from '../../store'
/**
 * Declare Variable
 */
const url = endpoints.app
const base = `${url}/`
// let credential = store.getters['Auth/credential']
/**
 * Export
 */

export default {
  get (urlget, params) {
    // console.log('get algo', base + urlget, params)
    return axios.get(base + urlget, {
      params: {...params}
    })
  },
  post (urlpost, params) {
    console.log(base + urlpost, {...params})
    return axios.post(base + urlpost, {...params})
  },
  put (urlput, id, params) {
    return axios.put(base + urlput + '/' + id, {...params})
  },
  delete (urldel, id) {
    console.log('elimina', id, base)
    return axios.delete(base + urldel + '/' + id)
  },
  postNoRest (url, id, url2) {
    const request = `${base}${url}/${id}/${url2}`
    console.log(request)
    return axios.post(request)
  },
  deleteNoRest (url, id, url2) {
    const request = `${base}${url}/${id}/${url2}`
    console.log(request)
    return axios.delete(request)
  },
  patchNoRest (url, id, url2) {
    const request = `${base}${url}/${id}/${url2}`
    console.log(request)
    return axios.patch(request)
  }
}
