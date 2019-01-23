<template>
   
  <v-container grid-list-md text-xs-center>
    <!-- <v-select
      :items="tramos"
      label="Tramo"
      solo
      @change="changeTrip()"
    ></v-select> -->
    <highcharts :options="chartOptions"></highcharts>
  </v-container>
  
</template>

<script>
  // import API from '@pi/app'
  // import moment from 'moment'
  // import {mapGetters} from 'vuex'
  import {Chart} from 'highcharts-vue'

  export default {
    data () {
      return {
        tramos: ['Tramo1', 'Tramo2', 'Tramo 3', 'Tramo 4'],
        chartOptions: {
          title: {
            text: 'Ocupación de servicios por tramo'
          },
          chart: {
            type: 'spline'
          },
          // subtitle: {
          //   text: 'Source: thesolarfoundation.com'
          // },
          xAxis: {
            categories: [],
            crosshair: true
          },
          yAxis: {
            title: {
              text: 'Asientos libres/ servicio'
            }
          },
          legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
          },
          plotOptions: {
            series: {
              label: {
                connectorAllowed: false
              }
              // pointStart: 2010
            }
          },
          series: [],
          responsive: {
            rules: [{
              condition: {
                maxWidth: 500
              },
              chartOptions: {
                legend: {
                  layout: 'horizontal',
                  align: 'center',
                  verticalAlign: 'bottom'
                }
              }
            }]
          }
        }
      }
    },
    components: {
      highcharts: Chart
    },
    mounted () {
      this.getInfo()
    },
    methods: {
      getInfo () {
        this.chartOptions.xAxis.categories = [
          '02:00',
          '04:00',
          '06:00',
          '08:00',
          '10:00',
          '12:00',
          '14:00',
          '16:00',
          '18:00',
          '20:00',
          '22:00',
          '24:00'
        ]
        this.chartOptions.series = [{
          name: 'Tramo 1',
          data: [50, 20, 17, 58, 101, 70, 23, 43],
          // color: '#1976D2'
        },
        {
          name: 'Tramo 2',
          data: [22, 24, 17, 78, 81, 50, 13, 3],
          // color: '#1976D2'
        },
        {
          name: 'Tramo 3',
          data: [34, 56, 2, 77, 88, 54, 31, 10],
          // color: '#1976D2'
        },
        {
          name: 'Tramo 4',
          data: [45, 74, 47, 85, 24, 15, 2, 4],
          // color: '#1976D2'
        },
        {
          name: 'Tramo 5',
          data: [24, 20, 56, 33, 56, 46, 30, 34],
          // color: '#1976D2'
        },
        {
          name: 'Tramo 6',
          data: [44, 10, 4, 6, 1, 40, 43, 20],
          // color: '#1976D2'
        },
        {
          name: 'Tramo 7',
          data: [21, 0, 11, 38, 10, 60, 66, 33],
          // color: '#1976D2'
        },
        {
          name: 'Tramo 8',
          data: [2, 10, 15, 38, 11, 33, 22, 28],
          // color: '#1976D2'
        },
        {
          name: 'Tramo 9',
          data: [5, 2, 7, 29, 19, 44, 21, 22],
          // color: '#1976D2'
        },
        {
          name: 'Tramo 10',
          data: [55, 22, 47, 68, 71, 70, 45, 70],
          // color: '#1976D2'
        },
        {
          name: 'Tramo 11',
          data: [33, 53, 23, 43, 22, 44, 66, 77],
          // color: '#1976D2'
        },
        {
          name: 'Tramo 12',
          data: [33, 3, 4, 6, 12, 23, 22, 34],
          // color: '#1976D2'
        },
        {
          name: 'Tramo 13',
          data: [22, 24, 45, 66, 57, 77, 80, 81],
          // color: '#1976D2'
        },
        {
          name: 'Tramo 14',
          data: [50, 20, 17, 58, 101, 70, 23, 43],
          // color: '#1976D2'
        }]
      }
      // changeTrip () {
      //   this.chartOptions.xAxis.categories = [
      //     '02:00',
      //     '04:00',
      //     '06:00',
      //     '08:00',
      //     '10:00',
      //     '12:00',
      //     '14:00',
      //     '16:00',
      //     '18:00',
      //     '20:00',
      //     '22:00',
      //     '24:00'
      //   ]
      //   this.chartOptions.series = [{
      //     name: 'Tramo 1',
      //     data: [50, 20, 17, 58, 101, 70, 23, 43],
      //     color: '#1976D2'
      //   },
      //   {
      //     name: 'Tramo 2',
      //     data: [50, 20, 17, 58, 101, 70, 23, 43],
      //     color: '#1976D2'
      //   },
      //   {
      //     name: 'Tramo 3',
      //     data: [50, 20, 17, 58, 101, 70, 23, 43],
      //     color: '#1976D2'
      //   },
      //   {
      //     name: 'Tramo 4',
      //     data: [50, 20, 17, 58, 101, 70, 23, 43],
      //     color: '#1976D2'
      //   },
      //   {
      //     name: 'Tramo 5',
      //     data: [50, 20, 17, 58, 101, 70, 23, 43],
      //     color: '#1976D2'
      //   },
      //   {
      //     name: 'Tramo 6',
      //     data: [50, 20, 17, 58, 101, 70, 23, 43],
      //     color: '#1976D2'
      //   },
      //   {
      //     name: 'Tramo 7',
      //     data: [50, 20, 17, 58, 101, 70, 23, 43],
      //     color: '#1976D2'
      //   },
      //   {
      //     name: 'Tramo 8',
      //     data: [50, 20, 17, 58, 101, 70, 23, 43],
      //     color: '#1976D2'
      //   },
      //   {
      //     name: 'Tramo 9',
      //     data: [50, 20, 17, 58, 101, 70, 23, 43],
      //     color: '#1976D2'
      //   },
      //   {
      //     name: 'Tramo 10',
      //     data: [50, 20, 17, 58, 101, 70, 23, 43],
      //     color: '#1976D2'
      //   },
      //   {
      //     name: 'Tramo 11',
      //     data: [50, 20, 17, 58, 101, 70, 23, 43],
      //     color: '#1976D2'
      //   },
      //   {
      //     name: 'Tramo 12',
      //     data: [50, 20, 17, 58, 101, 70, 23, 43],
      //     color: '#1976D2'
      //   },
      //   {
      //     name: 'Tramo 13',
      //     data: [50, 20, 17, 58, 101, 70, 23, 43],
      //     color: '#1976D2'
      //   },
      //   {
      //     name: 'Tramo 14',
      //     data: [50, 20, 17, 58, 101, 70, 23, 43],
      //     color: '#1976D2'
      //   }]
      // }
    }
  }
</script>

<style>

</style>
