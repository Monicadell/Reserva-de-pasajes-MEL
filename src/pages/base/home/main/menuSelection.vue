<template>
  <div class="div-contain-login">
    <v-toolbar card prominent>
      <v-spacer></v-spacer>
      <v-toolbar-title class="body-3 primary--text">
        {{$t(`lang.home.auth.${menuSelection.text}`)}}
      </v-toolbar-title>
      <v-spacer></v-spacer>
 <!--
     <v-btn icon class="grey--text">
        <v-icon>help</v-icon>
      </v-btn> -->
    </v-toolbar>

    <v-divider></v-divider>

    <v-window v-model="menuSelection.menu" class="bottom-login">
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

<style>
  .div-contain-login .bottom-login{
    /* background-color: rgba(255, 255, 255, 0.9) */
    background-color: #fff;
  }
  .div-contain-login .v-divider{
    background-color: #fff;
  }
</style>
