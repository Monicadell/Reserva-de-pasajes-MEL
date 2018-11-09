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
        <td class="">
        <v-dialog v-model="bookingDetails" persistent max-width="1000">
          <v-btn slot="activator" color="primary" dark>Ver Detalle</v-btn>
            <v-card>
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-3">Detalles reserva</h3>
                    </div>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                         <v-flex xs12 sm6>
                                <v-list two-line subheader>
                                    <v-list-tile>
                                        <v-list-tile-content>
                                            <v-list-tile-sub-title>Origen</v-list-tile-sub-title>
                                            <v-list-tile-title>{{selectedBooking.origen}}</v-list-tile-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile>
                                        <v-list-tile-content>
                                            <v-list-tile-sub-title>Destino</v-list-tile-sub-title>
                                            <v-list-tile-title>{{selectedBooking.destino}}</v-list-tile-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                     <v-list-tile>
                                        <v-list-tile-content>
                                            <v-list-tile-sub-title>Telefono contacto</v-list-tile-sub-title>
                                            <v-list-tile-title>{{selectedBooking.numeroTelefono}}</v-list-tile-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                   
                                </v-list>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-list two-line subheader>
                                    <v-list-tile>
                                        <v-list-tile-content>
                                            <v-list-tile-sub-title>Servicio</v-list-tile-sub-title>
                                            <v-list-tile-title>{{selectedBooking.descripcionServicio}}
                                            </v-list-tile-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile>
                                        <v-list-tile-content>
                                            <v-list-tile-sub-title>Fecha embarcación</v-list-tile-sub-title>
                                            <v-list-tile-title>{{selectedBooking.fechaEmbarcacion}}</v-list-tile-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile>
                                        <v-list-tile-content>
                                            <v-list-tile-sub-title>Fecha compra</v-list-tile-sub-title>
                                            <v-list-tile-title>{{selectedBooking.fechaCompra}}</v-list-tile-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile>
                                        <v-list-tile-content>
                                            <v-list-tile-sub-title>Boleto</v-list-tile-sub-title>
                                            <v-list-tile-title>{{selectedBooking.boleto}}</v-list-tile-title>
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

        <td class="">
            <v-btn outline color="success"
              :disabled="props.item.estado == 'confirmar' ? disabled : ''" >Confirmar</v-btn>
            <countdown :deadline="props.item.fechaEmbarcacion"/>
        </td>
        <td class="">
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
          {text: 'Fecha Embarcacion', value: 'fechaEmbarcacion'},
          {text: '', value: 'details'},
          {text: '', value: 'confirmar'},
          {text: '', value: 'cancel'}
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