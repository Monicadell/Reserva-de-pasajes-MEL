<template>
  <v-card class="transparent_card">
    <v-card-title primary-title>
      <h3 class="mb-0">Servicios para el tramo: {{tramo[0].name}}</h3>
    </v-card-title>
    <v-divider light></v-divider>
    <v-card-title class="pa-0">
      <table class="width100 elevation-0" v-if="servicesTrip.length > 0">
        <tr>
          <th>Nombre servicio</th>
          <th>Fecha - hora de salida</th>
          <th>Cantidad de buses</th>
        </tr>
        <tr v-for="(service, index) in servicesTrip" :class="{grey_row: index % 2 === 0}">
          <td class="pl-2 text-xs-left">
            {{service.name}}
          </td>
          <td class="pl-2 text-xs-left">
            {{service.date}} - {{service.departure}}
          </td>
          <td class="text-xs-center">
            <b>{{service.cars}}</b>
          </td>
        </tr>
      </table>
      <div v-else class="px-2">No hay servicios para el tramo y fecha actual</div>
    </v-card-title>
  </v-card>
</template>

<script>
  import API from '@pi/app'
  import moment from 'moment'

  export default {
    props: ['tramo'],
    data: () => ({
      services: [],
      servicesTrip: '',
      today: moment().format('YYYY-MM-DD')
    }),
    mounted () {
      console.log('tramo seleccionado:', this.tramo)
      this.getServices()
    },
    watch: {
      tramo (val) {
        console.log('cambia tramo', val)
        this.servicesTrip = this.services.filter(item => (item.trip_id === val[0].id && item.hrs_left > 0 && item.date <= this.today)).sort((prev, next) => next.cars - prev.cars)
      }
    },
    methods: {
      async getServices () {
        try {
          let servicios = await API.get('services')
          if (servicios.status >= 200 && servicios.status < 300) {
            // Falta filtrar qe sean los servicios de hoy, o proximas 24 h
            this.services = servicios.data.data
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