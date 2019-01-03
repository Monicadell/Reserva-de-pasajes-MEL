<template>
  <div>
    <v-card >
      <v-card-title style="height: 45px" class="barra-reservas">
        Mis reservas
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="ticketsList"
        class="elevation-1 "
        @update:pagination="updatePagination" 
      >
      <template slot="items" slot-scope="props" v-if ="consulta">
        <td class="">{{ props.item.service.from }}</td>
        <td class="">{{ props.item.service.to }}</td>
        <td class="">{{ moment(props.item.booked_at).format('DD-MM-YYYY') }}</td>
        <td class="">{{ props.item.service.date }} {{ props.item.service.departure }}</td>
        <td class="text-xs-center">
        <v-dialog v-model="bookingDetails" persistent max-width="1000">
          <v-btn slot="activator" color="primary" dark @click="verDetalle(props.item)">Ver Detalle</v-btn>
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
                                <v-list three-line >
                                    <v-list-tile >
                                        <v-list-tile-action>
                                           <v-icon color="primary" size=50> directions_bus</v-icon>
                                        </v-list-tile-action>
                                        <v-list-tile-content >
                                            <v-list-tile-sub-title class="black--text font-weight-bold">LINEA TANDEM</v-list-tile-sub-title>
                                            <v-list-tile-sub-title class="grey--text ">RUTA: {{selectedBooking.service.from}} - {{selectedBooking.service.to}}</v-list-tile-sub-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile  >
                                        <v-list-tile-action>
                                           <v-icon color="primary" size=50>airline_seat_recline_extra</v-icon>
                                        </v-list-tile-action>
                                        <v-list-tile-content  >
                                            <v-list-tile-sub-title class="black--text font-weight-bold ">Nº DE ASIENTO</v-list-tile-sub-title>
                                            <v-list-tile-sub-title class="grey--text  ">ASIENTO Nº {{selectedBooking.seat}}</v-list-tile-sub-title>
                                            
                                        </v-list-tile-content>
                                    </v-list-tile>
                                     <v-list-tile  >
                                         <v-list-tile-action>
                                           <v-icon color="primary" size=50>access_time</v-icon>
                                        </v-list-tile-action>
                                        <v-list-tile-content  >
                                            <v-list-tile-sub-title class="black--text font-weight-bold">DURACIÓN</v-list-tile-sub-title>
                                            <v-list-tile-sub-title class="grey--text">{{selectedBooking.service.duration}}</v-list-tile-sub-title>

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
                                            <v-list-tile-sub-title class="black--text font-weight-bold">SALIDA</v-list-tile-sub-title>
                                            <v-list-tile-sub-title class="grey--text">{{selectedBooking.service.departure}} {{selectedBooking.service.date}}</v-list-tile-sub-title>
                                            <v-list-tile-sub-title class="grey--text">{{selectedBooking.service.from}}</v-list-tile-sub-title>
                                            
                                        </v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile   >
                                        <v-list-tile-action>
                                           <v-icon color="primary" size=54>location_on</v-icon>
                                        </v-list-tile-action>
                                        <v-list-tile-content class="custom-text"  >
                                           
                                            <v-list-tile-sub-title class="black--text font-weight-bold">LLEGADA</v-list-tile-sub-title>
                                            <v-list-tile-sub-title class="grey--text">{{selectedBooking.service.arrival}}</v-list-tile-sub-title>
                                            <v-list-tile-sub-title class="grey--text">{{selectedBooking.service.to}}</v-list-tile-sub-title>


                                        </v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile  >
                                        <v-list-tile-action>
                                           <v-icon color="primary" size=50>stars</v-icon>
                                        </v-list-tile-action>
                                        <v-list-tile-content class="custom-text" >
                                            <v-list-tile-sub-title class="black--text font-weight-bold">SERVICIO</v-list-tile-sub-title>
                                            <v-list-tile-sub-title class="grey--text">{{selectedBooking.service.name}}</v-list-tile-sub-title>

                                        </v-list-tile-content>
                                    </v-list-tile>
                                   
                                </v-list>
                            </v-flex>

                            <v-flex xs4 style="align-self: center;"> 
                                <v-list   >
                                    <v-list-tile  >
                                        <v-list-tile-avatar tile>
                                            <img src="../../../../static/img/logo-tandem.png">
                                        </v-list-tile-avatar>
                                        <v-list-tile-content  >
                                            <v-list-tile-sub-title class="primary--text font-weight-bold">BOLETO</v-list-tile-sub-title>
                                            <v-list-tile-sub-title class="">{{selectedBooking.id}}</v-list-tile-sub-title>
                                            
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
            <!--v-btn outline color="success"
               v-show="props.item.estado=='confirmar'">Confirmar</v-btn> -->
            <countdown  :date="props.item.service.date" :time="props.item.service.departure" :id="props.item.id"/>
        </td>
        <td class="text-xs-center">
          <v-dialog v-model="confirmaAnular" persistent max-width="490">
            <v-btn slot="activator" outline color="error" dark  >Anular</v-btn>
            <v-card>
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
                <v-btn color="primary darken-1" flat @click.native="confirmaAnular = false">Volver</v-btn>
                <v-btn color="red darken-1" flat @click.native="confirmaAnular = false" @click="anular(props.item)">Anular</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </td>
      </template>
    </v-data-table>
    </v-card>

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
  import {mapGetters} from 'vuex'
  import Countdown from './Countdown'
  // import axios from 'axios'
  import API from '@pi/app'
  import Modal from '@c/Modal'

  export default {
    data () {
      return {
        currentTime: '',
        confirmaAnular: false,
        bookingDetails: false,
        showModal: false,
        modalInfoTitle: '',
        modalInfoDetail: '',
        modalInfoBtn1: '',
        selectedBooking: {
          service: {
          },
          descripcionServicio: 'Frec1',
          fechaEmbarcacion: '25/11/2018 20:48',
          fechaCompra: '20/10/2018 20:48',
          boleto: '23124fff',
          origen: 'MEL',
          destino: 'Complejo MEL',
          numeroTelefono: '889968489'
        },
        consulta: false,
        headers: [
          // {text: 'Documento Pasajero', value: 'documentoPasajero'},
          // {text: 'Pasajero', value: 'pasajero'},
          {text: 'Origen', value: 'origen'},
          {text: 'Destino', value: 'destino'},
          {text: 'Fecha Reserva', value: 'fechaCompra'},
          {text: 'Fecha Embarcación', value: 'fechaEmbarcacion'},
          {text: '', value: 'details', sortable: false},
          {text: '', value: 'confirmar', sortable: false},
          {text: '', value: 'cancel', sortable: false}
        ],
        ticketsList: []
      }
    },
    components: {
      Countdown: Countdown,
      modal: Modal
    },
    methods: {
      async getReservas () {
        // const userId = {
        //   'user_id': 113162
        // }
        try {
          const tickets = await API.get('my_tickets')
          // console.log('my tickets', tickets)
          if (tickets.status >= 200 && tickets.status < 300) {
            setTimeout(() => {
              this.ticketsList = Object.assign([], tickets.data.data)
              // console.log('reservas', this.ticketsList)
              this.consulta = true
            }, 2000)
          }
        } catch (e) {
          console.log('Error ', e.response)
          this.showModal = true
          this.modalInfoTitle = 'Ha ocurrido un error'
          this.modalInfoDetail = 'Ha ocurrido un error al obtener las reservas.'
          this.modalInfoBtn1 = 'OK'
        }
      },
      verDetalle (item) {
        console.log(item)
        this.selectedBooking = Object.assign([], item)
      },
      updatePagination (pagination) {
      //  console.log('update:pagination', pagination)
      },
      async anular (item) {
        console.log('xxxxx')
        console.log(item)
        console.log('voy a eliminar', item)
        try {
          let eliminando = await API.delete('tickets', item.id)
          if (eliminando.status >= 200 && eliminando.status < 300) {
            console.log('ya hizo DELETE', eliminando)
            this.confirmaAnular = false
            console.log(eliminando)
            this.getReservas()
          }
        } catch (e) {
          console.log('error al anular reserva ', e.response)
          alert('Ha ocurrido un error al anular reserva')
        }
      }
    },
    mounted () {
      this.getReservas()
    },
    watch: {
      reservaRealizada () {
        console.log(`se hizo una reserva ${this.reservaRealizada}`)
        this.getReservas()
        this.$store.dispatch('Booking/set_reservaRealizada', {
          reservaRealizada: false
        })
      }
    },
    computed: {
      ...mapGetters({
        reservaRealizada: ['Booking/reservaRealizada']
      })
    }
  }
</script>

<style>
 
    .v-list__tile__content.custom-text {
        line-height: 1.2;
    }
    

  
    .v-card__title.titulo-detalle {
        background: #1565c0;
        color: white;
        font-weight: lighter;
    }
 
    .v-card__title.barra-reservas {
        background: #1565c0;
        color: white;
        font-size: 18px;
    }


</style>
