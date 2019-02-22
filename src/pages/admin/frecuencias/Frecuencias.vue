<template>
  <div>
    <div class="py-3"><h2>Servicios con frecuencias</h2> </div>
    
    <v-dialog v-model="dialog" persistent max-width="900px" class="text-xs-right">
      <v-card>
        <v-card-title primary-title class="primary white--text">
            <h3 class="headline">Frecuencia</h3>
        </v-card-title>
        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
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
                          :rules="[v => !!v || 'Campo requerido']" required
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
                      :rules="[v => !!v || 'Campo requerido']" required
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
                      :rules="[v => !!v || 'Campo requerido']" required
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
                    :rules="[v => !!v || 'Campo requerido']" required
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
                    :rules="[v => !!v || 'Campo requerido']" required
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

                <v-flex xs12 sm6>
                  <v-select :items="freqtypes" v-model="editedItem.freq_type"
                          label="Tipo"
                          single-line item-text="name" item-value="id"
                          :rules="[v => !!v || 'Campo requerido']" required
                  ></v-select>
                </v-flex>

                <v-flex xs12 sm6>
                  <!-- <v-text-field label="Vehículos" type="number" min="0"
                                v-model="editedItem.cars"></v-text-field> -->
                  <v-layout wrap justify-center>
                    <v-flex xs12 sm3 text-xs-center>
                      <v-btn fab dark small color="primary" @click="menos()">
                        <v-icon dark>remove</v-icon>
                      </v-btn>
                    </v-flex>
                    <v-flex xs12 sm2 align-center>
                      <v-text-field type="number" style="" readonly label="Buses"
                                    v-model="editedItem.cars"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm3 text-xs-center>
                      <v-btn fab dark small color="primary"  @click="mas()">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </v-flex>
                  </v-layout>
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
          </v-form>
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
        <v-card-title class="headline primary white--text">¿Esta seguro de eliminar esta Frecuencia?</v-card-title>
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
          <v-btn color="primary" @click="dialog = true"> <v-icon light>add</v-icon> Agregar Frecuencia</v-btn>
        </div>
      </v-toolbar>

      <v-data-table
          :headers="headers"
          :items="frecuencias"
          :search="search"
          :loading="loading"
          :rows-per-page-items="[40, 80, 100]"
          item-key="id"
          no-data-text="No hay Frecuencias registradas"
        >
        <template slot="items" slot-scope="props">
          <td class="">{{ props.item.name }}</td>
          <td class="">{{ trip(props.item.trip_id) }}</td>
          <td class="">
            <span v-if="props.item.active">Activo</span>
            <span v-else>Inactivo</span>
          </td>
          <td class="">{{ props.item.start }}</td>
          <td class="">{{ props.item.end }}</td>
          <td class="">{{ moment(props.item.set, 'HH:mm:ss').format('HH:mm') }}</td>
          <td class="">{{ moment(props.item.departure, 'HH:mm:ss').format('HH:mm') }}</td>
          <td class="">{{ moment(props.item.arrival, 'HH:mm:ss').format('HH:mm') }}</td>
          <td class="" v-if="props.item.duration">{{ moment(props.item.duration, 'HH:mm:ss').format('HH:mm') }}</td>
          <td v-else></td>
          <td>{{ moment(props.item.updated_at).format('DD-MM-YY HH:mm') }}</td>
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
  // import {mapGetters} from 'vuex'
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
        valid: true,
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
          cars: 0
        },
        headers: [
          {text: 'Nombre', value: 'name'},
          {text: 'Tramo', value: 'trip_id'},
          {text: 'Estado', value: 'active'},
          {text: 'Inicio', value: 'start'},
          {text: 'Fin', value: 'end'},
          {text: 'Hora de postura', value: 'set'},
          {text: 'Salida', value: 'departure'},
          {text: 'Llegada', value: 'arrival'},
          {text: 'Duración (hrs)', value: 'duration'},
          {text: 'Última actualización', value: 'updated_at'},
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
              // console.log('frecuencias', frec.data.data)
              this.frecuencias = frec.data.data
              this.loading = false
            }, 500)
          } else {
            alert('Ha ocurrido un error, intente nuevamente')
          }
        } catch (e) {
          console.log('catch err', e.response)
          this.$swal({
            customClass: 'modal-info',
            type: 'error',
            title: 'Frecuencias',
            text: 'Ha ocurrido un error al obtener las frecuencias',
            animation: true,
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonText: 'OK'
          })
        }
      },
      async getTrips () {
        try {
          let trips = await API.get('trips')
          if (trips.status >= 200 && trips.status < 300) {
            this.trips = trips.data.data
            // console.log(trips)
          } else {
            alert('Ha ocurrido un error al cargar tramos, intente nuevamente')
          }
        } catch (e) {
          console.log('catch err, al cargar trips', e.response)
        }
      },
      editItem (item) {
        console.log('item edit', item)
        this.editedItem = item
        this.dialog = true
      },
      async save (guardar) {
        console.log('a guardar', guardar)
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
              this.editedItem = Object.assign({})
              this.$swal({
                customClass: 'modal-info',
                type: 'success',
                title: 'Frecuencia',
                timer: 2000,
                text: 'Frecuencia actualizada exitosamente',
                animation: true,
                showCancelButton: true,
                showConfirmButton: false,
                cancelButtonText: 'OK'
              })
            } else {
              alert('Ha ocurrido un error al editar la frecuencia, intente nuevamente')
              this.editedItem = Object.assign({})
            }
          } catch (e) {
            console.log('catch err', e.response)
            this.$swal({
              customClass: 'modal-info',
              type: 'error',
              title: 'Ha ocurrido un error al editar la frecuencia, intente más tarde.',
              text: e.response.data.error,
              animation: true,
              showCancelButton: true,
              showConfirmButton: false,
              cancelButtonText: 'Cerrar'
            })
            this.dialog = false
            this.editedItem = Object.assign({})
          }
        } else {
          console.log('ser a post')
          try {
            let frec = await API.post('frequencies', freq)
            if (frec.status >= 200 && frec.status < 300) {
              console.log('frecuencias despues post', frec)
              this.getFrec()
              this.$swal({
                customClass: 'modal-info',
                type: 'success',
                title: 'Frecuencia',
                timer: 2000,
                text: 'Frecuencia creada exitosamente',
                animation: true,
                showCancelButton: true,
                showConfirmButton: false,
                cancelButtonText: 'OK'
              })
              this.dialog = false
              this.editedItem = Object.assign({})
            } else {
              alert('Ha ocurrido un error, intente nuevamente')
              this.dialog = false
              this.editedItem = Object.assign({})
            }
          } catch (e) {
            console.log('catch err', e.response)
            this.$swal({
              customClass: 'modal-info',
              type: 'error',
              title: 'Ha ocurrido un error al crear la frecuencia',
              text: e.response.data.error,
              animation: true,
              showCancelButton: true,
              showConfirmButton: false,
              cancelButtonText: 'Cerrar'
            })
            this.dialog = false
            this.editedItem = Object.assign({})
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
            this.$swal({
              customClass: 'modal-info',
              type: 'success',
              title: 'Frecuencia',
              text: 'Frecuencia eliminada exitosamente',
              animation: true,
              timer: 2000,
              showCancelButton: true,
              showConfirmButton: false,
              cancelButtonText: 'OK'
            })
            this.getFrec()
          } else {
            alert('Ha ocurrido un error, intente nuevamente')
          }
        } catch (e) {
          console.log('catch err', e.response)
          this.confirmaAnular = false
          this.$swal({
            customClass: 'modal-info',
            type: 'error',
            title: 'Ha ocurrido un error al eliminar la frecuencia',
            text: e.response.data.error,
            animation: true,
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonText: 'Cerrar'
          })
        }
      },
      close () {
        this.dialog = false
        this.editedItem = {}
      },
      trip (item) {
        let t = this.trips.find(tramo => tramo.id === item)
        return t ? t.name : ''
      },
      menos () {
        if (this.editedItem.cars > 0) {
          this.editedItem.cars--
        }
      },
      mas () {
        this.editedItem.cars++
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
