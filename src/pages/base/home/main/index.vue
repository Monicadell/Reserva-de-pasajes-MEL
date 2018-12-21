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
            <!-- <h1 style="position: absolute; right: 20%; top: 20%; color: #fff; max-width: 50%; font-size: 4em; font-weight: bold; text-align: right; text-shadow: 1px 1px rgba(0,0,0, 0.5)">{{item.text}}</h1> -->
          </v-carousel-item>
        </v-carousel>
      <!-- <v-flex xs12 md5 sm7 lg4 xl4 fill-height> -->
        <v-layout row style="z-index: 2;">
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
            <v-card class="card--flex-toolbar py-0 px-5" flat style="position: absolute; bottom: 70px; right: 0; width: 50%; min-height: 100px; background-color: #38B2D7 !important; color: #fff">
              <v-card-title primary-title color="primary" class="pt-3 seccion-ayuda">
                <v-flex xs12 class="pt-0 pb-2">
                  <div class="headline font-weight-bold">¿Necesitas Ayuda?</div>
                </v-flex>
                <v-flex xs6 py-0>
                  <v-dialog
                    v-model="dialogpass"
                    width="500"
                  >
                    <v-btn
                      slot="activator"
                      flat class="white--text"
                    >
                      <v-icon small color="white" class="pr-2">warning</v-icon> Recupera tu contraseña
                    </v-btn>
                    <v-card>
                      <v-card-title
                        class="headline naranjo white--text"
                        primary-title
                      >Recupera tu contraseña
                      </v-card-title>
                     <v-card-text>
                      <v-container>
                        <v-layout align-center justify-center row fill-height>
                          <v-flex xs12 md8>
                            <v-text-field
                              label="Ingrese su nombre de usuario"
                              persistent-hint
                              hint="Puede ser su RUT o su numero de pasaporte"
                            ></v-text-field>
                          </v-flex>
                        </v-layout>
                        <!-- <v-layout align-center justify-center row fill-height class="mt-5">
                          <v-flex xs12 md8>
                            <v-btn block color="primary" @click="">Recuperar contraseña</v-btn>
                          </v-flex>
                        </v-layout> -->
                      </v-container>
                    </v-card-text>

                    <!-- <v-card-actions class="justify-center pt-1">
                      <v-btn small flat color="primary" @click="goToLogin">Volver</v-btn>
                      <v-spacer></v-spacer>

                    </v-card-actions> -->
                      <!-- <v-divider></v-divider> -->
                      <v-card-actions  class="justify-center py-3">
                        <v-btn outline color="primary" class="mx-2 text-capitalize" @click="dialogpass = false">Cerrar</v-btn>
                         <v-spacer></v-spacer>
                         <v-btn color="primary" class="mx-2 text-capitalize" @click="dialogpass = false">Recuperar contraseña</v-btn>

                        <!-- <v-btn
                          color="primary"
                          flat
                          @click="dialogpass = false"
                        >I accept
                        </v-btn> -->
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  </v-flex>
                  <v-flex xs6 py-0>
                    <!-- <p><v-icon small color="white" class="pr-2">play_circle_filled</v-icon> Aprende a reservar tu pasaje</p> -->
                    <v-dialog
                      v-model="dialogreserva"
                      width="100%"
                    >
                      <v-btn
                        slot="activator"
                        flat class="white--text"
                      >
                        <v-icon small color="white" class="pr-2">play_circle_filled</v-icon> Aprende a reservar tu pasaje
                      </v-btn>
                      <v-card>
                        <v-card-title
                          class="headline naranjo white--text"
                          primary-title
                        >Reservar Pasaje
                        </v-card-title>
                        <v-card-text class="text-xs-center">
                          <video width="100%" height="700" controls>
                            <source src="/../../../static/videos/reservar.mp4" type="video/mp4">
                          </video>
                          <!-- <iframe width="100%" height="700"
                          src="/../../../static/videos/reservar.mp4">
                          </iframe> -->
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="primary"
                            flat
                            @click="dialogreserva = false"
                          >Cerrar
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-flex>
                  <v-flex xs6 py-0>
                    <!-- <p><v-icon small color="white" class="pr-2">account_circle</v-icon> Registrate aquí</p> -->
                    <v-dialog
                      v-model="dialogregistro"
                      width="500"
                    >
                      <v-btn
                        slot="activator"
                        flat class="white--text"
                      >
                        <v-icon small color="white" class="pr-2">account_circle</v-icon> Registrate aquí
                      </v-btn>
                      <v-card>
                        <v-card-title
                          class="headline naranjo white--text"
                          primary-title
                        >Solicita tu registro
                        </v-card-title>
                          <v-card-text>
                            <v-container fluid grid-list-md class="pa-0">

                              <v-layout wrap row>
                                <v-flex xs12 sm6>
                                  <v-text-field
                                    label="Nombre y apellido *"
                                    v-model="item.name"
                                  ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6>
                                  <v-text-field
                                    label="RUT"
                                    v-model="item.rut"
                                    @keyup="keymonitor"
                                  ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6>
                                  <v-text-field
                                    label="Pasaporte"
                                    v-model="item.passport"
                                  ></v-text-field>
                                </v-flex>

                                <v-flex xs12 sm6>
                                  <v-text-field
                                    v-model="item.email"
                                    :rules="[rules.email]"
                                    label="E-mail *"
                                  ></v-text-field>
                                </v-flex>

                                <v-flex xs12 sm6>
                                  <v-text-field
                                    label="Dirección *"
                                    v-model="item.address"
                                  ></v-text-field>
                                </v-flex>

                                <v-flex xs12 sm6>
                                  <v-text-field
                                    label="Telefono contacto *"
                                    v-model="item.phone_number"
                                  ></v-text-field>
                                </v-flex>
                                
                                <v-flex xs12 sm6>
                                  <v-text-field
                                    label="Contraseña *"
                                    type="password"
                                    v-model="item.password"
                                    :rules="[rules.min]"
                                  ></v-text-field>
                                </v-flex>

                                <v-flex xs12 sm6>
                                  <v-text-field
                                    label="Repita contraseña *"
                                    type="password"
                                    v-model="item.password_confirmation"
                                    :rules="[rules.password_confirmation]" 
                                  ></v-text-field>
                                </v-flex>

                                <small>* Campos obligatorios</small>
                              </v-layout>

                            </v-container>
                        </v-card-text>
                        <!-- <v-divider></v-divider> -->
                        <v-card-actions class="py-3">
                           <v-btn
                            color="primary"
                            outline class="mx-2"
                            @click="cerrarRegistro()"
                          >Cerrar
                          </v-btn>
                          <v-spacer></v-spacer>
                          <v-btn
                              block color="primary" class="mx-2"
                              @click="solicitarRegistro(item)"
                            >Enviar solicitud
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                </v-flex>

                <v-flex xs6 py-0 class="">
                    <v-btn
                      slot="activator"
                      flat class="white--text"
                      v-scroll-to="'#vuelos'"
                    >
                      <v-icon small color="white" class="pr-2">airplanemode_active</v-icon> Itinerario de vuelos
                    </v-btn>
                  </v-flex>

                <v-flex xs6 py-0 class="">
                   <!-- <p><v-icon small color="white" class="pr-2">play_circle_filled</v-icon> Aprende a imprimir tu ticket</p> -->
                  <v-dialog
                    v-model="dialogimprime"
                    width="100%"
                  >
                    <v-btn
                      slot="activator"
                      flat class="white--text mb-0"
                    >
                      <v-icon small color="white" class="pr-2">play_circle_filled</v-icon> Aprende a imprimir tu ticket
                    </v-btn>
                    <v-card>
                      <v-card-title
                        class="headline naranjo white--text"
                        primary-title
                      >Impresión de ticket
                      </v-card-title>
                      <v-card-text class="text-xs-center">
                          <video width="100%" height="700" controls>
                            <source src="/../../../static/videos/totem.mp4" type="video/mp4">
                            Your browser does not support HTML5 video.
                          </video>
                          <!-- <iframe width="100%" height="700"
                          src="/../../../static/videos/totem.mp4">
                          </iframe> -->
                        </v-card-text>
                      <v-divider></v-divider>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="primary"
                          flat
                          @click="dialogimprime = false"
                        >Cerrar
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-flex>
                  <v-flex xs6 py-0 class="">
                  <!-- <p><v-icon small color="white" class="pr-2">video_library</v-icon> Entretención a bordo</p> -->
                    <v-btn
                      slot="activator"
                      flat class="white--text mb-0"
                      v-scroll-to="'#img3'"
                    >
                      <v-icon small color="white" class="pr-2">video_library</v-icon> Entretención a bordo
                    </v-btn>
                </v-flex>
              </v-card-title>
            </v-card>
          </v-flex>
        </v-layout>
      <!-- </v-flex> -->

      <!-- Modal error-->
      <modal v-if="showModal"
          @close="showModal = false"
          v-bind:btn1="modalInfoBtn1">
          <p slot="title" class="headline mb-0">{{modalInfoTitle}}</p>
          <h3 slot="body">{{modalInfoDetail}}</h3>
      </modal>
    </v-layout>
  <!-- </v-container> -->
</template>

<script>
  import {mapGetters} from 'vuex'
  import MenuSelection from './menuSelection'
  import weather from './currentWeather'
  import API from '@pi/app'
  import Modal from '@c/Modal'

  export default {
    data () {
      return {
        dialogpass: false,
        dialogreserva: false,
        dialogregistro: false,
        dialogvuelos: false,
        dialogimprime: false,
        dialogentrete: false,
        showModal: false,
        modalInfoTitle: '',
        modalInfoDetail: '',
        modalInfoBtn1: '',
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
        ],
        item: {
          name: '',
          rut: '',
          passport: '',
          email: '',
          address: '',
          phone_number: '',
          active: false,
          password: '',
          password_confirmation: ''
        },
        rules: {
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Email invalido'
          },
          password_confirmation: value => {
            const coinciden = this.item.password === value
            return coinciden || 'Contraseñas no coinciden'
          },
          min: value => value.length >= 8 || 'Min 8 caracteres'
        }
      }
    },
    methods: {
      goToSingUp () {
        this.$store.dispatch('Home/set_menu', {menu: 1})
      },
      goToLogin () {
        this.$store.dispatch('Home/set_menu', {menu: 0})
      },
      cerrarRegistro () {
        this.item = Object.assign({}, '')
        this.dialogregistro = false
      },
      async solicitarRegistro (guardar) {
        console.log('user a guardar', guardar)
        let rut = guardar.rut ? guardar.rut.replace(/\./g, '') : ''
        let user = {
          'user': {
            'name': guardar.name ? guardar.name : '',
            'rut': rut,
            'passport': guardar.passport ? guardar.passport : '',
            'email': guardar.email ? guardar.email : '',
            'address': guardar.address ? guardar.address : '',
            'phone_number': guardar.phone_number ? guardar.phone_number : '',
            'active': false,
            'password': guardar.password ? guardar.password : '',
            'password_confirmation': guardar.password_confirmation ? guardar.password_confirmation : ''
          }
        }
        console.log('ser a post', user)
        try {
          let usuario = await API.post('users', user)
          if (usuario.status >= 200 && usuario.status < 300) {
            console.log(usuario)
            alert('Se ha enviado la solicitud para crear su usuario')
            this.item = {}
            this.dialogregistro = false
          } else {
            console.log('error status', usuario)
          }
        } catch (e) {
          console.log('catch err', e.response)
          // alert('Ha ocurrido un error, intente más tarde!')
          this.item = {}
          this.dialogregistro = false
          this.showModal = true
          this.modalInfoTitle = 'Ha ocurrido un error'
          this.modalInfoDetail = 'Ha ocurrido un error, intente más tarde.'
          this.modalInfoBtn1 = 'OK'
        }
      },
      keymonitor (event) {
        // console.log(event)
        let value = event.target.value
        if (!value) this.item.rut = ''
        value = value.match(/[0-9Kk]+/g).join('')
        this.item.rut = value.slice(0, -1).replace((/[0-9](?=(?:[0-9]{3})+(?![0-9]))/g), '$&.') + '-' + value.slice(-1).toLowerCase()
      }
    },
    computed: {
      ...mapGetters('Auth', {
        isAuthorized: ['isAuthorized']
      })
    },
    components: {
      MenuSelection: MenuSelection,
      weather: weather,
      modal: Modal
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
  .seccion-ayuda .v-btn{
    text-transform: none;
  }
</style>
