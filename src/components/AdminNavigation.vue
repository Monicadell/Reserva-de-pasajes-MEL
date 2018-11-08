<template>
  <v-navigation-drawer
    clipped
    :value="drawer"
    fixed
    stateless permanent
    app
    :width="220"
  >


    <v-list two-line class="orange lighten-1" dark>
      <v-list-tile avatar>
        <v-list-tile-avatar>
          <img :src="avatar + 'testing?font-size=0.45&length=2&background=F17B31&color=fff'">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>TEST</v-list-tile-title>
          <v-list-tile-sub-title>TEST</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <v-list class="orange">
      <v-list-tile>
        <v-list-tile-content>
          <v-btn block dark color="orange darken-4">Realizar una reserva</v-btn>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>


    <v-list dense>
      <template v-for="item in items">

        <v-subheader v-if="item.subheader" class="grey--text text--darken-1">
          {{item.text}}
        </v-subheader>

        <v-list-tile v-else @click="">
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
            <v-list-tile @click="logout()">
        <v-list-tile-title>salir</v-list-tile-title>
      </v-list-tile>
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
        {icon: 'history', text: 'Solicitadas'},
        {icon: 'history', text: 'Aceptadas'},
        {icon: 'content_copy', text: 'Anuladas'},
        {icon: 'content_copy', text: 'Rechazadas'},
        {subheader: true, text: 'Perfil'},
        {icon: 'settings', text: 'Mi información'},
        {icon: 'chat_bubble', text: 'Cambiar contraseña'},
        {subheader: true, text: ''},
        {icon: 'phonelink', text: 'Cerrar sesión'}
      ]
    }),
    methods: {
      logout () {
        this.$store.dispatch('logout')
        this.$router.push('/')
      }
    }
  }
</script>
