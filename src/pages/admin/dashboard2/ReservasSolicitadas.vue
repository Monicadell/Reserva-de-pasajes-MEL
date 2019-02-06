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
          chart: {
            type: 'column'
          },
          title: {
            text: 'Cantidad de reservas el último mes'
          },
          // subtitle: {
          // text: 'Source: WorldClimate.com'
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
            min: 0,
            title: {
              text: 'Cantidad de reservas'
            }
          },
          tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
          },
          plotOptions: {
            column: {
              pointPadding: 0.2,
              borderWidth: 0
            }
          },
          series: [{
            name: '',
            data: [300, 715, 1041, 1292, 1440, 1760, 1356, 1485, 2164, 1941, 956, 544, 300, 715, 1041, 1292, 1440, 1760, 1356, 1485, 2164, 1941, 956, 544, 1356, 1485, 2164, 1941, 956, 544],
            color: '#1976D2'
          }]
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
