<template>
  <v-container align-center text-xs-center>
    <highcharts :options="chartOptions" class="enter"></highcharts>
  </v-container>
  
</template>

<script>
  import API from '@pi/app'
  // import moment from 'moment'
  // import {mapGetters} from 'vuex'
  import {Chart} from 'highcharts-vue'

  export default {
    data () {
      return {
        services: [],
        chartOptions: {
          chart: {
            type: 'column',
            margin: 0
          },
          title: {
            text: 'Ocupación Servicios próximos'
          },
          xAxis: {
            categories: [],
            labels: {
              // autoRotation: [-10, -20, -30, -40, -50, -60, -70, -80, -90]
              rotation: -45
            }
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
          series: []
        }
      }
    },
    components: {
      Highcharts: Chart
    },
    mounted () {
      this.getServices()
    },
    methods: {
      async getServices () {
        console.log('get services')
        try {
          let servicios = await API.get('services')
          if (servicios.status >= 200 && servicios.status < 300) {
            const servicesname = servicios.data.data.filter(item => item.hrs_left < 3000 && item.hrs_left > 0).map(item => item.name)
            console.log('servicios', servicios.data.data)
            this.chartOptions.xAxis.categories = servicesname
            this.chartOptions.series = [{
              name: 'Asientos Ocupados',
              data: [20, 39, 30, 60, 90, 64, 3, 12, 40, 60],
              color: '#d84d14'
            }, {
              name: 'Libres',
              data: [64, 3, 12, 40, 60, 20, 39, 30, 60, 90],
              color: '#646464'}]
          }
        } catch (e) {
          console.log('error al cargar servicios', e.response)
          console.log('catch err', e.response)
          // this.$swal({
          //   customClass: 'modal-info',
          //   type: 'error',
          //   title: 'Ha ocurrido un error al obtener los servicios, intente más tarde.',
          //   text: e.response.data.error,
          //   animation: true,
          //   showCancelButton: true,
          //   showConfirmButton: false,
          //   cancelButtonText: 'Cerrar'
          // })
        }
      }
    }
  }
</script>

<style>

</style>
