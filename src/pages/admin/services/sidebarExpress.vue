<template>
  <v-navigation-drawer class="barra-express">
    <v-toolbar-title class="primary--text">
      <span class="hidden-sm-and-down ml-4 font-weight-black">Servicios próximos</span>
    </v-toolbar-title>
    <v-progress-linear :indeterminate="true" v-if="loadingDerecha"></v-progress-linear>
    <v-card flat class="media-alt">
      <v-card-title primary-title class="pb-1 pt-3">
        <span class="mb-0 title-ticket font-weight-black secondary--text darken-3">Hoy {{ moment(currenDate).format('DD-MM-YYYY')}}</span>
      </v-card-title>
      <v-divider class="divider-ticket ml-3"></v-divider>
        <v-data-table
          :headers="hoyHeaders"
          :items="hoy"
          hide-actions
          class="tabla-express pt-3"
          no-data-text="No hay viajes para hoy"
        >
          <template slot="items" slot-scope="props" >
            <td class="" @click="selectExpress(props.item)">{{ props.item.source }}</td>
            <td class="" @click="selectExpress(props.item)">{{ props.item.dest }}</td>
            <td class="" @click="selectExpress(props.item)">{{ moment(props.item.departure, 'HH:mm:ss').format('HH:mm') }}</td>
            <td class="text-xs-center">
              <v-icon
                small
                slot="activator"
                class="icono-select"
                @click="selectExpress(props.item)"
              >
                chevron_right
              </v-icon>
            </td>
          </template>
        </v-data-table>
    </v-card>
    <v-card flat class="media-alt">
      <v-card-title primary-title class="pb-1 pt-3">
      <span class="mb-0 title-ticket font-weight-black  secondary--text darken-3">Mañana {{ moment(tomorrowDate).format('DD-MM-YYYY')}}</span>
      </v-card-title>
      <v-divider class="divider-ticket ml-3"> </v-divider>
      <v-data-table
            :headers="mananaHeaders"
            :items="manana"
            hide-actions
            class="tabla-express pt-3"
            no-data-text="No hay viajes para mañana"
          >
          <template slot="items" slot-scope="props" >
            <td class="" @click="selectExpress(props.item)">{{ props.item.source }}</td>
            <td class="" @click="selectExpress(props.item)">{{ props.item.dest }}</td>
            <td class="" @click="selectExpress(props.item)">{{ moment(props.item.departure, 'HH:mm:ss').format('HH:mm') }}</td>
            <td class="text-xs-center">
              <v-icon
                small
                slot="activator"
                class="icono-select"
                @click="selectExpress(props.item)"
              >
                chevron_right
              </v-icon>
            </td>
          </template>
        </v-data-table>
    </v-card>
  </v-navigation-drawer>
</template>
<script>
  import ServiceExpress from './SelectedExpress'
  import moment from 'moment'
  import {mapGetters} from 'vuex'
  import API from '@pi/app'

  export default {
    data () {
      return {
      //  e1: 0,
        items: [],
        currenDate: '',
        tomorrowDate: '',
        loadingDerecha: true,
        hoyHeaders: [
          {text: 'Origen', value: 'origen', sortable: false, align: 'left'},
          {text: 'Destino', value: 'destino', sortable: false, align: 'left'},
          {text: 'Salida', value: 'email', sortable: false, align: 'left'},
          {text: 'Ir', value: '', sortable: false, align: 'center'}],
        hoy: [],
        mananaHeaders: [
          {text: 'Origen', value: 'origen', sortable: false},
          {text: 'Destino', value: 'destino', sortable: false},
          {text: 'Salida', value: 'salida', sortable: false},
          {text: 'Ir', value: '', sortable: false, align: 'center'}],
        manana: [],
        gridService: ''
      }
    },
    components: {
      ServiceExpress
    },
    computed: {
      ...mapGetters({
        fecha: ['Booking/fechaSeleccionada'],
        ruta: ['Booking/ruta'],
        actualizarReservas: ['Booking/actualizarReservas'],
        select: ['Booking/select'],
        e1: ['Booking/e1'],
        role: ['Auth/role'],
        grilla: ['Booking/grid']
      })
    },
    mounted () {
      this.currenDate = moment().format('YYYY-MM-DD')
      this.tomorrowDate = moment().add(1, 'days').format('YYYY-MM-DD')
      this.getExpress()
      // this.getUsers()
      // console.log('path', this.$route.path)
      // this.$store.dispatch('Booking/set_ruta', {ruta: {}})
      // this.$store.dispatch('Booking/set_listaServicios', {listaServicios: []})
      // this.$store.dispatch('Booking/set_anular', {anular: false})
      // this.$store.dispatch('Booking/set_actualizarReservas', {actualizarReservas: false})
      // this.$store.dispatch('Booking/set_fechaSeleccionada', {fechaSeleccionada: ''})
      // this.$store.dispatch('Booking/set_confirmar', {confirmar: false})
      // this.$store.dispatch('Booking/set_e1', {e1: 1})
      // this.$store.dispatch('Booking/set_detalle', {detalle: false})
      // this.$store.dispatch('Booking/set_actualizarVistaConfirmacion', {actualizarVistaConfirmacion: false})
      // this.$store.dispatch('Booking/set_listaReservas', {listaReservas: []})
      this.$store.dispatch('Booking/set_selectedExpress', {selectedExpress: false})
    },
    methods: {
      async getExpress () {
        console.log('get express')
        try {
          let servicios = await API.get('services', {'express': 1})
          if (servicios.status >= 200 && servicios.status < 300) {
            console.log('expres', servicios)
            setTimeout(() => {
              this.hoy = servicios.data.data.filter(service => service.date === this.currenDate)
              this.manana = servicios.data.data.filter(service => service.date === this.tomorrowDate)
              this.loadingDerecha = false
            }, 500)
          }
        } catch (e) {
          console.log('catch err, get express', e.response)
        }
      },
      selectExpress (servicioExpress) {
        // console.log('servicio expres seleccionado', servicioExpress)
        if (this.$route.path === '/reservaterceros' && this.role === 2) {
          console.log('es a terceros, cambiar container central')
          this.getGrid(servicioExpress.id)
          // this.$store.dispatch('Booking/set_selectedExpress', {selectedExpress: true})
          this.$store.dispatch('Booking/set_e1', {
            e1: 3
          })
          this.$store.dispatch('Booking/set_servicioExpress', {servicioExpress: servicioExpress})
        } else {
          this.$store.dispatch('Booking/set_selectedExpress', {selectedExpress: true})
          this.$store.dispatch('Booking/set_servicioExpress', {servicioExpress: servicioExpress})
        }
      },
      async getGrid (serv) {
        let g = '?grid'
        let grilla = await API.getgrid('services', serv, g)
        if (grilla.status >= 200 && grilla.status < 300) {
          this.gridService = grilla.data.data.grid
          console.log('result grilla', this.gridService)
          this.$store.dispatch('Booking/set_grid', {
            grid: this.gridService
          })
        }
      }
    }
  }
</script>

<style>
  aside.v-navigation-drawer.navegacion1 {
    width: 100% !important;
    transform: translateX(0px) !important; /* sin esto se arrancan los aside en pantallas pequeñas */
    z-index: 2;
  }
  aside.v-navigation-drawer.barra-express {
    width: 100% !important;
    height: calc(100vh - 120px) !important;
    background-color: #f5f5f5;
    transform: translateX(0px) !important; /* sin esto se arrancan los aside en pantallas pequeñas */
    z-index: 2;
  }
  .tabla-express{
    overflow-y: scroll;
    height: calc(100% - 40px);
  }
  /* .tabla-express.manana {
    height: calc(100% - 40px);
    overflow-y: scroll;
  } */
  .tabla-express .theme--light.v-table thead tr{
    height: auto;
  }
  .tabla-express .theme--light.v-table thead th{
    font-size: 10px;
    padding: 5px;
    text-transform: uppercase;
    font-weight: 600;
    /* color: #9e9e9e; */
  }
  .tabla-express .theme--light.v-table thead{
    font-size: 10px;
    padding: 10px 5px;
    text-transform: uppercase;
    font-weight: 600;
    /* color: #9e9e9e; */
    background-color: #f5f5f5;
  }
  .tabla-express .theme--light.v-table tbody td{
    font-size: 10px;
    padding: 7px 5px;
    height: auto;
  }
  .tabla-express .theme--light.v-table tbody tr:not(:last-child){
    border: none;
    background-color: #f5f5f5;
  }
  .tabla-express .theme--light.v-table tbody tr {
    background: #f5f5f5;
  }
  .tabla-express .theme--light.v-table tbody tr:hover,
  .tabla-express .theme--light.v-table tbody tr:hover:not(.v-datatable__expand-row){
    background: rgba(255, 255, 255, 0.4);
    cursor: pointer;
  }
  .icono-select{
    background-color: transparent;
    border: 1px solid #ccc;
    border-radius: 50%;
  }
  .tabla-express .theme--light.v-table tbody tr:hover .icono-select{
    background-color: #1565c0;
    border: 1px solid #1565c0;
    color: #fff;
    border-radius: 50%;
  }
  .v-list__tile.v-list__tile--link.v-list__tile--avatar.theme--light:hover .icono-select{
    background-color: #1565c0;
    border: 1px solid #1565c0;
    color: #fff;
    border-radius: 50%;
  }
</style>

