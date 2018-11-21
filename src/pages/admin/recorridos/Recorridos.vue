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
                <!-- <v-text-field label="Activo"
                              v-model="editedItem.active"></v-text-field> -->
                <v-switch
                  class="justify-center"
                  label="Activo"
                  v-model="editedItem.active"
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
                @click="irEliminar(props.item.id)"
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
                  <v-btn color="red darken-1" flat @click.native="deleteItem(eliminaid)">Eliminar</v-btn>
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

  export default {
    data () {
      return {
        confirmaAnular: false,
        dialog: false,
        search: '',
        trips: [],
        loading: true,
        moment: moment,
        editedItem: {
          name: '',
          source_id: '',
          dest_id: '',
          active: ''
        },
        headers: [
          {text: 'Nombre', value: 'name'},
          {text: 'Duración (minutos)', value: 'duration'},
          {text: 'Origen', value: 'source_id'},
          {text: 'Destino', value: 'dest_id'},
          {text: 'Estado', value: 'active'},
          {text: '', value: 'edit', sortable: false},
          {text: '', value: 'delete', sortable: false}
        ],
        recorridos: [],
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
      convertMinsToHrsMins(mins) {
        let h = Math.floor(mins / 60);
        let m = mins % 60;
        h = h < 10 ? '0' + h : h;
        m = m < 10 ? '0' + m : m;
        return `${h}:${m}`;
      },
      async getTrips () {
        let trips = await API.get('trips')
        if (trips.status >= 200 && trips.status < 300) {
          console.log(trips)
          // let a = trips.data.data.map(function(it){
          //   console.log(it)
          //   if(it.duration){
          //     let h = Math.floor(it.duration / 60);
          //     let m = it.duration % 60;
          //     h = h < 10 ? '0' + h : h;
          //     m = m < 10 ? '0' + m : m;
          //     it.duration = `${h}:${m}`;
          //   }
          // })
          // console.log(trips)
          setTimeout(() => {
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
        let eliminando = await API.delete('trips', item)
        if (eliminando.status >= 200 && eliminando.status < 300) {
          console.log('ya hizo DELETE',eliminando)
          this.confirmaAnular = false
          console.log(eliminando)
          this.getTrips()   
        }
      },
      close () {
        this.dialog = false
        this.editedItem = {}
      },
      editItem (item) {
        this.editedItem = item
        this.dialog = true
      },
      async save (guardar) {
        console.log('a guardar', guardar)
      
        let tramo = {
             "trip": 
                {
                    "dest_id": guardar.dest_id ? guardar.dest_id : '',
                    "source_id": guardar.source_id ? guardar.source_id : '',
                    "name": guardar.name ? guardar.name : '',
                    "active": guardar.active ? guardar.active : '',
                    "duration": guardar.duration ? guardar.duration : ''
                }
        }
        
        if(guardar.id){
           console.log('ser a put',tramo)
          let id = guardar.id
          // console.log('voy a PUT, ser', id)
          let tramos = await API.put('trips', id, tramo )
          if (tramos.status >= 200 && tramos.status < 300) {
            // console.log('ya hizo PUT',tramos)
              this.services = tramos.data.data
              this.dialog = false
            
          }
        }
        else{
          console.log('ser a post',tramo)
	        let tramos = await API.post('trips', tramo)
	        if (tramos.status >= 200 && tramos.status < 300) {
            console.log('post ok', tramos)
            this.getTrips()
            this.recorridos = tramos.data.data
            this.dialog = false
	        }
        }
       
      }
    }
  }
</script>