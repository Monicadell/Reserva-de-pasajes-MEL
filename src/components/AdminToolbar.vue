<template>
  <v-toolbar clipped-left  color="primary" dark app fixed>
    <v-toolbar-title class="ml-0 pl-3">
      <v-toolbar-side-icon @click="showAdmin" v-if="isAdmin"></v-toolbar-side-icon>
      
      <span class="hidden-sm-and-down">Minera Escondida Limitada</span>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items class="hidden-sm-and-down">
     
      <v-btn
        flat
        class="white--text primary"
        :to="profilepath"
        v-if="!isAdmin"
      >
         <h4>{{nombre}}</h4>
      </v-btn>
      <v-btn
        flat
        class="white--text primary"
        :to="reservarpath"
        v-if="!isAdmin"
      >
        <h4>Reservar</h4>
      </v-btn>
      <v-btn
        flat
        class="white--text primary"
        :to="misreservaspath"
        v-if="!isAdmin"
      >
        <h4>Mis reservas</h4>
      </v-btn>
      <v-btn
        flat
        class="white--text primary"
        @click="logout()"
      >
        <v-icon right dark>keyboard_backspace</v-icon>
        Salir
      </v-btn>
      <v-btn icon slot="activator" @click="dialog = true">
        <v-icon>help_outline</v-icon>
      </v-btn>
      <v-dialog
          v-model="dialog"
          width="500"
        >
        <v-card>
          <v-card-title
            class="headline primary white--text"
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
</template>

<script>
  // import axios from 'axios'
  import { mapGetters } from 'vuex'
  import API from '@pi/app'
  import moment from 'moment'

  export default {
    data: () => ({
      item: 'Admin',
      admin: false,
      nombre: '',
      isAdmin: false,
      reservarpath: '/service_reserve',
      misreservaspath: '/misreservas',
      profilepath: '/myInfo',
      dialog: false
    }),
    computed: mapGetters({
      hidesidebar: ['Auth/hidesidebar']
    }),
    mounted () {
      this.getMyInfo()
    },
    methods: {
      async getMyInfo () {
        let info = await API.get('profile')
        if (info.status >= 200 && info.status < 300) {
          console.log('profile toolbar', info)
          this.role = info.data.role_id ? info.data.role_id : ''
          this.nombre = info.data.name ? info.data.name : ''
          this.isAdmin = (this.role === 2 || this.role === 5)
          let currentTime = moment().toISOString()
          let dife = moment(currentTime).diff(moment(info.data.last_connection))
          console.log('current time', currentTime)
          console.log('diferencia', dife)
          // if (info.data.last_connection <= currentTime) {
          //   console.log('no tiene ultima conexion y voy a push')
          //   this.$router.push({name: 'MyInfo'})
          // }
        } else {
          console.log('error profile')
        }
      },
      changeDrawer () {
        this.$parent.drawer = !this.$parent.drawer
      },
      logout () {
        this.$store.dispatch('Auth/logout')
        this.$router.push('/')
      },
      showAdmin () {
        let env = !this.admin
        this.admin = env
        if (this.admin) {
          this.$store.dispatch('Auth/hide', {
            hide: false
          })
        } else {
          this.$store.dispatch('Auth/hide', {
            hide: true
          })
        }
        this.$emit('showAdminBar', env)
      }
    },
    watch: {
      hidesidebar (val) {
        // console.log('watch cambio hide', val)
        this.$emit('showAdminBar', !val)
        this.admin = !val
      }
    }
  }
</script>
