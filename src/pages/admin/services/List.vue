<template>
  <!-- <div> -->
    <!-- <div > -->
    <v-card
    :class="{
      'elevation-1': !cargandoPeticion && listaServicios.length === 0,
      'elevation-2': listaServicios.length > 0,
      }"
      class="fadeinfwdfast"
    >
      <v-card-title class="barra-titulo-servicios">
        <v-btn fab dark small color="primary"  @click="$store.dispatch('Booking/set_e1', {e1: 1});   " >
          <v-icon >keyboard_arrow_left</v-icon>
        </v-btn>
        <v-spacer> </v-spacer>
        <span class="font-weight-medium"> Servicios disponibles </span>
        <v-spacer> </v-spacer>
      </v-card-title>
      <v-card-title class="barra-servicios primary">
        <v-spacer></v-spacer>
        <v-text-field
          append-icon="search"
          label="Filtrar"
          v-model="filter"
          single-line
          hide-details
          color="white"
          class="pt-0 white--text"
        ></v-text-field>
      </v-card-title>
      <v-data-table
        v-model="seleccionado"
        :loading="cargandoPeticion"
        :search="filter"
        :headers="headers"
        :items="listaServicios"
        class="elevation-1 list-th"
        item-key="id"
        no-data-text="No hay resultados para la ruta seleccionada"
        :rows-per-page-items="rowsNumber"
      >
        <template slot="items" slot-scope="props">
          <tr :class="{'primary white--text': booking && booking.id === props.item.id}">
            <td>{{ props.item.name }}</td>
            <td class="item-naranja">{{ moment(props.item.departure,'HH:mm:ss').format('HH:mm') }}</td>
            <td class="item-naranja">{{ moment(props.item.arrival,'HH:mm:ss').format('HH:mm')}}</td>
            <td>
              <v-icon color="primary" size=large class="ml-4">airline_seat_recline_extra</v-icon>
              {{ props.item.avail_seats }}
            </td>
            <v-btn outline color="primary" class="elevation-0 text-capitalize"  @click="resume(props.item)">Seleccionar</v-btn>
          </tr>
        </template>
      </v-data-table>
    </v-card>
</template>

<script>
  import {mapGetters} from 'vuex'
  import moment from 'moment'
  import API from '@pi/app'

  export default {
    data: () => ({
      listIsVisible: false,
      rowsNumber: [6],
      disableList: true,
      seleccionado: [],
      filter: '',
      gridService: [],
      moment: moment,
      loading: false,
      headers: [
        {text: 'Servicio', value: 'name', sortable: false},
        {text: 'Salida', value: 'from', sortable: false},
        {text: 'Llegada', value: 'to', sortable: false},
        {text: 'Cupos disponibles', value: 'asientos', sortable: false},
        {text: '', value: 'action', sortable: false}
      ],
      mientras: [
        {
          'arrival': '18:34:00',
          'avail_seats': 10,
          'car_id': null,
          'date': '2018-11-24',
          'departure': '15:20:00',
          'driver_id': null,
          'duration': null,
          'freq_id': null,
          'id': 61,
          'name': '21',
          'set': '15:00:00',
          'trip_id': 1
        }
      ]
    }),
    watch: {
      cargandoPeticion () {
        if (this.cargandoPeticion) {
          this.listIsVisible = true
        }
      }
    },
    mounted () {
      console.log('servicios')
      console.log(this.listaServicios)
    },
    methods: {
      resume (servicioSeleccionado) {
        console.log('servicio selecci9onado en list', servicioSeleccionado)
        if (this.role === 2) {
          this.getGrid(servicioSeleccionado.id)
          this.$store.dispatch('Booking/select', {selected: false})
          this.$store.dispatch('Booking/set_e1', {
            e1: 3
          })
        } else {
          this.$store.dispatch('Booking/select', {selected: true})
          // this.$store.dispatch('Booking/set_e1', {
          //   e1: 4
          // })
        }
        this.$store.dispatch('Booking/set_servicioSeleccionado', {servicioSeleccionado: servicioSeleccionado})
      },
      selectService (service) {
        console.log('seelect service', service)
        this.$store.dispatch('Booking/set_service', {service: service})
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
    },
    computed: {
      ...mapGetters({
        changed: ['Booking/changed'],
        search: ['Booking/current'],
        booking: ['Booking/service'],
        listaServicios: ['Booking/listaServicios'],
        cargandoPeticion: ['Booking/cargandoPeticion'],
        selected: ['Booking/select'],
        role: ['Auth/role']
      })
    }
  }
</script>

<style lang="stylus" scoped>
  .disableList
    pointer-events none
    opacity 0.1

</style>

<style>
  .barra-servicios .theme--light.v-text-field .v-input__slot:before {
    border-color: #fff;
  }
  .barra-servicios .theme--light.v-label {
    color: #fff;
  }
  .barra-servicios .theme--light.v-icon {
    color: #fff;
  }
  .barra-servicios .theme--light.v-input:not(.v-input--is-disabled) input{
    color: rgba(255,255,255, 0.9);
  }
  .barra-servicios .theme--light.v-text-field .v-input__slot:before {
      border-color: rgba(255,255,255,.42);
  }
  .barra-servicios .theme--light.v-text-field .v-input__slot:before {
    border-color: rgba(255,255,255,.42);
}
  .barra-servicios .theme--light.v-text-field:not(.v-input--has-state) .v-input__slot:hover:before {
      border-color: rgba(255,255,255,.87);
  }
  .v-card__title.barra-titulo-servicios{
    font-size: 22px;
    padding-top: 0;
  }
  .v-card__title.barra-servicios {
    color: white;
    font-size: 18px
  }
  .list-th {
    border-left: 1px solid #e0e0e0;
    border-right: 1px solid #e0e0e0;
  }
  .list-th .v-table.theme--light thead th{
    color: #353535;
    font-weight: bold;
    font-size: 1em;
    font-weight: 500;
  }

  .list-th .v-table.theme--light tbody td.item-naranja{
    color: #E66732;
  }
</style>
