<template>
  <div>
    <v-dialog v-model="selected" width="500" persistent>
      <v-card max-width="500">

        <template v-if="loadingBooking">
          <v-card-text class="text-xs-center ">
            <v-progress-circular :size="150" color="primary" indeterminate></v-progress-circular>
            <h2 class="mt-5 font-weight-light">Reservando...</h2>
          </v-card-text>

        </template>
        <template v-else>
          <v-card dark flat>

            <v-card-title :class="booking.color">
              <h3 class="title font-weight-light text-xs-center grow">
                {{booking.text}}
              </h3>
            </v-card-title>


          </v-card>

          <v-img v-if="booking.text == 'Confirmar reserva'" src="http://www.mch.cl/wp-content/uploads/sites/4/2017/02/escondida.jpg" height="100"
                 gradient="to right, rgba(0,0,0,.44), rgba(0,0,0,.0)">
            <v-container fill-height>
              <v-layout>
                <v-layout column>
                  <div class="white--text headline font-weight-light"> {{service.name}}</div>
                  <div class="white--text font-weight-light">{{service.date}}</div>
                </v-layout>
              </v-layout>
            </v-container>
          </v-img>

          <v-card-text class="ml-3 mr-3"  v-if="booking.text == 'Confirmar reserva'">
            <v-timeline align-top dense>

              <v-timeline-item color="yellow darken-1" large icon="fal fa-map-marked">
                <v-layout pt-3>
                  <v-flex xs6>
                    <div class="grey--text">Salida desde:</div>
                    <b> {{ruta.name.split('→')[0]}} </b>
                  </v-flex>
                  <v-flex>
                    <div class="grey--text">A las:</div>
                    <b>{{service.departure}}</b>
                  </v-flex>
                </v-layout>
              </v-timeline-item>

              <v-timeline-item color="orange" large icon="fal fa-shuttle-van" class="mb-3">
                <v-layout pt-3>
                  <v-flex xs6>
                    {{service.id}}
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
                    <b> {{service.arrival}} </b>
                  </v-flex>
                </v-layout>
              </v-timeline-item>


            </v-timeline>
          </v-card-text>
          <v-card-actions v-if="booking.state === 'booking'">
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
          <v-card-actions class="justify-center" v-if="booking.state === 'success'">
            <v-btn
              color="primary"
              @click="cancel"
            >
              Cerrar
            </v-btn>
            <!-- <v-spacer></v-spacer> -->
            <!-- <v-btn
              color="primary"
              @click="doBooking"
            >
              Ir a mis reservas
            </v-btn> -->
          </v-card-actions>
        </template>

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
      }
    }),
    mounted () {
      this.$store.dispatch('Booking/select', {selected: false})
    },
    methods: {
      cancel () {
        this.$store.dispatch('Booking/select', {selected: false})
      },
      doBooking () {
        this.loadingBooking = true
        const hora = moment().toISOString();
        console.log(hora)

       axios.post('https://mel-2-backend.gestsol.cl/api/tickets', {
         ticket: {
            status: 1,
            booked_at: hora,
            user_id: 1,
            service_id: 49
            }
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });    

        setTimeout(() => {
          this.booking.state = 'success'
          this.booking.color = 'space'
          this.booking.text = 'Reserva realizada con exito'
          this.loadingBooking = false
        }, 2000)
      },
    },
    computed: {
      ...mapGetters({
        service: ['Booking/service'],
        selected: ['Booking/selected'],
        current: ['Booking/current'],
        ruta: ['Booking/ruta']
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
