<template>
  <v-container grid-list-md text-xs-center>
    <h2 class="font-weight-medium">Estado de tickets hoy</h2>
    <v-layout row wrap class="contiene-estadotickets">
      <!-- <v-flex qualHMWrap> -->
        <div class="cantidades positivas text-xs-center">
          <p class="font-weight-regular pt-2">Reservados</p>
          <p class="display-1 grey--darken">80</p>
        </div>
        <div class="cantidades positivas text-xs-center">
          <p class="font-weight-regular pt-2">Confirmados</p>
          <p class="display-1 grey--darken">30</p>
        </div>

        <div class="cantidades positivas text-xs-center">
          <p class="font-weight-regular pt-2">Impresos</p>
          <p class="display-1 grey--darken">10</p>
        </div>

        <div class="cantidades positivas text-xs-center">
          <p class="font-weight-regular pt-2">Abordados</p>
          <p class="display-1 grey--darken">4</p>
        </div>

        <div class="cantidades negativas text-xs-center">
          <p class="font-weight-regular pt-2">Anulados propios</p>
          <p class="display-1 grey--darken">1</p>
        </div>
        
        <div class="cantidades negativas text-xs-center">
          <p class="font-weight-regular pt-2">Anulados terceros</p>
          <p class="display-1 grey--darken">3</p>
        </div>
        <div class="cantidades negativas text-xs-center">
          <p class="font-weight-regular pt-2">Expirados</p>
          <p class="display-1 grey--darken">20</p>
        </div>

        <div class="cantidades negativas text-xs-center">
          <p class="font-weight-regular pt-2">No impreso</p>
          <p class="display-1 grey--darken">1.050</p>
        </div>
      <!-- </v-flex> -->
      
      <v-flex xs12 md12 xl12 justify-center>
        <!-- Gráfico ocupacion -->
        <ocupacion />
      </v-flex>
      <!-- <v-flex xs4 md4 xl4> -->
        <!-- Ranking servicios -->
        <!-- <ranking-servicios />
      </v-flex> -->
      
      <v-flex xs12 md12 xl12 justify-center>
        <!-- Gráfico ocupacion por tramo de servicios del dia actual -->
        <ocupacion-tramos />
      </v-flex>
      <!-- <v-flex xs6> -->
        <!-- cant Tickets por dia, en el ultimo mes -->
        <!-- <reservas-solicitadas />
      </v-flex> -->
    </v-layout>
  </v-container>
  
</template>

<script>
  import API from '@pi/app'
  import moment from 'moment'
  // import {mapGetters} from 'vuex'
  import {Chart} from 'highcharts-vue'
  import Ocupacion from './Ocupacion'
  import OcupacionTramos from './OcupacionTramos'
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
      OcupacionTramos: OcupacionTramos,
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
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    margin-right: 5px;
  }
  .cantidades.negativas {
    /* border: 1px solid #646464; */
    background-color: rgba(125, 125, 125, 0.1);
  }
  .cantidades.positivas {
    /* border: 1px solid #d84d14; */
    background-color: rgba(241, 102, 45, 0.1);
  }
  .cantidades:last-child {
    margin-right: 0;
  }
  .grey--darken {
    color: #757575;
  }
</style>
