/**
 * Import Dependency
 */
import axios from '../../interceptor'
import EndPoint from '../../endpoints'
/**
 * Declare Variable
 */
const url = EndPoint.app
const base = `${url}/`

/**
 * Export
 */

export default {
  get (urlget, params) {
    return axios.get(base + urlget, {
      params: {...params}
    })
  },
  post (urlpost,  params) {
    return axios.post(base + urlpost, {...params})
  },
  put (urlput, id, params) {
    return axios.put(base + urlput + '/' + id , {...params})
  },
  delete (urldel,  id) {
    console.log('elimina', id)
    return axios.delete(base + urldel + '/' + id)
  }
}
