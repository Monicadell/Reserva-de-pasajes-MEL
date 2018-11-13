<template>
  <div>
    <div class="py-3"><h2>Tramos</h2> </div>
    
    <v-dialog v-model="dialog" persistent max-width="900px" style="text-align: right">
      <v-card>
        <v-card-title primary-title>
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
                <v-text-field label="Activo"
                              v-model="editedItem.active"></v-text-field>
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
          <v-btn color="primary" @click="dialog = true"> <v-icon light>add</v-icon> Agregar tramo</v-btn>
        </div>
      </v-toolbar>

      <v-data-table
          :headers="headers"
          :items="recorridos"
          :search="search"
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
                <v-card-title class="headline">¿Esta seguro de eliminar el tramo?</v-card-title>
                <v-card-text>Una vez realizada esta acción no podrá recuperar el tramo.</v-card-text>
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

  export default {
    data () {
      return {
        confirmaAnular: false,
        dialog: false,
        search: '',
        trips: [],
        editedItem: {
          name: '',
          source_id: '',
          dest_id: '',
          active: ''
        },
        headers: [
          {text: 'Nombre', value: 'name'},
          {text: 'Origen', value: 'source_id'},
          {text: 'Destino', value: 'dest_id'},
          {text: 'Estado', value: 'active'},
          {text: '', value: 'edit', sortable: false},
          {text: '', value: 'delete', sortable: false}
        ],
        recorridos: [
          {
            name: 'MEL → Complejo MEL',
            id: '1',
            dest_id: '2',
            source_id: '1',
            active: true},
          {
            name: 'MEL → La Negra',
            id: '2',
            dest_id: '3',
            source_id: '1',
            active: false
          },
          {
            name: 'Aeropuerto ANF → Complejo MEL',
            id: '3',
            dest_id: '2',
            source_id: '4',
            active: true
          }
        ],
        stations: [
          { address: null,
            id: 1,
            lat: null,
            lon: null,
            name: 'Aeropuerto ANF'
          },
          { address: null,
            id: 2,
            lat: null,
            lon: null,
            name: 'La Negra'
          },
          { address: null,
            id: 3,
            lat: null,
            lon: null,
            name: 'MEL'
          }
        ]
      }
    },
    mounted () {
      this.getTrips()
      this.getStations()
    },
    methods: {
      async getTrips () {
        let trips = await API.get('trips')
        if (trips.status >= 200 && trips.status < 300) {
          console.log(trips)
          this.recorridos = trips.data.data
        }
      },
      async getStations () {
        let estaciones = await API.get('stations')
        if (estaciones.status >= 200 && estaciones.status < 300) {
          console.log(estaciones)
          this.stations = estaciones.data.data
        }
      },
      editItem (item) {
        console.log('item edit', item)
        this.editedItem = item
        this.dialog = true
      },
      deleteItem () {
        this.confirmaAnular = true
      },
      close () {
        this.dialog = false
        this.editedItem = {}
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