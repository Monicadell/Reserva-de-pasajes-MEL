<template>
  <div>
    <v-layout row wrap>
      <v-flex class="xs12 md6 text-xs-left">
        <h2>Programación Buses y empleados a viajes</h2>
      </v-flex>
      <!-- <v-flex xs12 md6 class="text-xs-right">
        <export-option :fields="excelFields" :data="items" :name="'Servicios'" :pdf="true"/>
      </v-flex> -->
    </v-layout>

    <v-dialog v-model="dialog" max-width="70%">
      <v-card>
        <v-card-title class="headline primary white--text">Asignar</v-card-title>
        <v-card-text>
          <!-- <template > -->
            <v-layout wrap >
              <v-flex xs12>
                <!-- Bus {{car}} -->
                <!-- <v-text-field
                  color="primary"
                  class="input-group--focused" readonly label="Nombre:"
                  v-model="editedItem.bus">Bus {{car}}</v-text-field> -->
              </v-flex>
              <v-flex s12 sm5 md4 px-1>
                <v-select :items="conductores" v-model="editedItem.driver_id"
                          label="Conductor"
                          single-line item-text="name" item-value="id"
                ></v-select>
              </v-flex>
              <v-flex s12 sm5 md4 px-1>
                <v-select :items="auxiliares" v-model="editedItem.associate_id"
                          label="Auxiliar"
                          single-line item-text="name" item-value="id"
                ></v-select>
              </v-flex>
              <v-flex s12 sm5 md4 px-1>
                <v-select :items="cars" v-model="editedItem.car_id"
                          label="Patente"
                          single-line item-text="name" item-value="id"
                ></v-select>
              </v-flex>
            </v-layout>
          <!-- </template> -->
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" flat="flat" @click.native="dialog = false">Cerrar</v-btn>
          <v-btn color="primary darken-1" flat="flat" @click.native="save(editedItem)">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div class="elevation-1">
      <v-toolbar flat color="white" class="pt-2">
        <!-- <v-text-field
          v-model="search"
          append-icon="search"
          label="Buscar"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
         <v-select
                  :items="filtros" v-model="filtro"
                  label="Filtros" clearable
                  single-line item-text="text" item-value="id"
        ></v-select> -->
          <v-layout align-baseline justify-space-between row fill-height>
            <!-- <v-flex xs12 md3>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Buscar"
                v-on:change="busca"
                single-line
                hide-details
              ></v-text-field>
            </v-flex> -->
            <v-flex xs12 md4>
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
              <v-select
                  :items="filtros" v-model="filtro"
                  label="Filtros" clearable @click:clear="clearFiltro"
                  single-line item-text="text" item-value="id"
              ></v-select> 
            </v-flex>
            <v-flex xs12 md4>
              <v-radio-group v-model="row" row>
                <v-radio label="Próximos 2 días" value="radioProximos" color="primary"></v-radio>
                <v-radio label="Todos" value="radioTodos" color="primary"></v-radio>
              </v-radio-group>
            </v-flex>
          </v-layout>
      </v-toolbar>

      <v-data-table
          :headers="headers"
          :items="manifestsTable"
          :search="search"
          :loading="loading"
          item-key="id"
          hide-actions
          no-data-text="No hay servicios registrados"
        >
        <template slot="items" slot-scope="props">
          <td class="">{{ props.item.service_name }}</td>
          <td class="">{{ props.item.date }}</td>
          <td class="">{{ moment(props.item.departure, 'HH:mm:ss').format('HH:mm') }}</td>
          <td class="">{{ props.item.trip_name }}</td>
          <td class="">{{ props.item.bus }}</td>
          <!-- <td class="">{{ props.item.driver_name }}</td>
          <td class="">{{ props.item.associate_name }}</td>
          <td class="">{{ props.item.car_name }}</td> -->
          
          <td class="">
             <v-select :items="conductores" v-model="props.item.driver_id"
                        label="Conductor" @change="save(props.item)" class="body-1"
                        single-line item-text="name" item-value="id"
            ></v-select>    
          </td>
          <td class="">
            <v-select :items="auxiliares" v-model="props.item.associate_id"
                      label="Auxiliar" @change="save(props.item)" class="body-1"
                      single-line item-text="name" item-value="id"
            ></v-select>   
          </td>
          <td class="">
            <v-select :items="cars" v-model="props.item.car_id"
                          label="Bus" @change="save(props.item)" class="body-1"
                          single-line item-text="name" item-value="id"
            ></v-select>  
          </td>
          <!-- <td class="text-xs-center">
            <v-btn v-if="props.item.cars > 1" flat small class="primary--text text-capitalize" @click="editItem(props.item)">Asignar</v-btn>
            <v-btn v-else flat small class="primary--text text-capitalize" @click="editItem(props.item)">Modificar</v-btn>
          </td> -->
        </template>
        <template slot="footer">
          <td :colspan="headers.length" class="text-xs-right">
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
    <!-- Modal error-->
    <modal v-if="showModal"
        @close="showModal = false"
        v-bind:btn1="modalInfoBtn1">
        <p slot="title" class="headline mb-0">{{modalInfoTitle}}</p>
        <h3 slot="body">{{modalInfoDetail}}</h3>
    </modal>
  </div>
</template>

<script>
  import API from '@pi/app'
  import moment from 'moment'
  import Modal from '@c/Modal'
  import ExportOption from '@c/ExportOption'

  export default {
    data () {
      return {
        confirmaAnular: false,
        dialog: false,
        search: '',
        editedItem: {},
        loading: true,
        moment: moment,
        eliminaid: '',
        showModal: false,
        modalInfoTitle: '',
        modalInfoDetail: '',
        modalInfoBtn1: '',
        headers: [
          {text: 'Nombre', value: 'service_name', sortable: true},
          {text: 'Fecha', value: 'date'},
          {text: 'Salida', value: 'departure'},
          {text: 'Tramo', value: 'trip_name'},
          {text: 'Bus', value: 'bus'},
          {text: 'Conductor', value: 'driver_id'},
          {text: 'Auxiliar', value: 'driver_id'},
          {text: 'Patente', value: 'driver_id'}
        ],
        page: 1,
        pagination: {
          page: 1,
          rowsPerPage: 40, // -1 for All
          // sortBy: '',
          totalItems: 0,
          rowsPerPageItems: [40, 80, 120],
          total_pages: 0
        },
        manifests: [],
        manifestsTable: [],
        employees: [],
        conductores: [],
        auxiliares: [],
        cars: [],
        frequencies: [
        ],
        trips: [],
        excelFields: {
          Servicio: 'name',
          FechaServicio: 'date',
          Salida: 'departure',
          // Llegada: 'arrival',
          Puesta: 'set',
          Duracion: 'duration',
          Tramo: 'trip_name',
          AsientosDisponibles: 'avail_seats',
          AsientosTotales: 'total_seats',
          // AsientosReservados: 'avail_reserved',
          Buses: 'cars'
        },
        items: [],
        filtros: [{text: 'Asignados', id: 1}, {text: 'No asignado', id: 2}, {text: 'Todos', id: 3}],
        filtro: 3,
        datepicker: false,
        dateSearch: '',
        row: 'radioProximos'
      }
    },
    components: {
      Modal: Modal,
      ExportOption: ExportOption
    },
    mounted () {
      this.getManifests()
      this.getTrips()
      this.getFrequencies()
      this.getCars()
      this.getEmployees()
      console.log('row', this.row)
    },
    computed: {
      computedDateFormattedMomentjs () {
        return this.dateSearch ? moment(this.dateSearch).format('DD/MM/YYYY') : ''
      }
    },
    watch: {
      filtro (val) {
        if (val === 1) {
          this.manifestsTable = this.manifests.filter(item => (item.driver_id && item.associate_id && item.car_id))
        } else if (val === 2) {
          this.manifestsTable = this.manifests.filter(item => (item.driver_id === null || item.associate_id === null || item.car_id === null))
        } else {
          this.getManifests()
        }
      },
      dateSearch () {
        this.loading = true
        this.getManifests()
      },
      row () {
        this.loading = true
        this.getManifests()
      }
    },
    methods: {
      // busca () {
      //   console.log('busca', this.search)
      //   let buscar = {'q': this.search}
      //   this.getManifests(buscar)
      // },
      clearFecha () {
        this.dateSearch = ''
        this.getManifests()
      },
      clearFiltro () {
        this.filtro = 3
        this.manifests = []
        this.loading = true
        this.getManifests()
      },
      changeDriver (val) {
        console.log(val)
      },
      async getCars () {
        try {
          let cars = await API.get('cars')
          if (cars.status >= 200 && cars.status < 300) {
            console.log('Result load cars', cars)
            this.cars = cars.data.data
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
            this.auxiliares = this.employees.filter(item => item.position === 2)
          }
        } catch (e) {
          console.log('error al cargar empleados', e.response)
        }
      },
      async getTrips () {
        try {
          let trips = await API.get('trips')
          if (trips.status >= 200 && trips.status < 300) {
            console.log('Result load trips', trips)
            this.trips = trips.data.data
          }
        } catch (e) {
          console.log('error al cargar tramos', e.response)
        }
      },
      async getFrequencies () {
        try {
          let frecs = await API.get('frequencies')
          if (frecs.status >= 200 && frecs.status < 300) {
            this.frequencies = frecs.data.data
            console.log('frecuencias', this.frequencies)
          }
        } catch (e) {
          console.log('error al cargar frecuencias', e.response)
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
      async getManifests (pagi) {
        console.log('get manifests')
        const params = {
          'date': this.dateSearch,
          'proximos': this.row === 'radioProximos' ? 1 : 0,
          'page': this.pagination.page,
          'page_size': this.pagination.rowsPerPage
        }
        try {
          let manifestos = await API.get('manifests', params)
          if (manifestos.status >= 200 && manifestos.status < 300) {
            console.log('manis', manifestos)
            setTimeout(() => {
              this.manifests = manifestos.data.data
              this.manifestsTable = this.manifests
              this.pagination.totalItems = manifestos.data.total_entries
              this.pagination.page = manifestos.data.page_number
              this.pagination.rowsPerPage = manifestos.data.page_size
              this.pagination.total_pages = manifestos.data.total_pages
              this.loading = false
            }, 500)
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
      editItem (item) {
        console.log('item->', item)
        this.editedItem = item
        // this.editedItem.cars = Number(item.cars)
        this.dialog = true
      },
      close () {
        this.dialog = false
        this.editedItem = Object.assign({}, '')
      },
      async save (guardar) {
        console.log('a guardar', guardar)
        let mani = {
          'manifest':
          {
            'driver_id': guardar.driver_id ? guardar.driver_id : '',
            'associate_id': guardar.associate_id ? guardar.associate_id : '',
            'car_id': guardar.car_id ? guardar.car_id : ''
          }
        }
        // if (guardar.id) {
        console.log('agrega empleados y car a manifest a put', mani)
        let id = guardar.id
        try {
          let servicios = await API.put('manifests', id, mani)
          if (servicios.status >= 200 && servicios.status < 300) {
            console.log('ya hizo PUT mani', servicios)
            // this.manifests = servicios.data.data
            // this.getManifests()
            this.dialog = false
            // this.$swal({
            //   customClass: 'modal-info',
            //   type: 'success',
            //   title: 'Servicio',
            //   timer: 1000,
            //   text: 'Servicio actualizado exitosamente',
            //   animation: true,
            //   showCancelButton: true,
            //   showConfirmButton: false,
            //   cancelButtonText: 'OK'
            // })
            this.editedItem = Object.assign({}, '')
          } else {
            alert('Ha ocurrido un error al editar el servicio')
          }
        } catch (e) {
          console.log('catch error al editar el servicio', e.response)
          this.$swal({
            customClass: 'modal-info',
            type: 'error',
            title: 'Ha ocurrido un error al editar el servicio',
            text: e.response.data.error,
            animation: true,
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonText: 'Cerrar'
          })
        }
      },
      frecuencia (item) {
        let freq = this.frequencies.find(frec => frec.id === item)
        // console.log('encuentra', freq)
        return freq ? freq.name : ''
      }
    }
  }
</script>

<style>
  .swal2-popup.modal-info {
    font-family: Helvetica, sans-serif;
  }
  .swal2-popup.swal2-modal.modal-info{
    border-radius: 0;
  }
  .swal2-popup.modal-info .swal2-styled.swal2-confirm {
    border: 1px solid #1565c0;
    border-radius: 0;
    background: transparent;
    background-color: transparent;
    color: #1565c0;
    font-size: 1.0625em;
    outline: none;
  }
  .swal2-popup.modal-info .swal2-styled.swal2-cancel:focus,
  .swal2-popup.modal-info .swal2-styled.swal2-confirm:focus {
    box-shadow: none;
  }
  .swal2-popup.modal-info .swal2-styled.swal2-cancel {
    border-radius: 0;
    border: none;
    background-color: #1565c0;
    outline: none;
  }
  .swal2-popup.modal-info .swal2-styled.swal2-confirm:hover {
    border: 1px solid #1565c0;
    border-radius: 0;
    background: transparent;
    background-color: rgba(21, 101, 192, 0.12);
    color: #1565c0;
    font-size: 1.0625em;
  }
</style>
