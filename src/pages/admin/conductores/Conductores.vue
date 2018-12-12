<template>
  <div>
    <div class="py-3"><h2>Conductores</h2> </div>
    
    <v-dialog v-model="dialog" persistent max-width="900px" style="text-align: right">
      <v-card>
        <v-card-title primary-title>
            <h3 class="headline">Conductor</h3>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Nombre" v-model="editedItem.name"></v-text-field>
              </v-flex>
              <v-flex xs12 md4>
                <v-text-field label="Documento"
                              v-model="editedItem.rut"></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout wrap>
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
        <v-card-title class="headline primary white--text">¿Esta seguro de eliminar el Conductor?</v-card-title>
        <v-card-text>Una vez realizada esta acción no podrá recuperar el conductor.</v-card-text>
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
          <v-btn color="primary" @click="dialog = true"> <v-icon light>add</v-icon> Agregar Conductor</v-btn>
        </div>
      </v-toolbar>

      <v-data-table
          :headers="headers"
          :items="users"
          :search="search"
          hide-actions
          no-data-text="No hay conductores registrados"
        >
        <template slot="items" slot-scope="props">
          <td class="">{{ props.item.name }}</td>
          <td class="">{{ props.item.rut }}</td>
          <td class="">
            <span v-if="props.item.active">Activo</span>
            <span v-else>Inactivo</span>
          </td>
          <td class="">{{ props.item.email }}</td>
          <td class="">{{ props.item.phone_number }}</td>
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
  // import API from '@pi/app'

  export default {
    data () {
      return {
        confirmaAnular: false,
        dialog: false,
        search: '',
        editedItem: {
          name: '',
          rut: '',
          active: '',
          email: '',
          phone_number: ''
        },
        headers: [
          {text: 'Nombre', value: 'name'},
          {text: 'Rut', value: 'rut'},
          {text: 'Active', value: 'active'},
          {text: 'Email', value: 'email'},
          {text: 'Número de teléfono', value: 'phone_number'},
          {text: '', value: 'edit', sortable: false},
          {text: '', value: 'delete', sortable: false}
        ],
        users: [
          {
            name: 'Juan Perez',
            rut: '113939483-5',
            active: true,
            email: 'juan@algo.com',
            phone_number: '8482737'
          },
          {
            name: 'Andres Martinez',
            rut: '138388383-5',
            active: true,
            email: 'andres@gmail.com',
            phone_number: '9494878'
          },
          {
            name: 'José Gomez',
            rut: '15588383-5',
            active: true,
            email: 'pepe@gmail.com',
            phone_number: '94837487'
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
      // async getStations () {
      //   let usuarios = await API.get('users')
      //   if (usuarios.status >= 200 && usuarios.status < 300) {
      //     console.log(usuarios)
      //     this.users = usuarios.data.data
      //   }
      // },
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
