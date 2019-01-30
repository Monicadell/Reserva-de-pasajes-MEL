<template>
  <div class="contiene">
    <v-toolbar card prominent>

      <v-toolbar-title class="body-3 primary--text ml-4">
        Busqueda de servicios
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-layout class="layout-reservas">
      <v-flex xs3>
        <v-navigation-drawer class="navegacion1" v-if="$route.path !== '/reservaterceros'">
          <v-list dense class="pt-0 user">
            <v-toolbar-title class="title-list-custom white--text primary">
              <span class="hidden-sm-and-down ml-4">Mis reservas</span>
            </v-toolbar-title>
            <v-progress-linear :indeterminate="true" v-if="progres"></v-progress-linear>
            <v-divider></v-divider>
            <v-layout v-for="item in items" :key="item.id">
              <v-flex >
                <v-list-tile-content  >
                  <tickets v-bind:item="item" />
                </v-list-tile-content>
              </v-flex>
            </v-layout>
            <div v-if="items.length === 0 && !progres" class=" text-xs-center pt-5">
              <span class="font-weight-bold gris054">No tienes Reservas</span>
            </div>
          </v-list>
        </v-navigation-drawer>

        <!-- reserva terceros -->
        <v-navigation-drawer class="navegacion1" v-if="$route.path === '/reservaterceros'">
          <users-list />
        </v-navigation-drawer>
      </v-flex>

      <v-flex xs7>
        <v-layout align-start justify-center row fill-height id="principal-container">
          <v-flex xs12>
            <v-stepper :value="e1"  class="elevation-0" disabled="true">
              <v-stepper-header >
                <v-stepper-step  :complete="e1 > 1" step="1">Selección de pasajes</v-stepper-step>
                <v-divider></v-divider>

                <v-stepper-step   :complete="e1 > 2" step="2">Selección de itinenario</v-stepper-step>
                <v-divider></v-divider>
                <span v-if="role === 2">
                  <v-stepper-step  :complete="e1 > 3" step="3">Selección de asiento</v-stepper-step>
                  <v-divider></v-divider>
                </span>
                <v-stepper-step  step="Ok">Confirmación</v-stepper-step>
              </v-stepper-header>


              <v-stepper-items>
                <v-stepper-content step="1">
                  <v-layout align-center justify-center row fill-height>
                    <v-flex xs9>
                      <date-place-container v-if="e1 === 1"/>
                    </v-flex>
                  </v-layout>
                </v-stepper-content>

                <v-stepper-content step="2">
                  <v-card
                    class="mb-5"
                    flat
                  >
                    <service-list/>
                  </v-card>
                </v-stepper-content>

                <v-stepper-content step="3" v-if="role === 2 && e1 === 3">
                  <v-card
                    class="mb-5"

                    flat
                  >
                    <!-- Grilla asientos -->
                    <grid :floor="grilla"/>
                      <v-card-actions class="text-xs-center">
                        <v-btn
                          color="primary" outline
                          @click="volverMenu"
                          class="ml-5"
                        >
                          Volver
                        </v-btn>
                        <v-spacer> </v-spacer>
                        <v-btn
                          color="primary"
                          @click="goConfirma"
                          class="ml-5"
                        >
                          Continuar
                        </v-btn>
                      </v-card-actions>
                  </v-card>
                </v-stepper-content>

                <v-stepper-content step="4">
                  <v-card
                    class="mb-5"
                    height="500px"
                    flat
                  >
                    <v-layout align-center justify-space-around column fill-height>
                      <v-flex xs4>
                        <v-card-title >
                          <h3 class="headline primary--text text-lg-center">Tu reserva esta confirmada</h3>
                        </v-card-title>
                      </v-flex>
                      <v-flex xs4 mb-5>
                      <img src="../../../../static/img/Check-RESERVA.png" alt="Smiley face" height="290" width="290">

                      </v-flex>
                      <v-flex xs4>
                        <h3 class="headline primary--text mb-2">Puedes revisar los datos en tu menú lateral izquierdo de reservas</h3>
                        <v-btn
                          color="secondary"
                          @click="volverMenu"
                          class="btn-step3 ml-5"
                        >
                          Volver al menú principal
                        </v-btn>
                      </v-flex>
                    </v-layout>

                  </v-card>

                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
          </v-flex>
        </v-layout>
      </v-flex>

      <!-- Sidebar express -->
      <v-flex xs2>
        <side-bar-express />
      </v-flex>
    </v-layout>

    

    <v-layout row wrap fill-height class="">
      <v-flex xs12 >
        <service-selected/>
      </v-flex>
    </v-layout>

    <v-layout row wrap fill-height class="">
      <v-flex xs12 >
        <ServiceExpress/>
      </v-flex>
    </v-layout>

      <v-layout row wrap fill-height class="">
      <v-flex xs12 >
        <modal-anular/>
      </v-flex>
    </v-layout>


      <v-layout row wrap fill-height class="">
      <v-flex xs12 >
        <modal-confirmar/>
      </v-flex>
    </v-layout>


      <v-layout row wrap fill-height >
      <v-flex xs12 >
        <modal-detalle/>
      </v-flex>
    </v-layout>

  </div>
</template>

<script>
  import PlaceSelector from '@c/PlaceSelector'
  import ServiceDate from '@c/DatePicker'
  import ServiceList from './List'
  import ServiceSelected from './Selected'
  import ServiceExpress from './SelectedExpress'
  import moment from 'moment'
  import MyBooking from './MyBooking'
  import modalAnular from './modalAnular'
  import modalConfirmar from './modalConfirmar'
  import modalDetalle from './modalDetalle'
  import datePlaceContainer from './containerDatePlace'
  import sideBarExpress from './sidebarExpress'
  import Grid from './Grid'
  import tickets from './tickets'
  import {mapGetters} from 'vuex'
  import API from '@pi/app'
  import UsersList from './UsersList'

  export default {
    data () {
      return {
      //  e1: 0,
        items: [],
        currenDate: '',
        tomorrowDate: '',
        loadingDerecha: true,
        hoyHeaders: [
          {text: 'Origen', value: 'origen', sortable: false, align: 'left'},
          {text: 'Destino', value: 'destino', sortable: false, align: 'left'},
          {text: 'Salida', value: 'email', sortable: false, align: 'left'},
          {text: 'Ir', value: '', sortable: false, align: 'center'}],
        hoy: [],
        mananaHeaders: [
          {text: 'Origen', value: 'origen', sortable: false},
          {text: 'Destino', value: 'destino', sortable: false},
          {text: 'Salida', value: 'salida', sortable: false},
          {text: 'Ir', value: '', sortable: false, align: 'center'}],
        manana: [],
        right: null,
        disabledBtn: true,
        progres: true,
        users: [],
        search: ''
      }
    },
    components: {
      PlaceSelector: PlaceSelector,
      ServiceDate: ServiceDate,
      ServiceList: ServiceList,
      ServiceSelected: ServiceSelected,
      MyBooking: MyBooking,
      tickets,
      modalAnular,
      modalConfirmar,
      modalDetalle,
      datePlaceContainer,
      ServiceExpress,
      UsersList,
      Grid,
      sideBarExpress
    },
    computed: {
      ...mapGetters({
        fecha: ['Booking/fechaSeleccionada'],
        ruta: ['Booking/ruta'],
        actualizarReservas: ['Booking/actualizarReservas'],
        select: ['Booking/select'],
        e1: ['Booking/e1'],
        role: ['Auth/role'],
        grilla: ['Booking/grid']
      })
    },
    watch: {
      actualizarReservas () {
        if (this.actualizarReservas) {
          // const porfis = []
          console.log(`debo actaulizar vista reservas ${this.actualizarReservas}`)
          // this.items = Object.assign([], porfis)
          this.getReservas()
          this.$store.dispatch('Booking/set_actualizarReservas', {
            actualizarReservas: false
          })
        }
      },
      e1 (val) {
        console.log('cambio el step', val)
      },
      $route (to, from) {
        console.log('cambia ruta')
        this.$store.dispatch('Booking/set_actualizarReservas', {
          actualizarReservas: true
        })
        this.$store.dispatch('Booking/select', {selected: false})
        this.$store.dispatch('Booking/set_ruta', {ruta: {}})
        this.$store.dispatch('Booking/set_listaServicios', {listaServicios: []})
        this.$store.dispatch('Booking/set_e1', {
          e1: 1
        })
        this.$store.dispatch('Booking/set_grid', {
          grid: {}
        })
        this.$store.dispatch('Booking/set_seat', {
          seat: false
        })
        this.$store.dispatch('Booking/set_limpiar', {
          limpiar: true
        })
      }
    },
    mounted () {
      this.currenDate = moment().format('YYYY-MM-DD')
      this.tomorrowDate = moment().add(1, 'days').format('YYYY-MM-DD')
      this.getReservas()
      console.log('path', this.$route.path)
      this.$store.dispatch('Booking/set_ruta', {ruta: {}})
      this.$store.dispatch('Booking/set_listaServicios', {listaServicios: []})
      this.$store.dispatch('Booking/set_anular', {anular: false})
      this.$store.dispatch('Booking/set_actualizarReservas', {actualizarReservas: false})
      this.$store.dispatch('Booking/set_fechaSeleccionada', {fechaSeleccionada: ''})
      this.$store.dispatch('Booking/set_confirmar', {confirmar: false})
      this.$store.dispatch('Booking/set_e1', {e1: 1})
      this.$store.dispatch('Booking/set_detalle', {detalle: false})
      this.$store.dispatch('Booking/set_actualizarVistaConfirmacion', {actualizarVistaConfirmacion: false})
      this.$store.dispatch('Booking/set_listaReservas', {listaReservas: []})
      this.$store.dispatch('Booking/set_selectedExpress', {selectedExpress: false})
    },
    methods: {
      async getReservas () {  // obtener las reservas de un usuario
        // const userId = {
        //   'user_id': 113162
        // }
        try {
          const tickets = await API.get('my_tickets')
          console.log(tickets)
          if (tickets.status >= 200 && tickets.status < 300) {
            console.log(`los tickets del usuario son `)
            console.log(tickets.data.data)

            let serviciosactivos = tickets.data.data.filter(tick => tick.status !== 'anulado')
            // console.log(serviciosactivos)
            this.$store.dispatch('Booking/set_listaReservas', {
              listaReservas: serviciosactivos
            })
            setTimeout(() => {
              this.items = Object.assign([], serviciosactivos)
              this.progres = false
      //      this.consulta = true
            }, 1000)
          }
        } catch (e) {
          console.log('Error al obtener tickets del usuario', e.response)
          this.$swal({
            customClass: 'modal-info',
            type: 'error',
            title: 'Ha ocurrido un error',
            text: e.response.data.error,
            animation: true,
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonText: 'Cerrar'
          })
        }
      },
      volverMenu () {
        this.$store.dispatch('Booking/set_e1', {
          e1: 1
        })
        this.$store.dispatch('Booking/set_grid', {
          grid: {}
        })
        this.$store.dispatch('Booking/set_seat', {
          seat: false
        })
      },
      goConfirma () {
        if (this.$route.path === '/reservaterceros' && this.role === 2) {
          this.$store.dispatch('Booking/set_selectedExpress', {selectedExpress: true})
        } else {
          this.$store.dispatch('Booking/select', {selected: true})
        }
      },
      async getGrid (serv) {
        let g = '?grid'
        let grilla = await API.getgrid('services', serv, g)
        if (grilla.status >= 200 && grilla.status < 300) {
          this.gridService = grilla.data.data.grid
          console.log('result grilla', this.gridService)
          this.$store.dispatch('Booking/set_grid', {
            grid: this.gridService
          })
        }
      }
    }
  }
</script>

<style>
  #principal-container {
    background: #fff;
    overflow-y: scroll;
  }
  .contiene {
    width: 100%;
    max-height: calc(100% - 0);
  }
  .layout-reservas {
    width: 100%;
    max-height: calc(100% - 0);
  }
  .width100 {
    width: 100% !important;
  }
  .gris054 {
    color: rgba(0, 0, 0, .54);
  }
  aside.v-navigation-drawer.navegacion1 {
    width: 100% !important;
    transform: translateX(0px) !important; /* sin esto se arrancan los aside en pantallas pequeñas */
    z-index: 2;
  }
  .input-buscar-user{
    border-bottom: 1px solid #ccc;
  }
  .input-buscar-user.v-text-field.v-text-field--enclosed .v-text-field__details{
    margin-bottom: 0;
  }
  .v-list--two-line.lista-users .v-list__tile {
    height: auto;
    padding: 5px 16px;
  }
  .theme--light.v-card.media-alt{
    height: calc(50vh - 85px);
    /* max-height: calc(50% - 15px); */
    background-color: #f5f5f5;
  }
  .v-divider.divider-ticket {
    /* border-style: dashed;
    border-width: 1px;*/
    border-color: #1565c0;
    border-top: 1px dashed #ff9800;
    width:90%;
  }
  .title-ticket {
    /* color: #1565c0; */
    font-size: 16px;
  }
  .v-list.user {
    height: calc(100vh - 128px);
    overflow-y: auto;
  }

  /* .v-toolbar__title.title-list-custom {
    background: #1565c0;
  } */

  .v-navigation-drawer>.v-list .v-list__tile .prueba {
    height: 300px;
  }

  .btn-step1 {
    width: 96%
  }

  .btn-step3 {
    width: 85%
  }
  .theme--light.v-stepper .v-stepper__step--active .v-stepper__label {
    text-shadow: 0 0 0 #E66732;
  }
</style>
