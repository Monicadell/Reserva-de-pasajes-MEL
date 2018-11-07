<template>
  <v-card color="grey darken-3" dark>
    <v-container fluid class="pl-0 pr-0 pt-5 mt-5">
      <v-layout align-center justify-center row fill-height>
        <v-flex xs6>
          <v-card-text>
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
