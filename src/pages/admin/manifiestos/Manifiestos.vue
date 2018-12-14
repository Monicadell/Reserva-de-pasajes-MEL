<template>
  <div>
    <v-layout wrap>
      <v-flex xs12 md6 class="py-3"><h2>Manifiestos</h2> </v-flex>
      <v-flex xs12 md6 class="text-xs-right">
        <export-option :fields="excelFields" :data="items"  :pdf="true"/>
      </v-flex>
    </v-layout>
    <div class="elevation-1">
      <v-toolbar flat color="white" class="pt-2">
        <!-- <v-text-field
          v-model="search"
          append-icon="search"
          label="Buscar"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer> -->
        <!-- <div class="text-xs-right"> -->
          <v-layout wrap>
            <v-flex xs12 md2>
              <v-menu
                v-model="datepicker"
                :close-on-content-click="false"
                full-width
                max-width="290"
              >
                <v-text-field
                  slot="activator"
                  :value="computedDateFormattedMomentjs"
                  clearable
                  @click:clear="clearFecha"
                  label="Fecha"
                  readonly
                ></v-text-field>
                <v-date-picker
                  v-model="dateSearch"
                  @change="datepicker = false"
                  locale="es-419"
                ></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12 md4>
              <v-select :items="estaciones" v-model="origenSearch"
                          label="Estación de origen" clearable
                          single-line item-text="name" item-value="id"
              ></v-select>
            </v-flex>
            <v-flex xs12 md4>
              <!-- <v-select :items="services" v-model="servicioSearch"
                          label="Servicio"
                          single-line item-text="name" item-value="id"
              ></v-select> -->
              <v-autocomplete
                v-model="servicioSearch"
                :items="services"
                :loading="isLoading"
                :search-input.sync="search"
                color="primary"
                hide-no-data
                hide-selected
                item-text="name"
                item-value="name"
                label="Servicio"
                return-object
              ></v-autocomplete>
            </v-flex>
            <v-flex xs12 md2>
              <v-btn color="primary" outline @click="getManifiestos()">Buscar</v-btn>
            </v-flex>
          </v-layout>
        <!-- </div> -->
      </v-toolbar>

      <v-data-table
          :headers="headers"
          :items="manifiestos"
          hide-actions
        >
        <template slot="items" slot-scope="props">
          <td class="">{{ props.item.service.name }}</td>
          <td class="">{{ props.item.service.date }}</td>
          <td class="">{{ props.item.car_number }}</td>
          <td class="">{{ props.item.seat }}</td>
          <td class="">{{ props.item.user.name }}</td>
          <!-- <td class="">{{ props.item.user.rut }}</td> -->
          <td class="">{{ props.item.ac }}</td>
          <td class="justify-center">{{ props.item.vuelo }}</td>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
  import API from '@pi/app'
  import moment from 'moment'
  import ExportOption from '@c/ExportOption'
  
  export default {
    data () {
      return {
        confirmaAnular: false,
        dialog: false,
        selectedUser: {},
        datepicker: false,
        dateSearch: '',
        origenSearch: '',
        isLoading: false,
        servicioSearch: '',
        search: '',
        headers: [
          {text: 'Servicio', value: 'service.name'},
          {text: 'Fecha servicio', value: 'service.date'},
          {text: 'Bus', value: 'car_number'},
          {text: 'Asiento', value: 'seat'},
          {text: 'Pasajero', value: 'user.name'},
          {text: 'Acercamiento', value: 'ac'},
          {text: 'Vuelo', value: 'vuelo'}
        ],
        manifiestos: [],
        services: [],
        estaciones: [],
        userDocumentType: [
          {text: 'RUT', id: 'RUT'},
          {text: 'PASAPORTE', id: 'PASAPORTE'}
        ],
        excelFields: {
          Servicio: 'servicename',
          FechaServicio: 'servicedate',
          Bus: 'car_number',
          Asiento: 'seat',
          Pasajero: 'user.name',
          Acercamiento: 'ac',
          Vuelo: 'vuelo'
        },
        items: [
          { 'servicename': '2018-12-14T09:47:21.965088',
            'servicedate': '',
            'car_number': '',
            'seat': 84,
            'user.name': '',
            'ac': '2018-12-22',
            'vuelo': 'Prueba2' },
          {
            'servicename': '2018-12-14T09:47:21.965088',
            'servicedate': '',
            'car_number': '',
            'seat': 84,
            'user.name': '',
            'ac': '2018-12-22',
            'vuelo': 'Prueba2'
          }
        ]
      }
    },
    components: {
      ExportOption: ExportOption
    },
    computed: {
      computedDateFormattedMomentjs () {
        return this.dateSearch ? moment(this.dateSearch).format('DD/MM/YYYY') : ''
      }
    },
    watch: {
      origenSearch () {
        this.getServices()
      },
      dateSearch () {
        this.getServices()
      }
    },
    mounted () {
      this.getServices()
      this.getStations()
    },
    methods: {
      clearFecha () {
        this.dateSearch = ''
        this.getServices()
      },
      async getStations () {
        try {
          let stations = await API.get('stations')
          if (stations.status >= 200 && stations.status < 300) {
            console.log(stations)
            setTimeout(() => {
              this.estaciones = stations.data.data
              this.loading = false
            }, 500)
          }
        } catch (e) {
          console.log('catch err', e.response)
          // this.showModal = true
          // this.modalInfoTitle = 'Ha ocurrido un error'
          // this.modalInfoDetail = 'Ha ocurrido un error al cargar las estaciones, intente más tarde.'
          // this.modalInfoBtn1 = 'OK'
          this.$swal({
            customClass: 'modal-info',
            type: 'error',
            title: 'Error',
            text: 'Ha ocurrido un error al cargar las estaciones, intente más tarde.',
            animation: true,
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonText: 'OK'
          })
        }
      },
      async getServices () {
        let params = {
          'source_id': this.origenSearch,
          'date': this.dateSearch,
          'active': 1
        }
        console.log('get services')
        try {
          let servicios = await API.get('services', params)
          if (servicios.status >= 200 && servicios.status < 300) {
            console.log('params', params)
            console.log(servicios.data)
            setTimeout(() => {
              this.services = servicios.data.data
              this.loading = false
            }, 500)
          }
        } catch (e) {
          console.log('error al cargar servicios', e.response)
          console.log('catch err', e.response)
          // this.showModal = true
          // this.modalInfoTitle = 'Ha ocurrido un error'
          // this.modalInfoDetail = 'Ha ocurrido un error al obtener los servicios, intente más tarde.'
          // this.modalInfoBtn1 = 'OK'
          this.$swal({
            customClass: 'modal-info',
            type: 'error',
            title: 'Ha ocurrido un error al obtener los servicios, intente más tarde.',
            text: e.response.data.error,
            animation: true,
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonText: 'Cerrar'
          })
        }
      },
      async getManifiestos () {
        let params = {
          'source_id': this.origenSearch,
          'date': this.dateSearch,
          'service_id': this.servicioSearch.id
        }
        console.log('get tickets')
        try {
          let tickets = await API.get('tickets', params)
          if (tickets.status >= 200 && tickets.status < 300) {
            console.log('params', params)
            console.log(tickets.data.data)
            setTimeout(() => {
              this.manifiestos = tickets.data.data
              console.log('manifiestos', this.manifiestos)
              this.loading = false
            }, 500)
          }
        } catch (e) {
          console.log('error al cargar tickets', e.response)
          console.log('catch err', e.response)
          // this.showModal = true
          // this.modalInfoTitle = 'Ha ocurrido un error'
          // this.modalInfoDetail = 'Ha ocurrido un error al obtener los tickets, intente más tarde.'
          // this.modalInfoBtn1 = 'OK'
          this.$swal({
            customClass: 'modal-info',
            type: 'error',
            title: 'Ha ocurrido un error al obtener los tickets, intente más tarde.',
            text: e.response.data.error,
            animation: true,
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonText: 'Cerrar'
          })
        }
      }
    }
  }
</script>