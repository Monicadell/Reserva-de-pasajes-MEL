/**
 * Import Dependency
 */
import axios from '../../interceptor'
import endpoints from '../../endpoints'
/**
 * Declare Variable
 */
const url = endpoints.app
const base = `${url}/`

/**
 * Export
 */

export default {
  get (urlget, params) {
    console.log(base + urlget, params)

    return axios.get(base + urlget, {
      params: {...params}
    })

  },
  post (urlpost,  params) {
    console.log(base + urlpost, {...params})
    return axios.post(base + urlpost, {...params})
  },
  put (urlput, id, params) {
    return axios.put(base + urlput + '/' + id , {...params})
  },
  delete (urldel,  id) {
    console.log('elimina', id, base)
    return axios.delete(base + urldel + '/' + id)
  }
}
