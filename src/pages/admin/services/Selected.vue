<template>
  <div>
    <v-dialog v-model="selected" width="500" persistent>
      <v-card max-width="500" v-if="ticket.status=='none' && ruta.name">

            <v-card dark flat>

            <v-card-title class="primary">
              <h3 class="title font-weight-light text-xs-center grow">
                Confirmar reserva
              </h3>
            </v-card-title>
            </v-card>

        <v-img src="http://www.mch.cl/wp-content/uploads/sites/4/2017/02/escondida.jpg" height="100"
                 gradient="to right, rgba(0,0,0,.44), rgba(0,0,0,.0)">
            <v-container fill-height>
              <v-layout>
                <v-layout column>
                  <div class="white--text headline font-weight-light"> {{servicioSeleccionado.name}}</div>
                  <div class="white--text font-weight-light">{{servicioSeleccionado.date}}</div>
                </v-layout>
              </v-layout>
            </v-container>
          </v-img>

          <v-card-text class="ml-3 mr-3"  >
            <v-timeline align-top dense>

              <v-timeline-item color="yellow darken-1" large icon="fal fa-map-marked">
                <v-layout pt-3>
                  <v-flex xs6>
                    <div class="grey--text">Salida desde:</div>
                    <b> {{ruta.name.split('→')[0]}} </b>
                  </v-flex>
                  <v-flex>
                    <div class="grey--text">A las:</div>
                    <b>{{moment(servicioSeleccionado.departure,'HH:mm:ss').format('HH:mm')}}</b>
                  </v-flex>
                </v-layout>
              </v-timeline-item>

              <v-timeline-item color="orange" large icon="fal fa-shuttle-van" class="mb-3">
                <v-layout pt-3>
                  <v-flex xs6>
                    {{servicioSeleccionado.id}}
                  </v-flex>
                </v-layout>
              </v-timeline-item>

              <v-timeline-item color="green" large icon="fal fa-map-marker-check">
                <v-layout pt-3>
                  <v-flex xs6>
                    <div class="grey--text">Destino:</div>
                    <b> {{ruta.name.split('→')[1]}} </b>
                  </v-flex>
                  <v-flex>
                    <div class="grey--text">llegada aproximada:</div>
                    <b> {{  moment(servicioSeleccionado.arrival,'HH:mm:ss').format('HH:mm')  }} </b>
                  </v-flex>
                </v-layout>
              </v-timeline-item>


            </v-timeline>
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="primary"
              flat
              @click="cancel"
            >
              Cancelar
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click="doBooking"
            >
              Reservar
            </v-btn>
          </v-card-actions>

      </v-card>

       <v-card max-width="500" v-if="ticket.status=='progress'">

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
              Cancelar
            </v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import API from '@pi/app'
  import {mapGetters} from 'vuex'
  import moment from 'moment'
  import axios from 'axios'
  export default {
    data: () => ({
      loadingBooking: false,
      booking: {
        state: 'booking', // booking, error, success
        color: 'primary',
        text: 'Confirmar reserva',
        name: '',
         moment: moment,
      },
      
      ticket : {
        status: 'none'
      }

    }),
    mounted () {
      this.$store.dispatch('Booking/select', {selected: false})
      this.$store.dispatch('Booking/set_reservaRealizada', {
            reservaRealizada: false
            });  
    },
    methods: {
      cancel () {
        setTimeout(()=>{
         this.ticket.status = 'none'

        },2000)
        this.$store.dispatch('Booking/select', {selected: false})
        
      },
      async doBooking () {
        this.loadingBooking = true
        const hora = moment().toISOString();
        /* const ticket = {
          status: 1,
          booked_at: hora,
          user_id: 113162,
          service_id: this.servicioSeleccionado.id
        }

       const booking = await API.post('tickets', ticket)
          if (booking.status >= 200 && booking.status < 300){
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
          }
       */

       axios.post('https://mel-2-backend.gestsol.cl/api/tickets', {
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
          });     
 
        
      },
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
</style>
