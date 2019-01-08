<template>
  <div>
    <v-container fluid>

      <!-- <v-layout row wrap>
        <v-breadcrumbs divider="/">
          <v-breadcrumbs-item :to="{ path: '/Management/Management' }">
            <span v-lang.profile></span>
          </v-breadcrumbs-item>
          <v-breadcrumbs-item>
            <span v-lang.myInformation></span>
          </v-breadcrumbs-item>
        </v-breadcrumbs>
      </v-layout> -->

      <v-layout wrap align-center v-if="user.name !== ''">
        <v-flex xs12>
          <v-card class="elevation-5">
            <v-responsive color="grey">
              <v-container fill-height fluid>
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox>


                    <v-list>
                      <v-list-tile avatar>
                        <v-list-tile-avatar>
                          <img :src="avatar + user.name + '?font-size=0.45&length=2&background=F17B31&color=fff'">
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                          <v-list-tile-title>{{user.name}}</v-list-tile-title>
                          <!-- <v-list-tile-sub-title>{{ user.nContrato }}</v-list-tile-sub-title> -->
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-list>

                  </v-flex>
                </v-layout>
              </v-container>
            </v-responsive>
            <v-card-title>
              <v-btn color="primary darken-1" fab dark small absolute top right
                     @click="dialog = true"
              >
                <v-icon>edit</v-icon>
              </v-btn>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs6>
                    <v-text-field
                      color="primary"
                      class="input-group--focused" readonly label="Nombre:"
                      v-model="user.name"></v-text-field>
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field
                      color="primary"
                      class="input-group--focused" readonly label="Email:"
                      v-model="user.email"></v-text-field>
                  </v-flex>
                  <v-flex xs6>
                    <!-- <v-text-field
                      color="primary"
                      class="input-group--focused" readonly label="RUT:"
                      v-model="user.documento"></v-text-field> -->
                    <v-text-field v-if="user.rut"
                      color="primary"
                      class="input-group--focused" readonly label="RUT:"
                      v-model="user.rut"></v-text-field>
                    <v-text-field v-else
                      color="primary"
                      class="input-group--focused" readonly label="Pasaporte:"
                      v-model="user.passport"></v-text-field>
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field
                      color="primary"
                      class="input-group--focused" readonly label="Numero contacto:"
                      v-model="user.phone_number"></v-text-field>
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field
                      color="primary"
                      class="input-group--focused" readonly label="Dirección:"
                      v-model="user.address"></v-text-field>
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field
                      color="primary"
                      class="input-group--focused" readonly label="Empresa asociada:"
                      v-model="user.company_name"></v-text-field>
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field v-if="user.contract_type_id === 1"
                      color="primary"
                      class="input-group--focused" readonly label="Tipo Contrato:"
                      value="MEL"></v-text-field>
                      <v-text-field v-else
                      color="primary"
                      class="input-group--focused" readonly label="Tipo Contrato:"
                      value="CONTRATISTA"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
      <v-progress-linear v-else :indeterminate="true" color="primary" height="5"></v-progress-linear>
    </v-container>


    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title class="primary">
          <span class="headline white--text">Editar</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>

            <v-layout wrap>
              <v-flex xs12>
                <v-text-field color="primary" label="Nombre:" v-model="userEdited.name"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field color="primary" label="Email:" v-model="userEdited.email"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field color="primary" label="Numero contacto:"
                              v-model="userEdited.phone_number"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field color="primary" label="Direccion:" v-model="userEdited.address"></v-text-field>
              </v-flex>
              <v-divider></v-divider>
              <small>Credenciales</small>
              <v-flex xs12>
                <v-text-field color="primary" label="Contraseña:"
                              type="password"
                              v-model="userEdited.password">
                </v-text-field>
              </v-flex>
              
              <!-- <v-flex xs12 sm6>
                <v-text-field label="Password" v-model="userEdited.password"
                              type="password" :rules="[rules.min]"></v-text-field>
              </v-flex> -->

              <v-flex xs12>
                <v-text-field label="Confirme Password" v-model="userEdited.password_confirmation"
                              :rules="[rules.password_confirmation]" type="password"></v-text-field>
              </v-flex>
            </v-layout>

          </v-container>
        </v-card-text>
        <v-card-actions class="px-3 pb-3">
          
          <v-btn color="primary darken-1" outline @click.native="dialog = false">
            <span>Cancelar</span>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" dark @click.native="save(userEdited)"
                 :loading="loading"
                 :disabled="loading">
            <span>Guardar</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      bottom="bottom"
      right="right"
      vertical="vertical"
      v-model="showMsg"
      :timeout="5000"
      color="primary"
    >
      {{msgReponse}}
      <v-btn flat color="white" @click.native="showMsg = false">Cerrar</v-btn>
    </v-snackbar>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import API from '@pi/app'

  export default {
    data: () => ({
      dialog: false,
      msgReponse: '',
      showMsg: false,
      loading: false,
      avatar: 'https://ui-avatars.com/api/?name=',
      user: {},
      userEdited: {
        name: '',
        address: '',
        password_confirmation: '',
        password: '',
        email: ''
      },
      rules: {
        password_confirmation: value => {
          const coinciden = this.editedItem.password === value
          return coinciden || 'Contraseñas no coinciden'
        },
        min: value => value.length >= 8 || 'Min 8 caracteres'
      }
    }),
    computed: mapGetters({
      authentication: ['Auth/isAuthorized'],
      credential: ['Auth/credential']
    }),
    mounted () {
      this.getMyInfo()
    },
    methods: {
      async save () {
        console.log(this.userEdited)
        let us = {
          'name': this.userEdited.name,
          'email': this.userEdited.email,
          'phone_number': this.userEdited.phone_number,
          'address': this.userEdited.address
          // 'password': this.userEdited.password
        }
        try {
          let putuser = await API.patch('profile', us)
          if (putuser.status >= 200 && putuser.status < 300) {
            this.getMyInfo()
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
          console.log('catch err', e)
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
      },
      async getMyInfo () {
        // console.log('al getinfo cred', this.credential)
        try {
          let info = await API.get('profile')
          if (info.status >= 200 && info.status < 300) {
            console.log('profile', info)
            this.user = info.data
            // this.user = {
            //   tipoUsuario: info.data.role_id ? info.data.role_id : '',
            //   tipoDocumento: info.data.rut ? 'RUT' : 'Pasaporte',
            //   tipoContrato: info.data.contract_type ? info.data.contract_type : '',
            //   password: '***',
            //   numeroContacto: info.data.phone_number ? info.data.phone_number : '',
            //   nombre: info.data.name ? info.data.name : '',
            //   nContrato: '---',
            //   mensaje: 'mensaje',
            //   estado: info.data.active ? 'Activo' : 'Inactivo',
            //   empresaAsociada: info.data.company_name ? info.data.company_name : '',
            //   email: info.data.email ? info.data.email : '',
            //   documento: info.data.rut ? info.data.rut : info.data.passport,
            //   direccion: info.data.address ? info.data.address : ''
            // }
            this.userEdited = this.user
          } else {
            console.log('error profile', info)
          }
        } catch (e) {
          console.log('catch err', e)
          this.$swal({
            customClass: 'modal-info',
            type: 'error',
            title: 'Ha ocurrido un error al obtener sus datos, intente más tarde.',
            text: e.response.data.error,
            animation: true,
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonText: 'Cerrar'
          })
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

