<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs3>
        <div class="cantidades text-xs-center">
          <p class="font-weight-bold pt-2">Nº tickets solicitados</p>
          <p class="display-2 secondary--text">{{ticketstotales}}</p>
        </div>
      </v-flex>
      <v-flex xs3>
        <div class="cantidades text-xs-center">
          <p class="font-weight-bold pt-2">Nº tickets impresos</p>
          <p class="display-2 secondary--text">{{ticketsconfimados}}</p>
        </div>
      </v-flex>
      <v-flex xs3>
        <div class="cantidades text-xs-center">
          <p class="font-weight-bold pt-2">Total de usuarios</p>
          <p class="display-2 secondary--text">{{totalusuarios}}</p>
        </div>
      </v-flex>
      <v-flex xs3>
        <div class="cantidades text-xs-center">
          <p class="font-weight-bold pt-2">Usuarios conectados el último día</p>
          <p class="display-2 secondary--text">{{usuariosUltimoDia}}</p>
        </div>
      </v-flex>
      
      <v-flex xs8 md8 xl8>
        <!-- Gráfico ocupacion -->
        <ocupacion />
      </v-flex>
      <v-flex xs4 md4 xl4>
        <!-- Ranking servicios -->
        <ranking-servicios />
      </v-flex>
      
      <v-flex xs6>
        <!-- Gráfico users conectados por dia el ultimo mes -->
        <conectados />
      </v-flex>
      <v-flex xs6>
        <!-- cant Tickets por dia, en el ultimo mes -->
        <reservas-solicitadas />
      </v-flex>
    </v-layout>
  </v-container>
  
</template>

<script>
  import API from '@pi/app'
  import moment from 'moment'
  // import {mapGetters} from 'vuex'
  import {Chart} from 'highcharts-vue'
  import Ocupacion from './Ocupacion'
  import Conectados from './Conectados'
  import ReservasSolicitadas from './ReservasSolicitadas'
  import RankingServicios from './RankingServicios'

  export default {
    data () {
      return {
        ticketstotales: 0,
        ticketsconfimados: 0,
        totalusuarios: 0,
        usuariosUltimoDia: 0,
        users: [],
        chartOptions: {
          series: [{
            data: [1, 2, 3] // sample data
          }]
        }
      }
    },
    components: {
      highcharts: Chart,
      Ocupacion: Ocupacion,
      Conectados: Conectados,
      ReservasSolicitadas: ReservasSolicitadas,
      RankingServicios: RankingServicios
    },
    mounted () {
      this.getTickets()
      this.getUsers()
    },
    methods: {
      async getTickets () {
        try {
          const tickets = await API.get('tickets')
          if (tickets.status >= 200 && tickets.status < 300) {
            console.log('reservas ', tickets)
            // setTimeout(() => {
            this.ticketstotales = tickets.data.data.length
            this.ticketsconfimados = tickets.data.data.filter(item => item.checkin_at !== null).length
            // }, 500)
          } else {
            console.log('Error al obtener tickets', tickets)
            // this.$swal({
            //   customClass: 'modal-info',
            //   type: 'error',
            //   title: 'Reservas',
            //   timer: 2000,
            //   text: 'Ha ocurrido un error al obtener las reservas',
            //   animation: true,
            //   showCancelButton: true,
            //   showConfirmButton: false,
            //   cancelButtonText: 'OK'
            // })
          }
        } catch (e) {
          console.log('Error catch al obtener tickets', e.response)
          // this.$swal({
          //   customClass: 'modal-info',
          //   type: 'error',
          //   title: 'Reservas',
          //   timer: 2000,
          //   text: 'Ha ocurrido un error al obtener las reservas',
          //   animation: true,
          //   showCancelButton: true,
          //   showConfirmButton: false,
          //   cancelButtonText: 'OK'
          // })
        }
      },
      async getUsers (params) {
        try {
          let usuarios = await API.get('users', params)
          if (usuarios.status >= 200 && usuarios.status < 300) {
            console.log('usuarios', usuarios.data)
            setTimeout(() => {
              const ayer = moment().subtract(24, 'h').format()
              this.users = usuarios.data.data
              this.totalusuarios = usuarios.data.total_entries
              this.usuariosUltimoDia = this.users.filter(item => item.last_connection >= ayer).length
              // this.pagination.page = usuarios.data.page_number
              // this.pagination.rowsPerPage = usuarios.data.page_size
              // this.pagination.total_pages = usuarios.data.total_pages
              // this.loading = false
            }, 500)
          }
        } catch (e) {
          console.log('catch err', e.response)
          this.$swal({
            customClass: 'modal-info',
            type: 'error',
            title: 'Ha ocurrido un error',
            text: 'Ha ocurrido un inconveniente al obtener los usuarios del sistema, intente nuevamente.',
            animation: true,
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonText: 'Cerrar'
          })
        }
      }
    }
  }
</script>

<style>
  .cantidades {
    border: 1px solid gray;
    background-color: #fff;
    max-width: 80%;
    margin: 0 auto;
  }
</style>
