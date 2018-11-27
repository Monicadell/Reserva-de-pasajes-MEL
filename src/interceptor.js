/**
 * Import Dependency
 */
import axios from 'axios'
import store from './store'

/**
 * Config
 */
// axios.defaults.timeout = 5000

axios.interceptors.request.use(config => {
  var credential = store.getters['Auth/credential'];
  var isAuthorize = store.getters['Auth/isAuthorized'];

  if (credential && isAuthorize) {
    config.headers.common['Authorization'] = 'Bearer ' + credential;
  }
  return config;
}, error => {
  console.group('[Axios][Interceptor] Request Error');
  console.log(error);
  console.groupEnd();
  return Promise.reject(error);
});

axios.interceptors.response.use(function(data) {
  return data;
}, error => {
  console.group('[Axios][Interceptor] Response Error');

  console.log(error);
  console.groupEnd();
  return Promise.reject(error);
});

export default axios
