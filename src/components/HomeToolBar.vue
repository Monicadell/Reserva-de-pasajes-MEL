<template>
  <div>
    <v-toolbar
      color="naranjo"
      dark
      height="40"
      
    >
      <v-toolbar-items class="hidden-sm-and-down">
        <!-- <v-flex xs12 md10> -->
          <!-- <h3 class="mt-2 pl-5" style="margin-left: 24px;">Reserva pasajes TANDEM </h3> -->
          <!-- <div class="container py-0"> -->
            <img src="/../../../static/img/logo_tandem.png" alt="tandem" class="logo-tandem pl-5">
          <!-- </div> -->
        <!-- </v-flex> -->
       
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

      <v-toolbar-items class="hidden-sm-and-down">
         <v-btn icon slot="activator" @click="dialog = true">
            <v-icon>help_outline</v-icon>
          </v-btn>
          <v-dialog
              v-model="dialog"
              width="500"
            >
            <v-card>
              <v-card-title
                class="headline naranjo white--text"
                primary-title
              >
                Contacto
              </v-card-title>

              <v-card-text>
                Mesa de ayuda transporte +56 9 4091 8409 - +56 2 2907 2690
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  flat
                  @click="dialog = false"
                >
                  Cerrar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          </v-toolbar-items>

    </v-toolbar>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    data: () => ({
      dialog: false
    }),
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

<style scoped>
  .logo-tandem{
    height: 38px;
    width: auto;
  }
</style>

