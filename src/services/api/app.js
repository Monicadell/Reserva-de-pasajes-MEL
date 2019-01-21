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
    console.log('get algo', base + urlget, params)
    return axios.get(base + urlget, {
      params: {...params}
    })
  },
  getgrid (urlget, id, param) {
    console.log('getgrid')
    console.log('get grid', base + urlget + '/' + id + param)
    return axios.get(base + urlget + '/' + id + param)
  },
  post (urlpost, params) {
    console.log(base + urlpost, {...params})
    return axios.post(base + urlpost, {...params})
  },
  put (urlput, id, params) {
    return axios.put(base + urlput + '/' + id, {...params})
  },
  patch (urlpatch, params) {
    console.log('patch', base + urlpatch, {...params})
    return axios.patch(base + urlpatch, {...params})
  },
  delete (urldel, id) {
    console.log('elimina', id, base)
    return axios.delete(base + urldel + '/' + id)
  },
  postNoRest (url, id, url2, params) {
    const request = `${base}${url}/${id}/${url2}`
    console.log(request, {...params})
    return axios.post(request, {...params})
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
