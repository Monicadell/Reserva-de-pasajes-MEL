<template>
  <div>

    <v-card-text>
      <v-card-text>
        <v-container fluid grid-list-md class="pa-0">

          <v-layout wrap row>
            <v-flex xs12 sm6>
              <v-text-field
                label="Nombre y apellido *"
                v-model="item.name"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-text-field
                label="RUT"
                v-model="item.rut"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-text-field
                label="Pasaporte"
                v-model="item.passport"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6>
              <v-text-field
                v-model="item.email"
                :rules="[rules.email]"
                label="E-mail *"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6>
              <v-text-field
                label="Dirección *"
                v-model="item.address"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6>
              <v-text-field
                label="Telefono contacto *"
                v-model="item.phone_number"
              ></v-text-field>
            </v-flex>
            
            <v-flex xs12 sm6>
              <v-text-field
                label="Contraseña *"
                v-model="item.password"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6>
              <v-text-field
                label="Repita contraseña *"
                v-model="item.password_confirmation"
              ></v-text-field>
            </v-flex>

            <small>* Campos obligatorios</small>
          </v-layout>

        </v-container>
      </v-card-text>
    </v-card-text>

    <v-card-actions class="justify-center pt-1">
      <v-btn small flat color="primary" @click="goToLogin">Volver</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="solicitarRegistro(item)">Solicitar registro</v-btn>
    </v-card-actions>
  </div>
</template>


<script>
  import API from '@pi/app'

  export default {
    data: () => ({
      item: {
        name: '',
        rut: '',
        passport: '',
        email: '',
        address: '',
        phone_number: '',
        active: false,
        password: '',
        password_confirmation: ''
      },
      roles: [],
      rules: {
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Email invalido'
        }
      },
      contractTypes: [
        {id: 0, name: 'MEL'},
        {id: 1, name: 'Contratista'}
      ],
      companies: []
    }),
    methods: {
      goToLogin () {
        this.$store.dispatch('Home/set_menu', {menu: 0})
      },
      async solicitarRegistro (guardar) {
        console.log('user a guardar', guardar)
        let user = {
          'user': {
            'name': guardar.name ? guardar.name : '',
            'rut': guardar.rut ? guardar.rut : '',
            'passport': guardar.passport ? guardar.passport : '',
            'email': guardar.email ? guardar.email : '',
            'address': guardar.address ? guardar.address : '',
            'phone_number': guardar.phone_number ? guardar.phone_number : '',
            'active': guardar.active ? guardar.active : false,
            'password': guardar.password ? guardar.password : '',
            'password_confirmation': guardar.password_confirmation ? guardar.password_confirmation : ''
          }
        }
        console.log('ser a post', user)
        let usuario = await API.post('users', user)
        if (usuario.status >= 200 && usuario.status < 300) {
          console.log(usuario)
          alert('Se ha enviado la solicitud para crear su usuario')
          this.item = {}
          this.goToLogin()
        }
        else {
          alert('Ha ocurrido un error, intente nuevamente')
          console.log(usuario)
        }
      }
    }
  }
</script>
