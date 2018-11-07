<template>
  <div>
    <v-card-text>
      <v-container>
        <v-layout align-center justify-center row fill-height>
          <v-flex xs12 md6>
            <v-text-field
              label="Ingrese su nombre de usuario"
              persistent-hint
              hint="Puede ser su RUT o su numero de pasaporte"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout align-center justify-center row fill-height class="mt-5">
          <v-flex xs12 md6>
            <v-btn block color="primary" @click="">Recuperar contraseña</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>

    <v-card-actions class="justify-center pt-1">
      <v-btn small flat color="primary" @click="goToLogin">Volver</v-btn>
      <v-spacer></v-spacer>

    </v-card-actions>



  </div>
</template>


<script>
  export default {
    methods: {
      goToSingUp () {
        this.$store.dispatch('Home/set_menu', {menu: 1})
      },
      goToLogin () {
        this.$store.dispatch('Home/set_menu', {menu: 0})
      }
    }
  }
</script>
