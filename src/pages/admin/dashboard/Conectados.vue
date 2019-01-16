<template>
  <v-container grid-list-md text-xs-center>
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
        chartOptions: {
          title: {
            text: 'Usuarios conectados recientemente'
          },
          // subtitle: {
          //   text: 'Source: thesolarfoundation.com'
          // },
          xAxis: {
            categories: [
              '17/12',
              '18/12',
              '19/12',
              '20/12',
              '21/12',
              '22/12',
              '23/12',
              '24/12',
              '25/12',
              '26/12',
              '27/12',
              '28/12',
              '29/12',
              '30/12',
              '31/12',
              '1/01',
              '2/01',
              '3/01',
              '4/01',
              '5/01',
              '7/01',
              '8/01',
              '9/01',
              '10/01',
              '11/01',
              '12/01',
              '13/01',
              '14/01',
              '15/01',
              '16/01'
            ],
            crosshair: true
          },
          yAxis: {
            title: {
              text: 'Cantidad de conectados'
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
          series: [{
            name: '',
            data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
            color: '#1976D2'
          }],
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
    },
    methods: {
    }
  }
</script>

<style>

</style>
