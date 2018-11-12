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
  get (url, params) {
    return axios.get(base + '/' + url, {
      params: {...params}
    })
  }
}
