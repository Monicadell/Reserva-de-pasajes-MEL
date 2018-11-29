<template>
  <!-- <v-container grid-list-lg class=""> -->
    
    <v-layout row fill-height wrap align-start style="height: calc(100vh - 40px); width: 100%; position: relative">
      <v-carousel prev-icon="false" next-icon="false" class="background-carousel">
          <v-carousel-item
            v-for="(item,i) in items"
            :key="i"
            reverse-transition="fade"
            transition="fade"
            :src="item.src"
            class="carusel-item"
            style="height: 100%"
          >
            <h1 style="position: absolute; right: 20%; top: 20%; color: #fff; max-width: 50%; font-size: 4em; font-weight: bold; text-align: right; text-shadow: 1px 1px rgba(0,0,0, 0.5)">{{item.text}}</h1>
          </v-carousel-item>
        </v-carousel>
      <!-- <v-flex xs12 md5 sm7 lg4 xl4 fill-height> -->
        <v-layout row style="z-index: 2; ">
          <v-flex xs12 py-0 class="" >
            <v-card class="card--flex-toolbar" flat style="position: absolute; bottom: 0; width: 50%; left: 0;">
              <template v-if="!isAuthorized" style="position: relative">
                <menu-selection/> 
              </template>
              <!-- <v-btn fab flat large icon color="white" >
                <v-icon style="font-size: 80px">expand_more</v-icon>
              </v-btn> -->
              <v-btn fab flat large icon v-scroll-to="'#vuelos'" style="position: absolute; bottom: 40px; right: -44px; z-index:3">
                <v-icon color="white" style="font-size: 80px; text-shadow: 1px 1px rgba(0, 0, 0, 0.5);">expand_more</v-icon>
              </v-btn>
            </v-card>
            <v-card class="card--flex-toolbar py-4 px-5" flat style="position: absolute; bottom: 70px; right: 0; width: 50%; min-height: 100px; background-color: rgba(107, 175, 215) !important; color: #fff">
              <v-card-title primary-title color="primary" class="p">
                <v-flex xs12 class="pt-0 pb-3">
                  <div class="headline">¿Necesitas Ayuda?</div>
                </v-flex>
                <v-flex xs6 py-0 class="">
                  <p><v-icon small color="white" class="pr-2">warning</v-icon> Recupera tu contraseña</p>
                  <p><v-icon small color="white" class="pr-2">account_circle</v-icon> Registrate aquí</p>
                  <p><v-icon small color="white" class="pr-2">play_circle_filled</v-icon> Aprende a imprimir tu ticket</p>
                </v-flex>
                <v-flex xs6 py-0 class="">
                  <p><v-icon small color="white" class="pr-2">play_circle_filled</v-icon> Aprende a reservar tu pasaje</p>
                  <p><v-icon small color="white" class="pr-2">airplanemode_active</v-icon> Itinerario de vuelos</p>
                  <p><v-icon small color="white" class="pr-2">video_library</v-icon> Entretención a bordo</p>
                </v-flex>
              </v-card-title>
            </v-card>
          </v-flex>
        </v-layout>
        
          

      <!-- </v-flex> -->
      
    </v-layout>
  <!-- </v-container> -->
</template>

<script>
  import {mapGetters} from 'vuex'
  import MenuSelection from './menuSelection'
  import weather from './currentWeather'

  export default {
     data () {
      return {
        items: [
          {
            src: '../../../../../static/img/1.jpg', text: 'Servicio de transporte privado Minera escondida'
          },
          {
            src: '../../../../../static/img/2.jpg', text: 'Servicio de transporte privado Minera escondida2'
          },
          {
            src: '../../../../../static/img/3.jpg', text: 'Servicio de transporte privado Minera escondida 3'
          },
          {
            src: '../../../../../static/img/4.jpg', text: 'Servicio de transporte privado Minera escondida 4'
          }
        ]
      }
    },
    computed: {
      ...mapGetters('Auth', {
        isAuthorized: ['isAuthorized']
      })
    },
    components: {
      MenuSelection: MenuSelection,
      weather: weather
    },
    mounted () {
      if (this.isAuthorized) {
        this.$router.push('/admin')
      }
    },
    watch: {
      isAuthorized (value) {
        if (value) {
          this.$router.push('/admin')
        }
      }
    }
  }
</script>

<style>
  .background-carousel {
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
    min-height: calc(100vh - 40px);
  }
  .carusel-item .v-responsive.v-image.v-carousel__item{
    height: 100%;
    min-height: calc(100vh - 40px);
  }
  .carusel-item .v-responsive.v-image.v-carousel__item .v-image__image.v-image__image--cover{
    height: 100% !important;
  }
  .carusel-item .v-responsive__content{
    height: 100% !important;
  }
  .background-carousel .v-carousel__controls{
    /* -moz-transform: rotate(90deg)  translate(-50%, 50%) ;
    -webkit-transform: rotate(90deg)  translate(-50%, 50%) ;
    -o-transform: rotate(90deg)  translate(-50%, 50%) ;
    -ms-transform: rotate(90deg)  translate(-50%, 50%) ;
    transform: rotate(90deg)  translate(-50%, 50%) ; */

    -moz-transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    -o-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
    position: absolute;
    top: 25%; 
    right: 50%;
    left: 45%;
    background: transparent;
  }
  .background-carousel .v-btn .v-btn__content .v-icon {
    color: #fff;
    opacity: 1;
  }
  .background-carousel .v-btn .v-btn__content .v-icon {
    color: #fff;
    opacity: 1;
  }
  .background-carousel .v-btn--active.v-btn--icon.v-btn--small.theme--dark.v-carousel__controls__item .v-btn__content .v-icon{
    color: #B3B3B3;
  }
  .transparent{
    background-color: transparent
  }
  .container.container-fondoblanco{
    padding:0;
    height: calc(100vh - 88px);
    padding-top:8px;
  }
  .flex-fondoblanco{
    background-color: rgba(255, 255, 255, 0.5);
    filter: brightness(100%);
    min-height: calc(100vh - 40px);
    height: 100%;
  }
</style>
