<template>
  <div>
    <div class="py-3"><h2>Servicios</h2> </div>
    
    <v-dialog v-model="dialog" persistent max-width="900px" style="text-align: right">
      <v-card>
        <v-card-title primary-title class="primary white--text">
            <h3 class="headline">Servicio</h3>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
               <v-flex xs12 md6>
                <v-text-field label="Nombre"
                              v-model="editedItem.name"></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
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
                      label="Fecha"
                      readonly
                    ></v-text-field>
                    <v-date-picker
                      v-model="editedItem.date"
                      @change="datepicker = false"
                      locale="es-419"
                    ></v-date-picker>
                  </v-menu>
              </v-flex>
            </v-layout>

            <v-layout wrap>
              
              <v-flex xs12 md6>
                <!-- <v-text-field label="Salida"
                              v-model="editedItem.departure"></v-text-field> -->

                <v-menu
                  ref="time2"
                  :close-on-content-click="false"
                  v-model="timepicker2"
                  :nudge-right="40"
                  :return-value.sync="editedItem.departure"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="editedItem.departure"
                    label="Salida"
                    readonly
                  ></v-text-field>
                  <v-time-picker
                    v-if="timepicker2"
                    v-model="editedItem.departure"
                    format="24hr"
                    full-width
                    @change="$refs.time2.save(editedItem.departure)"
                  ></v-time-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12 md6>
                <v-menu
                  ref="time1"
                  :close-on-content-click="false"
                  v-model="timepicker1"
                  :nudge-right="40"
                  :return-value.sync="editedItem.arrival"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="editedItem.arrival"
                    label="Llegada"
                    readonly
                  ></v-text-field>
                  <v-time-picker
                    v-if="timepicker1"
                    v-model="editedItem.arrival"
                    format="24hr"
                    full-width
                    @change="$refs.time1.save(editedItem.arrival)"
                  ></v-time-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12 md6>
                <!-- <v-text-field label="Set"
                              v-model="editedItem.set"></v-text-field> -->
                <v-menu
                  ref="time3"
                  :close-on-content-click="false"
                  v-model="timepicker3"
                  :nudge-right="40"
                  :return-value.sync="editedItem.set"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="editedItem.set"
                    label="Hora de puesta"
                    readonly
                  ></v-text-field>
                  <v-time-picker
                    v-if="timepicker3"
                    v-model="editedItem.set"
                    format="24hr"
                    full-width
                    @change="$refs.time3.save(editedItem.set)"
                  ></v-time-picker>
                </v-menu>
              </v-flex>
                            
              <v-flex xs12 md6>
                <v-select :items="trips" v-model="editedItem.trip_id"
                        label="Tramo"
                        single-line item-text="name" item-value="id"
                ></v-select>
              </v-flex>       

              <v-flex xs12 md6>
                <v-select :items="frequencies" v-model="editedItem.freq_id"
                          label="Frecuencia"
                          single-line item-text="name" item-value="id"
                ></v-select>
              </v-flex>            

              <v-flex xs12 sm6>
                <v-select :items="cars" v-model="editedItem.car_id"
                          label="Bus"
                          single-line item-text="text" item-value="id"
                ></v-select>
              </v-flex>

              <v-flex xs12 sm6>
                <v-select :items="drivers" v-model="editedItem.driver_id"
                          label="Conductor"
                          single-line item-text="text" item-value="id"
                ></v-select>
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field label="Asientos disponibles"
                              v-model="editedItem.avail_seats"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" flat @click.native="close()">Cancelar</v-btn>
          <v-btn color="primary" class='white--text' @click.native="save(editedItem)">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- dialogo confirmar eliminar -->
    <v-dialog v-model="confirmaAnular" persistent max-width="450">
      <v-card>
        <v-card-title class="headline primary white--text">¿Esta seguro de eliminar el servicio?</v-card-title>
        <v-card-text>Una vez realizada esta acción no podrá recuperar los datos.</v-card-text>
        <v-card-actions class="pb-3 px-3">
          
          <v-btn color="primary" outline @click.native="confirmaAnular = false">Volver</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="deleteItem(eliminaid)">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div class="elevation-1">
      <v-toolbar flat color="white">
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Buscar"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <div class="text-xs-right">
          <v-btn color="primary" @click="dialog = true"> <v-icon light>add</v-icon> Agregar servicio</v-btn>
        </div>
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
          <td class="">{{ moment(props.item.arrival, 'HH:mm:ss').format('HH:mm') }}</td>
          <td class="">{{ moment(props.item.departure, 'HH:mm:ss').format('HH:mm') }}</td>
          <td class="" v-if="props.item.set">{{ moment(props.item.set, 'HH:mm:ss').format('HH:mm')}}</td>
          <td class="" v-else></td>
          <td class="" v-if="props.item.duration">{{ moment(props.item.duration, 'HH:mm:ss').format('HH:mm') }}</td>
          <td class="" v-else></td>
          <td class="">{{ props.item.trip_id }}</td>

          <td class="">{{ props.item.freq_id }}</td>
          <!-- <td class="">{{ props.item.car_id }}</td>
          <td class="">{{ props.item.driver_id }}</td> -->
          <td class="">{{ props.item.avail_seats }}</td>
          <td class="justify-center">
            <v-tooltip top>
              <v-icon
                small
                slot="activator"
                color="primary"
                @click="editItem(props.item)"
              >
                edit
              </v-icon>
              <span>Editar</span>
            </v-tooltip>
          </td>
          <td class="">
            <v-tooltip top>
              <v-icon
                small
                slot="activator"
                color="primary"
                @click="irEliminar(props.item.id)"
              >
                delete
              </v-icon>
              <span>Eliminar</span>
            </v-tooltip>
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
  
  export default {
    data () {
      return {
        confirmaAnular: false,
        dialog: false,
        search: '',
        loading: true,
        moment: moment,
        eliminaid: '',
        showModal: false,
        modalInfoTitle: '',
        modalInfoDetail: '',
        modalInfoBtn1: '',
        editedItem: {
          date: new Date().toISOString().substr(0, 10)
        },
        datepicker: false,
        timepicker1: false,
        timepicker2: false,
        timepicker3: false,
        headers: [
          {text: 'Nombre', value: 'name'},
          {text: 'Fecha', value: 'date'},
          {text: 'Llegada', value: 'arrival'},
          {text: 'Salida', value: 'departure'},
          {text: 'Set', value: 'set'},
          {text: 'Duración', value: 'duration'},
          {text: 'Trip', value: 'trip_id'},
          {text: 'Frecuencia', value: 'freq_id'},
          // {text: 'Bus', value: 'car_id'},
          // {text: 'Conductor', value: 'driver_id'},
          {text: 'Asientos disponibles', value: 'avail_seats'},
          {text: '', value: 'edit', sortable: false},
          {text: '', value: 'delete', sortable: false}
        ],
        services: [],
        drivers: [
          {text: 'Martin Rihdas', id: '1'},
          {text: 'Pepe Rodriguez', id: '2'}
        ],
        cars: [
          {text: 'bus 1', id: '1'},
          {text: 'Sprinter 3', id: '2'}
        ],
        frequencies: [
        ],
        trips: []
      }
    },
    components: {
      Modal: Modal
    },
    mounted () {
      this.getServices()
      this.getTrips()
      this.getFrequencies()
    },
    computed: {
      computedDateFormattedMomentjs () {
        return this.editedItem.date ? moment(this.editedItem.date).format('DD/MM/YYYY') : ''
      }
    },
    methods: {
      irEliminar (datoid) {
        this.eliminaid = datoid
        this.confirmaAnular = true
      },
      async getTrips () {
        try {
          let trips = await API.get('trips')
          if (trips.status >= 200 && trips.status < 300) {
            console.log('Result load trips', trips)
            this.trips = trips.data.data
            this.loading = false
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
            this.loading = false
          }
        } catch (e) {
          console.log('error al cargar frecuencias', e.response)
        }
      },
      async getServices () {
        console.log('get services')
        try {
          let servicios = await API.get('services')
          if (servicios.status >= 200 && servicios.status < 300) {
            console.log(servicios)
            setTimeout(() => {
              this.services = servicios.data.data
              this.loading = false
            }, 500)
          }
        } catch (e) {
          console.log('error al cargar servicios', e.response)
          console.log('catch err', e.response)
          this.showModal = true
          this.modalInfoTitle = 'Ha ocurrido un error'
          this.modalInfoDetail = 'Ha ocurrido un error al obtener los servicios, intente más tarde.'
          this.modalInfoBtn1 = 'OK'
        }
      },
      editItem (item) {
        console.log('item->', item)
        this.editedItem = item
        this.dialog = true
      },
      async deleteItem (item) {
        console.log('voy a eliminar', item)
        try {
          let eliminando = await API.delete('services', item)
          if (eliminando.status >= 200 && eliminando.status < 300) {
            console.log('ya hizo DELETE', eliminando)
            this.confirmaAnular = false
            console.log(eliminando)
            this.getServices()
          } else {
            alert('Ha ocurrido un error al eliminar')
          }
        } catch (e) {
          console.log('catch error al eliminar el servicio', e.response)
          this.showModal = true
          this.modalInfoTitle = 'Ha ocurrido un error'
          this.modalInfoDetail = 'Ha ocurrido un error al eliminar el servicio, intente más tarde.'
          this.modalInfoBtn1 = 'OK'
        }
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
            'avail_seats': guardar.avail_seats ? guardar.avail_seats : '',
            'date': guardar.date ? guardar.date : '',
            'departure': guardar.departure ? guardar.departure : '',
            'name': guardar.name ? guardar.name : '',
            'set': guardar.set ? guardar.set : '',
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
              this.editedItem = Object.assign({}, '')
            } else {
              alert('Ha ocurrido un error al editar el servicio')
            }
          } catch (e) {
            console.log('catch error al editar el servicio', e.response)
            this.showModal = true
            this.modalInfoTitle = 'Ha ocurrido un error'
            this.modalInfoDetail = 'Ha ocurrido un error al editar el servicio, intente más tarde.'
            this.modalInfoBtn1 = 'OK'
          }
        } else{
          console.log('ser a post', ser)
          try {
            let servicios = await API.post('services', ser)
            if (servicios.status >= 200 && servicios.status < 300) {
              console.log(servicios)
              this.getServices()
              this.dialog = false
              this.editedItem = Object.assign({}, '')
            } else {
              alert('Ha ocurrido un error al crear el servicio')
            }
          } catch (e) {
            console.log('catch error al crear el servicio', e.response)
            this.showModal = true
            this.modalInfoTitle = 'Ha ocurrido un error'
            this.modalInfoDetail = 'Ha ocurrido un error al crear el servicio, intente más tarde.'
            this.modalInfoBtn1 = 'OK'
          }
        }
      }
    }
  }
</script>