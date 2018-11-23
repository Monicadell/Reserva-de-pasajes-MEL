/**
 * Import Dependency
 */
import axios from '../../interceptor'
import endpoints from '../../endpoints'
/**
 * Declare Variable
 */
const url = endpoints.base
const base = `${url}/vuelos_anf`

/**
 * Export
 */
export default {
  get () {
    return axios.get(base)
  }
}
