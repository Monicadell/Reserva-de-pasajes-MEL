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
              <v-flex xs12 md4>
                <v-text-field label="Nombre"
                              v-model="editedItem.name"></v-text-field>
              </v-flex>

              <v-flex xs12 md4>
                <v-select :items="editedItem.trips" v-model="editedItem.trips"
                        label="Tramo"
                        single-line item-text="name" item-value="name"
                ></v-select>
                <!-- <v-text-field label="Origen"
                              v-model="editedItem.source_id"></v-text-field> -->

                 <!-- <v-flex xs12 sm6 md4>
                <v-text-field label="Destino" v-model="editedItem.dest_id"></v-text-field>
              </v-flex> -->
              </v-flex>
            </v-layout>
            <v-layout wrap>
             

              <v-flex xs12 sm6 md4>
                <v-text-field label="Inicio"
                              v-model="editedItem.start"></v-text-field>
                <calendar :dato="'freqstart'"/>


                <!-- <v-menu
                    v-model="datepickerStart"
                    :close-on-content-click="false"
                    full-width
                    max-width="290"
                  >
                    <v-text-field
                      slot="activator"
                      :value="computedDateFormattedMomentjs(edited.start)"
                      clearable
                      label="Fecha inicio"
                      readonly
                    ></v-text-field>
                    <v-date-picker
                      v-model="editedItem.start"
                      @change="datepickerStart = false"
                      locale="es-419"
                    ></v-date-picker>
                  </v-menu> -->
              </v-flex>

              <v-flex xs12 sm6 md4>
                <v-text-field label="Fin"
                              v-model="editedItem.end"></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md4>
                <v-text-field label="Set" v-model="editedItem.set"></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md4>
                <v-text-field label="Salida" v-model="editedItem.departure"></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md4>
                <v-text-field label="Llegada" v-model="editedItem.arrival"></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md4>
                <v-text-field label="Duración"
                              v-model="editedItem.duration"></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md4>
                <v-text-field label="Activo"
                              v-model="editedItem.active"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" flat @click.native="close()">Cancelar</v-btn>
          <v-btn color="primary" class='white--text' @click.native="save">Guardar</v-btn>
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
                  <v-btn color="red darken-1" flat @click.native="confirmaAnular = false">Eliminar</v-btn>
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
          trips: []
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
        frecuencias: []
      }
    },
    mounted () {
      this.getFrec()
      this.getTrips()
      this.editedItem.start = this.start
      console.log('start', this.start)
    },
    computed: {
      // computedDateFormattedMomentjs (data) {
      //   return this.editedItem.start ? moment(this.editedItem.start).format('DD/MM/YYYY') : ''
      // }
      ...mapGetters({
        start: ['Calendar/freqStart']
      })
    },
    components: {
      Calendar: Calendar
    },
    methods: {
      async getFrec () {
        let frec = await API.get('frequencies')
        if (frec.status >= 200 && frec.status < 300) {
          setTimeout(() => {
            this.frecuencias = frec.data.data
            this.loading = false
            }, 500)
          console.log(frec)
         
        }
      },
      async getTrips () {
        let trips = await API.get('trips')
        if (trips.status >= 200 && trips.status < 300) {
          this.editedItem.trips = trips.data.data
          this.loading = false
          console.log(trips)
         
        }
      },
      // loadUserData () {
      //   let auth = this.$store.getters.getAuth
      //   let config = {
      //     method: 'POST',
      //     url: endPoints.userList,
      //     params: {
      //       rut: auth.user,
      //       ncontrato: auth.agreementNumber,
      //       tipoContrato: this.frecuenciasType
      //     }
      //   }
      //   this.loading = true
      //   this.items = []
      //   axios(config).then((response) => {
      //     this.loading = false
      //     if (response.status === 200 && response.data.success) {
      //       this.items = response.data.response
      //     } else {
      //       alert('Error al cargar la información')
      //       console.warn(response)
      //     }
      //   }, (err) => {
      //     this.loading = false
      //     console.warn(err)
      //   })
      // },
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
      deleteItem () {
        this.confirmaAnular = true
      },
      close () {
        this.dialog = false
        this.editedItem = {}
        // setTimeout(() => {
        //   this.editedItem = Object.assign({}, this.defaultItem)
        //   this.editedIndex = -1
        // }, 300)
      }

      // save () {
      //   let auth = this.$store.getters.getAuth
      //   let config = {
      //     method: 'POST',
      //     url: endPoints.createUser,
      //     params: {
      //       rut: auth.user,
      //       ncontrato: auth.agreementNumber
      //     }
      //   }
      //   this.loading = true
      //   Object.assign(config.params, this.editedItem)
      //   axios(config).then((response) => {
      //     this.close()
      //     this.loading = false
      //     this.msgReponse = 'Guardado'
      //     this.showMsg = true
      //     this.loadUserData()
      //   }, (err) => {
      //     this.close()
      //     this.msgReponse = 'Error al guardar'
      //     this.showMsg = true
      //     this.loading = false
      //     console.warn(err)
      //   })
      // }
    }
  }
</script>