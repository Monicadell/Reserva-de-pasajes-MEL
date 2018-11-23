<template>
  <div>
    <v-card-text class="px-0 py-0">
      <v-container>
        <v-layout align-center justify-center row fill-height>
          <v-flex xs12 md10>
            <v-radio-group v-model="documentType" row class="text-xs-center">
              <v-radio label="Rut" value="1" color="primary"></v-radio>
              <v-radio label="Pasaporte" value="2" color="primary"></v-radio>
            </v-radio-group>
          </v-flex>
        </v-layout>
        
        <v-layout align-center justify-center row fill-height>
          <v-flex xs12 md10>
            <v-text-field
              label="Usuario"
              v-model="user"
              persistent-hint
              hint="Puede ser su RUT o su numero de pasaporte"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout align-center justify-center row fill-height class="mt-3">
          <v-flex xs12 md10>
            <v-text-field
              label="Contraseña"
              v-model="password"
              type="password"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout align-center justify-center row fill-height class="mt-3">
          <v-flex xs12 md6>
            <v-btn block color="primary" @click="login()">Iniciar sesión</v-btn>
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
      </v-container>
    </v-card-text>

    <v-card-actions class="justify-center pt-1">
      <v-btn color="primary" flat small @click="goToSingUp">Solicitar registro</v-btn>
      <v-spacer></v-spacer>

      <v-btn color="primary" flat small @click="goToForgotPassword">¿Olvido su contraseña?</v-btn>
    </v-card-actions>


  </div>
</template>


<script>
  import axios from 'axios'
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        documentType:'',
        user: '',
        password: ''
      }
    },
    computed: mapGetters({
      authentication: ['getAuth']
    }),
    methods: {
      goToSingUp () {
        this.$store.dispatch('Home/set_menu', {menu: 1})
      },
      goToForgotPassword () {
        this.$store.dispatch('Home/set_menu', {menu: 2})
      },
      login () {
        let config = {method: 'POST',
            url: 'https://mel-2-backend.gestsol.cl/api/sign_in',
            params: {}}
            console.log(this.documentType)
        if(this.documentType === '1'){
          config.params = {
              rut: this.user,
              password: this.password
            }
        }
        else{
          config.params = {
              passport: this.user,
              password: this.password
          }
        }
        console.log('config post user', config)
        axios(config).then((response) => {
          if (response.status === 200) {
            console.log('response 200', response)
           this.$store.dispatch('Auth/login', {
                pass: this.password,
                user: this.user,
                credential: response.data.jwt
              })
          } else {
            // alert('Error al cargar la información')
            console.log(response)
          }
        }, (err) => {
          alert('Error al cargar la información')
          console.log(err)
        })   
      }
    }
  }
</script>
