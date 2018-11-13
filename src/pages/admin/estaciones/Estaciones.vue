<template>
  <div>
    <div class="py-3"><h2>Estaciones</h2> </div>
    
    <v-dialog v-model="dialog" persistent max-width="900px" style="text-align: right">
      <v-card>
        <v-card-title primary-title>
            <h3 class="headline">Estación</h3>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Nombre"
                              v-model="editedItem.name"></v-text-field>
              </v-flex>
              <v-flex xs12 md4>
                <v-text-field label="Dirección"
                              v-model="editedItem.address"></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Latitud" v-model="editedItem.lat"></v-text-field>
              </v-flex>


              <v-flex xs12 sm6 md4>
                <v-text-field label="Longitud" v-model="editedItem.lon"></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md4>
                <v-text-field label="city_id" v-model="editedItem.city_id"></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md4>
                <v-text-field label="Descripción"
                              v-model="editedItem.desc"></v-text-field>
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
          <v-btn color="primary" @click="dialog = true"> <v-icon light>add</v-icon> Agregar estacion</v-btn>
        </div>
      </v-toolbar>

      <v-data-table
          :headers="headers"
          :items="estaciones"
          :search="search"
          :loading="loading"
          hide-actions
        >
        <template slot="items" slot-scope="props">
          <td class="">{{ props.item.name }}</td>
          <td class="">{{ props.item.address }}</td>
          <td class="">{{ props.item.lat }}</td>
          <td class="">{{ props.item.lon }}</td>
          <td class="">{{ props.item.city_id }}</td>
          <td class="">{{ props.item.desc }}</td>
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
                <v-card-title class="headline">¿Esta seguro de eliminar el usuario?</v-card-title>
                <v-card-text>Una vez realizada esta acción no podrá recuperar el usuario.</v-card-text>
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
        loading: true,
        editedItem: {
          name: '',
          address: '',
          lat: '',
          lon: '',
          city_id: '',
          desc: ''
        },
        headers: [
          {text: 'Nombre', value: 'name'},
          {text: 'Dirección', value: 'address'},
          {text: 'Latitud', value: 'lat'},
          {text: 'Longitud', value: 'lon'},
          {text: 'City', value: 'city_id'},
          {text: 'Descripción', value: 'desc'},
          {text: '', value: 'edit', sortable: false},
          {text: '', value: 'delete', sortable: false}
        ],
        estaciones: []
        // estaciones: [
        //   {
        //     name: 'Mel',
        //     address: '...',
        //     lat: '1313',
        //     lon: '111',
        //     city_id: 'san_id',
        //     desc: 'Desciopcion'
        //   },
        //   {
        //     name: 'Mel',
        //     address: '....',
        //     lat: '1212',
        //     lon: '111',
        //     city_id: 'sant_id',
        //     desc: 'Descripcion'
        //   },
        //   {
        //     name: 'mel 2',
        //     address: '...',
        //     lat: '1212',
        //     lon: '1111',
        //     city_id: 'sant_id',
        //     desc: 'Desciopcion'
        //   }
        // ]
      }
    },
    mounted () {
      this.getStations()
    },
    methods: {
      async getStations () {
        let usuarios = await API.get('stations')
        if (usuarios.status >= 200 && usuarios.status < 300) {
          console.log(usuarios)
          setTimeout(() => {
            this.estaciones = usuarios.data.data
            this.loading = false
            }, 500)
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
      //       address: auth.user,
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