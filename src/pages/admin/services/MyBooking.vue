<template>
  <div>
    <div> <h2>Mis reservas</h2> </div>
    <v-data-table
        :headers="headers"
        :items="desserts"
        hide-actions
        class="elevation-1"
      >
      <template slot="items" slot-scope="props">
        <td class="">{{ props.item.origen }}</td>
        <td class="">{{ props.item.destino }}</td>
        <td class="">{{ props.item.fechaCompra }}</td>
        <td class="">{{ props.item.fechaEmbarcacion }}</td>
        <td class="text-xs-center">
        <v-dialog v-model="bookingDetails" persistent max-width="1000">
          <v-btn slot="activator" color="primary" dark>Ver Detalle</v-btn>
            <v-card>
                <v-card-title class="titulo-detalle  elevation-22">
                    <div>
                        <h3 class="headline ml-3 " style="font-weight: lighter;" >Detalles reserva</h3>
                    </div>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-sm>
                        
                        <v-layout wrap justify-center>
                          <v-flex xs12 sm6>
                                <v-list two-line style="padding-left: 53px;">
                                    <v-list-tile style="height: 40px;">
                                        <v-list-tile-content class="custom">
                                            <v-list-tile-sub-title class="white--text ml-4 text">Origen</v-list-tile-sub-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile class="pad" style="height: 40px;">
                                        <v-list-tile-content  class="custom2">
                                            <v-list-tile-sub-title class="white--text ml-4 text">Destino</v-list-tile-sub-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                     <v-list-tile class="pad" style="height: 40px;">
                                        <v-list-tile-content  class="custom">
                                            <v-list-tile-sub-title class="white--text ml-4 text">Telefono contacto</v-list-tile-sub-title>
                                        </v-list-tile-content>
                                     </v-list-tile>
                                      <v-list-tile class="pad" style="height: 40px;">    
                                        <v-list-tile-content  class="custom2">
                                            <v-list-tile-sub-title class="white--text ml-4 text">Servicio</v-list-tile-sub-title>
                                        </v-list-tile-content>
                                 </v-list-tile>
                                    <v-list-tile class="pad" style="height: 40px;">
                                        <v-list-tile-content  class="custom">
                                            <v-list-tile-sub-title class="white--text ml-4 text">Fecha de Embarcación</v-list-tile-sub-title>
                                        </v-list-tile-content>
                                         </v-list-tile>
                                          <v-list-tile class="pad" style="height: 40px;">
                                        <v-list-tile-content  class="custom2">
                                            <v-list-tile-sub-title class="white--text ml-4 text">Fecha de Compra</v-list-tile-sub-title>
                                        </v-list-tile-content>
                                         </v-list-tile>
                                          <v-list-tile class="pad" style="height: 40px;">
                                        <v-list-tile-content  class="custom">
                                            <v-list-tile-sub-title class="white--text ml-4 text" >Boleto</v-list-tile-sub-title>
                                        </v-list-tile-content>
                                         </v-list-tile>
                                   
                                </v-list>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-list two-line style="padding-right: 53px;" >
                                    <v-list-tile class="pad" style="height: 40px;">
                                        <v-list-tile-content  class="custom">
                                            <v-list-tile-title class="ml-4">{{selectedBooking.origen}}</v-list-tile-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile  class="pad" style="height: 40px;">
                                        <v-list-tile-content  class="custom2">
                                           
                                            <v-list-tile-title class="ml-4">{{selectedBooking.destino}}</v-list-tile-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile class="pad" style="height: 40px;">
                                        <v-list-tile-content  class="custom">
                                            
                                            <v-list-tile-title class="ml-4">{{selectedBooking.numeroTelefono}}</v-list-tile-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile class="pad" style="height: 40px;">
                                        <v-list-tile-content  class="custom2">
                                            
                                            <v-list-tile-title class="ml-4">{{selectedBooking.descripcionServicio}}</v-list-tile-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile class="pad" style="height: 40px;">
                                        <v-list-tile-content  class="custom">
                                            
                                            <v-list-tile-title class="ml-4">{{selectedBooking.fechaEmbarcacion}}</v-list-tile-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile class="pad"  style="height: 40px;">
                                        <v-list-tile-content  class="custom2">
                                            
                                            <v-list-tile-title class="ml-4">{{selectedBooking.fechaCompra}}</v-list-tile-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile  style="height: 40px; padding: 0px;">
                                        <v-list-tile-content  class="custom pad">
                                            
                                            <v-list-tile-title class="ml-4" >{{selectedBooking.boleto}}</v-list-tile-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
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
                    <v-btn color="primary darken-1" flat @click.native="bookingDetails = false">Cerrar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        </td>

        <td class="text-xs-center">
            <v-btn outline color="success"
               v-show="props.item.estado=='confirmar'">Confirmar</v-btn>
            <countdown v-show="props.item.estado=='pendiente'" :deadline="props.item.fechaEmbarcacion"/>
        </td>
        <td class="text-xs-center">
          <v-dialog v-model="confirmaAnular" persistent max-width="290">
            <v-btn slot="activator" outline color="error" dark>Anular</v-btn>
            <v-card>
              <v-card-title class="headline">¿Esta seguro de anular la reserva?</v-card-title>
              <v-card-text>Una vez realizada esta acción no podrá recuperar la reserva.</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary darken-1" flat @click.native="confirmaAnular = false">Volver</v-btn>
                <v-btn color="red darken-1" flat @click.native="confirmaAnular = false">Anular</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  import Countdown from './Countdown'
  
  export default {
    data () {
      return {
        currentTime: '',
        confirmaAnular: false,
        bookingDetails: false,
        selectedBooking: {
          descripcionServicio: 'Frec1',
          fechaEmbarcacion: '25/11/2018 20:48',
          fechaCompra: '20/10/2018 20:48',
          boleto: '23124fff',
          origen: 'MEL',
          destino: 'Complejo MEL',
          numeroTelefono: '889968489'
        },
        headers: [
          // {text: 'Documento Pasajero', value: 'documentoPasajero'},
          // {text: 'Pasajero', value: 'pasajero'},
          {text: 'Origen', value: 'origen'},
          {text: 'Destino', value: 'destino'},
          {text: 'Fecha Compra', value: 'fechaCompra'},
          {text: 'Fecha Embarcación', value: 'fechaEmbarcacion'},
          {text: '', value: 'details', sortable: false},
          {text: '', value: 'confirmar', sortable: false},
          {text: '', value: 'cancel', sortable: false}
        ],
        desserts: [
          {
            origen: 'COMPLEJO MEL',
            destino: 'Antofagasta',
            fechaCompra: '20/10/2018 11:48',
            fechaEmbarcacion: '25/11/2018 20:48',
            estado: 'pendiente'
          },
          {
            origen: 'COMPLEJO MEL',
            destino: 'MEL',
            fechaCompra: '22/10/2018 11:48',
            fechaEmbarcacion: '20/11/2018 20:48',
            estado: 'pendiente'
          },
          {
            origen: 'COMPLEJO MEL',
            destino: 'MEL',
            fechaCompra: '22/10/2018 11:48',
            fechaEmbarcacion: '10/11/2018 20:48',
            estado: 'confirmar'
          }
        ]
      }
    },
    components: {
      Countdown: Countdown
    }
  }
</script>

<style>
   .v-list--two-line .v-list__tile .custom {
       background: #1565c0;
       color: white;
        width: 400px;
      font-size: 18px;
       height: 40px;
        padding: 2px;
   }

   .v-list--two-line .v-list__tile .custom2 {
       background: #4e96e9;
       color: white;
        height: 40px;
        font-size: 18px;
         padding: 2px;
   } 

    .v-list__tile  {
        padding: 2px;
        
    }

    .v-list--two-line .v-list__tile {
        height: 40px;   
    }
    .v-list__tile__sub-title.text {
        font-size: 18px;
    }

    .v-card__title.titulo-detalle {
        background: #1565c0;
        color: white;
        font-weight: lighter;
    }


</style>
