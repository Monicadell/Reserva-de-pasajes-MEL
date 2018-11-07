/**
 * Import Dependency
 */
import axios from '../../interceptor'
import EndPoint from '../../endpoints'
/**
 * Declare Variable
 */
const url = EndPoint.weather
const base = `${url}/`

const appid = '9102a4feeadaa85b29a90589463b1209'
const iconUrl = 'http://openweathermap.org/img/w/'

/**
 * Export
 */
export default {
  get (params) {
    return axios.get(base, {
      params: {...params, appid}
    })
  },
  iconUrl: iconUrl
}
