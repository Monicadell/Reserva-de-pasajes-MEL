const base = 'http://ec2-34-236-97-74.compute-1.amazonaws.com:4000'
const port = '88'
const media = 'covers'

export default {
  base: base,
  media: `${base}:${port}/${media}/`,
  weather: 'https://api.openweathermap.org/data/2.5/weather',
  app: 'https://mel-2-backend.gestsol.cl/api'
}
