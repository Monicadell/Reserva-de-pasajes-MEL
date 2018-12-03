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
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  // import axios from 'axios'
  // import { mapGetters } from 'vuex'
  import API from '@pi/app'

  export default {
    data: () => ({
      item: 'Admin',
      admin: false,
      nombre: '',
      isAdmin: false,
      reservarpath: '/service_reserve',
      misreservaspath: '/misreservas',
      profilepath: '/myInfo'
    }),
    // computed: mapGetters({
    //   username: ['Auth/username'],
    //   role: ['Auth/role']
    // }),
    mounted () {
      this.getMyInfo()
    },
    methods: {
      async getMyInfo () {
        let info = await API.get('profile')
        if (info.status >= 200 && info.status < 300) {
          console.log('profile',info)
          this.role = info.data.role_id ? info.data.role_id : '',
          this.nombre = info.data.name ? info.data.name : ''
          this.isAdmin = (this.role === 2 || this.role === 5) ? true : false
        } else {
          console.log('error profile', error)
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
        this.$emit('showAdminBar', env)
      }
    }
  }
</script>
