<template>
  <div>
    <div class="py-3"><h2>Frecuencias</h2> </div>
    
    <v-dialog v-model="dialog" persistent max-width="900px" style="text-align: right">
      <v-card>
        <v-card-title primary-title class="primary white--text">
            <h3 class="headline">Frecuencia</h3>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6>
                <v-text-field label="Nombre"
                              v-model="editedItem.name"></v-text-field>
              </v-flex>

              <v-flex xs12 sm6>
                <v-select :items="trips" v-model="editedItem.trip_id"
                        label="Tramo"
                        single-line item-text="name" item-value="id"
                ></v-select>
              </v-flex>
            
            </v-layout>
            <v-layout wrap>
             

              <v-flex xs12 sm6>
                  <v-menu
                    v-model="datepickerStart"
                    :close-on-content-click="false"
                    full-width
                    max-width="290"
                  >
                    <v-text-field
                      slot="activator"
                      :value="computedDateFormattedMomentjs(editedItem.start)"
                      clearable
                      label="Fecha de inicio"
                      readonly
                    ></v-text-field>
                    <v-date-picker
                      v-model="editedItem.start"
                      @change="datepickerStart = false"
                      locale="es-419"
                    ></v-date-picker>
                  </v-menu>
              </v-flex>

              <v-flex xs12 sm6>
                  <v-menu
                    v-model="datepickerEnd"
                    :close-on-content-click="false"
                    full-width
                    max-width="290"
                  >
                    <v-text-field
                      slot="activator"
                      :value="computedDateFormattedMomentjs(editedItem.end)"
                      clearable
                      label="Fecha de Término"
                      readonly
                    ></v-text-field>
                    <v-date-picker
                      v-model="editedItem.end"
                      @change="datepickerEnd = false"
                      locale="es-419"
                    ></v-date-picker>
                  </v-menu>
              </v-flex>

              <v-flex xs12 sm6>
                <v-menu
                  ref="time3"
                  :close-on-content-click="false"
                  v-model="timepickerSet"
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
                    label="Hora Postura"
                    readonly
                  ></v-text-field>
                  <v-time-picker
                    v-if="timepickerSet"
                    v-model="editedItem.set"
                    format="24hr"
                    full-width
                    @change="$refs.time3.save(editedItem.set)"
                  ></v-time-picker>
                </v-menu>
              </v-flex>

              <v-flex xs12 sm6>
                <v-menu
                  ref="time1"
                  :close-on-content-click="false"
                  v-model="timepickerSalida"
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
                    label="Hora Salida"
                    readonly
                  ></v-text-field>
                  <v-time-picker
                    v-if="timepickerSalida"
                    v-model="editedItem.departure"
                    format="24hr"
                    full-width
                    @change="$refs.time1.save(editedItem.departure)"
                  ></v-time-picker>
                </v-menu>
              </v-flex>

<!--              <v-flex xs12 sm6 md4>
                <v-menu
                  ref="time2"
                  :close-on-content-click="false"
                  v-model="timepickerLlegada"
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
                    label="Llegada -arr"
                    readonly
                  ></v-text-field>
                  <v-time-picker
                    v-if="timepickerLlegada"
                    v-model="editedItem.arrival"
                    full-width
                    @change="$refs.time2.save(editedItem.arrival)"
                  ></v-time-picker>
                </v-menu>
              </v-flex> -->

              <v-flex xs12 sm6>
                <v-select :items="freqtypes" v-model="editedItem.freq_type"
                        label="Tipo"
                        single-line item-text="name" item-value="id"
                ></v-select>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field label="Vehículos" type="number"
                              v-model="editedItem.cars"></v-text-field>
              </v-flex>

              <v-flex xs12 sm6>
                  <v-switch
                  class="justify-center"
                  label="Activo"
                  v-model="editedItem.active"
                ></v-switch>
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
          <v-btn color="primary" @click="dialog = true"> <v-icon light>add</v-icon> Agregar Frecuencia</v-btn>
        </div>
      </v-toolbar>

      <v-data-table
          :headers="headers"
          :items="frecuencias"
          :search="search"
          :loading="loading"
          hide-actions
          no-data-text="No hay Frecuencias registradas"
        >
        <template slot="items" slot-scope="props">
          <td class="">{{ props.item.name }}</td>
          <td class="">{{ props.item.trip_id }}</td>
          <!-- <td class="">{{ props.item.source_id }}</td>
          <td class="">{{ props.item.dest_id }}</td> -->
          <td class="">
            <span v-if="props.item.active">Activo</span>
            <span v-else>Inactivo</span>
          </td>
          <td class="">{{ props.item.start }}</td>
          <td class="">{{ props.item.end }}</td>
          <td class="">{{ moment(props.item.set, 'HH:mm:ss').format('HH:mm') }}</td>
          <td class="">{{ moment(props.item.departure, 'HH:mm:ss').format('HH:mm') }}</td>
          <td class="">{{ moment(props.item.arrival, 'HH:mm:ss').format('HH:mm') }}</td>
          <td class="">{{ props.item.duration }}</td>
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
            <v-dialog v-model="confirmaAnular" persistent max-width="290">
              <v-card>
                <v-card-title class="headline">¿Esta seguro de eliminar la Frecuencia?</v-card-title>
                <v-card-text>Una vez realizada esta acción no podrá recuperarla.</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary darken-1" flat @click.native="confirmaAnular = false">Volver</v-btn>
                  <v-btn color="red darken-1" flat @click="deleteItem(eliminaid)">Eliminar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
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
  import {mapGetters} from 'vuex'
  import Modal from '@c/Modal'

  export default {
    data () {
      return {
        confirmaAnular: false,
        dialog: false,
        search: '',
        loading: true,
        datepickerStart: false,
        datepickerEnd: false,
        timepickerSalida: false,
        timepickerLlegada: false,
        timepickerSet: false,
        eliminaid: '',
        moment: moment,
        showModal: false,
        modalInfoTitle: '',
        modalInfoDetail: '',
        modalInfoBtn1: '',
        editedItem: {
          name: '',
          source_id: '',
          dest_id: '',
          start: '',
          end: '',
          set: '',
          departure: '',
          duration: '',
          active: false,
          trip_id: '',
          cars: ''
        },
        headers: [
          {text: 'Nombre', value: 'name'},
          // {text: 'Origen', value: 'source_id'},
          // {text: 'Destino', value: 'dest_id'},
          {text: 'Tramo', value: 'trip_id'},
          {text: 'Estado', value: 'active'},
          {text: 'Inicio', value: 'start'},
          {text: 'Fin', value: 'end'},
          {text: 'Hora de postura', value: 'set'},
          {text: 'Salida', value: 'departure'},
          {text: 'Llegada', value: 'arrival'},
          {text: 'Duración', value: 'duration'},
          {text: '', value: 'edit', sortable: false},
          {text: '', value: 'delete', sortable: false}
        ],
        frecuencias: [],
        freqtypes: [
          {id: 'daily', name: 'Diario', disabled: true},
          {id: 'weekly', name: 'Semanal'},
          {id: 'monthly', name: 'Mensual', disabled: true}
        ],
        trips: []
      }
    },
    components: {
      Modal: Modal
    },
    mounted () {
      this.getFrec()
      this.getTrips()
    },
    methods: {
      computedDateFormattedMomentjs (data) {
        return data ? moment(data).lang('es').format('dddd DD/MM/YYYY') : ''
      },
      async getFrec () {
        try {
          let frec = await API.get('frequencies')
          if (frec.status >= 200 && frec.status < 300) {
            setTimeout(() => {
              console.log('frecuencias', frec.data.data)
              this.frecuencias = frec.data.data
              this.loading = false
            }, 500)
            // console.log(frec)
          }
          else {
            alert('Ha ocurrido un error, intente nuevamente')
          }
        } catch (e) {
          console.log('catch err', e.response)
          // alert('Ha ocurrido un error, intente más tarde!')
          this.showModal = true
          this.modalInfoTitle = 'Ha ocurrido un error'
          this.modalInfoDetail = 'Ha ocurrido un error al cargar las frecuencias, intente más tarde.'
          this.modalInfoBtn1 = 'OK'
        }
      },
      async getTrips () {
        try {
          let trips = await API.get('trips')
          if (trips.status >= 200 && trips.status < 300) {
            this.trips = trips.data.data
            this.loading = false
            // console.log(trips)
          }
          else {
            alert('Ha ocurrido un error al cargar tramos, intente nuevamente')
          }
        } catch (e) {
           console.log('catch err, al cargar trips', e.response)
        }
      },
      editItem (item) {
        console.log('item edit', item)
        // delete item.mensaje
        // this.editedIndex = this.items.indexOf(item)
        // let edit = Object.assign({}, item)
        // edit.TipoDocumento = edit.tipoDocumento === '' ? 'RUT' : edit.tipoDocumento
        // this.editedItem = edit
        this.editedItem = item
        this.dialog = true
      },
      async save (guardar) {
        console.log('a guardar', guardar)
        // let obj =  this.editedItem.trips.find(obj => obj.id == guardar.trip_id);
        // console.log('trip', obj)
        // let trip = this.trips.find(obj => obj.id === guardar.trip_id);
        // console.log('trip', trip)
        let freq = {
          'frequency':
          {
            'trip_id': guardar.trip_id ? guardar.trip_id : '',
            'start': guardar.start ? guardar.start : '',
            'end': guardar.end ? guardar.end : '',
            'set': guardar.set ? guardar.set : '',
            'departure': guardar.departure ? guardar.departure : '',
            'active': guardar.active ? guardar.active : false,
            'freq_type': guardar.freq_type ? guardar.freq_type : '',
            'name': guardar.name ? guardar.name : '',
            'cars': guardar.cars ? guardar.cars : ''
          }
        }
        console.log('frec guardar', freq)
        if (guardar.id) {
          let id = guardar.id
          try {
            let frec = await API.put('frequencies', id, freq)
            if (frec.status >= 200 && frec.status < 300) {
              this.getFrec()
              this.dialog = false
            }
            else {
              alert('Ha ocurrido un error al editar la frecuencia, intente nuevamente')
            }
          } catch (e) {
            console.log('catch err', e.response)
            // alert('Ha ocurrido un error, intente más tarde!')
            this.showModal = true
            this.modalInfoTitle = 'Ha ocurrido un error'
            this.modalInfoDetail = 'Ha ocurrido un error al editar la frecuencia, intente más tarde.'
            this.modalInfoBtn1 = 'OK'
          } 
        }
        else {
          console.log('ser a post')
          try {
            let frec = await API.post('frequencies', freq)
            if (frec.status >= 200 && frec.status < 300) {
              console.log('frecuencias despues post', frec)
              this.getFrec()
              this.dialog = false
            }
            else {
              alert('Ha ocurrido un error, intente nuevamente')
            }
          } catch (e) {
            console.log('catch err', e.response)
            // alert('Ha ocurrido un error, intente más tarde!')
            this.showModal = true
            this.modalInfoTitle = 'Ha ocurrido un error'
            this.modalInfoDetail = 'Ha ocurrido un error al guardar la frecuencia, intente más tarde.'
            this.modalInfoBtn1 = 'OK'
          }
          
        }
      },
      irEliminar (datoid) {
        this.eliminaid = datoid
        this.confirmaAnular = true
      },
      async deleteItem (item) {
        console.log('voy a eliminar frec', item)
        try {
          let eliminando = await API.delete('frequencies', item)
          if (eliminando.status >= 200 && eliminando.status < 300) {
            console.log('ya hizo DELETE freq', eliminando)
            this.confirmaAnular = false
            console.log(eliminando)
            this.getFrec()
          }
          else {
            alert('Ha ocurrido un error, intente nuevamente')
          }
        } catch (e) {
            console.log('catch err', e.response)
            // alert('Ha ocurrido un error, intente más tarde!')
            this.showModal = true
            this.modalInfoTitle = 'Ha ocurrido un error'
            this.modalInfoDetail = 'Ha ocurrido un error al eliminar la frecuencia, intente más tarde.'
            this.modalInfoBtn1 = 'OK'
        }
        
      },
      close () {
        this.dialog = false
        this.editedItem = {}
        // setTimeout(() => {
        //   this.editedItem = Object.assign({}, this.defaultItem)
        //   this.editedIndex = -1
        // }, 300)
      }
    }
  }
</script>