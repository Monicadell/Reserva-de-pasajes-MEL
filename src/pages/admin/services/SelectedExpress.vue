<template>
  <div>
    <v-dialog v-model="selectedExpress" width="500" persistent>
      <v-card max-width="500" >
        <v-card dark flat>
          <v-card-title class="primary">
            <h3 class="title font-weight-light text-xs-center grow">
              Detalles de reserva
            </h3>
          </v-card-title>
        </v-card>
          <v-card-text class="px-3">
            <v-timeline align-top dense>
              <v-timeline-item color="#2B8DFC" large icon="fal fa-map-marked">
                <v-layout pt-3>
                  <v-flex xs6>
                    <div class="grey--text"><b>Salida desde:</b></div>
                    <b class="gris--text"> {{servicioExpress.source}} </b>
                  </v-flex>
                  <v-flex>
                    <div class="grey--text"> <b> Horario salida</b></div>
                    <b class="gris--text">{{servicioExpress.departure}}</b>
                  </v-flex>
                </v-layout>
                <v-divider class=" divider-custom mt-3"></v-divider>
              </v-timeline-item>
              <v-timeline-item color="#2A86BA" large icon="airline_seat_recline_extra" class="mb-3">
                <v-layout pt-3>
                  <v-flex xs6>
                     <div class="grey--text"> <b>Día del trayecto</b></div>
                    <b class="gris--text"> {{servicioExpress.date}}</b>
                  </v-flex>
                </v-layout>
                <v-divider class="divider-custom mt-3"></v-divider>
              </v-timeline-item>
   

              <v-timeline-item color="#2269BA" large icon="fal fa-map-marker-check">
                <v-layout pt-3>
                  <v-flex xs6>
                    <div class="grey--text"> <b>Destino: </b></div>
                    <b class="gris--text">{{servicioExpress.dest}}</b>
                  </v-flex>
                  <v-flex>
                    <div class="grey--text"> <b>Horario llegada Aprox: </b></div>
                    <b class="gris--text"> {{servicioExpress.arrival}} </b>
                  </v-flex>
                </v-layout>
              </v-timeline-item>


            </v-timeline>
            <div class="ml-2 mr-3">
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

   
    </v-dialog>
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
      acercamiento: '',
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
      vuelo: false,
      flight: ''
    }),
    components: {
      Modal: Modal,
      SelectAcercamiento
    },
    methods: {
      cancel () {
        this.$store.dispatch('Booking/set_selectedExpress', {selectedExpress: false})
        this.$store.dispatch('Booking/set_servicioExpress', {servicioExpress: {}})
      },
      // eventAcerca (lugar) {
      //   this.acercamiento = lugar
      // },
      async doBooking () {
        this.loadingBooking = true
        const hora = moment().toISOString()
        console.log('Express seleccionado', this.servicioExpress)

        const ticket = {
          status: 1,
          booked_at: hora,
          service_id: this.servicioExpress.id
        }
        const aterceros = {
          'users': this.usuariosBook,
          'ac': this.acercamiento,
          'vuelo': this.flight
        }
        console.log('terceros exp', aterceros)
        try {
          console.log('ticket.service_id', ticket.service_id)
          const booking = await API.postNoRest('services', ticket.service_id, 'book', aterceros)
        // console.log(booking)
          if (booking.status >= 200 && booking.status < 300) {
            console.log('reserva exitosa')
            this.$store.dispatch('Booking/set_actualizarReservas', {actualizarReservas: true})
            // this.$store.dispatch('Booking/select', {selected: false})
            // this.$store.dispatch('Booking/set_ruta', {ruta: {}})
            this.$store.dispatch('Booking/set_listaServicios', {listaServicios: []})
            // this.$store.dispatch('Booking/set_e1', {e1: 3})
            /* MODAL RESERVA EXITOSA */
            this.$swal({
              customClass: 'modal-info',
              type: 'success',
              title: '¡Reserva Realizada!',
              text: 'Su reserva ha sido generada.',
              animation: true,
              showCancelButton: true,
              showConfirmButton: false,
              cancelButtonText: 'Cerrar',
              timer: 3000
            }).then(() => {
              this.$store.dispatch('Booking/set_selectedExpress', {selectedExpress: false})
            })
          }
        } catch (e) {
          console.log('error al reservar', e.response)
          this.$store.dispatch('Booking/select', { selected: false })
          this.$store.dispatch('Booking/set_selectedExpress', {selectedExpress: false})
          // this.$store.dispatch('Booking/set_e1', {
          //   e1: 1
          // })
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
        }
      }
    },
    watch: {
      servicioExpress (val) {
        console.log('change express', val)
        this.vuelo = this.servicioExpress.dest.toLowerCase().includes('aeropuerto') || this.servicioExpress.source.toLowerCase().includes('aeropuerto')
      },
      usuariosBook (val) {
        console.log('usuarios a reserar', val)
      }
    },
    computed: {
      ...mapGetters({
        service: ['Booking/service'],
        selectedExpress: ['Booking/selectedExpress'],
        current: ['Booking/current'],
        ruta: ['Booking/ruta'],
        servicioExpress: ['Booking/servicioExpress'],
        usuariosBook: ['Booking/usuariosBook']
      })
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
