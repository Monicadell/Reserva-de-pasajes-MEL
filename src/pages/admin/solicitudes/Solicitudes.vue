<template>
  <div>
    <div class="py-3"><h2>Solicitudes de Usuarios</h2> </div>
    <v-dialog v-model="dialog" persistent max-width="900px" class="text-xs-right">
      <v-card>

        <v-card-title primary-title class="primary white--text">
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
                              @keyup="keymonitor(editedItem.tipoDocumento)"
                              v-model="editedItem.documento"></v-text-field>
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

              <v-flex xs12 sm6 md4 class="text-xs-center">
                <label class="font-weight-bold" for="active" v-if="editedItem.active">Activo</label>
                <label class="font-weight-bold" for="active" v-else>Inactivo</label>
                <v-switch
                  class="justify-center"
                  name="active"
                  v-model="editedItem.active"
                ></v-switch>
              </v-flex>

              <v-flex xs12 sm6 md4>
                <v-text-field label="Email" v-model="editedItem.email"></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md4>
                <v-select :items="roles" v-model="editedItem.role_id"
                          label="Tipo de Usuario"
                          single-line item-text="name" item-value="id"
                ></v-select>
              </v-flex>

              <v-flex xs12 sm6 md4>
                <v-select :items="contracts" v-model="editedItem.contract_type_id"
                          label="Tipo de contrato"
                          single-line item-text="name" item-value="id"
                ></v-select>
              </v-flex>

              <v-flex xs12 sm6 md4>
                <v-text-field label="Numero Contacto"
                              v-model="editedItem.phone_number"></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md4>
                <v-autocomplete
                  v-model="editedItem.company_id"
                  :items="companies"
                  :search-input.sync="search"
                  color="primary"
                  hide-no-data
                  hide-selected
                  item-text="name"
                  item-value="id"
                  label="Empresa asociada"
                ></v-autocomplete>
              </v-flex>

            <v-flex xs12 sm6 md4>
              <v-menu
                v-model="datepicker"
                :close-on-content-click="false"
                full-width
                max-width="290"
              >
                <v-text-field
                  slot="activator"
                  :value="computedDateFormattedMomentjs(editedItem.expiration)"
                  clearable
                  label="Fecha de expiración"
                  readonly
                ></v-text-field>
                <v-date-picker
                  v-model="editedItem.expiration"
                  @change="datepicker = false"
                  locale="es-419"
                ></v-date-picker>
              </v-menu>
            </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" outline @click.native="close()">Cancelar</v-btn>
          <v-btn color="primary" class='white--text' @click.native="save(editedItem)">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- dialogo confirmar eliminar -->
    <v-dialog v-model="confirmaAnular" persistent max-width="450">
      <v-card>
        <v-card-title class="headline primary white--text">¿Esta seguro de eliminar la solicitud?</v-card-title>
        <v-card-text>Una vez realizada esta acción no podrá recuperar la solicitud de usuario.</v-card-text>
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
          v-on:change="busca"
          label="Buscar"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-data-table
          :headers="headers"
          :items="users"
          :loading="loading"
          item-key="id"
          no-data-text="No hay usuarios registradas"
          hide-actions
        >
        <template slot="items" slot-scope="props">
          <td class="">{{ props.item.name }}</td>
          <td class="">{{ props.item.rut || props.item.passport}}</td>
          <td class="">{{ props.item.email }}</td>
          <td class="">{{ props.item.phone_number }}</td>
          <td class="">{{ props.item.company_name }}</td>

          <td class="justify-center">
            <v-btn
              small outline
              color="green darken-2"
              class="white--text text-capitalize"
              @click="editItem(props.item)"
            >
              Aceptar
              <v-icon right dark>thumb_up</v-icon>
            </v-btn>
          </td>
          <td>
            <v-btn
              small outline
              color="red darken-2"
              class="white--text text-capitalize"
               @click="irEliminar(props.item.id)"
            >
              Rechazar
              <v-icon right dark>thumb_down</v-icon>
            </v-btn>
          </td>
        </template>
        <template slot="footer">
          <td :colspan="headers.length" class="text-xs-right">
            <v-container grid-list-xl text-xs-center>
              <pagination :pagination="pagination" @change="getUsers"/>
            </v-container>  
          </td>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
  import API from '@pi/app'
  import moment from 'moment'
  import Pagination from '@c/Pagination'

  export default {
    data () {
      return {
        confirmaAnular: false,
        dialog: false,
        search: '',
        loading: true,
        moment: moment,
        eliminaid: '',
        datepicker: false,
        dateSearch: '',
        page: 1,
        pagination: {
          page: 1,
          rowsPerPage: 40, // -1 for All
          // sortBy: '',
          totalItems: 0,
          rowsPerPageItems: [40, 80, 120],
          total_pages: 0
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
        headers: [
          // {text: 'Documento Pasajero', value: 'documentoPasajero', sortable: false},
          // {text: 'Pasajero', value: 'pasajero', sortable: false},
          {text: 'Nombre', value: 'name', sortable: false},
          {text: 'Documento', value: 'rut', sortable: false},
          // {text: 'Tipo usuario', value: 'role_id', sortable: false},
          // {text: 'Estado', value: 'active', sortable: false},
          {text: 'Correo', value: 'email', sortable: false},
          {text: 'Número de teléfono', value: 'phone_number', sortable: false},
          {text: 'Empresa asoc.', value: 'company_name', sortable: false},
          {text: '', value: 'aceptar', sortable: false},
          {text: '', value: 'eliminar', sortable: false}
        ],
        users: [],
        totalUsers: 0,
        userDocumentType: [
          {text: 'RUT', id: '1'},
          {text: 'PASAPORTE', id: '2'}
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
        roles: [],
        contracts: [{name: 'MEL', id: 1},
          {name: 'CONTRATISTA', id: 2}],
        companies: [],
        rules: {
          password_confirmation: value => {
            const coinciden = this.editedItem.password === value
            return coinciden || 'Contraseñas no coinciden'
          },
          min: value => value.length >= 8 || 'Min 8 caracteres'
        }
      }
    },
    components: {
      Pagination
    },
    mounted () {
      this.getUsers()
      this.getRoles()
      this.getCompanies()
    //  this.getContracts()
    },
    methods: {
      computedDateFormattedMomentjs (data) {
        return data ? moment(data).lang('es').format('dddd DD/MM/YYYY') : ''
      },
      async getUsers (params) {
        console.log('get solicitudes params', params)
        let data = {}
        if (!params) {
          data = {'active': 0}
        } else {
          data = {'active': 0, ...params}
        }
        console.log(' solicitudes after, data', data)
        try {
          let usuarios = await API.get('users', data)
          if (usuarios.status >= 200 && usuarios.status < 300) {
            console.log('usuarios', usuarios.data)
            setTimeout(() => {
              this.users = usuarios.data.data.filter(us => us.active === false)
              this.pagination.totalItems = usuarios.data.total_entries
              this.pagination.page = usuarios.data.page_number
              this.pagination.rowsPerPage = usuarios.data.page_size
              this.pagination.total_pages = usuarios.data.total_pages
              this.loading = false
            }, 1000)
          }
        } catch (e) {
          console.log('catch err', e.response)
          this.$swal({
            customClass: 'modal-info',
            type: 'error',
            title: 'Ha ocurrido un error',
            text: 'Ha ocurrido un inconveniente al obtener los usuarios del sistema, intente nuevamente.',
            animation: true,
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonText: 'Cerrar'
          })
        }
      },
      busca () {
        console.log('busca', this.search)
        let buscar = {
          'active': 0,
          'q': this.search
        }
        this.getUsers(buscar)
      },
      editItem (item) {
        console.log('item edit', item)
        this.editedItem = Object.assign({}, item)
        this.editedItem.tipoDocumento = item.rut ? '1' : '2'
        // this.userDocumentType.id = item.rut ? 1 : 2
        this.editedItem.documento = item.rut ? item.rut : item.passport
        this.dialog = true
      },
      async save (guardar) {
        console.log('a guardar', guardar)
        if (guardar.tipoDocumento === '1') {
          console.log('es rut guarda')
          guardar.documento = guardar.documento.replace(/\./g, '')
        }
        let us = {
          'user':
          {
            'active': guardar.active ? guardar.active : '',
            'address': guardar.address ? guardar.address : '',
            'company_id': guardar.company_id ? guardar.company_id : '',
            'contract_type_id': guardar.contract_type_id ? guardar.contract_type_id : '',
            'email': guardar.email ? guardar.email : '',
            'name': guardar.name ? guardar.name : '',
            'passport': guardar.tipoDocumento === '2' ? guardar.documento : '',
            'rut': guardar.tipoDocumento === '1' ? guardar.documento : '',
            'phone_number': guardar.phone_number ? guardar.phone_number : '',
            'role_id': guardar.role_id ? guardar.role_id : ''
          }
        }
        if (guardar.id) {
          console.log('user a put', us)
          let id = guardar.id
          try {
            let putuser = await API.put('users', id, us)
            if (putuser.status >= 200 && putuser.status < 300) {
              this.getUsers()
              this.dialog = false
              this.$swal({
                type: 'success',
                customClass: 'modal-info',
                timer: 2000,
                title: 'Usuario',
                text: 'Usuario actualizado exitosamente!',
                animation: true,
                showConfirmButton: false,
                showCloseButton: false
              })
              this.editedItem = Object.assign({}, '')
            }
          } catch (e) {
            console.log('catch err', e.response)
            this.editedItem = Object.assign({}, '')
            this.dialog = false
            this.$swal({
              type: 'error',
              customClass: 'modal-info',
              timer: 2000,
              title: 'Ha ocurrido un error',
              text: 'Ha ocurrido un error editando el usuario, intente más tarde.',
              animation: true,
              showConfirmButton: false,
              showCloseButton: false
            })
          }
        } else {
          console.log('user a post', us)
          try {
            let postuser = await API.post('users', us)
            if (postuser.status >= 200 && postuser.status < 300) {
              console.log('result post user', postuser)
              this.editedItem = Object.assign({}, '')
              this.getUsers()
              this.dialog = false
              this.$swal({
                type: 'success',
                customClass: 'modal-info',
                timer: 2000,
                title: 'Usuario',
                text: 'Usuario creado exitosamente!',
                animation: true,
                showConfirmButton: false,
                showCloseButton: false
              })
            }
          } catch (e) {
            console.log('catch err', e.response)
            this.editedItem = Object.assign({}, '')
            this.dialog = false
            this.$swal({
              type: 'error',
              customClass: 'modal-info',
              title: 'Ha ocurrido un error',
              text: 'Ha ocurrido un error creando el usuario, intente más tarde.',
              animation: true,
              showConfirmButton: false,
              showCloseButton: false
            })
          }
        }
      },
      async deleteItem (item) {
        console.log('voy a eliminar user', item)
        try {
          let eliminando = await API.delete('users', item)
          if (eliminando.status >= 200 && eliminando.status < 300) {
            console.log('ya hizo DELETE user', eliminando)
            this.getUsers()
            this.confirmaAnular = false
            this.$swal({
              type: 'success',
              customClass: 'modal-info',
              timer: 2000,
              title: 'Usuario',
              text: 'Usuario eliminado exitosamente!',
              animation: true,
              showConfirmButton: false,
              showCloseButton: false
            })
            console.log(eliminando)
          }
        } catch (e) {
          console.log('catch err', e.response)
          this.editedItem = Object.assign({}, '')
          this.confirmaAnular = false
          this.$swal({
            type: 'error',
            customClass: 'modal-info',
            timer: 2000,
            title: 'Ha ocurrido un error',
            text: 'Ha ocurrido un error eliminando el usuario, intente más tarde.',
            animation: true,
            showConfirmButton: false,
            showCloseButton: false
          })
        }
      },
      irEliminar (datoid) {
        this.eliminaid = datoid
        this.confirmaAnular = true
      },
      close () {
        this.dialog = false
        this.editedItem = Object.assign({})
      },
      async getRoles () {
        let roles = await API.get('roles')
        if (roles.status >= 200 && roles.status < 300) {
          console.log('roles', roles)
          this.roles = roles.data.data
        }
      },
      async getCompanies () {
        let companies = await API.get('companies')
        if (companies.status >= 200 && companies.status < 300) {
          this.companies = companies.data.data
        }
      },
      async getContracts () {
        let contracts = await API.get('contracts')
        if (contracts.status >= 200 && contracts.status < 300) {
          this.contracts = contracts.data.data
        }
      },
      keymonitor (doctype) {
        console.log('doc', doctype)
        if (doctype === '1') {
          console.log('entra a rut')
          let value = event.target.value
          if (!value) this.user = ''
          value = value.match(/[0-9Kk]+/g).join('')
          this.editedItem.documento = value.slice(0, -1).replace((/[0-9](?=(?:[0-9]{3})+(?![0-9]))/g), '$&.') + '-' + value.slice(-1).toLowerCase()
        }
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
