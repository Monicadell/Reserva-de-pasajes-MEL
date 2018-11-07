<template>
  <div>

    <v-card-text>
      <v-card-text>
        <v-container fluid grid-list-md class="pa-0">

          <v-layout wrap row>
            <v-flex xs12 sm6 md4>
              <v-text-field
                label="Nombre y apellido"
                v-model="item.name"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field
                label="RUT"
                v-model="item.rut"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field
                label="Pasaporte"
                v-model="item.passport"
              ></v-text-field>
            </v-flex>


            <v-flex xs12 sm6 md4>
              <v-text-field
                v-model="item.email"
                :rules="[rules.email]"
                label="E-mail"
              ></v-text-field>
            </v-flex>


            <v-flex xs12 sm6 md4>
              <v-text-field
                label="Dirección"
                v-model="item.address"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6 md4>
              <v-text-field
                label="Telefono contacto"
                v-model="item.phone_number"
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
      <v-btn color="primary" @click="">Solicitar registro</v-btn>
    </v-card-actions>
  </div>
</template>


<script>
  export default {
    data: () => ({
      item: {},
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
      }
    }
  }
</script>
