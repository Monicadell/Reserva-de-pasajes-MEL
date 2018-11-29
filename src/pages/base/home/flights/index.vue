<template>
  <v-card class="card-flights" fill-height id="vuelos">
    <v-container fluid fill-height class="pl-0 pr-0">
      <v-layout row fill-height wrap align-center justify-space-around>
        <v-flex class="ml-5 text-xs-left container-titulo-vuelos">
          <div class="contiene-avion pl-4">
            <v-card-text class="px-1 py-1 contiene-icono">
              <v-icon large class="icon-avion">flight</v-icon>
            </v-card-text>
          </div>
          <div class="titulo-flights white--text pb-4">      
            <h1 class="mb-0 uppercase">
              Itinerario de vuelos
            </h1>
            <h1 class="mb-0 uppercase">
              Aeropuerto de antofagasta
            </h1>
          </div>
        </v-flex>

        <v-flex xs6 md6 pb-3 pl-5 pr-3>
          <v-card-text class="py-0 px-0 card-vuelos">
              <h2 class="uppercase py-2 pl-3 light amarillo-vuelos">
                <v-icon large class="amarillo-vuelos">flight_land</v-icon>
                Llegadas
              </h2>
              <v-data-table
                :headers="llegadasHeader"
                :items="flights.llegadas"
                hide-actions
                class="flight-th"
              >
                <template slot="items" slot-scope="props">
                  <td>{{ props.item[0] }}</td>
                  <td>{{ props.item[1] }}</td>
                  <td>{{ props.item[2] }}</td>
                  <td>{{ props.item[3] }}</td>
                </template>
                <template slot="footer">
                  <td :colspan="llegadasHeader.length">
                    <strong>Todas las llegadas de hoy  {{fecha}}</strong>
                  </td>
                </template>
              </v-data-table>
          </v-card-text>
        </v-flex>
        <v-flex xs6 md6 pb-3 pl-3 pr-5>
          <v-card-text class="py-0 px-0 card-vuelos">
             <h2 class="uppercase py-2 pl-3 amarillo-vuelos light">
              <v-icon large right class="amarillo-vuelos">flight_takeoff</v-icon>
              Salidas
            </h2>
            <v-data-table
                :headers="salidasHeader"
                :items="flights.salidas"
                hide-actions
                flat
                class="flight-th"
              >
                <template slot="items" slot-scope="props">
                  <td>{{ props.item[0] }}</td>
                  <td>{{ props.item[1] }}</td>
                  <td>{{ props.item[2] }}</td>
                  <td>{{ props.item[3] }}</td>
                </template>
                <template slot="footer">
                  <td :colspan="salidasHeader.length">
                    <strong>Todas las salidas de hoy  {{fecha}}</strong>
                  </td>
                </template>
              </v-data-table>
          </v-card-text>
        </v-flex>
        <v-flex xs10 text-xs-center>
          <v-btn fab flat large icon color="secondary" v-scroll-to="'#img3'" style="position: absolute; bottom: 40px; left: calc(50% - 25px)">
            <v-icon style="font-size: 80px">expand_more</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs12 class="py-4">
          <hr class="linea-vuelos mx-5">
        </v-flex>
         <v-flex xs12 text-xs-right pt-4 pr-4>
          <h4 class="white--text">Esta información está recopilada desde la base de datos de vuelos nacionales</h4>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>


<script>
  import API from '@pi/flights'
  import moment from 'moment'

  export default {
    data: () => ({
      flights: [],
      fecha: '',
      llegadasHeader: [
        {text: 'Nº vuelo', sortable: true, value: '0'},
        {text: 'Origen', sortable: true, value: '1'},
        {text: 'Hora', value: '2'},
        {text: 'Estado', value: '3'}
      ],
      salidasHeader: [
        {text: 'Nº vuelo', sortable: true, value: '0'},
        {text: 'Destino', sortable: true, value: '1'},
        {text: 'Hora', value: '2'},
        {text: 'Estado', value: '3'}
      ]
    }),
    mounted () {
      this.getFlights()
      this.currentDate()
    },
    methods: {
      async getFlights () {
        let flights = await API.get()
        console.log(flights)
        this.flights = flights.data
      },
      currentDate () {
        this.fecha = moment().format('DD-MM-YYYY')
      }
    }
  }
</script>


<style>
  .card-vuelos{
    background-color: rgba(64,64,64,0.8);
  }
  .amarillo-vuelos{
    color: rgba(250, 193, 99) !important;
  }
  .titulo-flights{
    order: 1;
    flex: 30;
  }
  .titulo-flights h1{
    font-size: 2.8em;
    text-transform: uppercase;
  }
  .titulo-flights h3{
    font-size: 1.2em;
  }
  .v-card__text.contiene-icono{
    border-radius: 50%;
    height: 70px;
    width: 70px;
    text-align: center;
    padding-right: 10px;
    background-color: rgba(250, 193, 99);
  }
  .contiene-icono i{
    padding-top: 10px;
    text-align: center;
    padding-left: 3px;
  }
  .flight-th table.v-table.theme--light{
    color: rgba(250, 193, 99);
    font-size: 1.2em;
    background-color: transparent;
  }
  .flight-th .v-table.theme--light thead th{
    color: rgba(250, 193, 99);
    font-size: 1.1em;
    background-color: transparent;
    padding: 0 14px;
  }
  .flight-th .v-table.theme--light tfoot td{
    color: #fff;
    font-size: 0.9em;
    background-color: transparent;
  }
  .flight-th .v-table.theme--light thead tr{
    border: none;
  }
  .flight-th .v-table.theme--light tfoot tr{
    border: none;
  }
  .flight-th .v-table.theme--light thead th.column.sortable.active{
    color: rgba(250, 193, 99);
  }
  .flight-th .v-table.theme--light thead th.column.sortable.active i{
    color: rgba(250, 193, 99);
  }
  .flight-th .v-table.theme--light thead th.column.sortable:hover{
    color: rgba(250, 193, 99);
  }
  .flight-th .theme--light.v-table tbody tr:hover:not(.v-datatable__expand-row) {
    background: rgba(84, 84, 84, 0.7);
  }
  .flight-th .v-table.theme--light tbody{
    color: #1565c0;
  }
  .flight-th .v-table.theme--light tbody tr:nth-child(even) {
    background: rgba(104, 104, 104, 0.7);
  }
  .flight-th .v-table.theme--light tbody td{
    font-size: 1em;
    color: #fff;
    padding: 5px 24px;
    height: auto !important;
  }
  .card-flights.v-card.theme--light{
    background-color: rgba(64, 64, 64, 0.7);
    min-height: 100vh;
    /* height 100%; */
  }
  .card-flights.v-card .container.fill-height{
    min-height: 100vh;
    /* height 100%; */
  }
  .linea-vuelos{
    border-color: rgba(255, 255, 255, 0.5)
  }
  .light{
    font-weight: 400;
  }
  .container-titulo-vuelos{
    display: flex;
    width: 100%;
  }
  .contiene-avion{
    order: 1;
    flex: 1;
    flex-basis: auto;
    align-self: center;
  }
  .theme--light.icon-avion{
    font-size: 50px;
    color: #fff;
  }
 
</style>
