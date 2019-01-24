<template>
  <div>
    <v-layout wrap>
      <v-flex xs12 md6 class="py-3"><h2>Servicios</h2> </v-flex>
    </v-layout>
    <div class="elevation-1">
      <v-toolbar flat color="white" class="pt-2" v-if="!servicioSelected">
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
              <v-select :items="tramos" v-model="tripSearch"
                          label="Tramo" clearable @click:clear="clearFecha"
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
                single-line item-text="name" item-value="id" class="body-1"
              ></v-select>
            </v-flex>
          </v-layout>
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
        <!-- <h3>Servicios</h3> -->
        <v-spacer></v-spacer>
        <v-flex xs12 md6 class="text-xs-right">
          <export-option :fields="excelFieldsServ" :data="itemsServ" :name="'Servicios'" :pdf="true"/>
        </v-flex>
      </v-card-title>
      <v-data-table v-if="!servicioSelected"
          :headers="headersServ"
          :items="seriviciosmanifiestos"
          no-data-text="No existen servicios para fecha y origen ingresado"
          hide-actions
          :loading="loadingS"
        >
        <template slot="items" slot-scope="props">
          <td class="">{{ props.item.service_name }}</td>
          <td class="">{{ props.item.date }}</td>
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
        <template slot="footer">
          <td :colspan="headersServ.length" class="text-xs-right">
            <v-container grid-list-xl text-xs-center>
              <v-layout align-center justify-space-around row fill-height>
                <v-flex xs12 sm2>
                  <v-select :items="pagination.rowsPerPageItems" v-model="pagination.rowsPerPage"
                            label="Items por página" v-on:change="changeRowsPage()"
                          item-text="text" item-value="id"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm10 class="text-xs-center justify-center">
                  <!-- <div class="text-xs-center"> -->
                    <v-pagination
                      v-model="pagination.page"
                      @input="changePageNumber"
                      :length="pagination.total_pages"
                      :total-visible="10"
                    ></v-pagination>
                  <!-- </div> -->
                </v-flex>
              </v-layout>
            </v-container>  
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
        tripSearch: '',
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
          {text: 'Fecha servicio', value: 'date'},
          // {text: 'Origen', value: 'source'},
          // {text: 'Destino', value: 'dest'},
          {text: 'Tramo', value: 'trip_name'},
          {text: 'Hora salida', value: 'departure'},
          {text: 'Conductor', value: 'driver_name'},
          {text: 'Auxiliar', value: 'associate_name'},
          {text: 'Bus', value: 'carn_name'},
          {text: 'Manifiesto', value: '', sortable: false}
        ],
        // page: 1,
        pagination: {
          page: 1,
          rowsPerPage: 40, // -1 for All
          // sortBy: '',
          totalItems: 0,
          rowsPerPageItems: [40, 80, 120],
          total_pages: 0
        },
        manifiestos: [],
        manifests: [],
        seriviciosmanifiestos: [],
        tramos: [],
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
        itemsServ: [],
        firstTime: true
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
      tripSearch () {
        this.loadingS = true
        this.getManifests()
      },
      dateSearch () {
        this.loadingS = true
        this.getManifests()
      },
      conductorSearch () {
        this.loadingS = true
        this.getManifests()
      },
      busSearch () {
        this.loadingS = true
        this.getManifests()
      }
    },
    mounted () {
      this.getManifests()
      this.getTrips()
      this.getEmployees()
      this.getCars()
      this.firstTime = true
    },
    methods: {
      clearFecha () {
        this.dateSearch = ''
        this.tripSearch = ''
        this.conductorSearch = ''
        this.busSearch = ''
        this.loadingS = true
        this.getManifests()
      },
      volverServicios () {
        this.servicioSelected = false
      },
      async getTrips () {
        try {
          let trips = await API.get('trips')
          if (trips.status >= 200 && trips.status < 300) {
            console.log(trips)
            setTimeout(() => {
              this.tramos = trips.data.data
            }, 500)
          }
        } catch (e) {
          console.log('catch err', e.response)
          this.$swal({
            customClass: 'modal-info',
            type: 'error',
            title: 'Error',
            text: 'Ha ocurrido un error al cargar los tramos, intente más tarde.',
            animation: true,
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonText: 'OK'
          })
        }
      },
      seleccionarServicio (mani) {
        this.getTickets(mani.id)
        this.servicioSelected = true
      },
      async getManifests (first) {
        // console.log('get manifests')
        const params = {
          'driver_id': this.conductorSearch,
          'trip_id': this.tripSearch,
          'car_id': this.busSearch,
          'date': this.dateSearch,
          'page': this.pagination.page,
          'page_size': this.pagination.rowsPerPage
        }
        try {
          let manifestos = await API.get('manifests', params)
          if (manifestos.status >= 200 && manifestos.status < 300) {
            console.log('mani', manifestos)
            setTimeout(() => {
              this.manifests = manifestos.data.data
              this.seriviciosmanifiestos = this.manifests
              this.pagination.totalItems = manifestos.data.total_entries
              this.pagination.page = manifestos.data.page_number
              this.pagination.rowsPerPage = manifestos.data.page_size
              this.pagination.total_pages = manifestos.data.total_pages
              // esto elimina los null para exportar a pdf
              if (this.firstTime) this.getManifestosAll()
              this.loadingS = false
            }, 2000)
          }
        } catch (e) {
          console.log('error al cargar manifestos', e.response)
          console.log('catch err', e.response)
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
      async getTickets (mani) {
        const url = 'manifests' + '/' + mani
        console.log('get tickets')
        try {
          let tickets = await API.get(url)
          if (tickets.status >= 200 && tickets.status < 300) {
            // setTimeout(() => {
            this.manifiestos = tickets.data.data.tickets.data.filter(tick => tick.status !== 'anulado')
            console.log('result tickets', tickets.data.data)
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
          console.log('error al cargar tickets', e)
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
      },
      changePageNumber () {
        console.log(this.pagination.page)
        let newpage = {'page': this.pagination.page, 'page_size': this.pagination.rowsPerPage}
        console.log(newpage)
        this.getManifests(newpage)
      },
      changeRowsPage () {
        // console.log(this.pagination.rowsPerPage)
        let pagesize = {'page_size': this.pagination.rowsPerPage}
        this.getManifests(pagesize)
      },
      async getManifestosAll () {
        console.log('get manifests TODOS 1 vez') // para obtener sin paginar los manifestos y poder exportarlos tdos
        const params = {
          'page_size': this.pagination.totalItems
        }
        try {
          let manifestos = await API.get('manifests', params)
          if (manifestos.status >= 200 && manifestos.status < 300) {
            console.log('mani', manifestos)
            const mani = manifestos.data.data
              // esto elimina los null para exportar a pdf
            this.itemsServ = mani.map(item => {
              for (const prop in item) {
                if (item[prop] == null) item[prop] = ''
                if (Number.isInteger(item[prop])) item[prop] = item[prop].toString()
              }
              return item
            })
          }
        } catch (e) {
          console.log('error al cargar todos manifestos', e.response)
          console.log('catch err', e.response)
        }
      }
    }
  }
</script>
