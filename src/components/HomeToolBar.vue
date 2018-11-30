<template>
  <div>
    <v-toolbar
      color="naranjo"
      dark
      height="40"
      
    >
      <v-toolbar-items class="hidden-sm-and-down">
       <h3 class="mt-2">Reserva pasajes TANDEM </h3>
        <template v-if="isAuthorized">
          <v-btn flat>Reservar pasaje</v-btn>
          <v-btn flat>Mis Reservas</v-btn>
          <v-btn flat>Mis anulaciones</v-btn>
        </template>
      </v-toolbar-items>


      <v-spacer></v-spacer>
     <!-- <v-menu bottom offset-y>
        <v-btn flat dark slot="activator">
          <v-icon>translate</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile @click="">
            <v-list-tile-title>Español</v-list-tile-title>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile @click="">
            <v-list-tile-title>English</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu> -->

      <template v-if="isAuthorized">
        <v-btn flat dark @click="logout">
          <v-icon>account_circle</v-icon>
          {{email}}
          <v-icon>arrow_drop_down</v-icon>
        </v-btn>
      </template>


    </v-toolbar>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    methods: {
      logout () {
        this.$store.dispatch('Auth/logout', {
          user: null
        })
      }
    },
    computed: {
      ...mapGetters('Auth', {
        isAuthorized: ['isAuthorized'],
        email: ['email']
      })
    }
  }
</script>


