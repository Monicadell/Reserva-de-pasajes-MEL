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

      <v-layout wrap align-center v-if="user.nombre !== ''">
        <v-flex xs12>
          <v-card class="elevation-5">
            <v-responsive color="grey">
              <v-container fill-height fluid>
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox>


                    <v-list>
                      <v-list-tile avatar>
                        <v-list-tile-avatar>
                          <img :src="avatar + user.nombre + '?font-size=0.45&length=2&background=F17B31&color=fff'">
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                          <v-list-tile-title>{{user.nombre}}</v-list-tile-title>
                          <v-list-tile-sub-title>{{ user.nContrato }}</v-list-tile-sub-title>
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
                      v-model="user.nombre"></v-text-field>
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field
                      color="primary"
                      class="input-group--focused" readonly label="Email:"
                      v-model="user.email"></v-text-field>
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field
                      color="primary"
                      class="input-group--focused" readonly label="RUT:"
                      v-model="user.documento"></v-text-field>
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field
                      color="primary"
                      class="input-group--focused" readonly label="Numero contacto:"
                      v-model="user.numeroContacto"></v-text-field>
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field
                      color="primary"
                      class="input-group--focused" readonly label="Dirección:"
                      v-model="user.direccion"></v-text-field>
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field
                      color="primary"
                      class="input-group--focused" readonly label="Empresa asociada:"
                      v-model="user.empresaAsociada"></v-text-field>
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field
                      color="primary"
                      class="input-group--focused" readonly label="Tipo Contrato:"
                      v-model="user.tipoContrato"></v-text-field>
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
        <v-card-title>
          <span class="headline">Editar</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>

            <v-layout wrap>
              <v-flex xs12>
                <v-text-field color="primary" label="Nombre:" v-model="userEdited.nombre"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field color="primary" label="Email:" v-model="userEdited.email"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field color="primary" label="Numero contacto:"
                              v-model="userEdited.numeroContacto"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field color="primary" label="Direccion:" v-model="userEdited.direccion"></v-text-field>
              </v-flex>
              <v-divider></v-divider>
              <small>Credenciales</small>
              <v-flex xs12>
                <v-text-field color="primary" label="Contraseña:"
                              type="password"
                              v-model="userEdited.password">
                </v-text-field>

              </v-flex>
            </v-layout>

          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" flat @click.native="dialog = false">
            <span>Cancelar</span>
          </v-btn>
          <v-btn color="primary darken-1" dark @click.native="save()"
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
  // import axios from 'axios'
  // import endPoints from '@/endPoints'

  export default {
    data: () => ({
      dialog: false,
      msgReponse: '',
      showMsg: false,
      loading: false,
      avatar: 'https://ui-avatars.com/api/?name=',
      user: {
        tipoUsuario: '',
        tipoDocumento: '',
        tipoContrato: '',
        password: '',
        numeroContacto: '',
        nombre: '',
        nContrato: '',
        mensaje: '',
        estado: '',
        empresaAsociada: '',
        email: '',
        documento: '',
        direccion: ''
      },
      userEdited: {
        tipoUsuario: '',
        tipoDocumento: '',
        tipoContrato: '',
        password: '',
        numeroContacto: '',
        nombre: '',
        nContrato: '',
        mensaje: '',
        estado: '',
        empresaAsociada: '',
        email: '',
        documento: '',
        direccion: ''
      }
    }),

    mounted () {
      this.loadMyInfo()
    },
    methods: {

      save () {
      //   this.loading = true
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
      //   Object.assign(config.params, this.userEdited)
      //   axios(config).then((response) => {
      //     this.loading = false
      //     this.dialog = false
      //     this.loading = false
      //     this.msgReponse = 'Guardado'
      //     this.showMsg = true
      //     this.loadMyInfo()
      //   }, (err) => {
      //     this.loading = false
      //     this.msgReponse = 'Error al guardar'
      //     this.showMsg = true
      //     this.loading = false
      //     console.warn(err)
      //   })
      },
      loadMyInfo () {
        this.user = {
          tipoUsuario: 'Admin',
          tipoDocumento: 'Rut',
          tipoContrato: 'tipo contrato',
          password: '123',
          numeroContacto: '98939399',
          nombre: 'Admin user name',
          nContrato: 'ncontraro: 1',
          mensaje: 'mensaje',
          estado: 'active',
          empresaAsociada: 'Gestsol',
          email: 'admin@gestsol.cl',
          documento: '28929292',
          direccion: 'los conquistadores 2020'
        }
        // let auth = this.$store.getters.getAuth
        // let config = {
        //   method: 'POST',
        //   url: endPoints.searchUser,
        //   params: {
        //     rut: auth.user,
        //     ncontrato: auth.agreementNumber,
        //     tipoDocumento: auth.documentType,
        //     documento: auth.user
        //   }
        // }
        // axios(config).then((response) => {
        //   if (response.status === 200 && response.data.success) {
        //     this.user = response.data.response
        //     this.userEdited = Object.assign({}, response.data.response)
        //   } else {
        //     alert('Error al cargar la información')
        //     console.warn(response)
        //   }
        // }, (err) => {
        //   alert('Error al cargar la información')
        //   console.warn(err)
        // })
      }
    }
  }
</script>
