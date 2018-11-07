/**
 * Import Dependency
 */
import axios from '../../interceptor'
import EndPoint from '../../endpoints'
/**
 * Declare Variable
 */
const url = EndPoint.base
const base = `${url}/vuelos_anf`

/**
 * Export
 */
export default {
  get () {
    return axios.get(base)
  }
}
