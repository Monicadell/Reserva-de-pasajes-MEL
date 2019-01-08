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
            <v-layout wrap v-for="car in editedItem.cars" :key="car">
              <v-flex xs12>
                Bus {{car}}
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
                <v-select :items="auxiliares" v-model="editedItem.aux_id"
                          label="Auxiliar"
                          single-line item-text="name" item-value="id"
                ></v-select>
              </v-flex>
              <v-flex s12 sm5 md4 px-1>
                <v-select :items="cars" v-model="editedItem.car_id"
                          label="Bus"
                          single-line item-text="name" item-value="id"
                ></v-select>
              </v-flex>
            </v-layout>
          <!-- </template> -->
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" flat="flat" @click.native="dialog = false">Cerrar</v-btn>
          <v-btn color="primary darken-1" flat="flat" @click.native="dialog = false">Ok</v-btn>
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
          <v-layout wrap>
            <v-flex xs12 md4>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Buscar"
                single-line
                hide-details
              ></v-text-field>
            </v-flex>
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
                  label="Filtros" clearable
                  single-line item-text="text" item-value="id"
              ></v-select> 
            </v-flex>
          </v-layout>
      </v-toolbar>

      <v-data-table
          :headers="headers"
          :items="services"
          :search="search"
          :loading="loading"
          :rows-per-page-items="[20, 40, 100]"
          item-key="id"
          no-data-text="No hay servicios registrados"
        >
        <template slot="items" slot-scope="props">
          <td class="">{{ props.item.name }}</td>
          <td class="">{{ props.item.date }}</td>
          <td class="">{{ moment(props.item.departure, 'HH:mm:ss').format('HH:mm') }}</td>
          <td class="">{{ moment(props.item.arrival, 'HH:mm:ss').format('HH:mm') }}</td>
          <td class="">{{ props.item.trip_name }}</td>
          <td class="">{{ frecuencia(props.item.freq_id) }}</td>
          <td class="">{{ props.item.cars }}</td>
          <!-- <td class="">
            <v-select :items="cars" v-model="props.item.car_id"
                          label="Bus"
                          single-line item-text="name" item-value="id"
            ></v-select>  
          </td>
          <td class="">
             <v-select :items="employees" v-model="props.item.driver_id"
                          label="Conductor"
                          single-line item-text="name" item-value="id"
            ></v-select>    
          </td>
          <td class="">
            <v-select :items="employees" v-model="props.item.driver_id"
                      label="Auxiliar"
                      single-line item-text="name" item-value="id"
            ></v-select>   
          </td> -->
          <td class="text-xs-center">
            <!-- <v-tooltip top>
              <v-icon
                small
                slot="activator"
                color="primary"
                @click="editItem(props.item)"
              >
                >
              </v-icon>
              <span>Asignar</span>
            </v-tooltip> -->
            <v-btn v-if="props.item.cars > 1" flat small class="primary--text text-capitalize" @click="editItem(props.item)">Asignar</v-btn>
            <v-btn v-else flat small class="primary--text text-capitalize" @click="editItem(props.item)">Modificar</v-btn>
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
          {text: 'Nombre', value: 'name'},
          {text: 'Fecha', value: 'date'},
          {text: 'Salida', value: 'departure'},
          {text: 'Llegada', value: 'arrival'},
          {text: 'Tramo', value: 'trip_name'},
          {text: 'Frecuencia', value: 'freq_id'},
          // {text: 'Bus', value: 'car_id'},
          // {text: 'Conductor', value: 'driver_id'},
          // {text: 'Asientos disponibles/totales', value: 'avail_seats'},
          {text: 'Buses', value: 'cars'},
          {text: 'Asignar', value: '', sortable: false, align: 'center'}
        ],
        services: [],
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
          Llegada: 'arrival',
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
        dateSearch: ''
      }
    },
    components: {
      Modal: Modal,
      ExportOption: ExportOption
    },
    mounted () {
      this.getServices()
      this.getTrips()
      this.getFrequencies()
      this.getCars()
      this.getDrivers()
    },
    computed: {
      computedDateFormattedMomentjs () {
        return this.dateSearch ? moment(this.dateSearch).format('DD/MM/YYYY') : ''
      }
    },
    watch: {
      filtro (val) {
        this.getServices(val)
      }
    },
    methods: {
      clearFecha () {
        this.dateSearch = ''
        this.getServices()
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
      async getDrivers () {
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
      async getServices () {
        // console.log('get services')
        try {
          let servicios = await API.get('services')
          if (servicios.status >= 200 && servicios.status < 300) {
            console.log(servicios)
            setTimeout(() => {
              this.services = servicios.data.data
              // console.log('serv', this.services)
              // Duplicar filas de servicios segun cantidad de buses
              // let nuevo = []
              // this.services.forEach(servicio => {
              //   for (let i = 1; i <= servicio.cars; i++) {
              //     // console.log('algo')
              //     nuevo.push(servicio)
              //     // return
              //   }
              // })
              // this.services = nuevo
              // esto elimina los null para exportar a pdf
              // this.items = this.services.map(item => {
              //   for (const prop in item) {
              //     if (item[prop] == null) item[prop] = ''
              //     if (Number.isInteger(item[prop])) item[prop] = item[prop].toString()
              //   }
              //   return item
              // })
              // console.log('items', this.items)
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
      editItem (item) {
        console.log('item->', item)
        this.editedItem = item
        this.editedItem.cars = Number(item.cars)
        this.dialog = true
      },
      close () {
        this.dialog = false
        this.editedItem = Object.assign({}, '')
      },
      async save (guardar) {
        console.log('a guardar', guardar)
        let ser = {
          'service':
          {
            'arrival': guardar.arrival ? guardar.arrival : '',
            'date': guardar.date ? guardar.date : '',
            'departure': guardar.departure ? guardar.departure : '',
            'name': guardar.name ? guardar.name : '',
            'set': guardar.set ? guardar.set : '',
            'cars': guardar.cars ? guardar.cars : '',
            'trip_id': guardar.trip_id ? guardar.trip_id : ''
          }
        }
        if (guardar.id) {
          console.log('ser a put', ser)
          let id = guardar.id
          try {
            let servicios = await API.put('services', id, ser)
            if (servicios.status >= 200 && servicios.status < 300) {
              // console.log('ya hizo PUT',servicios)
              // this.services = servicios.data.data
              this.getServices()
              this.dialog = false
              this.$swal({
                customClass: 'modal-info',
                type: 'success',
                title: 'Servicio',
                timer: 2000,
                text: 'Servicio actualizado exitosamente',
                animation: true,
                showCancelButton: true,
                showConfirmButton: false,
                cancelButtonText: 'OK'
              })
              this.editedItem = Object.assign({}, '')
            } else {
              alert('Ha ocurrido un error al editar el servicio')
            }
          } catch (e) {
            console.log('catch error al editar el servicio', e.response)
            // this.showModal = true
            // this.modalInfoTitle = 'Ha ocurrido un error'
            // this.modalInfoDetail = 'Ha ocurrido un error al editar el servicio, intente más tarde.'
            // this.modalInfoBtn1 = 'OK'
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
        } else {
          console.log('ser a post', ser)
          try {
            let servicios = await API.post('services', ser)
            if (servicios.status >= 200 && servicios.status < 300) {
              console.log(servicios)
              this.getServices()
              this.dialog = false
              this.$swal({
                customClass: 'modal-info',
                type: 'success',
                title: 'Servicio',
                text: 'Servicio creado exitosamente',
                animation: true,
                timer: 2000,
                showCancelButton: true,
                showConfirmButton: false,
                cancelButtonText: 'OK'
              })
              this.editedItem = Object.assign({}, '')
            } else {
              alert('Ha ocurrido un error al crear el servicio')
            }
          } catch (e) {
            console.log('catch error al crear el servicio', e.response)
            // this.showModal = true
            // this.modalInfoTitle = 'Ha ocurrido un error'
            // this.modalInfoDetail = 'Ha ocurrido un error al crear el servicio, intente más tarde.'
            // this.modalInfoBtn1 = 'OK'
            this.$swal({
              customClass: 'modal-info',
              type: 'error',
              title: 'Ha ocurrido un error al crear el servicio, intente más tarde.',
              text: e.response.data.error,
              animation: true,
              showCancelButton: true,
              showConfirmButton: false,
              cancelButtonText: 'Cerrar'
            })
          }
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
