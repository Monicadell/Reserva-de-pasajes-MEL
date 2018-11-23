<template>
  <v-navigation-drawer
    clipped
    :value="drawer"
    fixed
    stateless permanent
    app
    :width="220"
  >

    <v-list two-line class="primary" dark>
      <v-list-tile avatar>
        <v-list-tile-avatar>
          <img :src="avatar + 'testing?font-size=0.45&length=2&background=F17B31&color=fff'">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{name}}</v-list-tile-title>
          <v-list-tile-sub-title class="uppercase">{{role}}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <!-- <v-list class="primary">
      <v-list-tile>
        <v-list-tile-content>
          <v-btn block dark color="primary darken-4">Realizar una reserva</v-btn>
        </v-list-tile-content>
      </v-list-tile>
    </v-list> -->


    <v-list dense>
      <template v-for="item in items">

        <v-subheader v-if="item.subheader" class="grey--text text--darken-1">
          {{item.text}}
        </v-subheader>

        <v-list-tile v-else :to="item.path">
          <v-list-tile-action>
            <img :src="item.icon">
            
          <!--  <v-icon>{{ item.icon }}</v-icon> -->
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-navigation-drawer
    :clipped="$vuetify.breakpoint.lgAndUp">
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    props: ['drawer'],
    data: () => ({
      name: '',
      role: '',
      avatar: 'https://ui-avatars.com/api/?name=',
      items: [
        {subheader: true, text: 'Mis reservas'},
        {icon: '../../static/icons/01.png', text: 'Reservas', path: { path: '/service_reserve' }},
        {subheader: true, text: 'Admin'},
        {icon: '../../static/icons/08.png', text: 'Usuarios', path: { path: '/users' }},
        {icon: '../../static/icons/01.png', text: 'Estaciones', path: { path: '/estaciones' }},
        {icon: '../../static/icons/02.png', text: 'Tramos', path: { path: '/tramos' }},
        {icon: '../../static/icons/03.png', text: 'Frecuencias', path: { path: '/frecuencias' }},
        {icon: '../../static/icons/04.png', text: 'Manifiestos', path: { path: '/manifiestos' }},
        {icon: '../../static/icons/05.png', text: 'Servicios', path: { path: '/servicios' }},
        // {icon: '../../static/icons/06.png', text: 'Buses', path: { path: '/buses' }},
        // {icon: '../../static/icons/07.png', text: 'Conductores', path: { path: '/conductores' }},
        {subheader: true, text: 'Perfil'},
        {icon: '../../static/icons/config.png', text: 'Mi información', path: { path: '/myInfo' }}
        // {icon: 'chat_bubble', text: 'Cambiar contraseña'}
        // {subheader: true, text: ''},
        // {icon: 'phonelink', text: 'Cerrar sesión'}
      ]
    }),
    computed: mapGetters({
      roleus: ['Auth/role'],
      username: ['Auth/username']
    }),

    mounted () {
      this.info()
    },
    methods: {
      info () {
        this.name = this.username
        this.role = this.roleus
      }
    }
  }
</script>
