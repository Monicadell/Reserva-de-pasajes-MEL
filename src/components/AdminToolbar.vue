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
  export default {
    data: () => ({
      item: 'Admin',
      admin: false
    }),
    methods: {
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
