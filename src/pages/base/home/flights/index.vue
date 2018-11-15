<template>
  <v-card class="card-flights" fill-height dark>
    <v-container fluid fill-height class="pl-0 pr-0 pt-3 mt-5">
      <v-layout row fill-height wrap justify-space-around>

        <v-flex xs12 md12 class="pb-5 text-xs-center">
          <v-card-text class="pb-0">
            <h1 class="mb-0 uppercase">
              Itinerario de vuelos
            </h1>
            <h3 class="uppercase">
              Aeropuerto antofagasta
            </h3>
          </v-card-text>
        </v-flex>

        <v-flex xs6 md6 pb-3>
          <v-card-text class="pt-0">
              <h2 class="uppercase pb-4">
                <v-icon large color="white">flight_land</v-icon>
                Llegadas
              </h2>
              <v-data-table
                :headers="llegadasHeader"
                :items="flights.llegadas"
                hide-actions
                class="elevation-1 flight-th"
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
             <h2 class="uppercase pb-4">
              <v-icon large color="white" right>flight_takeoff</v-icon>
              Salidas
            </h2>
            <v-data-table
                :headers="salidasHeader"
                :items="flights.salidas"
                hide-actions
                class="elevation-1 flight-th"
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


<style lang="stylus">
  .flight-th .theme--dark.v-table thead th
    color: #ff9800;
  .flight-th .theme--dark.v-table thead th.sortable.active
    color: #ff9800;
  .card-flights.theme--dark.v-card
    background-color: rgba(66, 66, 66, 0.85)
    min-height: 100vh
    height 100%
  .card-flights.theme--dark.v-card .container.fill-height
    min-height: 100vh
    height 100%
</style>
