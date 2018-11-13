<template>
  <v-container fill-height fluid  style="padding: 10px; align-self: center">
    <v-layout fill-height style="">
      <v-flex xs6  style="align-self: center">
        <span class="headline">{{name}}</span>
      </v-flex>
      <v-flex xs6 class="text-xs-right"  style="">
        <span class="headline"  style="vertical-align: sub">{{temp}} </span>
        <img :src="icon" alt="" style="vertical-align: middle">
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

<style scoped>

</style>
