<template>
  <div>
    <div class="py-3"><h2>Buses</h2> </div>
    
    <v-dialog v-model="dialog" persistent max-width="900px">
      <v-card>
        <v-card-title primary-title>
            <h3 class="headline">Bus</h3>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 md6>
                <v-text-field label="Nombre" v-model="editedItem.name"></v-text-field>
              </v-flex>

              <v-flex xs12 md6>
                <v-text-field label="Patente"
                              v-model="editedItem.plate"></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout wrap>
              <v-flex xs12 md6>
                <v-text-field label="Formato" v-model="editedItem.format_id"></v-text-field>
              </v-flex>

              <!-- <v-flex xs12 md6>
                <v-select :items="userAgreement" v-model="editedItem.tipoContrato"
                          label="Tipo de contrato"
                          single-line item-text="text" item-value="id"
                ></v-select>
              </v-flex> -->
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
          <v-btn color="primary" @click="dialog = true"> <v-icon light>add</v-icon> Agregar Bus</v-btn>
        </div>
      </v-toolbar>

      <v-data-table
          :headers="headers"
          :items="buses"
          :search="search"
          hide-actions
          no-data-text="No hay buses registrados"
        >
        <template slot="items" slot-scope="props">
          <td class="">{{ props.item.name }}</td>
          <td class="">{{ props.item.plate }}</td>
          <td class="">{{ props.item.format_id }}</td>
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
  // import API from '@pi/app'

  export default {
    data () {
      return {
        confirmaAnular: false,
        dialog: false,
        search: '',
        editedItem: {
          name: '',
          plate: '',
          format_id: ''
        },
        selectedBus: {
          name: 'Juan Perez',
          rut: '113939483-5',
          format_id: 'EST',
          active: false,
          email: 'juan@algo.com',
          address: 'daushd dasu dau s23',
          phone_number: '8482737',
          company_name: 'Empresa asociada ltda.',
          last_connection: '2018-10/2018 20:00'
        },
        headers: [
          {text: 'Nombre', value: 'name'},
          {text: 'Patente', value: 'plate'},
          {text: 'Formato', value: 'format_id'},
          {text: '', value: 'edit', sortable: false},
          {text: '', value: 'delete', sortable: false}
        ],
        buses: [
          {
            name: 'Bus 2',
            plate: '113939483-5',
            format_id: 'EST'
          },
          {
            name: 'Bus 1',
            plate: '138388383-5',
            format_id: 'EST'
          },
          {
            name: 'Bus 3',
            plate: '15588383-5',
            format_id: 'ADMIN'
          }
        ]
      }
    },
    // mounted () {
    //   this.getbuses()
    // },
    methods: {
    //   async getbuses () {
    //     let usuarios = await API.get('cars')
    //     if (usuarios.status >= 200 && usuarios.status < 300) {
    //       console.log(usuarios)
    //       this.buses = usuarios.data.data
    //     }
    //   },
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
      //       plate: auth.user,
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