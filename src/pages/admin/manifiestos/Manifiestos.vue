<template>
  <div>
    <div class="py-3"><h2>Manifiestos</h2> </div>
    
    <v-dialog v-model="dialog" persistent max-width="900px" style="text-align: right">
      <v-card>
        <v-card-title primary-title>
            <h3 class="headline">Maniefiesto</h3>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 md4>
                <v-select :items="userDocumentType" v-model="editedItem.tipoDocumento"
                          label="Tipo documento"
                          single-line item-text="text" item-value="id"
                ></v-select>
              </v-flex>

              <v-flex xs12 md4>
                <v-text-field label="Documento"
                              v-model="editedItem.rut"></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Nombre" v-model="editedItem.name"></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md4>
                <v-text-field label="Direccion"
                              v-model="editedItem.address"></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md4>
                <v-select :items="userState" v-model="editedItem.active" label="Estado"
                          single-line item-text="text" item-value="id"
                ></v-select>
              </v-flex>

              <v-flex xs12 sm6 md4>
                <v-text-field label="Password" v-model="editedItem.password"
                              type="password"></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md4>
                <v-text-field label="Email" v-model="editedItem.email"></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md4>
                <v-select :items="userType" v-model="editedItem.role_id"
                          label="Tipo de Usuario"
                          single-line item-text="text" item-value="id"
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

    <!-- dialogo confirmar eliminar -->
    <v-dialog v-model="confirmaAnular" persistent max-width="450">
      <v-card>
        <v-card-title class="headline primary white--text">¿Esta seguro de eliminar el manifiesto?</v-card-title>
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
          <v-btn color="primary" @click="dialog = true"> <v-icon light>add</v-icon> Agregar Manifiesto</v-btn>
        </div>
      </v-toolbar>

      <v-data-table
          :headers="headers"
          :items="manifiestos"
          :search="search"
          hide-actions
        >
        <template slot="items" slot-scope="props">
          <td class="">{{ props.item.name }}</td>
          <td class="">{{ props.item.rut }}</td>
          <td class="">{{ props.item.role_id }}</td>
          <td class="">
            <span v-if="props.item.active">Activo</span>
            <span v-else>Inactivo</span>
          </td>
          <td class="">{{ props.item.email }}</td>
          <td class="">{{ props.item.last_connection }}</td>
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
          </td>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        confirmaAnular: false,
        dialog: false,
        search: '',
        editedItem: {
          name: '',
          rut: '',
          role_id: '',
          active: '',
          email: '',
          address: '',
          last_connection: ''
        },
        selectedUser: {
          name: 'Juan Perez',
          rut: '113939483-5',
          role_id: 'EST',
          active: false,
          email: 'juan@algo.com',
          address: 'daushd dasu dau s23',
          last_connection: '2018-10/2018 20:00'
        },
        headers: [
          // {text: 'Documento Pasajero', value: 'documentoPasajero'},
          // {text: 'Pasajero', value: 'pasajero'},
          {text: 'Nombre', value: 'name'},
          {text: 'Documento', value: 'rut'},
          {text: 'Tipo usuario', value: 'role_id'},
          {text: 'Estado', value: 'active'},
          {text: 'Correo', value: 'email'},
          {text: 'Última conexión', value: 'last_connection'},
          {text: '', value: 'edit', sortable: false},
          {text: '', value: 'delete', sortable: false}
        ],
        manifiestos: [
          {
            name: 'Juan Perez',
            rut: '113939483-5',
            role_id: 'EST',
            active: false,
            email: 'juan@algo.com',
            address: 'daushd dasu dau s23',
            last_connection: '2018-10/2018 20:00'
          },
          {
            name: 'Andres Martinez',
            rut: '138388383-5',
            role_id: 'EST',
            active: true,
            email: 'andres@gmail.com',
            address: 'daushd dasu dau s23',
            last_connection: 'Sin conexion'
          },
          {
            name: 'José Gomez',
            rut: '15588383-5',
            role_id: 'ADMIN',
            active: true,
            email: 'pepe@gmail.com',
            address: 'daushd dasu dau s23',
            last_connection: '2018-10/2018 20:00'
          }
        ],
        userDocumentType: [
          {text: 'RUT', id: 'RUT'},
          {text: 'PASAPORTE', id: 'PASAPORTE'}
        ],
        userState: [
          {text: 'ACTIVO', id: 'ACT'},
          {text: 'INACTIVO', id: 'INA'}
        ],
        userType: [
          {text: 'ESTANDAR', id: 'EST'},
          {text: 'ADMINISTRADOR', id: 'ADM'},
          {text: 'ASISTENTE', id: 'ASI'},
          {text: 'CALL CENTER', id: 'CAL'},
          {text: 'REDUCIDO', id: 'RED'},
          {text: 'ADMINISTRATIVO', id: 'AD2'}
        ],
        userAgreement: [
          {text: 'MEL', id: 'MEL'},
          {text: 'CONTRATISTA', id: 'CONTRATISTA'}
        ]
      }
    },
    methods: {
      // loadUserData () {
      //   let auth = this.$store.getters.getAuth
      //   let config = {
      //     method: 'POST',
      //     url: endPoints.userList,
      //     params: {
      //       rut: auth.user,
      //       ncontrato: auth.agreementNumber,
      //       tipoContrato: this.usersType
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