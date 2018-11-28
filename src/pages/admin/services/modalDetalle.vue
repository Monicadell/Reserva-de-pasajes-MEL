<template>

    <v-dialog v-model="detalle" persistent max-width="900">
         <v-card>
                <v-card-title class="titulo-detalle  elevation-22">
                    <div>
                        <h3 class="headline ml-3 " style="font-weight: lighter;" >Detalles reserva</h3>
                    </div>
                </v-card-title>
                <v-card-text>
                    <v-container >
                        
                        <v-layout wrap  >
                          <v-flex xs4 >
                                <v-list  three-line >
                                    <v-list-tile >
                                        <v-list-tile-action>
                                           <v-icon color="primary" size=50> directions_bus</v-icon>
                                        </v-list-tile-action>
                                        <v-list-tile-content >
                                            <v-list-tile-sub-title class="black--text ">LINEA TANDEM</v-list-tile-sub-title>
                                            <v-list-tile-sub-title class="secondary--text ">Ruta: {{servicioDetalle.service.from}} - {{servicioDetalle.service.to}} </v-list-tile-sub-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile  >
                                        <v-list-tile-action>
                                           <v-icon color="primary" size=50>airline_seat_recline_extra</v-icon>
                                        </v-list-tile-action>
                                        <v-list-tile-content  >
                                            <v-list-tile-sub-title class="black--text ">???</v-list-tile-sub-title>
                                            <v-list-tile-sub-title class="secondary--text  "></v-list-tile-sub-title>
                                            
                                        </v-list-tile-content>
                                    </v-list-tile>
                                     <v-list-tile  >
                                         <v-list-tile-action>
                                           <v-icon color="primary" size=50>access_time</v-icon>
                                        </v-list-tile-action>
                                        <v-list-tile-content  >
                                            <v-list-tile-sub-title class="black--text ">DURACIÓN</v-list-tile-sub-title>
                                            <v-list-tile-sub-title class="secondary--text">{{servicioDetalle.service.duration}}</v-list-tile-sub-title>

                                        </v-list-tile-content>
                                     </v-list-tile>
                                </v-list>
                            </v-flex>
                            <v-flex xs4 >
                                <v-list three-line  >
                                    <v-list-tile  >
                                        <v-list-tile-action>
                                           <v-icon color="primary" size=54>location_on</v-icon>
                                        </v-list-tile-action>
                                        <v-list-tile-content class="custom-text" >
                                            <v-list-tile-sub-title class="black--text ">SALIDA</v-list-tile-sub-title>
                                            <v-list-tile-sub-title class="secondary--text">{{servicioDetalle.service.departure}}{{servicioDetalle.service.date}} </v-list-tile-sub-title>
                                            <v-list-tile-sub-title class="secondary--text">{{servicioDetalle.service.from}}</v-list-tile-sub-title>
                                            
                                        </v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile   >
                                        <v-list-tile-action>
                                           <v-icon color="primary" size=54>location_on</v-icon>
                                        </v-list-tile-action>
                                        <v-list-tile-content class="custom-text"  >
                                           
                                            <v-list-tile-sub-title class="black--text ">LLEGADA</v-list-tile-sub-title>
                                            <v-list-tile-sub-title class="secondary--text">{{servicioDetalle.service.arrival}}</v-list-tile-sub-title>
                                            <v-list-tile-sub-title class="secondary--text">{{servicioDetalle.service.to}}</v-list-tile-sub-title>


                                        </v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile  >
                                        <v-list-tile-action>
                                           <v-icon color="primary" size=50>stars</v-icon>
                                        </v-list-tile-action>
                                        <v-list-tile-content class="custom-text" >
                                            <v-list-tile-sub-title class="black--text ">SERVICIO</v-list-tile-sub-title>
                                            <v-list-tile-sub-title class="secondary--text">{{servicioDetalle.service.name}}</v-list-tile-sub-title>

                                        </v-list-tile-content>
                                    </v-list-tile>
                                   
                                </v-list>
                            </v-flex>

                            <v-flex xs4 style="align-self: center;"> 
                                <v-list   >
                      
                                       <!-- <v-list-tile-avatar tile>
                                            <img src="../../../../static/img/Tandem_reserva.png">
                                        </v-list-tile-avatar> -->
                        
                                         <v-list-tile-content  >
                                            <img src="../../../../static/img/Tandem_reserva.png">
                                            
                                            <v-list-tile-sub-title class="black--text text-lg-center">BOLETO</v-list-tile-sub-title>
                                            <v-list-tile-sub-title class="secondary--text text-lg-center ">{{servicioDetalle.id}}</v-list-tile-sub-title>
                                            
                                        </v-list-tile-content>
                            
                                </v-list>
                            </v-flex>
                            <!-- <v-flex offset-xs3 offset-md4 md8 xs8>
                                <qr-code :text="qr" :size="200" error-level="M"></qr-code>
                            </v-flex> -->

                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <!-- <v-btn color="orange darken-1" flat
                           @click.native="resendMail"
                           :loading="this.loading"
                           :disabled="this.loading"
                    >Reenviar a email
                    </v-btn> -->
                    <v-spacer></v-spacer>
                    <v-btn color="primary darken-1" flat @click="$store.dispatch('Booking/set_detalle', {detalle: false});   ">Cerrar</v-btn>
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
     name: 'modalDetalle', 
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

          //  this.modal.status = 'done'
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
        servicioDetalle: ['Booking/servicioDetalle'],
        detalle: ['Booking/detalle']
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
