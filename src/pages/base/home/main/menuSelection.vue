<template>
  <div>
    <v-toolbar card prominent>
      <v-spacer></v-spacer>
      <v-toolbar-title class="body-3 grey--text">
        {{$t(`lang.home.auth.${menuSelection.text}`)}}
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon class="grey--text">
        <v-icon>help</v-icon>
      </v-btn>
    </v-toolbar>

    <v-divider></v-divider>

    <v-window v-model="menuSelection.menu">
      <v-window-item>
        <login/>
      </v-window-item>
      <v-window-item>
        <sign-up/>
      </v-window-item>
      <v-window-item>
        <forgot-password/>
      </v-window-item>
    </v-window>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Login from './login'
  import SignUp from './signup'
  import ForgotPassword from './forgotPassword'

  export default {
    components: {
      Login: Login,
      SignUp: SignUp,
      ForgotPassword: ForgotPassword
    },
    computed: {
      ...mapGetters('Home', {
        menuSelection: ['menuSelection']
      })
    }
  }
</script>
