<template>
   
  <v-container grid-list-md text-xs-center>
    <v-select
      :items="origenes"
      label="Seleccionar tramo"
      box
      item-text="source_name" item-value="source_id"
      @change="selectedTrip()"
      v-model="origenSeleccionado"
    ></v-select>
    <highcharts :options="chartOptions"></highcharts>
    <div v-if="point.nameTrip !== ''" class="pa-3 text-xs-left white"><b>Data punto seleccionado:</b>
      <p class="ma-0"><b>Tramo:</b> {{point.nameTrip}} - <b>Horario: </b> {{point.horario}} -<b> Ocupación:</b> {{point.ocupacion}}</p>
    </div>
    <ranking-servicios :tramo="selectedTrip"/>
  </v-container>
  
</template>

<script>
  import API from '@pi/app'
  // import moment from 'moment'
  // import {mapGetters} from 'vuex'
  import {Chart} from 'highcharts-vue'
  import RankingServicios from './RankingServicios'

  export default {
    data () {
      const self = this
      return {
        tramos: ['Tramo1', 'Tramo2', 'Tramo 3', 'Tramo 4'],
        trips: [],
        origenes: [],
        selectedTrip: '',
        origenSeleccionado: 1,
        point: {
          nameTrip: '',
          ocupacion: '',
          horario: ''
        },
        chartOptions: {
          title: {
            text: 'Ocupación de servicios acumulados por tramo'
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
              text: '% ocupación'
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
              },
              // pointStart: 2010
              events: {
                click: function (event) {
                  self.onClickChart(event.point, this)
                }
              }
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
      highcharts: Chart,
      RankingServicios
    },
    mounted () {
      this.getInfo()
      this.getTrips()
    },
    watch: {
      origenSeleccionado (val) {
        this.chartOptions.series = []
        this.selectTrip()
      }
    },
    methods: {
      onClickChart (point, chartData) {
        console.log('function click chart, point', point)
        console.log('function click chart, data', chartData)
        this.point.nameTrip = chartData.name
        const tramo = this.trips.filter(item => item.name === this.point.nameTrip)
        console.log('tramo click', tramo)
        this.selectedTrip = tramo
        this.point.ocupacion = point.y
        this.point.horario = point.series.data[point.x].category
      },
      async getTrips () {
        let trips = await API.get('trips')
        if (trips.status >= 200 && trips.status < 300) {
          // const intersection = trips.data.data.filter(source_id => this.stations.includes(source_id));
          // console.log(intersection)
          console.log('trips', trips.data.data)
          this.trips = trips.data.data
          this.selectTrip()
        }
      },
      selectTrip () {
        const tripsFilter = this.trips.filter(item => item.source_id === this.origenSeleccionado)
        this.origenes = this.trips.filter(item => item.source_id)
        // const tripsname = this.trips.map(item => item.name)
        // console.log('series', this.chartOptions.series)
        // console.log('trios name', this.chartOptions.series)
        tripsFilter.forEach((element, index) => {
          this.chartOptions.series.push({
            name: element.name,
            data: [this.getRandom(), this.getRandom(), this.getRandom(), this.getRandom(), this.getRandom(), this.getRandom(), this.getRandom(), this.getRandom()]
          })
        })
        console.log(this.chartOptions.series)
      },
      getRandom () {
        return Math.floor((Math.random() * 100) + 1)
      },
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
      }
    }
  }
</script>

<style>

</style>
