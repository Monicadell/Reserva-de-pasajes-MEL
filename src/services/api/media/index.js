/**
 * Import Dependency
 */
import axios from '../../../interceptor'

/**
 * Declare Variable
 */
const baseUrl = 'http://localhost:8888/'
const media = `${baseUrl}/api/v1/media`

/**
 * Export
 */
export default {
  get (data) {
    return axios.get(media)
  }
}
