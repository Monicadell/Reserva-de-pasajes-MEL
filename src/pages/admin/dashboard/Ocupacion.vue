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
            text: 'Ocupación Servicios próximos'
          },
          xAxis: {
            categories: ['Servicio 1', 'Servicio 2', 'Servicio 3', 'Servicio 4', 'Servicio 5', 'Servicio 6', 'Servicio 7', 'Servicio 8', 'Servicio 9', 'Servicio 10']
          },
          yAxis: {
            min: 0,
            title: {
              text: 'Asientos'
            },
            stackLabels: {
              enabled: true
              // style: {
              //   fontWeight: 'bold',
              //   color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
              // }
            }
          },
          legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor: 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
          },
          tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
          },
          plotOptions: {
            column: {
              stacking: 'normal',
              dataLabels: {
                enabled: true,
                color: 'white'
              }
            }
          },
          series: [{
          //   {
          //   name: 'Asientos Totales',
          //   data: [84, 42, 42, 100, 150, 84, 42, 42, 100, 150],
          //   color: '#ff9800'
        // },
          // {
            name: 'Ocupados',
            data: [20, 39, 30, 60, 90, 64, 3, 12, 40, 60],
            color: '#1976D2'
          }, {
            name: 'Libres',
            data: [64, 3, 12, 40, 60, 20, 39, 30, 60, 90],
            color: '#646464'}]
        }
      }
    },
    components: {
      Highcharts: Chart
    },
    mounted () {
    },
    methods: {
    }
  }
</script>

<style>

</style>
