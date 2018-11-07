<template>
  <v-content>
    <v-container fluid fill-height>
      <background-image :from="'login'"/>
      <v-layout justify-center align-center>
        <v-card class="elevation-0 text-xs-center"
                dark
                max-width="400px"
                color="transparent"
        >
          <v-card-title primary-title class="fade-in">
            logo
            <!--<img src="@/assets/img/logos/gplay_yellow_white.png"
                 lazy-src="@/assets/img/logos/gplay_yellow_white.png"
                 alt="gplay" class="maxWidthLogo">-->
          </v-card-title>
          <template v-if="!loading">
            <v-card-title primary-title class="pa-2 text-xs-center fade-in">

              <v-text-field
                box
                hide-details
                v-model="email"
                color="primary"
                label="Email"
              ></v-text-field>
              <v-checkbox
                v-model="acceptedTermOfUse"
                color="primary"
                label="Acepto los terminos de uso"
              ></v-checkbox>
            </v-card-title>
            <v-card-actions class="fade-in">
              <v-btn color="primary" block
                     @click="authenticate"
                     :loading="loadingAuth"
                     :disabled="!validateForm(email)">
                Ingresar
              </v-btn>
            </v-card-actions>
            <v-card-actions :class="{'mt-5': $vuetify.breakpoint.smAndUp}" class="text-xs-justify fade-in">
              <small>
                GPlay+ es una nueva propuesta para disfrutar de tu contenido favorito con una
                excelente calidad de imagen y sonido, para que no te pierdas ningún detalle de
                lo que está sucediendo. Sólo debes elegir una categoría y buscar lo que deseas ver.
              </small>
            </v-card-actions>
          </template>
          <template v-else>
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
          </template>


        </v-card>

      </v-layout>

    </v-container>

    <footer-component/>

  </v-content>
</template>

<script>
  import BackgroundImage from '@c/BackgroundImage'
  import Footer from './Footer'
  export default {
    components: {
      BackgroundImage: BackgroundImage,
      FooterComponent: Footer
    },
    data: () => ({
      email: '',
      acceptedTermOfUse: false,
      loading: true,
      loadingAuth: false
    }),
    mounted () {
      let isAutorized = this.$store.getters['Auth/isAuthorized']
      let email = this.$store.getters['Auth/email']
      console.log(isAutorized, email)
      setTimeout(() => {
        this.loading = false
      }, 1500)

      if (isAutorized) {
        this.$router.push('/')
        this.$router.go()
      } else {
        this.$store.dispatch('Media/delete_media')
        this.$store.dispatch('Auth/logout')
      }
    },
    methods: {
      validateForm (email) {
        let re = /\S+@\S+\.\S+/
        return re.test(email) && this.acceptedTermOfUse
      },
      authenticate () {
        this.loadingAuth = true
        this.$store.dispatch('Auth/login', {
          email: this.email
        }).then(e => {
          setTimeout(() => {
            this.loadingAuth = false
            this.$router.push('/')
          }, 1000)
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .theme--dark.v-footer
    background-color transparent
  .maxWidthLogo
    max-width 100%

  .fade-in
    -webkit-animation fade-in 1s cubic-bezier(0.390, 0.575, 0.565, 1.000) both
    animation fade-in 1s cubic-bezier(0.390, 0.575, 0.565, 1.000) both

  @-webkit-keyframes fade-in
    0%
      opacity 0
    100%
      opacity 1

  @keyframes fade-in
    0%
      opacity 0
    100%
      opacity 1


</style>
