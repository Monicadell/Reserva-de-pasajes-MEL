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

          <v-card-text class="ml-3 mr-3"  >
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
      }
    }),
    mounted () {
      this.$store.dispatch('Booking/select', {selected: false})
      this.$store.dispatch('Booking/set_reservaRealizada', {
        reservaRealizada: false
      })
    },
    components: {
      Modal: Modal
    },
    methods: {
      cancel () {
        setTimeout(() => {
          this.ticket.status = 'none'
        }, 2000)
        this.$store.dispatch('Booking/select', {selected: false})
      },
      async doBooking () {
        this.loadingBooking = true
        const hora = moment().toISOString()
        const ticket = {
          status: 1,
          booked_at: hora,
          service_id: this.servicioSeleccionado.id
        }
        try {
          const booking = await API.postNoRest('services', ticket.service_id, 'book')
        // console.log(booking)
          if (booking.status >= 200 && booking.status < 300) {
            console.log('reserva exitosa')
            this.$store.dispatch('Booking/set_actualizarReservas', {
              actualizarReservas: true
            })
            this.$store.dispatch('Booking/select', {selected: false})
            this.$store.dispatch('Booking/set_ruta', {ruta: {}}) 
            this.$store.dispatch('Booking/set_listaServicios', {listaServicios: [],})
            this.$store.dispatch('Booking/set_e1', {
              e1: 3
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
          this.$swal({
            customClass: 'modal-info',
            type: 'error',
            customClass: '',
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
     /* axios.post('https://mel-2-backend.gestsol.cl/api/tickets', {
         ticket: {
            status: 1,
            booked_at: hora,
            user_id: 113162,
            service_id: this.servicioSeleccionado.id
            }
          })
          .then((response)=>{
          this.ticket.status = 'progress'
            setTimeout(() => {
              this.booking.color = 'space'
              this.booking.text = 'Reserva realizada con exito'
              this.ticket.status = 'done'
              this.loadingBooking = false
                this.$store.dispatch('Booking/set_reservaRealizada', {
                reservaRealizada: true
                });
            }, 2000)
            console.log(response);
          })
          .catch(function (error) {
            console.log('****')
            console.log(error);
          }); */
      }
    },
    computed: {
      ...mapGetters({
        service: ['Booking/service'],
        selected: ['Booking/selected'],
        current: ['Booking/current'],
        ruta: ['Booking/ruta'],
        servicioSeleccionado: ['Booking/servicioSeleccionado']
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
