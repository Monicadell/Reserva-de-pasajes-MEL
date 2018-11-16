<template>
  <v-card class="card-flights" fill-height>
    <v-container fluid fill-height class="pl-0 pr-0">
      <v-layout row fill-height wrap align-center justify-space-around>
        <v-flex class="ml-5 pb-5 text-xs-left container-titulo-vuelos">
          <div class="contiene-avion pl-4">
            <v-card-text class="px-1 py-1 primary contiene-icono">
              <v-icon large color="white" class="icon-avion">flight</v-icon>
            </v-card-text>
          </div>
          <div class="titulo-flights white--text">      
            <h1 class="mb-0 uppercase">
              Itinerario de vuelos
            </h1>
            <h3 class="uppercase light">
              Aeropuerto de antofagasta
            </h3>
          </div>
        </v-flex>

        <v-flex xs6 md6 pb-3>
          <v-card-text class="pt-0">
              <h2 class="uppercase pb-4 white--text light ml-5">
                <v-icon large color="white">flight_land</v-icon>
                Llegadas
              </h2>
              <v-data-table
                :headers="llegadasHeader"
                :items="flights.llegadas"
                hide-actions
                class="elevation-1 flight-th ml-5"
              >
                <template slot="items" slot-scope="props">
                  <td>{{ props.item[0] }}</td>
                  <td>{{ props.item[1] }}</td>
                  <td>{{ props.item[2] }}</td>
                  <td>{{ props.item[3] }}</td>
                </template>
              </v-data-table>
          </v-card-text>
        </v-flex>
        <v-flex xs6 md6 pb-3>
          <v-card-text class="pt-0">
             <h2 class="uppercase pb-4 white--text light">
              <v-icon large color="white" right>flight_takeoff</v-icon>
              Salidas
            </h2>
            <v-data-table
                :headers="salidasHeader"
                :items="flights.salidas"
                hide-actions
                class="elevation-1 flight-th mr-5"
              >
                <template slot="items" slot-scope="props">
                  <td>{{ props.item[0] }}</td>
                  <td>{{ props.item[1] }}</td>
                  <td>{{ props.item[2] }}</td>
                  <td>{{ props.item[3] }}</td>
                </template>
              </v-data-table>
          </v-card-text>

        </v-flex>
        <v-flex xs12>
          <hr class="linea-vuelos">
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

  export default {
    data: () => ({
      flights: [],
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
    },
    methods: {
      async getFlights () {
        let flights = await API.get()
        console.log(flights)
        this.flights = flights.data
      }
    }
  }
</script>


<style>
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
  }
  .contiene-icono i{
    padding-top: 10px;
    text-align: center;
    padding-left: 3px;
  }
  .flight-th .v-table thead th{
    color: #fff;
    font-size: 1.2em;
    background-color: #1565c0;
  }
  .flight-th .v-table.theme--light thead th.column.sortable.active{
    color: #fff;
  }
  .flight-th .v-table.theme--light thead th.column.sortable.active i{
    color: #fff;
  }
  .flight-th .v-table.theme--light thead th.column.sortable:hover{
    color: #fff;
  }
  .flight-th .v-table.theme--light tbody{
    color: #1565c0;
  }
  .flight-th .v-table.theme--light tbody td{
    font-size: 1.1em;
  }
  .card-flights.v-card.theme--light{
    background-color: rgba(66, 66, 66, 0.85);
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
  .icon-avion{
    font-size: 50px
  }
 
</style>
