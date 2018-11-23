<template>
  <v-toolbar clipped-left  color="primary" dark app fixed>
    <v-toolbar-title class="ml-0 pl-3">
      <v-toolbar-side-icon @click="showAdmin"></v-toolbar-side-icon>
      
      <span class="hidden-sm-and-down">Minera Escondida Limitada</span>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items class="hidden-sm-and-down">
     
      <v-btn
        flat
        class="white--text primary"
      >
         <h4>{{user.nombre}}</h4>
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
  import axios from 'axios'
  import { mapGetters } from 'vuex'
  // import endPoints from '@/endPoints'

  export default {
    data: () => ({
      item: 'Admin',
      admin: false,
      user: {}
    }),
    computed: mapGetters({
      credential: ['Auth/credential']
    }),
    mounted () {
      this.loadMyInfo()
    },
    methods: {
      loadMyInfo () {
        let config =  {
          headers: {'Authorization': "bearer " + this.credential}
        }
        axios.get('https://mel-2-backend.gestsol.cl/api/profile', config)
          .then((response) => {
            if (response.status === 200) {
              console.log('profile', response)
              this.$store.dispatch('Auth/setData', {
                  role: response.data.role_id,
                  username: response.data.name,
                  useremail: response.data.email
                })
              this.user = {
                  tipoUsuario: response.data.role_id ? response.data.role_id : '',
                  tipoDocumento: response.data.rut ? 'RUT' : 'Pasaporte' ,
                  tipoContrato: response.data.contract_type ? response.data.contract_type : '',
                  password: '***',
                  numeroContacto: response.data.phone_number ? response.data.phone_number : '',
                  nombre: response.data.name ? response.data.name : '',
                  nContrato: '---',
                  estado: response.data.active ? 'Activo' : 'Inactivo',
                  empresaAsociada: response.data.company_name ? response.data.company_name : '',
                  email: response.data.email ? response.data.email : '',
                  documento: response.data.rut ? response.data.rut : response.data.passport,
                  direccion: response.data.address ? response.data.address : ''
                }
            } else {
              // alert('Error al cargar la información')
              console.log(response)
            }
          })
          .catch(function (error) {
            console.log('error profile', error)
          })
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
