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
                  @click:clear="clearFecha"
                  locale="es-419"
                ></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12 md3>
              <v-select :items="estaciones" v-model="origenSearch"
                          label="Origen" clearable @click:clear="clearFecha"
                          single-line item-text="name" item-value="id"
              ></v-select>
            </v-flex>
            <v-flex xs12 md3>
              <v-select :items="buses" v-model="busSearch"
                          label="Buses" clearable @click:clear="clearFecha"
                          single-line item-text="name" item-value="id"
              ></v-select>
            </v-flex>
            <v-flex xs12 md3>
              <v-select :items="conductores" v-model="conductorSearch"
                label="Conductores" clearable @click:clear="clearFecha"
                single-line item-text="name" item-value="id"
              ></v-select>
              <!-- <v-autocomplete
                v-model="servicioSearch"
                :items="manifests"
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
          :items="manifests"
          no-data-text="No existen servicios para fecha y origen ingresado"
          hide-actions
          :loading="loadingS"
        >
        <template slot="items" slot-scope="props">
          <td class="">{{ props.item.service_name }}</td>
          <td class="">{{ props.item.service_date }}</td>
          <!-- <td class="">{{ props.item.source }}</td>
          <td class="">{{ props.item.dest }}</td> -->
          <td class="">{{ props.item.trip_name }}</td>
          <td class="">{{ props.item.departure }}</td>
          <td class="">{{ props.item.driver_name }}</td>
          <td class="">{{ props.item.associate_name }}</td>
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
          {text: 'Servicio', value: 'service_name'},
          {text: 'Fecha servicio', value: 'service_date'},
          // {text: 'Origen', value: 'source'},
          // {text: 'Destino', value: 'dest'},
          {text: 'Tramo', value: 'trip_name'},
          {text: 'Hora salida', value: 'departure'},
          {text: 'Conductor', value: 'driver_name'},
          {text: 'Auxiliar', value: 'associate_name'},
          {text: 'Bus', value: 'carn_name'},
          {text: 'Detalles', value: '', sortable: false}
        ],
        manifiestos: [],
        manifests: [],
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
          Servicio: 'service_name',
          // FechaServicio: 'service_date',
          // Origen: 'source',
          // Destino: 'dest',
          Trip: 'trip_name',
          'HoraSalida': 'departure',
          Conductor: 'driver_name',
          Auxiliar: 'associate_name',
          Bus: 'car_name'
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
        this.getManifests()
      },
      dateSearch () {
        this.getManifests()
      },
      conductorSearch (id) {
        // this.manifests = this.manifests.filter(item => item.driver_id === id)
      },
      busSearch (id) {
        console.log('bus qe busca', id)
        // this.manifests = this.manifests.filter(item => item.car_id === id)
        // console.log('manifestos luego de buscar bus', this.manifests)
      }
    },
    mounted () {
      this.getManifests()
      this.getStations()
      this.getEmployees()
      this.getCars()
    },
    methods: {
      clearFecha () {
        this.dateSearch = ''
        this.getManifests()
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
      async getManifests () {
        // console.log('get manifests')
        try {
          let manifestos = await API.get('manifests')
          if (manifestos.status >= 200 && manifestos.status < 300) {
            console.log(manifestos)
            setTimeout(() => {
              this.manifests = manifestos.data.data
              console.log('manifiestos', this.manifests)
              // Duplicar filas de manifestos segun cantidad de buses
              // let nuevo = []
              // this.manifests.forEach(servicio => {
              //   for (let i = 1; i <= servicio.cars; i++) {
              //     // console.log('algo')
              //     nuevo.push(servicio)
              //     // return
              //   }
              // })
              // this.manifests = nuevo
              // esto elimina los null para exportar a pdf
              this.itemsServ = this.manifests.map(item => {
                for (const prop in item) {
                  if (item[prop] == null) item[prop] = ''
                  if (Number.isInteger(item[prop])) item[prop] = item[prop].toString()
                }
                return item
              })
              // console.log('items', this.items)
              this.loadingS = false
            }, 500)
          }
        } catch (e) {
          console.log('error al cargar manifestos', e.response)
          console.log('catch err', e.response)
          // this.showModal = true
          // this.modalInfoTitle = 'Ha ocurrido un error'
          // this.modalInfoDetail = 'Ha ocurrido un error al obtener los manifestos, intente más tarde.'
          // this.modalInfoBtn1 = 'OK'
          this.$swal({
            customClass: 'modal-info',
            type: 'error',
            title: 'Ha ocurrido un error al obtener los manifestos, intente más tarde.',
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
      },
      async getCars () {
        try {
          let cars = await API.get('cars')
          if (cars.status >= 200 && cars.status < 300) {
            console.log('Result load cars', cars)
            this.buses = cars.data.data
          }
        } catch (e) {
          console.log('error al cargar cars', e.response)
        }
      },
      async getEmployees () {
        try {
          let emplo = await API.get('employees')
          if (emplo.status >= 200 && emplo.status < 300) {
            this.employees = emplo.data.data
            console.log('empleados', this.employees)
            this.conductores = this.employees.filter(item => item.position === 1)
            // this.auxiliares = this.employees.filter(item => item.position === 2)
          }
        } catch (e) {
          console.log('error al cargar empleados', e.response)
        }
      }
    }
  }
</script>
