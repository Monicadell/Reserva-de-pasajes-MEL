<template>
  <div>
    <v-dialog v-model="selected" width="500" persistent>
      <v-card max-width="500" v-if="ticket.status=='none' && ruta.name">

            <v-card dark flat>

            <v-card-title class="primary">
              <h3 class="title font-weight-light text-xs-center grow">
                Detalles de reserva
              </h3>
            </v-card-title>
            </v-card>

        <!--<v-img src="http://www.mch.cl/wp-content/uploads/sites/4/2017/02/escondida.jpg" height="100"
                 gradient="to right, rgba(0,0,0,.44), rgba(0,0,0,.0)">
            <v-container fill-height>
              <v-layout>
                <v-layout column>
                  <div class="white--text headline font-weight-light"> {{servicioSeleccionado.name}}</div>
                  <div class="white--text font-weight-light">{{servicioSeleccionado.date}}</div>
                </v-layout>
              </v-layout>
            </v-container>
          </v-img> -->

          <v-card-text class="pl-4 pr-3">
            <v-timeline align-top dense>

              <v-timeline-item color="#2B8DFC" large icon="fal fa-map-marked">
                <v-layout pt-3>
                  <v-flex xs6>
                    <div class="grey--text"><b>Salida desde:</b></div>
                   <!-- <b class="gris--text"> {{ruta.name.split('→')[0]}} </b> -->
                   <b class="gris--text"> {{servicioSeleccionado.source}} </b>
                  </v-flex>
                  <v-flex>
                    <div class="grey--text"> <b> Horario salida</b></div>
                    <b class="gris--text">{{moment(servicioSeleccionado.departure,'HH:mm:ss').format('HH:mm')}}</b>
                  </v-flex>
                </v-layout>
                <v-divider class=" divider-custom mt-3"></v-divider>

              </v-timeline-item>



              <v-timeline-item color="#2A86BA" large icon="airline_seat_recline_extra" class="mb-3">
                <v-layout pt-3>
                  <v-flex xs6>
                     <div class="grey--text"> <b>Día del trayecto</b></div>
                    <b class="gris--text"> {{moment(servicioSeleccionado.date).format('dddd D  MMMM YYYY')}}</b>
                  </v-flex>
                </v-layout>
                <v-divider class="divider-custom mt-3"></v-divider>

              </v-timeline-item>


              <v-timeline-item color="#2269BA" large icon="fal fa-map-marker-check">
                <v-layout pt-3>
                  <v-flex xs6>
                    <div class="grey--text"> <b>Destino: </b></div>
                   <!-- <b class="gris--text"> {{ruta.name.split('→')[1]}} </b> -->
                    <b class="gris--text"> {{servicioSeleccionado.dest}} </b>

                  </v-flex>
                  <v-flex>
                    <div class="grey--text"> <b>Horario llegada Aprox: </b></div>
                    <b class="gris--text"> {{  moment(servicioSeleccionado.arrival,'HH:mm:ss').format('HH:mm')  }} </b>
                  </v-flex>
                </v-layout>
              </v-timeline-item>
            </v-timeline>

            <div class="mr-3 ml-2">
              <!-- <select-acercamiento @eventAcerca="eventAcerca"/> -->
               <v-text-field label="Ingrese acercamiento"
                              prepend-icon="place"
                              v-model="acercamiento"></v-text-field>
            </div>
            <div v-if="vuelo">
              <v-layout row wrap >
                <v-flex offset-xs2 xs8 pt-2>
                  <v-text-field
                    label="Nº de vuelo"
                    v-model="flight"
                    prepend-icon="airplanemode_active"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </div>
          </v-card-text>

          <v-card-actions class="pb-4">
            <v-btn
              color="primary" outline
              @click="cancel"
              class="ml-4 mb-1 text-capitalize"
            >
              Cancelar
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              class="mr-4 mb-1 text-capitalize"
              @click="doBooking"
            >
              Reservar
            </v-btn>
          </v-card-actions>

      </v-card>

     <!--<v-card max-width="500" v-if="ticket.status=='progress'">

            <v-card-text class="text-xs-center ">
            <v-progress-circular :size="150" color="primary" indeterminate></v-progress-circular>
            <h2 class="mt-5 font-weight-light">Reservando...</h2>
          </v-card-text>

      </v-card>

       <v-card max-width="500" v-if="ticket.status=='done'">
        <v-card-title class="space">
           <h3 class="title font-weight-light text-xs-center grow">
           Reserva realizada con exito
           </h3>
        </v-card-title>
        <v-btn
              color="primary"
              @click="cancel"
            >
              Cerrar
            </v-btn>
      </v-card> -->
    </v-dialog>
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
  import API from '@pi/app'
  import {mapGetters} from 'vuex'
  import moment from 'moment'
  import Modal from '@c/Modal'
  import SelectAcercamiento from '@c/SelectAcercamiento'

  export default {
    data: () => ({
      loadingBooking: false,
      showModal: false,
      modalInfoTitle: '',
      modalInfoDetail: '',
      modalInfoBtn1: '',
      booking: {
        state: 'booking', // booking, error, success
        color: 'primary',
        text: 'Confirmar reserva',
        name: '',
        moment: moment
      },
      ticket: {
        status: 'none'
      },
      tramos: [],
      acercamiento: '',
      vuelo: false, // si origen incluye vuelo
      flight: '' // numero de vuelo ingresado
    }),
    mounted () {
      this.$store.dispatch('Booking/select', {selected: false})
      this.$store.dispatch('Booking/set_reservaRealizada', {
        reservaRealizada: false
      })
      this.getTrips()
    },
    components: {
      Modal: Modal,
      SelectAcercamiento
    },
    methods: {
      cancel () {
        setTimeout(() => {
          this.ticket.status = 'none'
        }, 2000)
        this.$store.dispatch('Booking/select', {selected: false})
        this.$store.dispatch('Booking/set_servicioSeleccionado', {servicioSeleccionado: {}})
        this.acercamiento = ''
        this.flight = ''
        this.vuelo = false
      },
      // eventAcerca (lugar) {
      //   this.acercamiento = lugar
      // },
      async doBooking () {
        this.loadingBooking = true
        const hora = moment().toISOString()
        const ticket = {
          status: 1,
          booked_at: hora,
          service_id: this.servicioSeleccionado.id
        }
        // let aterceros = {
        //   'users': this.usuariosBook,
        //   'ac': this.acercamiento,
        //   'vuelo': this.flight
        // }
        let extras = {
          'ac': this.acercamiento,
          'vuelo': this.flight
        }
        try {
          let booking = {}
          console.log('route', this.$router.currentRoute)
          console.log('asiento ->', (this.seat[2] + 1))
          // admin reserva a si mismo
          if (this.$router.currentRoute.name === 'ServiceReserve' && this.role === 2) {
            console.log('reservar admin a mismo')
            let datos = {
              ac: this.acercamiento,
              vuelo: this.flight,
              seat: this.seat[0],
              bus: this.seat[2] + 1,
              user_id: this.userid
            }
            booking = await API.postNoRest('services', ticket.service_id, 'book', datos)
            // cualquier usuario distinto de admin se reserva a si mismo
          } else if (this.$router.currentRoute.name === 'ServiceReserve' && this.role !== 2) {
            console.log('es a mi, no admins', extras)
            booking = await API.postNoRest('services', ticket.service_id, 'book', extras)
            // cualquier usuario reserva a terceros
          } else if (this.$router.currentRoute.name === 'reservaterceros' && this.role === 2) {
            console.log('reservamos a terceros', this.usuariosBook)
            const arrUser = [this.usuariosBook]
            let datos = {
              ac: this.acercamiento,
              vuelo: this.flight,
              seat: this.seat[0],
              bus: this.seat[2] + 1,
              users: arrUser
            }
            booking = await API.postNoRest('services', ticket.service_id, 'book', datos)
          } else { // para cualquier usuario distinto de admin que pueda reservar a terceros
            extras.users = this.usuariosBook
            console.log('es a terceros', this.usuariosBook)
            booking = await API.postNoRest('services', ticket.service_id, 'book', extras)
          }
        // console.log(booking)
          if (booking.status >= 200 && booking.status < 300) {
            console.log('reserva exitosa')
            this.$store.dispatch('Booking/set_actualizarReservas', {
              actualizarReservas: true
            })
            this.$store.dispatch('Booking/select', {selected: false})
            this.$store.dispatch('Booking/set_ruta', {ruta: {}})
            this.$store.dispatch('Booking/set_listaServicios', {listaServicios: []})
            this.$store.dispatch('Booking/set_e1', {
              e1: 4
            })
            this.$store.dispatch('Booking/set_limpiar', {
              limpiar: true
            })
          }
        } catch (e) {
          console.log('error al reservar', e.response)
          this.$store.dispatch('Booking/select', { selected: false })
          this.$store.dispatch('Booking/set_e1', {
            e1: 1
          })
          this.acercamiento = ''
          this.flight = ''
          this.vuelo = false
          this.$swal({
            customClass: 'modal-info',
            type: 'error',
            title: '¡Reserva no habilitada!',
            text: e.response.data.error,
            animation: true,
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonText: 'Cerrar'
          })
        /*  this.showModal = true
          this.modalInfoTitle = 'Ha ocurrido un error'
          this.modalInfoDetail = e.response.data.error
          this.modalInfoBtn1 = 'OK' */
        }
      },
      async getTrips () {
        let trips = await API.get('trips')
        if (trips.status >= 200 && trips.status < 300) {
          // console.log('trips', trips.data.data)
          this.tramos = trips.data.data
          // console.log(this.tramos)
        }
      }
    },
    computed: {
      ...mapGetters({
        service: ['Booking/service'],
        selected: ['Booking/selected'],
        current: ['Booking/current'],
        ruta: ['Booking/ruta'],
        servicioSeleccionado: ['Booking/servicioSeleccionado'],
        usuariosBook: ['Booking/usuariosBook'],
        role: ['Auth/role'],
        userid: ['Auth/userid'],
        seat: ['Booking/seat']
      })
    },
    watch: {
      servicioSeleccionado (val) {
        console.log('change selected', val)
        let trip = this.tramos.find(tr => tr.id === val.trip_id)
        console.log('trips', this.tramos)
        console.log('trip selec', trip)
        if (trip.vuelo) {
          // console.log('es vuelo')
          // this.vuelo = (this.servicioSeleccionado.dest.toLowerCase().includes('aeropuerto') || this.servicioSeleccionado.source.toLowerCase().includes('aeropuerto'))
          this.vuelo = true
        }
      },
      usuariosBook (val) {
        console.log('usuarios a reserar', val)
      }
    }
  }
</script>

<style>
  .space{
    padding: 50px 20px;
    background-color: #fff;
    color: #000;
  }

  .v-divider.divider-custom {
    max-width: 350px;
  }
</style>
