/**
 * Import Dependency
 */
import axios from 'axios'
import storeauth from './store/modules/Auth'
import { mapGetters } from 'vuex'

/**
 * Config
 */
axios.defaults.timeout = 5000

axios.interceptors.request.use(config => {
  let sp =  {...mapGetters({auth: ['Auth/credential']})}
  // console.log('sp', sp.auth)
  let credential = storeauth.getters.credential
  console.log('credencia interceptor', credential)
  // let isAuthorize = store.state.isAuthorize
  let isAuthorize = storeauth.isAuthorize
  if (credential && isAuthorize) {
    console.log('tiene credencia y es autorizado')
    config.headers.common['Authorization'] = 'Bearer ' + credential
  }
  return config
}, error => {
  console.group('[Axios][Interceptor] Request Error')
  console.log(error)
  console.groupEnd()
  return Promise.reject(error)
})

axios.interceptors.response.use(data => {
  return data
}, error => {
  console.group('[Axios][Interceptor] Response Error')
  console.log(error)
  console.groupEnd()
  return Promise.reject(error)
})

export default axios
