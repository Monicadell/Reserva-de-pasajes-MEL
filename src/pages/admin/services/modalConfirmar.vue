<template>

    <v-dialog v-model="confirmar" persistent max-width="500">
       <v-card max-width="500" v-if="modal.status == 'none'" >

            <v-card dark flat>
            <v-card-title class="primary">
              <h3 class="title font-weight-light text-xs-center grow">
                CONFIRMAR
              </h3>
            </v-card-title>
            </v-card>


          <v-card-text class="ml-3 mr-3"  >
            <v-timeline align-top dense>

              <v-timeline-item color="light-blue lighten-1" large icon="fal fa-map-marked">
                <v-layout pt-3>
                  <v-flex xs6>
                    <div class="grey--text"><b>Salida desde:</b></div>
                    <b class="secondary--text"> {{servicioConfirmar.service.from}}</b>
                  </v-flex>
                  <v-flex>
                    <div class="grey--text"> <b> Horario salida</b></div>
                    <b class="secondary--text">{{servicioConfirmar.service.departure}}</b>
                  </v-flex>
                </v-layout>
                <v-divider class=" divider-custom mt-3"></v-divider>

              </v-timeline-item>



              <v-timeline-item color="cyan accent-3" large icon="airline_seat_recline_extra" class="mb-3">
                <v-layout pt-3>
                  <v-flex xs6>
                     <div class="grey--text"> <b>Día del trayecto</b></div>
                    <b class="secondary--text"> {{servicioConfirmar.service.date}}</b>
                  </v-flex>
                </v-layout>
                <v-divider class="divider-custom mt-3"></v-divider>
                  
              </v-timeline-item>
   

              <v-timeline-item color="light-blue darken-3" large icon="fal fa-map-marker-check">
                <v-layout pt-3>
                  <v-flex xs6>
                    <div class="grey--text"> <b>Destino: </b></div>
                    <b class="secondary--text"> {{servicioConfirmar.service.to}}</b>
                  </v-flex>
                  <v-flex>
                    <div class="grey--text"> <b>Horario llegada Aprox: </b></div>
                    <b class="secondary--text"> {{servicioConfirmar.service.arrival}} </b>
                  </v-flex>
                </v-layout>
              </v-timeline-item>


            </v-timeline>
          </v-card-text>

          <v-card-actions>
         <!-- *********** CENTRA BOTON ***** -->
            <v-btn
              color="secondary"
              class="btn-confirmar ml-4"
              @click="confirmarReserva"
            >
             Confirmar
            </v-btn>
          </v-card-actions>

      </v-card>

        <v-card max-width="500"  v-if="modal.status == 'done'">
              <v-card-title class="headline titulo-detalle elevation-22 text-lg-center">CHECK-IN</v-card-title>
            <v-card-text class="text-xs-center ">
               
            
               <v-icon color="secondary" size=200>check</v-icon>                  
       
            
                <h2 class=" font-weight-light">CONFIRMACION REALIZADA CON EXITO</h2>
                <p>Debes imprimir tu ticket en los totems habilitados en cada punto antes de subir a tu bus.  </p>
                <p> En caso de emergencia se ha enviado una copia a tu correo </p>
              
          </v-card-text>
          <v-card-actions> 
                <v-btn color ="grey" class="btn-cerrar ml-3" @click="cerrar()" >Cerrar</v-btn>
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
     name: 'modalConfirmar', 
    data: () => ({
        modal : {
            status: 'none'
        }
    }),
    mounted () {
   
    },
    methods: {
        async confirmarReserva() {
            const idServicio = this.servicioConfirmar.id
            let confirmacion = await API.patchNoRest('tickets', idServicio,'confirm') 
            console.log(confirmacion)
          //  this.modal.status = 'done'

            if (confirmacion.status >= 200 && confirmacion.status < 300) {
            //confirmacion exitosa 
          
           this.$store.dispatch('Booking/set_actualizarReservas', {
                actualizarReservas: true
            });
             this.modal.status = 'done' 
            
        }

        },
        cerrar() {
            setTimeout(()=>{
         this.modal.status = 'none'

        },2000)
            this.$store.dispatch('Booking/set_confirmar', {
            confirmar: false
            });  
        }
    },
    computed: {
      ...mapGetters({
        service: ['Booking/service'],
        selected: ['Booking/selected'],
        current: ['Booking/current'],
        ruta: ['Booking/ruta'],
        servicioConfirmar: ['Booking/servicioConfirmar'],
        confirmar: ['Booking/confirmar']
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
    .btn-confirmar {
        width: 90%
    }
    .btn-cerrar {
        width: 90%
    }
</style>
