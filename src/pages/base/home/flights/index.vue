<template>
  <v-card color="" dark style="background-color: rgba(66, 66, 66, 0.8); heigth: 100vh">
    <v-container fluid class="pl-0 pr-0 pt-3 mt-5">
      <v-layout row fill-height>
        <v-flex xs12 class="text-xs-center">
          <v-card-text>
            <h2 class="mb-0 uppercase">
              Itinerario de vuelos
            </h2>
            <h3 class="uppercase">
              Aeropuerto antofagasta
            </h3>
          </v-card-text>
        </v-flex>
      </v-layout>
      <v-layout row fill-height>
        <v-flex xs6>
          <v-card-text>
              <h2 class="uppercase pb-2">
                <v-icon large color="white">flight_land</v-icon>
                Llegadas
              </h2>
              <v-data-table
                :headers="headers"
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
        <v-flex xs6>
          <v-card-text>
             <h2 class="uppercase pb-2">
              <v-icon large color="white" right>flight_takeoff</v-icon>
              Salidas
            </h2>
            <v-data-table
                :headers="headers"
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
      </v-layout>
    </v-container>
  </v-card>
</template>


<script>
  import API from '@pi/flights'

  export default {
    data: () => ({
      flights: [],
      headers: [
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
</style>
