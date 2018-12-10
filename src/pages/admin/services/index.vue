<template>
  <div class="contiene" style="width: 100%; max-height: calc(100% - 0)">
    <v-toolbar card prominent>
      
      <v-toolbar-title class="body-3 primary--text ml-4">
        <!--{{$t(`lang.home.auth.${menuSelection.text}`)}}-->
        Busqueda de servicios
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!--<div class="grey--text">
        Frecuentes
      </div>
      <v-btn small flat class="botonmenu" >MEL - Complejo MEL</v-btn>
      <v-btn small flat  class="botonmenu">Complejo MEL - MEL</v-btn>
      <v-btn small  flat  class="botonmenu">Aeropuerto ANF - MEL</v-btn>
      <v-btn icon class="grey--text">
        <v-icon>help</v-icon>
      </v-btn> -->
    </v-toolbar>

    <v-divider></v-divider>

    <v-layout class="" style="max-height: calc(100% - 64px)">
      <v-flex xs3>
        <v-navigation-drawer style="width: 100%">
          <v-list dense class="pt-0 user">
            <v-toolbar-title class="title-list-custom white--text">
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
          </v-list>
        </v-navigation-drawer>
      </v-flex>

      <v-flex xs7>
        <v-layout  align-start justify-center row fill-height id="principal-container"> 
          <v-flex xs12>   
            <v-stepper :value="e1"  class="elevation-0">
              <v-stepper-header >
                <v-stepper-step  :complete="e1 > 1" step="1">Selección de pasajes</v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step   :complete="e1 > 2" step="2">Selección de itirenario</v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step   step="3">Confirmación</v-stepper-step>
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
                    height="400px"
                    max-height="400px"
                    flat
                  >
                    <service-list/>
                  </v-card>
                </v-stepper-content>

                <v-stepper-content step="3">
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

      <!--  -->
          
      </v-flex>  
      <v-flex xs2>
        <v-navigation-drawer style="width: 100%; max-height: 100%;">
          <!-- <v-list dense class="pt-0 user "> -->
            <v-toolbar-title class="title-list-custom white--text">
              <span class="hidden-sm-and-down ml-4">Servicios más próximos</span>
            </v-toolbar-title>
            <v-progress-linear :indeterminate="true" v-if="progres"></v-progress-linear>
            <!-- <v-divider></v-divider> -->
            <v-card class="media-alt">
              <v-card-title primary-title class="pb-1 pt-3">
              <span class="mb-0 title-ticket font-weight-black">Hoy</span>
              </v-card-title>
              <v-divider class="divider-ticket ml-3" style="border-color: #1565c0"> </v-divider>
                  <v-data-table
                    :headers="hoyHeaders"
                    :items="hoy"
                    hide-actions
                    class="tabla-express pt-3"
                    no-data-text="No hay viajes para hoy"
                    style="overflow-y: scroll; max-height: 100%;"
                  >
                  <template slot="items" slot-scope="props" >
                    <td class="" @click="selectExpress(props.item)">{{ props.item.origen }}</td>
                    <td class="" @click="selectExpress(props.item)">{{ props.item.destino }}</td>
                    <td class="" @click="selectExpress(props.item)">{{ props.item.salida }}</td>
                    <td class="text-xs-center">
                      <v-tooltip top>
                        <v-icon
                          small
                          slot="activator"
                          class="icono-select"
                          @click="selectExpress(props.item)"
                        >
                          chevron_right
                        </v-icon>
                        <span>Eliminar</span>
                      </v-tooltip>
                    </td>
                  </template>
                </v-data-table>
            </v-card>
            <!-- <v-divider></v-divider> -->
            <v-card class="media-alt">
              <v-card-title primary-title class="pb-1 pt-3">
              <span class="mb-0 title-ticket font-weight-black">Mañana</span>
              </v-card-title>
              <v-divider class="divider-ticket ml-3" style="border-color: #1565c0"> </v-divider>
              <v-data-table
                    :headers="mananaHeaders"
                    :items="manana"
                    hide-actions
                    class="tabla-express pt-3"
                    no-data-text="No hay viajes para mañana"
                    style="max-height: 100%; overflow-y: scroll;"
                  >
                  <template slot="items" slot-scope="props" >
                    <td class="" @click="selectExpress(props.item)">{{ props.item.origen }}</td>
                    <td class="" @click="selectExpress(props.item)">{{ props.item.destino }}</td>
                    <td class="" @click="selectExpress(props.item)">{{ props.item.salida }}</td>
                    <td class="text-xs-center">
                      <v-tooltip top>
                        <v-icon
                          small
                          slot="activator"
                          class="icono-select"
                          @click="selectExpress(props.item)"
                        >
                          chevron_right
                        </v-icon>
                        <span>Eliminar</span>
                      </v-tooltip>
                    </td>
                  </template>
                </v-data-table>
            </v-card>
          <!-- </v-list> -->
        </v-navigation-drawer>
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
        
    <!-- Modal error-->
    <modal v-if="showModal"
        @close="showModal = false"
        v-bind:btn1="modalInfoBtn1">
        <p slot="title" class="headline mb-0">{{modalInfoTitle}}</p>
        <h3 slot="body">{{modalInfoDetail}}</h3>
    </modal>
  </div>
</template>

<script>
  import PlaceSelector from '@c/PlaceSelector'
  import ServiceDate from '@c/DatePicker'
  import ServiceList from './List'
  import ServiceSelected from './Selected'
  import ServiceExpress from './SelectedExpress'

  import MyBooking from './MyBooking'
  import modalAnular from './modalAnular'
  import modalConfirmar from './modalConfirmar'
  import modalDetalle from './modalDetalle'
  import datePlaceContainer from './containerDatePlace'
  import tickets from './tickets'
  import {mapGetters} from 'vuex'
  import API from '@pi/app'
  import Modal from '@c/Modal'

  export default {
    data () {
      return {
      //  e1: 0,
        items: [],
        hoyHeaders: [
          {text: 'Origen', value: 'origen', sortable: false, align: 'left'},
          {text: 'Destino', value: 'destino', sortable: false, align: 'left'},
          {text: 'Salida', value: 'email', sortable: false, align: 'left'},
          {text: 'Ir', value: '', sortable: false, align: 'center'}],
        hoy: [
          {origen: 'Mel', destino: 'Complejo Mel', salida: '16:00'},
        /*  {from: 'ccs', to: 'mer', arrival: "16:45:00", avail_seats: 123, date: "2018-12-10", departure: "15:15:00", driver_id: null, duration: "01:30:00.000000", freq_id: 11,
            hrs_left: 0, id: 26, name: "FRECUENCIA MEL", set: "15:00:00", trip_id: 1}, */
          {origen: 'Complejo Mel', destino: 'Mel', salida: '18:30'},
                    {origen: 'Mel', destino: 'Complejo Mel', salida: '16:00'},
          {origen: 'Complejo Mel', destino: 'Aeropuerto ANF', salida: '18:30'},
          {origen: 'Aeropuerto ANF', destino: 'Aeropuerto ANF', salida: '18:30'},
                    {origen: 'Mel', destino: 'Complejo Mel', salida: '16:00'},
          {origen: 'Complejo Mel', destino: 'Aeropuerto ANF', salida: '18:30'},
          {origen: 'Aeropuerto ANF', destino: 'Aeropuerto ANF', salida: '18:30'},
                    {origen: 'Mel', destino: 'Complejo Mel', salida: '16:00'},
          {origen: 'Complejo Mel', destino: 'Aeropuerto ANF', salida: '18:30'},
          {origen: 'Aeropuerto ANF', destino: 'Aeropuerto ANF', salida: '18:30'},
          {origen: 'Aeropuerto ANF', destino: 'Aeropuerto ANF', salida: '18:30'},
          {origen: 'Terminal de Buses ANF', destino: 'Aeropuerto ANF', salida: '18:30'}
        ],
        mananaHeaders: [
          {text: 'Origen', value: 'origen', sortable: false},
          {text: 'Destino', value: 'destino', sortable: false},
          {text: 'Salida', value: 'salida', sortable: false},
          {text: 'Ir', value: '', sortable: false, align: 'center'}],
        manana: [
          {origen: 'Mel', destino: 'Complejo Mel', salida: '16:00'},
          {origen: 'Complejo Mel', destino: 'Aeropuerto ANF', salida: '18:30'},
          {origen: 'Aeropuerto ANF', destino: 'Aeropuerto ANF', salida: '18:30'},
                    {origen: 'Mel', destino: 'Complejo Mel', salida: '16:00'},
          {origen: 'Complejo Mel', destino: 'Aeropuerto ANF', salida: '18:30'},
          {origen: 'Aeropuerto ANF', destino: 'Aeropuerto ANF', salida: '18:30'},
                    {origen: 'Mel', destino: 'Complejo Mel', salida: '16:00'},
          {origen: 'Complejo Mel', destino: 'Aeropuerto ANF', salida: '18:30'},
          {origen: 'Aeropuerto ANF', destino: 'Aeropuerto ANF', salida: '18:30'},
                    {origen: 'Mel', destino: 'Complejo Mel', salida: '16:00'},
          {origen: 'Complejo Mel', destino: 'Aeropuerto ANF', salida: '18:30'},
          {origen: 'Aeropuerto ANF', destino: 'Aeropuerto ANF', salida: '18:30'},
          {origen: 'Terminal de Buses ANF', destino: 'Aeropuerto ANF', salida: '18:30'}
        ],
        right: null,
        disabledBtn: true,
        showModal: false,
        modalInfoTitle: '',
        modalInfoDetail: '',
        modalInfoBtn1: '',
        progres: true
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
      modal: Modal,
      ServiceExpress
    },
    computed: {
      ...mapGetters({
        fecha: ['Booking/fechaSeleccionada'],
        ruta: ['Booking/ruta'],
        actualizarReservas: ['Booking/actualizarReservas'],
        e1: ['Booking/e1']
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
      e1 () {
        // console.log('cambio el step')
      }
    },
    mounted () {
      this.getReservas()
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
          const tickets = await API.get('tickets')
          console.log(tickets)
          if (tickets.status >= 200 && tickets.status < 300) {
            console.log(`los tickets del usuario son `)
            console.log(tickets.data.data)
            this.$store.dispatch('Booking/set_listaReservas', {
              listaReservas: tickets.data.data
            })
            setTimeout(() => {
              this.items = Object.assign([], tickets.data.data)
              this.progres = false
      //      this.consulta = true
            }, 2000)
          }
        } catch (e) {
          console.log('Error al obtener tickets del usuario', e.response)
          this.showModal = true
          this.modalInfoTitle = 'Ha ocurrido un error'
          this.modalInfoDetail = 'Ha ocurrido un error al obtener los tickets, intente nuevamente.'
          this.modalInfoBtn1 = 'OK'
        }
      },
      volverMenu () {
        this.$store.dispatch('Booking/set_e1', {
          e1: 1
        })
      },
      selectExpress (servicioExpress) {
       /*console.log(servicioExpress)
         this.$store.dispatch('Booking/set_selectedExpress', {selectedExpress: true})
         this.$store.dispatch('Booking/set_servicioExpress', {servicioExpress: servicioExpress})  */
      }
    }
  }
</script>

<style>
  #principal-container {
    background: rgb(242, 245, 247);
  }
  .media-alt{
    height: calc(50vh - 79px);
    /* max-height: calc(50% - 15px); */
  }
  .tabla-express .v-table.theme--light tbody tr:nth-child(odd) {
    background: rgba(104, 104, 104, 0.1);
  }
  .tabla-express .theme--light.v-table thead tr{
    height: auto;
  }
  .tabla-express .theme--light.v-table thead th{
    font-size: 10px;
    padding: 5px;
    text-transform: uppercase;
    font-weight: 600;
    color: #9e9e9e;
  }
  .tabla-express .theme--light.v-table tbody td{
    font-size: 10px;
    padding: 5px;
    height: auto;
  }
  .tabla-express .theme--light.v-table tbody tr:not(:last-child){
    border: none;
  }
  .tabla-express .theme--light.v-table tbody tr:hover{
    background: rgba(104, 104, 104, 0.4);
    cursor: pointer;
  }
  .icono-select{
    background-color: transparent;
    border: 1px solid #ccc;
    border-radius: 50%;
  }
  .tabla-express .theme--light.v-table tbody tr:hover .icono-select{
    background-color: #1565c0;
    border: 1px solid #1565c0;
    color: #fff;
    border-radius: 50%;
  }
  .v-btn.botonmenu {
      background: transparent ;
    border: 1px solid #1565c0 ;
    color: #1565c0;
  }

  .v-btn.botonmenu:hover {
    background: #1565c0;
    color: white;
  }

  .v-list.user {
    height: calc(100vh - 128px);
    overflow-y: auto;
  }

  .v-toolbar__title.title-list-custom {
    background: #1565c0;
  }

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
    text-shadow: 0 0 0 #1565c0;
  }
</style>
