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
          <v-list-tile-title>Administración</v-list-tile-title>
          <v-list-tile-sub-title>Nombre Admin</v-list-tile-sub-title>
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
            <v-icon>{{ item.icon }}</v-icon>
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
  export default {
    props: ['drawer'],
    data: () => ({
      avatar: 'https://ui-avatars.com/api/?name=',
      items: [
        {subheader: true, text: 'Mis reservas'},
        {icon: 'history', text: 'Reservas', path: { path: '/service_reserve' }},
        {subheader: true, text: 'Admin'},
        {icon: 'group', text: 'Usuarios', path: { path: '/users' }},
        {icon: 'content_copy', text: 'Estaciones', path: { path: '/estaciones' }},
        {icon: 'content_copy', text: 'Tramos', path: { path: '/tramos' }},
        {icon: 'content_copy', text: 'Frecuencias', path: { path: '/frecuencias' }},
        {icon: 'content_copy', text: 'Manifiestos', path: { path: '/manifiestos' }},
        {icon: 'content_copy', text: 'Servicios', path: { path: '/servicios' }},
        {icon: 'content_copy', text: 'Buses', path: { path: '/buses' }},
        {icon: 'content_copy', text: 'Conductores', path: { path: '/conductores' }},
        {subheader: true, text: 'Perfil'},
        {icon: 'settings', text: 'Mi información', path: { path: '/myInfo' }}
        // {icon: 'chat_bubble', text: 'Cambiar contraseña'}
        // {subheader: true, text: ''},
        // {icon: 'phonelink', text: 'Cerrar sesión'}
      ]
    })
  }
</script>
