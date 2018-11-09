<template>
  <div>
    <div> <h2>Frecuencias</h2> </div>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-btn slot="activator" color="primary" dark>Agregar Frecuencia</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Frecuencia</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Nombre *" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Email *" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Password*" type="password" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Fecha nacimiento*"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Teléfono *" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" flat @click.native="dialog = false">Cerrar</v-btn>
          <v-btn color="primary darken-1" flat @click.native="dialog = false">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-data-table
        :headers="headers"
        :items="users"
        hide-actions
        class="elevation-1"
      >
      <template slot="items" slot-scope="props">
        <td class="">{{ props.item.nombre }}</td>
        <td class="">{{ props.item.rut }}</td>
        <td class="">{{ props.item.correo }}</td>
        <td class="">{{ props.item.numeroTelefono }}</td>
        <td class="">
        <v-dialog v-model="bookingDetails" persistent max-width="1000">
          <v-btn slot="activator" color="primary" dark>Editar</v-btn>
            <v-card>
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-3">Detalles Usuario</h3>
                    </div>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                         <v-flex xs12 sm6>
                                <v-list two-line subheader>
                                    <v-list-tile>
                                        <v-list-tile-content>
                                            <v-list-tile-sub-title>Nombre</v-list-tile-sub-title>
                                            <v-list-tile-title>{{selectedUser.nombre}}</v-list-tile-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile>
                                        <v-list-tile-content>
                                            <v-list-tile-sub-title>Destino</v-list-tile-sub-title>
                                            <v-list-tile-title>{{selectedUser.rut}}</v-list-tile-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                     <v-list-tile>
                                        <v-list-tile-content>
                                            <v-list-tile-sub-title>Telefono contacto</v-list-tile-sub-title>
                                            <v-list-tile-title>{{selectedUser.numeroTelefono}}</v-list-tile-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile>
                                        <v-list-tile-content>
                                            <v-list-tile-sub-title>Correo</v-list-tile-sub-title>
                                            <v-list-tile-title>{{selectedUser.correo}}</v-list-tile-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                </v-list>
                            </v-flex>

                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <!-- <v-btn color="orange darken-1" flat
                           @click.native="resendMail"
                           :loading="this.loading"
                           :disabled="this.loading"
                    >Reenviar a email
                    </v-btn> -->
                    <v-spacer></v-spacer>
                    <v-btn color="primary darken-1" flat @click.native="bookingDetails = false">Cerrar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        </td>

        <td class="">
          <v-dialog v-model="confirmaAnular" persistent max-width="290">
            <v-btn slot="activator" outline color="error" dark>Eliminar</v-btn>
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
</template>

<script>
  export default {
    data () {
      return {
        confirmaAnular: false,
        bookingDetails: false,
        dialog: false,
        selectedUser: {
          nombre: 'Juan Perez',
          rut: '113939483-5',
          correo: 'juan@algo.com',
          numeroTelefono: '8482737'
        },
        headers: [
          // {text: 'Documento Pasajero', value: 'documentoPasajero'},
          // {text: 'Pasajero', value: 'pasajero'},
          {text: 'Nombre', value: 'nombre'},
          {text: 'Rut', value: 'rut'},
          {text: 'Correo', value: 'correo'},
          {text: 'Número de teléfono', value: 'numeroTelefono'},
          {text: '', value: 'edit', sortable: false},
          {text: '', value: 'delete', sortable: false}
        ],
        users: [
          {
            nombre: 'Juan Perez',
            rut: '113939483-5',
            correo: 'juan@algo.com',
            numeroTelefono: '8482737'
          },
          {
            nombre: 'Andres Martinez',
            rut: '138388383-5',
            correo: 'andres@gmail.com',
            numeroTelefono: '9494878'
          },
          {
            nombre: 'José Gomez',
            rut: '15588383-5',
            correo: 'pepe@gmail.com',
            numeroTelefono: '94837487'
          }
        ]
      }
    }
  }
</script>