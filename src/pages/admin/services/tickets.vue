<template>
  <v-layout id ="card-container">
      <v-flex xs12>
          <v-card>
            <v-card-title primary-title class="pb-1 px-3">
             <span class="mb-0 title-ticket font-weight-black">Resumen de reserva</span>
             <v-spacer></v-spacer>
             <a  color="primary" class="btn-ticket" @click="mostrarDetalle(item)">Ver Detalles</a>
            </v-card-title>
             <v-divider class="divider-ticket mx-3" style=" width: auto; border-color: #1565c0"> </v-divider>
             <v-card-text class=""> 
              
                <v-layout row> 
                  <v-flex xs6 class="font-weight-black">
                    SERVICIO 
                  </v-flex>
                  <v-flex xs6 class="gris--text font-weight-black"> 
                    {{item.id}}
                  </v-flex>
                </v-layout>
                   
                <v-layout row mt-2> 
                  <v-flex xs6 class="gris--text font-weight-black" >
                    {{item.service.from}} 
                  </v-flex>
                  <v-flex xs6 class="gris--text font-weight-black"> 
                    {{item.service.to}}
                  </v-flex>
                </v-layout>

                  <v-layout row mt-2> 
                    <v-flex xs6>
                      <div class="hora-ida white--text"> {{item.service.departure}} </div> 
                    </v-flex>
                    <v-flex xs6 class="ml-2"> 
                      <div class="hora-regreso white--text"> {{item.service.arrival}} </div> 
                    </v-flex>
                </v-layout>


                <v-layout mt-2>
                  <v-flex xs6 class=" font-weight-black">
                    FECHA DE VIAJE
                  </v-flex>
                  <v-flex xs6 class="gris--text font-weight-black"> 
                  {{item.service.date}}
                  </v-flex>
                </v-layout>    
                
              </v-card-text>
            
            <v-layout column v-if="statusConfirmacion.status =='done'"> <!-- USUARIO YA CONFIRMO -->
              <v-layout justify-start row ml-4> 
                <v-flex xs1>  <v-icon color="primary">check_circle_outline</v-icon> </v-flex>
                <v-flex>   <p> Su pasaje está confirmado, solo debe imprimir su ticket en los totems habilitados antes de abordar su bus.  </p> </v-flex>
                <v-spacer> </v-spacer>
              </v-layout>
       
               <v-card-actions>
              <v-layout justify-space-around row wrap fill-height> 
                <v-flex xs6 text-xs-center> 
                    <v-btn  color="red" class="white--text btn-ticket"  @click="mostrarAnular(item)">Anular</v-btn> 
                  </v-flex>
                <v-flex xs6 text-xs-center> 
                  <button type="button" class="v-btn btn-ticket primary--text" id="prueba" disabled>Confirmado</button>
                <!-- <v-btn  color="green" @click="mostrarConfirmar(item)" >Confirmar</v-btn> -->
                </v-flex >
                 <!-- <v-flex xs4> 
                  <v-btn  color="primary" class="btn-ticket" @click="mostrarDetalle(item)">Ver Detalles</v-btn>
                 </v-flex> -->
              </v-layout>
            </v-card-actions>
            </v-layout>

            <v-layout column v-if="statusConfirmacion.status =='process'"> <!-- USUARIO PUEDE CONFIRMAR -->
              <v-layout row ml-4> 
                <v-flex xs1>  <v-icon color="primary">check</v-icon> </v-flex>
                <v-flex> <p> Ya puede realizar la confirmación de su pasaje. </p> </v-flex>
                <v-spacer> </v-spacer>
              </v-layout>

                <v-card-actions>
                <v-layout justify-space-around row wrap fill-height> 
                  <v-flex xs6 text-xs-center> 
                    <v-btn  color="red" class="white--text btn-ticket" @click="mostrarAnular(item)">Anular</v-btn> 
                  </v-flex>
                  <v-flex xs6 text-xs-center> 
                  <v-btn  color="orange" class="white--text btn-ticket" @click="mostrarConfirmar(item)">Confirmar</v-btn>
                  </v-flex >
                  <!-- <v-flex xs4 text-xs-center> 
                <v-btn  color="primary" class="btn-ticket" @click="mostrarDetalle(item)">Ver Detalles</v-btn>
                  </v-flex> -->
                </v-layout>
              </v-card-actions>
            </v-layout>

            <v-layout column v-if="statusConfirmacion.status =='none'"> <!-- USUARIO NO PUEDE CONFIRMAR -->
              <v-flex> 
                <v-layout justify-start row ml-3> 
                  <v-flex> <v-icon color="primary" class="pr-1" style="vertical-align: top">timelapse</v-icon>  <span style="padding: 0 16px 0 0; margin-bottom: 16px; display: inline-block; vertical-align: middle;"> {{item.service.hrs_left}}hrs para su confirmación</span> </v-flex>
                  <v-spacer> </v-spacer>
                </v-layout>
              </v-flex>
            
              <v-card-actions>
                <!-- <v-layout row wrap fill-height>  -->
                  <v-flex xs6 text-xs-center> 
                    <v-btn  color="red" class="white--text btn-ticket" @click="mostrarAnular(item)">Anular</v-btn> 
                  </v-flex>
                  <v-flex xs6 text-xs-center> 
                  <v-btn  color="orange" class="white--text btn-ticket" disabled @click="mostrarConfirmar(item) ">Confirmar</v-btn>
                  </v-flex >
                  <!-- <v-flex xs4 text-xs-center> 
                    <v-btn  color="primary" class="btn-ticket" @click="mostrarDetalle(item)">Ver Detalles</v-btn>
                  </v-flex> -->
                <!-- </v-layout> -->
              </v-card-actions>
            </v-layout>

            <v-layout column v-if="statusConfirmacion.status =='express'"> <!-- USUARIO PASAJE EXPRESS -->
              <p style="padding: 0 16px;"> {{item.service.hrs_left}}hrs. para su viaje</p>

              <v-card-actions>
              <v-layout row wrap fill-height> 
                <v-flex xs6 text-xs-center> 
                  <v-btn  color="red" class="white--text btn-ticket" @click="mostrarAnular(item)">Anular</v-btn> 
                </v-flex>
                
                <v-flex xs6 text-xs-center> 
                  <v-btn  color="orange" class="white--text btn-ticket" disabled @click="mostrarConfirmar(item) ">Confirmar</v-btn>
                </v-flex >
                 <!-- <v-flex xs6 text-xs-center> 
                  <v-btn  color="primary" class="white--text btn-ticket" @click="mostrarDetalle(item)">Ver Detalles</v-btn>
                 </v-flex> -->
              </v-layout>
            </v-card-actions>
            </v-layout>

            
          </v-card>
          <v-divider> </v-divider>
        </v-flex>
   
  </v-layout>
</template>

<script>
  // <img :src="avatar + auth.name + '?font-size=0.45&length=2&background=F17B31&color=fff'">
  // avatar: 'https://ui-avatars.com/api/?name=',
  // import moment from 'moment'
  import {mapGetters} from 'vuex'
  // import axios from 'axios'
  // import API from '@pi/app'

  export default {
    props: ['item'],
    name: 'tickets',
    data () {
      return {
        statusConfirmacion: {
          status: ''
        }
      }
    },
    mounted () {
      console.log(this.item)
      const tickete = this.item
      if (tickete.confirmed_at != null) {
        console.log('ya el usuario confirmo')
        this.statusConfirmacion.status = 'done'
      } else {
        console.log('aun no confirma')
        if (tickete.service.hrs_left >= 48 && tickete.service.hrs_left <= 72) {
          console.log('usuario puede confirmar')
          this.statusConfirmacion.status = 'process'
        } else if (tickete.service.hrs_left < 48) {
          console.log('no necesita confirmacion porque es express')
          this.statusConfirmacion.status = 'express'
        } else {
          console.log('aun no puede confirmar')
          this.statusConfirmacion.status = 'none'
        }
      }
    },
    watch: {
      item () {
        const tickete = this.item
        if (tickete.confirmed_at != null) {
          console.log('ya el usuario confirmo')
          this.statusConfirmacion.status = 'done'
        } else {
          console.log('aun no confirma')
          if (tickete.service.hrs_left >= 48 && tickete.service.hrs_left <= 72) {
            console.log('usuario puede confirmar')
            this.statusConfirmacion.status = 'process'
          } else if (tickete.service.hrs_left < 48) {
            console.log('no necesita confirmacion porque es express')
            this.statusConfirmacion.status = 'express'
          } else {
            console.log('aun no puede confirmar')
            this.statusConfirmacion.status = 'none'
          }
        }
        console.log('dale refresca la vista')
      }
    },
    computed: {
      ...mapGetters({
        search: ['Booking/current'],
        ruta: ['Booking/ruta'],
        actualizarVistaConfirmacion: ['Booking/actualizarVistaConfirmacion'],
        listaReservas: ['Booking/listaReservas']
      })
    },
    methods: {
      mostrarAnular (item) {
        console.log(item)
        this.$store.dispatch('Booking/set_servicioAnular', {
          servicioAnular: item
        })
        this.$store.dispatch('Booking/set_anular', {
          anular: true
        })
      },
      mostrarConfirmar (item) {
        console.log(item)
        this.$store.dispatch('Booking/set_confirmar', {
          confirmar: true
        })
        this.$store.dispatch('Booking/set_servicioConfirmar', {
          servicioConfirmar: item
        })
      },
      mostrarDetalle (item) {
        const tickete = this.item
        console.log(tickete)
        if (tickete.confirmed_at != null) {
          console.log('ya el usuario confirmo')
          this.$store.dispatch('Booking/set_estadoTickete', {
            estadoTickete: 'Confirmacion realizada'
          })
        } else {
          console.log('aun no confirma')
          if (tickete.service.hrs_left >= 48 && tickete.service.hrs_left <= 72) {
            this.$store.dispatch('Booking/set_estadoTickete', {
              estadoTickete: 'Confirmacion Pendiente'
            })
          } else if (tickete.service.hrs_left < 48) {
            console.log('no necesita confirmacion porque es express')
            this.$store.dispatch('Booking/set_estadoTickete', {
              estadoTickete: 'Confirmacion realizada'
            })
          } else {
            this.$store.dispatch('Booking/set_estadoTickete', {
              estadoTickete: 'Confirmacion Pendiente'
            })
          }
        }
       // console.log(item)
        this.$store.dispatch('Booking/set_detalle', {
          detalle: true
        })
        this.$store.dispatch('Booking/set_servicioDetalle', {
          servicioDetalle: item
        })
      }
    }
  }
</script>

<style>

  .v-btn.btn-ticket{
    text-transform: none;
   
}
  .v-divider.divider-ticket {
    /* border-style: dashed;
    border-width: 1px;
    border-color: #1565c0; */
    border-top: 1px dashed #1565c0;
    width:90%;
}

  .title-ticket {
    color: #003e86;
    font-size: 16px;
  }
  #prueba {
    /* border: 1px solid green; */
    background: rgba(0, 0, 0, 0.12);
    /* color: green; */
    box-shadow: none;
  }
  #prueba:hover {
    /* border: 1px solid green; */
    background-color: rgba(0, 0, 0, 0.12);
    /* color: green; */
    box-shadow: none;
    outline: none;
  }
  .v-btn--active#prueba:before, #prueba.v-btn:focus:before, #prueba.v-btn:hover:before {
    background-color: rgba(0, 0, 0, 0.12);
  }
  #card-container {
    width: 100%;
    opacity: 0.8;
    transition: all .4s ease-in-out;
  }

  #card-container:hover {
     opacity: 1;
    -webkit-transform: scale(0.999);
    -ms-transform: scale(0.999);
    transform: scale(0.999);
  }

  .hora-ida {
    display: flex;
    justify-content: center; /* align horizontal */
    align-items: center;
    position: relative;
    background: #1565c0;
    height: 32px;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  .hora-regreso:before {
    content: '';
    border-left: 16px solid #fff;
    border-top: 16px solid transparent;
    border-bottom: 16px solid transparent;
    position: absolute;
    top: 0;
    left: 0;
  }

  .hora-ida:after {
    content: '';
    border-left: 16px solid #1565c0;
    border-top: 16px solid transparent;
    border-bottom: 16px solid transparent;
    position: absolute;
    top: 0;
    left: 100%;
    z-index: 20;   
  }

  .hora-regreso {
    display: flex;
    justify-content: center; /* align horizontal */
    align-items: center;
    position: relative;
    background: #1565c0;
    height: 32px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;   
  }

  .shadow-drop-2-center {
    -webkit-animation: shadow-drop-2-center 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
            animation: shadow-drop-2-center 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  }

    /* ----------------------------------------------
 * Generated by Animista on 2018-11-27 18:25:10
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation shadow-drop-2-center
 * ----------------------------------------
 */
@-webkit-keyframes shadow-drop-2-center {
  0% {
    -webkit-transform: translateZ(0);
            transform: translateZ(0);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
  100% {
    -webkit-transform: translateZ(50px);
            transform: translateZ(50px);
    box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.35);
  }
}
@keyframes shadow-drop-2-center {
  0% {
    -webkit-transform: translateZ(0);
            transform: translateZ(0);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
  100% {
    -webkit-transform: translateZ(50px);
            transform: translateZ(50px);
    box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.35);
  }
}


</style>
