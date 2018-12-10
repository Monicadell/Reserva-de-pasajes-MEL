<template>
  <div>
    <div class="py-3"><h2>Tramos</h2> </div>
    
    <v-dialog v-model="dialog" persistent max-width="900px" style="text-align: right">
      <v-card>
        <v-card-title primary-title class="primary white--text">
            <h3 class="headline">Tramo</h3>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 md6>
                <v-text-field label="Nombre"
                              v-model="editedItem.name"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-switch
                  class="justify-center"
                  label="Público"
                  v-model="editedItem.public"
                ></v-switch>
              </v-flex>
            </v-layout>
            <v-layout wrap>
              <v-flex xs12 md6>
                <v-select :items="stations" v-model="editedItem.source_id"
                          label="Estación de inicio"
                          single-line item-text="name" item-value="id"
                ></v-select>
              </v-flex>
              <v-flex xs12 md6>
                <v-select :items="stations" v-model="editedItem.dest_id"
                          label="Estación de destino"
                          single-line item-text="name" item-value="id"
                ></v-select>
              </v-flex>
              
              <v-flex xs12 md6>
                <v-text-field type="number" v-model="editedItem.duration" label="Duración (minutos)"></v-text-field>
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
        <v-card-title class="headline primary white--text">¿Esta seguro de eliminar el tramo?</v-card-title>
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
          <v-btn color="primary" @click="dialog = true"> <v-icon light>add</v-icon> Agregar tramo</v-btn>
        </div>
      </v-toolbar>

      <v-data-table
          :headers="headers"
          :items="recorridos"
          :search="search"
          :loading="loading"
          hide-actions
          no-data-text="No hay tramos registrados"
        >
        <template slot="items" slot-scope="props">
          <td class="">{{ props.item.name }}</td>
          <td class="">
            <!-- {{ props.item.duration }} -->
            <input
              :value="convertMinsToHrsMins(props.item.duration)"
              readonly style="border-width: 0"
            >
          </td>
          <td class="">{{ props.item.source_id }}</td>
          <td class="">{{ props.item.dest_id }}</td>
          <td class="">
            <span v-if="props.item.public">Activo</span>
            <span v-else>Inactivo</span>
          </td>
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
        trips: [],
        loading: true,
        moment: moment,
        showModal: false,
        modalInfoTitle: '',
        modalInfoDetail: '',
        modalInfoBtn1: '',
        editedItem: {
          name: '',
          source_id: '',
          dest_id: '',
          public: ''
        },
        headers: [
          {text: 'Nombre', value: 'name'},
          {text: 'Duración (horas)', value: 'duration'},
          {text: 'Origen', value: 'source_id'},
          {text: 'Destino', value: 'dest_id'},
          {text: 'Público', value: 'public'},
          {text: '', value: 'edit', sortable: false},
          {text: '', value: 'delete', sortable: false}
        ],
        recorridos: [],
        stations: []
      }
    },
    mounted () {
      this.getTrips()
      this.getStations()
    },
    components: {
      modal: Modal
    },
    methods: {
      convertMinsToHrsMins (mins) {
        let h = Math.floor(mins / 60)
        let m = mins % 60
        h = h < 10 ? '0' + h : h
        m = m < 10 ? '0' + m : m
        return `${h}:${m}`
      },
      async getTrips () {
        let trips = await API.get('trips')
        if (trips.status >= 200 && trips.status < 300) {
          setTimeout(() => {
            // const intersection = trips.data.data.filter(source_id => this.stations.includes(source_id));
            // console.log(intersection)
            console.log('trips', trips.data.data)
            this.recorridos = trips.data.data
            this.loading = false
          }, 500)
        }
      },
      async getStations () {
        let estaciones = await API.get('stations')
        if (estaciones.status >= 200 && estaciones.status < 300) {
          console.log(estaciones)
          this.stations = estaciones.data.data
        }
      },
      irEliminar (datoid) {
        this.eliminaid = datoid
        this.confirmaAnular = true
      },
      async deleteItem (item) {
        try {
          let eliminando = await API.delete('trips', item)
          if (eliminando.status >= 200 && eliminando.status < 300) {
            console.log('ya hizo DELETE', eliminando)
            this.confirmaAnular = false
            console.log(eliminando)
            this.getTrips()
          }
        } catch (e) {
          console.log('catch err', e.response)
          this.editedItem = Object.assign({}, '')
          // alert('Ha ocurrido un error, intente más tarde!')
          this.confirmaAnular = false
          this.showModal = true
          this.modalInfoTitle = 'Ha ocurrido un error'
          this.modalInfoDetail = 'Ha ocurrido un error eliminando el tramo, intente más tarde.'
          this.modalInfoBtn1 = 'OK'
        }
      },
      close () {
        this.dialog = false
        this.editedItem = Object.assign({}, '')
      },
      editItem (item) {
        this.editedItem = item
        this.dialog = true
      },
      async save (guardar) {
        console.log('a guardar', guardar)
        let tramo = {
          'trip':
          {
            'dest_id': guardar.dest_id ? guardar.dest_id : '',
            'source_id': guardar.source_id ? guardar.source_id : '',
            'name': guardar.name ? guardar.name : '',
            'public': guardar.public,
            'duration': guardar.duration ? guardar.duration : ''
          }
        }
        if (guardar.id) {
          console.log('ser a put', tramo)
          let id = guardar.id
          try {
            let tramos = await API.put('trips', id, tramo)
            if (tramos.status >= 200 && tramos.status < 300) {
              console.log('ya hizo PUT', tramos)
              this.editedItem = Object.assign({}, '')
              this.getTrips()
              this.dialog = false
            }
          } catch (e) {
            console.log('catch err', e.response)
            // alert('Ha ocurrido un error, intente más tarde!')
            this.editedItem = Object.assign({}, '')
            this.dialog = false
            this.showModal = true
            this.modalInfoTitle = 'Ha ocurrido un error'
            this.modalInfoDetail = 'Ha ocurrido un error editando el usuario, intente más tarde.'
            this.modalInfoBtn1 = 'OK'
          }
        } else {
          console.log('ser a post', tramo)
          try {
            let tramos = await API.post('trips', tramo)
            if (tramos.status >= 200 && tramos.status < 300) {
              console.log('post ok', tramos)
              this.getTrips()
              this.dialog = false
            }
          } catch (e) {
            console.log('catch err', e.response)
            // alert('Ha ocurrido un error, intente más tarde!')
            this.editedItem = Object.assign({}, '')
            this.dialog = false
            this.showModal = true
            this.modalInfoTitle = 'Ha ocurrido un error'
            this.modalInfoDetail = 'Ha ocurrido un error creando el tramo, intente nuevamente.'
            this.modalInfoBtn1 = 'OK'
          }
        }
      }
    }
  }
</script>