<template>
  <v-container fill-height fluid>
    <v-layout fill-height>
      <v-flex xs6>
        <span class="headline">{{name}}</span>
      </v-flex>
      <v-flex xs6 class="text-xs-right">
        <span class="headline">{{temp}} <img :src="icon" alt=""></span>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import API from '@pi/weather'

  export default {
    data: () => ({
      icon: '',
      temp: '-'
    }),
    props: ['lat', 'lon', 'name'],
    methods: {
      async getWeather () {
        let weather = await API.get({lat: this.lat, lon: this.lon, units: 'metric'})
        if (weather.status >= 200 && weather.status < 300) {
          this.temp = (weather.data.main.temp ? weather.data.main.temp : '-') + 'º C'
          this.icon = API.iconUrl + (weather.data.weather[0] ? weather.data.weather[0].icon : '') + '.png'
        }
      }
    },
    mounted () {
      this.getWeather()
    }
  }
</script>

<style lang="stylus" scoped>

</style>
