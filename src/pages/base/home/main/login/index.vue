<template>
  <div>
    <v-card-text class="px-0 py-0">
      <v-container>
        <v-layout align-center justify-center row fill-height>
          <v-flex xs12 md10>
            <v-text-field
              label="Usuario"
              persistent-hint
              hint="Puede ser su RUT o su numero de pasaporte"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout align-center justify-center row fill-height class="mt-3">
          <v-flex xs12 md10>
            <v-text-field
              label="Contraseña"
              type="password"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout align-center justify-center row fill-height class="mt-3">
          <v-flex xs12 md6>
            <v-btn block color="primary" @click="login()">Iniciar sesion</v-btn>
          </v-flex>
        </v-layout>
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
  export default {
    methods: {
      goToSingUp () {
        this.$store.dispatch('Home/set_menu', {menu: 1})
      },
      goToForgotPassword () {
        this.$store.dispatch('Home/set_menu', {menu: 2})
      },
      login () {
        this.$store.dispatch('Auth/login', 'test@test.com')
      }
    }
  }
</script>
