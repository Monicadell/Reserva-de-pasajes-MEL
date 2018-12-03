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
                                           <v-icon color="primary" size=35> directions_bus</v-icon>
                                        </v-list-tile-action>
                                        <v-list-tile-content >
                                            <v-list-tile-sub-title class="black--text dtl-subtitulo">RUTA:</v-list-tile-sub-title>
                                            <v-list-tile-sub-title class="secondary--text dtl-text"> {{servicioDetalle.service.from}} - {{servicioDetalle.service.to}} </v-list-tile-sub-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile  >
                                           <v-list-tile-action>
                                           <v-icon color="primary" size=35>location_on</v-icon>
                                        </v-list-tile-action>
                                        <v-list-tile-content class="custom-text" >
                                            <v-list-tile-sub-title class="black--text dtl-subtitulo">SALIDA:</v-list-tile-sub-title>
                                            <v-list-tile-sub-title class="secondary--text dtl-text">{{servicioDetalle.service.departure}}{{servicioDetalle.service.date}} </v-list-tile-sub-title>
                                            <v-list-tile-sub-title class="secondary--text dtl-text">{{servicioDetalle.service.from}}</v-list-tile-sub-title>
                                            
                                        </v-list-tile-content>
                                    </v-list-tile>
                                     <v-list-tile  >
                                         

                                        <v-list-tile-action>
                                           <v-icon color="primary" size=35>location_on</v-icon>
                                        </v-list-tile-action>
                                        <v-list-tile-content class="custom-text"  >   
                                            <v-list-tile-sub-title class="black--text dtl-subtitulo">LLEGADA:</v-list-tile-sub-title>
                                            <v-list-tile-sub-title class="secondary--text dtl-text">{{servicioDetalle.service.arrival}}</v-list-tile-sub-title>
                                            <v-list-tile-sub-title class="secondary--text dtl-text">{{servicioDetalle.service.to}}</v-list-tile-sub-title>
                                        </v-list-tile-content>

                                     </v-list-tile>
                                </v-list>
                            </v-flex>
                            <v-flex xs4 >
                                <v-list three-line  >
                                    <v-list-tile  >
                                         <v-list-tile-action>
                                           <v-icon color="primary" size=35>error_outline</v-icon>
                                        </v-list-tile-action>
                                        <v-list-tile-content  >
                                            <v-list-tile-sub-title class="black--text dtl-subtitulo">ESTADO:</v-list-tile-sub-title>
                                            <v-list-tile-sub-title class="secondary--text dtl-text ">{{estadoTickete}}</v-list-tile-sub-title>
                                            
                                        </v-list-tile-content>

                                    
                                    </v-list-tile>
                                    <v-list-tile   >
                                        <v-list-tile-action>
                                           <v-icon color="primary" size=35>access_time</v-icon>
                                        </v-list-tile-action>
                                        <v-list-tile-content  >
                                            <v-list-tile-sub-title class="black--text dtl-subtitulo">DURACIÓN</v-list-tile-sub-title>
                                            <v-list-tile-sub-title class="secondary--text dtl-text">{{servicioDetalle.service.duration}}</v-list-tile-sub-title>

                                        </v-list-tile-content>


                                    </v-list-tile>
                                    <v-list-tile  >
                                        <v-list-tile-action>
                                           <v-icon color="primary" size=35>stars</v-icon>
                                        </v-list-tile-action>
                                        <v-list-tile-content class="custom-text" >
                                            <v-list-tile-sub-title class="black--text dtl-subtitulo">SERVICIO</v-list-tile-sub-title>
                                            <v-list-tile-sub-title class="secondary--text dtl-text">{{servicioDetalle.service.name}}</v-list-tile-sub-title>

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
                                            <img src="../../../../static/img/Tandem_reserva.png" class= "ml-2">
                                            
                                            <v-list-tile-sub-title class="black--text text-lg-center dtl-titulo">BOLETO</v-list-tile-sub-title>
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
      },
      statusTicket: '' 
    }),
    mounted () {
      //  console.log('********')
      const tickete = this.servicioDetalle
     //   console.log(tickete)
    },
    methods: {
      async confirmarReserva() {
        const idServicio = this.servicioConfirmar.id
        try {
          let confirmacion = await API.patchNoRest('tickets', idServicio,'confirm') 
          //  this.modal.status = 'done'
        } catch (e) {
          console.log('error al confirmar reserva, modal detalle', e.response)
          alert('Ha ocurrido un error!')
        }
      },
      cerrar() {
        setTimeout(() => {
          this.modal.status = 'none'
        }, 2000)
        this.$store.dispatch('Booking/set_detalle', {
          detalle: false
        })
      }
    },
    computed: {
      ...mapGetters({
        service: ['Booking/service'],
        selected: ['Booking/selected'],
        current: ['Booking/current'],
        ruta: ['Booking/ruta'],
        servicioDetalle: ['Booking/servicioDetalle'],
        detalle: ['Booking/detalle'],
        estadoTickete: ['Booking/estadoTickete']
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

    .dtl-titulo{
        font-size: 1.6em;
        color:#05182e;
        letter-spacing: 0.1em ;
    }

    .dtl-subtitulo {
        line-height: 1.2em;
        font-size: 0.8em;        
    }

    .dtl-text {
        line-height: 1.2em;
    }

  
    
</style>
