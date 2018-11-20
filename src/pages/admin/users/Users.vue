<template>
  <div>
    <div class="py-3"><h2>Usuarios</h2> </div>
    
    <v-dialog v-model="dialog" persistent max-width="900px" style="text-align: right">
      <v-card>
      <!-- <v-card :class="{
        'elevation-1': !loading && users.length === 0,
        'elevation-10': users.length > 0,
        disableList: disableList && users.length === 0
        }"
        > -->
        <v-card-title primary-title>
            <h3 class="headline">Usuario</h3>
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

              <!-- <v-flex xs12 sm6 md4>
                <v-select :items="userAgreement" v-model="editedItem.tipoContrato"
                          label="Tipo de contrato"
                          single-line item-text="text" item-value="id"
                ></v-select>
              </v-flex> -->

              <v-flex xs12 sm6 md4>
                <v-text-field label="Numero Contacto"
                              v-model="editedItem.phone_number"></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md4>
                <v-text-field label="Empresa Asociada"
                              v-model="editedItem.company_name" disabled></v-text-field>
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
          <v-btn color="primary" @click="dialog = true"> <v-icon light>add</v-icon> Agregar Usuario</v-btn>
        </div>
      </v-toolbar>

      <v-data-table
          :headers="headers"
          :items="users"
          :loading="loading"
          :search="search"
          :pagination.sync="pagination"
          :total-items="totalUsers"
          :rows-per-page-items="pagination.rowsPerPageItems"
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
          <td class="">{{ props.item.phone_number }}</td>
          <td class="">{{ props.item.company_name }}</td>
          <td class="">{{ moment(props.item.last_connection).format('DD/MM/YYYY hh:mm')}}</td>
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
        <template slot="footer">
          <td :colspan="headers.length" class="text-xs-right">
            <v-spacer></v-spacer>
            <v-btn flat icon @click="changePage(false)">
              <v-icon>keyboard_arrow_left</v-icon>
            </v-btn>
            <v-btn flat icon  @click="changePage(true)">
               <v-icon>keyboard_arrow_right</v-icon>
            </v-btn>
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
        loading: true,
        moment: moment,
        page: 1,
        pagination: {
          
        },
        editedItem: {
          name: '',
          rut: '',
          role_id: '',
          active: '',
          email: '',
          address: '',
          phone_number: '',
          company_name: '',
          last_connection: ''
        },
        selectedUser: {
          name: 'Juan Perez',
          rut: '113939483-5',
          role_id: 'EST',
          active: false,
          email: 'juan@algo.com',
          address: 'daushd dasu dau s23',
          phone_number: '8482737',
          company_name: 'Empresa asociada ltda.',
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
          {text: 'Número de teléfono', value: 'phone_number'},
          {text: 'Empresa asoc.', value: 'company_name'},
          {text: 'Última conexión', value: 'last_connection'},
          {text: '', value: 'edit', sortable: false},
          {text: '', value: 'delete', sortable: false}
        ],
        users: [],
        totalUsers: 0,
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
    // watch: {
    //   pagination: {
    //     handler () {
    //       this.getDataFromApi()
    //         .then(data => {
    //           console.log('data', data)
    //           this.users = data.items
    //           this.totalUsers = data.total
    //         })
    //     },
    //     deep: true
    //   }
    // },
    mounted () {
      this.getUsers()
      // setTimeout(() => {
      //   this.getDataFromApi()
      //     .then(data => {
      //       this.users = data.items
      //       this.totalUsers = data.total
      //     })
      // }, 500)
     
      
    },
    methods: {
      getDataFromApi () {
        this.loading = true
        console.log('entro', this.users)
        return new Promise((resolve, reject) => {
          const { sortBy, descending, page, rowsPerPage } = this.pagination
            
          let items = this.users
          console.log('items->>>', items)
          const total = items.length
          if (this.pagination.sortBy) {
            // console.log('sortby', this.pagination.sortBy)
            items = items.sort((a, b) => {
              const sortA = a[sortBy]
              const sortB = b[sortBy]

              if (descending) {
                if (sortA < sortB) return 1
                if (sortA > sortB) return -1
                return 0
              } else {
                if (sortA < sortB) return -1
                if (sortA > sortB) return 1
                return 0
              }
            })
          }

          if (rowsPerPage > 0) {
            // console.log('rowperpage', items)
            items = items.slice((page - 1) * rowsPerPage, page * rowsPerPage)
            // console.log('items rows', items)
          }

          setTimeout(() => {
            this.loading = false
            console.log('items', items)
            resolve({
              items,
              total
            })
          }, 1000)
        })
      },
      async getUsers () {
        let usuarios = await API.get('users')

        if (usuarios.status >= 200 && usuarios.status < 300) {
          // console.log('usuarios', usuarios.data.data)
          //         return usuarios.data.data
          // setTimeout(() => {
            this.users = usuarios.data.data
            this.totalUsers = usuarios.data.data.length
            this.loading = false
        //     }, 500)
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
      },
      changePage(isSiguiente){
       console.log('pagina actual', this.page)
       console.log('isSiguiente',isSiguiente)
       if (isSiguiente){
         //llamara  a user con page +1
       }
       else{
         //llamar a anterior
         //bliqear teclas
       }
      }
    }
  }
</script>