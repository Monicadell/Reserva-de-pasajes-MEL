<template>
  <div  style="overflow:scroll">
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
                <v-select :items="editedItem.trips" v-model="editedItem.trip_id"
                        label="Tramo"
                        single-line item-text="name" item-value="id"
                ></v-select>
              </v-flex>
            
            </v-layout>
            <v-layout wrap>
             

              <v-flex xs12 sm6>
                <!-- <v-text-field label="Inicio"
                              v-model="editedItem.start"></v-text-field> -->
                <!-- <calendar :dato="'freqstart'"/> -->
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
                <!-- <v-text-field label="Set" v-model="editedItem.set"></v-text-field> -->
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
                <!-- <v-text-field label="Salida" v-model="editedItem.departure"></v-text-field> -->
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

              <!-- <v-flex xs12 sm6 md4>
                <v-text-field label="Duración"
                              v-model="editedItem.duration"></v-text-field>
              </v-flex> -->
              <v-flex xs12 sm6>
                <v-select :items="freqtypes" v-model="editedItem.freq_type"
                        label="Tipo"
                        single-line item-text="name" item-value="id"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <!-- <v-text-field label="Activo"
                              v-model="editedItem.active"></v-text-field> -->
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
        >
        <template slot="items" slot-scope="props">
          <td class="">{{ props.item.name }}</td>
          <td class="">{{ props.item.source_id }}</td>
          <td class="">{{ props.item.dest_id }}</td>
          <td class="">
            <span v-if="props.item.active">Activo</span>
            <span v-else>Inactivo</span>
          </td>
          <td class="">{{ props.item.start }}</td>
          <td class="">{{ props.item.end }}</td>
          <td class="">{{ props.item.set }}</td>
          <td class="">{{ props.item.departure }}</td>
          <td class="">{{ props.item.arrival }}</td>
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
                @click="deleteItem(props.item)"
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
  </div>
</template>

<script>
  import API from '@pi/app'
  import moment from 'moment'
  import Calendar from '@c/Calendar'
  import {mapGetters} from 'vuex'

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
        editedItem: {
          name: '',
          source_id: '',
          dest_id: '',
          start: '',
          end: '',
          set: '',
          departure: '',
          arrival: '',
          duration: '',
          active: false,
          trips: [],
          trip_id: ''
        },
        selectedFrecuencie: {
          name: 'Frec1',
          source_id: 'source',
          dest_id: 'dest',
          start: '2018-10/2018 20:00',
          end: '2018-10/2018 20:00',
          set: '2018-10/2018 20:00',
          departure: '2018-10/2018 20:00',
          arrival: '2018-10/2018 20:00',
          duration: '5:00',
          active: true
        },
        headers: [
          {text: 'Nombre', value: 'name'},
          {text: 'Origen', value: 'source_id'},
          {text: 'Destino', value: 'dest_id'},
          {text: 'Estado', value: 'active'},
          {text: 'Inicio', value: 'start'},
          {text: 'Fin', value: 'end'},
          {text: 'Set', value: 'set'},
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
        ]
      }
    },
    mounted () {
      this.getFrec()
      this.getTrips()
      // this.editedItem.start = this.start
    },
    computed: {
     
      // ...mapGetters({
      //   start: ['Calendar/freqStart']
      // })
    },
    components: {
      Calendar: Calendar
    },
    methods: {
      computedDateFormattedMomentjs (data) {
        return data ? moment(data).lang('es').format('dddd DD/MM/YYYY') : ''

      },
      async getFrec () {
        let frec = await API.get('frequencies')
        if (frec.status >= 200 && frec.status < 300) {
          setTimeout(() => {
            this.frecuencias = frec.data.data
            this.loading = false
            }, 500)
          // console.log(frec)
         
        }
      },
      async getTrips () {
        let trips = await API.get('trips')
        if (trips.status >= 200 && trips.status < 300) {
          this.editedItem.trips = trips.data.data
          this.loading = false
          // console.log(trips)
         
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
        let freq = {
             "frequency": 
                {
                    "trip_id": guardar.trip_id ? guardar.trip_id : '',
                    "start": guardar.start ? guardar.start : '',
                    "end": guardar.end ? guardar.end : '',
                    "set": guardar.set ? guardar.set : '',
                    "departure": guardar.departure ? guardar.departure : '',
                    "arrival": guardar.arrival ? guardar.arrival : '',
                    "active": guardar.active ? guardar.active : '',
                    "freq_type": guardar.freq_type ? guardar.freq_type : '',
                    "name": guardar.name ? guardar.name : '',
                }
        }
        
        console.log('ser a post',freq)
        if(guardar.id){
          let id = guardar.id
          let frec = await API.put('frequencies', id, freq )
          if (frec.status >= 200 && frec.status < 300) {
              this.services = frec.data.data
              this.dialog = false
          }
        }
        else{
	        console.log('ser a post')
	        let frec = await API.post('frequencies', freq)
	        if (frec.status >= 200 && frec.status < 300) {
            console.log('frecuencias', frec)
             this.getFrec()
              this.frecuencias = frec.data.data
              this.dialog = false
	        }
        }
       
      },
      async deleteItem (item) {
        console.log('voy a eliminar frec', item)
        let eliminando = await API.delete('frequencies', item)
        if (eliminando.status >= 200 && eliminando.status < 300) {
          console.log('ya hizo DELETE freq',eliminando)
          this.confirmaAnular = false
          console.log(eliminando)
          this.getFrec()   
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