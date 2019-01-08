<template>
  <div>
    <v-layout wrap>
      <v-flex xs12 md6 class="py-3"><h2>Manifiestos</h2> </v-flex>
      <!-- <v-flex xs12 md6 class="text-xs-right">
        <export-option :fields="excelFields" :data="items"  :pdf="true"/>
      </v-flex> -->
    </v-layout>
    <div class="elevation-1">
      <v-toolbar flat color="white" class="pt-2" v-if="!servicioSelected">
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
            <v-flex xs12 md3>
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
            <v-flex xs12 md3>
              <v-select :items="estaciones" v-model="origenSearch"
                          label="Origen" clearable
                          single-line item-text="name" item-value="id"
              ></v-select>
            </v-flex>
            <v-flex xs12 md3>
              <v-select :items="buses" v-model="busSearch"
                          label="Buses" clearable
                          single-line item-text="name" item-value="id"
              ></v-select>
            </v-flex>
            <v-flex xs12 md3>
              <v-select :items="conductores" v-model="conductorSearch"
                label="Conductores" clearable
                single-line item-text="name" item-value="id"
              ></v-select>
              <!-- <v-autocomplete
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
                clearable
              ></v-autocomplete> -->
            </v-flex>
            <!-- <v-flex xs12 md2>
              <v-btn color="primary" outline @click="getManifiestos()">Buscar</v-btn>
            </v-flex> -->
          </v-layout>
        <!-- </div> -->
      </v-toolbar>

      <v-card-title v-if="servicioSelected">
        <h3>Manifiestos</h3>
        <v-spacer></v-spacer>
        <v-flex xs12 md4 class="text-xs-right">
            <v-btn dark color="primary" @click="volverServicios()">
              <v-icon left dark class="mr-0">keyboard_arrow_left</v-icon>Volver
            </v-btn>
        </v-flex>
        <v-flex xs12 md4 class="text-xs-right">
          <export-option :fields="excelFields" :data="items" :name="'Manifiesto'" :pdf="true"/>
        </v-flex>
      </v-card-title>
      <v-data-table v-if="servicioSelected"
          :headers="headersMani"
          :items="manifiestos"
          :loading="loadingM"
          no-data-text="No existen manifiestos para el servicio"
          hide-actions
        >
        <template slot="items" slot-scope="props">
          <td class="">{{ props.item.user.name }}</td>
          <td class="">{{ props.item.user.rut }}</td>
          <td class="">{{ props.item.user.phone_number }}</td>
          <td class="" v-if="props.item.user.contract_type_id === 1">MEL</td>
          <td class="" v-else>Contratista</td>
          <td class="">{{ props.item.service.name }}</td>
          <td class="">{{ props.item.service.date }}</td>
          <td class="">{{ props.item.car_number }}</td>
          <td class="">{{ props.item.seat }}</td>
          <!-- <td class="">{{ props.item.user.rut }}</td> -->
          <td class="">{{ props.item.ac }}</td>
          <td class="justify-center">{{ props.item.vuelo }}</td>
        </template>
      </v-data-table>

      <v-card-title v-if="!servicioSelected">
        <h3>Servicios</h3>
        <v-spacer></v-spacer>
        <v-flex xs12 md6 class="text-xs-right">
          <export-option :fields="excelFieldsServ" :data="itemsServ" :name="'Servicios'" :pdf="true"/>
        </v-flex>
      </v-card-title>
      <v-data-table v-if="!servicioSelected"
          :headers="headersServ"
          :items="services"
          no-data-text="No existen servicios para fecha y origen ingresado"
          hide-actions
          :loading="loadingS"
        >
        <template slot="items" slot-scope="props">
          <td class="">{{ props.item.name }}</td>
          <td class="">{{ props.item.date }}</td>
          <td class="">{{ props.item.source }}</td>
          <td class="">{{ props.item.dest }}</td>
          <td class="">{{ props.item.departure }}</td>
          <td class="">{{ props.item.employee_name }}</td>
          <td class="">{{ props.item.car_name }}</td>
          <td class="">
            <v-tooltip top>
              <v-icon
                small
                slot="activator"
                color="primary"
                @click="seleccionarServicio(props.item)"
              >
                keyboard_arrow_right
              </v-icon>
              <span>Ver manifiesto</span>
            </v-tooltip>
          </td>
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
        busSearch: '',
        conductorSearch: '',
        loadingS: true,
        loadingM: true,
        servicioSearch: '',
        servicioSelected: false,
        search: '',
        headersMani: [
          {text: 'Pasajero', value: 'user.name'},
          {text: 'Documento', value: 'user.rut'},
          {text: 'Teléfono', value: 'user.phone_number'},
          {text: 'Empresa', value: 'user.contract_type_id'},
          {text: 'Servicio', value: 'service.name'},
          {text: 'Fecha servicio', value: 'service.date'},
          {text: 'Bus', value: 'car_number'},
          {text: 'Asiento', value: 'seat'},
          {text: 'Acercamiento', value: 'ac'},
          {text: 'Vuelo', value: 'vuelo'}
        ],
        headersServ: [
          {text: 'Servicio', value: 'service.name'},
          {text: 'Fecha servicio', value: 'service.date'},
          {text: 'Origen', value: 'source'},
          {text: 'Destino', value: 'dest'},
          {text: 'Hora salida', value: 'service.departure'},
          {text: 'Conductor', value: 'conductor'},
          {text: 'Bus', value: 'bus'},
          {text: 'Detalles', value: '', sortable: false}
        ],
        manifiestos: [],
        services: [],
        estaciones: [],
        conductores: [],
        buses: [],
        userDocumentType: [
          {text: 'RUT', id: 'RUT'},
          {text: 'PASAPORTE', id: 'PASAPORTE'}
        ],
        excelFields: {
          Pasajero: 'username',
          Documento: 'userdocument',
          Telefono: 'userphone',
          ContratistaMel: 'contract_type_name',
          Servicio: 'servicename',
          FechaServicio: 'servicedate',
          Bus: 'car_number',
          Asiento: 'seat',
          Acercamiento: 'ac',
          Vuelo: 'vuelo'
        },
        items: [],
        excelFieldsServ: {
          Servicio: 'name',
          FechaServicio: 'date',
          Origen: 'source',
          Destino: 'dest',
          Salida: 'departure'
        },
        itemsServ: []
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
      volverServicios () {
        this.servicioSelected = false
      },
      async getStations () {
        try {
          let stations = await API.get('stations')
          if (stations.status >= 200 && stations.status < 300) {
            console.log(stations)
            setTimeout(() => {
              this.estaciones = stations.data.data
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
      seleccionarServicio (servicio) {
        this.getManifiestos(servicio.id)
        this.servicioSelected = true
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
            // setTimeout(() => {
            this.services = servicios.data.data
            this.itemsServ = this.services.map(item => { // limpia los null para exportar pdf
              for (const prop in item) {
                if (item[prop] == null) item[prop] = ''
              }
              return item
            })
            this.loadingS = false
            // }, 500)
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
      async getManifiestos (ser) {
        let params = {
          'source_id': this.origenSearch,
          'date': this.dateSearch,
          'service_id': ser || this.servicioSearch.id
        }
        console.log('get tickets')
        try {
          let tickets = await API.get('tickets', params)
          if (tickets.status >= 200 && tickets.status < 300) {
            console.log('params', params)
            console.log(tickets.data.data)
            // setTimeout(() => {
            this.manifiestos = tickets.data.data.filter(tick => tick.status !== 'anulado')
            
            this.items = this.manifiestos.map(item => {
              for (const prop in item) {
                if (item[prop] == null) item[prop] = ''
              }
              return item
            })
            this.items.forEach(element => {
              element.servicename = element.service.name || ''
              element.servicedate = element.service.date || ''
              element.username = element.user.name || ''
              element.userphone = element.user.phone_number || ''
              element.userdocument = element.user.rut || element.user.passport || ''
              element.contract_type_name = element.user.contract_type_id === 1 ? 'MEL' : 'Contratista'
              element.car_number = element.car_number ? element.car_number.toString() : ''
              element.seat = element.seat ? element.seat.toString() : ''
            })
            console.log('manifiestos', this.manifiestos)
            console.log('items', this.items)
            this.loadingM = false
            // }, 500)
          }
        } catch (e) {
          console.log('error al cargar tickets', e.response)
          console.log('catch err', e.response)
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
