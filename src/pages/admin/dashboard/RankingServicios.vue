<template>
  <v-card class="transparent_card">
    <v-card-title primary-title>
      <h5 class="mb-0">Ranking de servicios - Hoy</h5>
    </v-card-title>
    <v-divider light></v-divider>
    <v-card-title class="pa-0">
      <table class="width100">
        <tr v-for="(service, index) in services" :class="{grey_row: index % 2 === 0}">
          <td class="pl-2 text-xs-left">
            {{service.name}}
          </td>
          <td class="text-xs-center">
            <b>{{service.cars}}</b>
          </td>
        </tr>
      </table>
    </v-card-title>
  </v-card>
</template>

<script>
  import API from '@pi/app'
  // import moment from 'moment'

  export default {
    data: () => ({
      services: []
    }),
    mounted () {
      this.getServices()
    },
    methods: {
      async getServices () {
        try {
          let servicios = await API.get('services')
          if (servicios.status >= 200 && servicios.status < 300) {
            // Falta filtrar qe sean los servicios de hoy, o proximas 24 h
            this.services = servicios.data.data.filter(item => item.hrs_left > 0).sort((prev, next) => next.cars - prev.cars)
            console.log('servicios', this.services)
          }
        } catch (e) {
          console.log('error al cargar servicios ranking', e.response)
          console.log('catch err', e.response)
        }
      }
    }
  }
</script>

<style lang="stylus">
  div.transparent_card.card
    background-color rgba(250, 250, 250, 0.8)
    height 100%
    color #000
  .grey_row
    background-color: rgba(160, 160, 160, .41)
  .width100
    width 100%
</style>
∫