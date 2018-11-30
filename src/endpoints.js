const base = 'https://mel-1-backend.gestsol.cl'
// const base = 'http://192.168.11.146:4000'
const port = '88'
const media = 'covers'

export default {
  base: base,
  media: `${base}:${port}/${media}/`,
  weather: 'https://api.openweathermap.org/data/2.5/weather',
  //app: 'https://mel-2-backend.gestsol.cl/api'
  app: 'http://192.168.11.146:4000/api'
}
