<template>

    <v-dialog v-model="anular" persistent max-width="500">
        <v-card v-if="modal.status == 'none'">
              <v-card-title class="headline titulo-detalle elevation-22 text-lg-center">¿Esta seguro de anular la reserva?</v-card-title>
              <v-layout row wrap ml-4 mt-3> 
              <v-flex xs3 class="mt-3 ml-2"> 
                <v-icon color="red" size=80>warning</v-icon>
              </v-flex>
              <v-flex xs8 mt-3> 
              <v-card-text>Una vez realizada esta acción no podrá recuperar la reserva realizada anteriormente.</v-card-text>

              </v-flex>
              </v-layout>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary darken-1" flat @click="cerrar()" >Volver</v-btn>
               <v-btn color="red darken-1" flat @click="anularReserva()" >Anular</v-btn> 
              </v-card-actions>
            </v-card>

        <v-card max-width="500"  v-if="modal.status == 'done'">
              <v-card-title class="headline titulo-detalle elevation-22 text-lg-center">¿Esta seguro de anular la reserva?</v-card-title>
            <v-card-text class="text-xs-center ">
                <v-layout row wrap ml-4 mt-3> 
              <v-flex xs3 class="mt-3 ml-2"> 
               <v-icon color="secondary" size=100>check</v-icon>                  
              </v-flex>
              <v-flex xs8 mt-3> 
                <h3 class="mt-4 font-weight-light">SU RESERVA SE HA ANULADO CON EXITO</h3>
              </v-flex>
                </v-layout>
          </v-card-text>
          <v-card-actions> 
                <v-btn color="primary darken-1" flat @click="cerrar()" >Cerrar</v-btn>
          </v-card-actions>
      </v-card> 

    </v-dialog>
  
</template>

<script>
  import API from '@pi/app'
  import {mapGetters} from 'vuex'
  import moment from 'moment'
  import axios from 'axios'
  export default {
    name: 'modalAnular', 
    data: () => ({
      modal : {
          status: 'none'
      }
    }),
    mounted () {
    },
    methods: {
      async anularReserva() {
        const idServicio = this.servicioAnular.id
        try {
          let eliminando = await API.deleteNoRest('tickets', idServicio,'cancel') 
          if (eliminando.status >= 200 && eliminando.status < 300) {
              //eliminado exitoso 
            this.$store.dispatch('Booking/set_actualizarReservas', {
              actualizarReservas: true
            })
            this.modal.status = 'done' 
          }
            /*   this.$store.dispatch('Booking/set_anular', {
                  anular: false
              });  */
        } catch (e) {
          console.log('Error al anular reserva', e.response)
          alert('Ha ocurrido un error al intentar anular reserva')
        }
      },
      cerrar() {
        setTimeout(() => {
          this.modal.status = 'none'
        }, 2000)
        this.$store.dispatch('Booking/set_anular', {
          anular: false
        })
      }
    },
    computed: {
      ...mapGetters({
        service: ['Booking/service'],
        selected: ['Booking/selected'],
        current: ['Booking/current'],
        ruta: ['Booking/ruta'],
        servicioAnular: ['Booking/servicioAnular'],
        anular: ['Booking/anular']
      })
    }
  }
</script>

<style>
    .v-card__title.titulo-detalle {
    background: #1565c0;
    color: white;
    font-weight: lighter;
}
</style>
