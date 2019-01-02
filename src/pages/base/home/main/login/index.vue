<template>
  <div class="azul-login">
    <v-card-text class="px-0 py-0">
      <v-container class="pb-5 pt-4">
        <v-layout align-center justify-center row fill-height>
          <v-flex xs12 pl-5 pt-3>
            <h2 class="white--text font-weight-bold" style="font-family: Roboto">RESERVA TU PASAJE AQUÍ</h2>
          </v-flex>
        </v-layout>
        <v-layout align-center justify-center row fill-height>
          <v-flex xs12 pl-5>
            <v-radio-group v-model="documentType" row class="text-xs-center" color="white">
              <v-radio label="Rut" value="1" color="white" class="usertype"></v-radio>
              <v-radio label="Pasaporte" value="2" color="white" class="usertype"></v-radio>
            </v-radio-group>
          </v-flex>
        </v-layout>
        
        <v-layout align-center justify-center row fill-height>
          <v-flex xs12 pl-5>
            <v-text-field
              label="Usuario" style="max-width: 60%"
              v-model="user"
              @keyup="keymonitor"
              color="white"
              persistent-hint
              class="login-input"
              hint="Puede ser su RUT o su numero de pasaporte"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout align-center justify-center row fill-height class="mt-3">
          <v-flex xs12 pl-5>
            <v-text-field
              color="white" style="max-width: 60%"
              label="Contraseña"
              v-model="password"
              class="login-input"
              type="password"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout align-center justify-end row fill-height class="contiene-btn-login mt-3 pr-5">
          <v-flex xs12 md6>
            <v-btn block class="btn-login primary" @click="log()">Iniciar sesión</v-btn>
          </v-flex>
        </v-layout>
        <!-- <v-layout align-center justify-center row fill-height class="mt-3">
          <v-flex xs12 md6>
             <v-alert
                :value="true"
                type="warning"
                v-if="invalidos"
              >
                Datos inválidos
              </v-alert>

          </v-flex>
        </v-layout> -->
        <!-- Modal Error login -->
        <v-dialog v-model="errorDialog" max-width="290">
          <v-card>
            <v-card-title class="headline">Ha ocurrido un error!</v-card-title>
            <v-card-text>Ingrese datos correctos!</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat @click="errorDialog = false">Ok</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-card-text>

    <!-- <v-card-actions class="justify-center pt-1">
      <v-btn color="primary" flat small @click="goToSingUp">Solicitar registro</v-btn>
      <v-spacer></v-spacer>

      <v-btn color="primary" flat small @click="goToForgotPassword">¿Olvido su contraseña?</v-btn>
    </v-card-actions> -->

    <!-- Modal error logueo-->
    <modal v-if="showModal"
        @close="showModal = false"
        v-bind:btn1="modalInfoBtn1">
        <p slot="title" class="headline mb-0">{{modalInfoTitle}}</p>
        <h3 slot="body">{{modalInfoDetail}}</h3>
    </modal>
  </div>
</template>


<script>
  // import axios from 'axios'
  // import { mapGetters } from 'vuex'
  import API from '@pi/app'
  import Modal from '@c/Modal'

  export default {
    data () {
      return {
        documentType: '1',
        user: '',
        password: '',
        errorDialog: false,
        event: '',
        showModal: false,
        modalInfoTitle: '',
        modalInfoDetail: '',
        modalInfoBtn1: ''
      }
    },
    components: {
      modal: Modal
    },
    methods: {
      goToSingUp () {
        this.$store.dispatch('Home/set_menu', {menu: 1})
      },
      goToForgotPassword () {
        this.$store.dispatch('Home/set_menu', {menu: 2})
      },
      async log () {
        let params = {}
        if (this.documentType === '1') {
          let usuario = this.user.replace(/\./g, '')
          params = {
            rut: usuario,
            password: this.password
          }
        } else {
          params = {
            passport: this.user,
            password: this.password
          }
        }
        try {
          let log = await API.post('sign_in', params)
          console.log('log await', log)
          if (log.status >= 200 && log.status < 300) {
            console.log('login succes log', log.data)
            this.$store.dispatch('Auth/login', {
              pass: this.password,
              user: this.user,
              credential: log.data.jwt
            })
            this.getMyInfo()
          } else {
            this.showModal = true
            this.modalInfoTitle = 'Ha ocurrido un error'
            this.modalInfoDetail = 'Los datos son incorrectos, intente nuevamente.'
            this.modalInfoBtn1 = 'OK'
          }
        } catch (e) {
          console.log(e)
          console.log('catch err', e.response)
          // alert('Datos incorrectos, intente nuevamente')
          this.showModal = true
          this.modalInfoTitle = 'Ha ocurrido un error'
          this.modalInfoDetail = 'Los datos son incorrectos, intente nuevamente.'
          this.modalInfoBtn1 = 'OK'
        }
      },
      async getMyInfo () {
        console.log('luego de login exitoso voy a montar datos user')
        let info = await API.get('profile')
        if (info.status >= 200 && info.status < 300) {
          console.log('profile', info)
          this.$store.dispatch('Auth/setData', {
            role: info.data.role_id,
            username: info.data.name,
            useremail: info.data.email,
            userid: info.data.id
          })
        } else {
          console.log('error profile')
        }
      },
      keymonitor (event) {
        console.log('doc tyme', this.documentType)
        if (this.documentType === '1') {
          let value = event.target.value
          if (!value) this.user = ''
          value = value.match(/[0-9Kk]+/g).join('')
          this.user = value.slice(0, -1).replace((/[0-9](?=(?:[0-9]{3})+(?![0-9]))/g), '$&.') + '-' + value.slice(-1).toLowerCase()
        }
      }
    }
  }
</script>

<style>
  /* .usertype .theme--light.v-input input{
    color: rgba(255,255,255,.87) !important;
  } */
  .azul-login{
    background-color: rgba(28, 103, 189, 1)
  }
  .usertype.v-radio.theme--light .v-input--selection-controls__input input{
    color: #fff;
  }
  .usertype .theme--light.v-icon{
    color: #fff;
  }
  .usertype .theme--light.v-label {
    color: #fff;
  }
  .login-input .theme--light.v-label {
    color: #fff;
  }

  .login-input .theme--light.v-input input{
    color: #fff;
  }
  .login-input.theme--light.v-input:not(.v-input--is-disabled) input{
    color: rgba(255,255,255,.87);
  }
  .login-input.theme--light.v-text-field .v-input__slot:before {
    border-color: rgba(255, 255, 255,.42);
  }
  .login-input.theme--light.v-text-field:not(.v-input--has-state) .v-input__slot:hover::before {
    border-color: rgba(255, 255, 255,.42);
  }
  .login-input.theme--light.v-text-field .v-input__slot:hover:before {
    border-color: rgba(255, 255, 255,.42);
  }
  .login-input.theme--light.v-text-field > .v-input__control > .v-input__slot::before {
      border-color: rgba(255, 255, 255,.42);
  }
  .login-input .theme--light.v-messages {
    color: rgba(255,255,255,.54);
  }
  .contiene-btn-login .btn-login.v-btn.v-btn--block.theme--light{
    background-color: #9BCDFD;
    color: #fff;
  }
</style>
