<template>
  <div  style="width: 100%;">
    <v-toolbar card prominent>
      
      <v-toolbar-title class="body-3 primary--text ml-4">
        <!--{{$t(`lang.home.auth.${menuSelection.text}`)}}-->
        Busqueda de servicios
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!--<div class="grey--text">
        Frecuentes
      </div>
      <v-btn small flat class="botonmenu" >MEL - Complejo MEL</v-btn>
      <v-btn small flat  class="botonmenu">Complejo MEL - MEL</v-btn>
      <v-btn small  flat  class="botonmenu">Aeropuerto ANF - MEL</v-btn>
      <v-btn icon class="grey--text">
        <v-icon>help</v-icon>
      </v-btn> -->
    </v-toolbar>

    <v-divider></v-divider>
<v-layout>
  <v-flex xs3>
     <v-navigation-drawer style="width: 100%">
      <v-list dense class="pt-0 user ">
         <v-toolbar-title class="title-list-custom white--text">
           <span class="hidden-sm-and-down ml-4">Mis reservas</span>
         </v-toolbar-title>
            <v-divider></v-divider>
            <v-layout v-for="item in items" :key="item.id">
              <v-flex > 
                <v-list-tile-content  >
                  <tickets v-bind:item="item" />
                </v-list-tile-content>
              </v-flex> 
            </v-layout> 
      </v-list>
    </v-navigation-drawer>
  </v-flex>

  <v-flex xs10>
    <v-stepper :value="e1"  alt-labels >
    <v-stepper-header>
      <v-stepper-step  :complete="e1 > 1" step="1">Selección de pasajes</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step   :complete="e1 > 2" step="2">Selección de itirenario</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step   step="3">Confirmación</v-stepper-step>
    </v-stepper-header>
    

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-layout align-center justify-center row fill-height> 
          <v-flex xs6>
        <date-place-container/>
          </v-flex>

        </v-layout>
    <!--    <v-container>
          <v-card
            class="mb-5"
            flat
            height="400px"
               max-height="400px"
               max-width="600px"
          >
            <v-card-title >
              <h3 class="headline primary--text text-md-center">Selecciona los datos para tu viaje</h3>
            </v-card-title>
            <place-selector :direction="'from'"/> 
            <service-date :direction="'from'" class="mt-3"/>
          </v-card>
        </v-container>


        <v-btn
          color="secondary"
          @click="findServices"
          :disabled="disabledBtn"
          class="btn-step1 ml-4"
         
        >
          Buscar
        </v-btn> -->

      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card
          class="mb-5"
          height="400px"
          max-height="400px"
          flat
        >

          <service-list/>
        </v-card>

      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card
          class="mb-5"
          height="500px"
          
          flat
        >
        <v-layout align-center justify-space-around column fill-height>
          <v-flex xs4> 
             <v-card-title >
              <h3 class="headline primary--text text-lg-center">Tu reserva esta confirmada</h3>
            </v-card-title>
          </v-flex> 
          <v-flex xs4 mb-5> 
          <img src="../../../../static/img/Check-RESERVA.png" alt="Smiley face" height="290" width="290">

          </v-flex> 
          <v-flex xs4> 
              <h3 class="headline primary--text mb-2">Puedes revisar los datos en tu menú lateral izquierdo de reservas</h3>

        <v-btn
          color="secondary"
          @click="volverMenu"
          class="btn-step3 ml-5"
         
        >
          Volver al menú principal
        </v-btn>
          </v-flex> 


        </v-layout>
          
           
        </v-card>

      </v-stepper-content>
    </v-stepper-items>
  </v-stepper> 
      
  </v-flex>  

</v-layout>  
   


        <v-layout row wrap fill-height class="mt-2">
          <v-flex xs12 >
            <service-selected/>  
          </v-flex>
        </v-layout>


         <v-layout row wrap fill-height class="mt-2">
          <v-flex xs12 >
            <modal-anular/>  
          </v-flex>
        </v-layout>


         <v-layout row wrap fill-height class="mt-2">
          <v-flex xs12 >
            <modal-confirmar/>  
          </v-flex>
        </v-layout>


         <v-layout row wrap fill-height >
          <v-flex xs12 >
            <modal-detalle/>  
          </v-flex>
        </v-layout>
        

  </div>
</template>

<script>
  import PlaceSelector from '@c/PlaceSelector'
  import ServiceDate from '@c/DatePicker'
  import ServiceList from './List'
  import ServiceSelected from './Selected'
  import MyBooking from './MyBooking'
  import modalAnular from './modalAnular'
  import modalConfirmar from './modalConfirmar'
  import modalDetalle from './modalDetalle'
  import datePlaceContainer from './containerDatePlace'

  import tickets from './tickets'
  import {mapGetters} from 'vuex'
  import API from '@pi/app'


  export default {
    data() {
      return {
      //  e1: 0,
        items: [],
        right: null,
        disabledBtn: true,
      }
    },
    components: {
      PlaceSelector: PlaceSelector,
      ServiceDate: ServiceDate,
      ServiceList: ServiceList,
      ServiceSelected: ServiceSelected,
      MyBooking: MyBooking,
      tickets,
      modalAnular,
      modalConfirmar,
      modalDetalle,
      datePlaceContainer
    },
     computed: {
      ...mapGetters({
        fecha: ['Booking/fechaSeleccionada'],
        ruta: ['Booking/ruta'],
        actualizarReservas: ['Booking/actualizarReservas'],
        e1: ['Booking/e1']
      }),
     },
     watch : {
       actualizarReservas () {
         console.log(`debo actaulizar vista reservas ${this.actualizarReservas}`)
         this.getReservas()
         this.$store.dispatch('Booking/set_actualizarReservas', {
            actualizarReservas: false
            }); 
       },
      /* fecha() {
         //console.log(`seleccionaron fecha ${this.fecha}`)
         if(this.fecha != '') {
           //Habilito boton de buscar
           this.disabledBtn = false
         }
       }, */
       e1() {
         console.log('cambio el step')
       }
     },  
    mounted () {
      this.getReservas()
      this.$store.dispatch('Booking/set_ruta', {
        ruta: {}
      });    
      this.$store.dispatch('Booking/set_listaServicios', {
        listaServicios: [],
      });  
       this.$store.dispatch('Booking/set_anular', {
        anular: false
      });    
       this.$store.dispatch('Booking/set_actualizarReservas', {
                actualizarReservas: false
            }); 
       this.$store.dispatch('Booking/set_fechaSeleccionada', {
            fechaSeleccionada: '',
          })
            this.$store.dispatch('Booking/set_confirmar', {
        confirmar: false
      }); 
        this.$store.dispatch('Booking/set_e1', {
        e1: 1
      });  
           this.$store.dispatch('Booking/set_detalle', {
        detalle: false
      });  
    },

    methods: {
    
      async getReservas() { //obtener las reservas de un usuario
            const userId = {
                'user_id': 113162
            }
            const tickets = await API.get('tickets')
            console.log(tickets)

            if (tickets.status >= 200 && tickets.status < 300){
              console.log(`los tickets del usuario son `)
              console.log(tickets.data.data)
                setTimeout(()=>{
                    this.items = Object.assign([], tickets.data.data)
            //      this.consulta = true
              }, 2000)
            } 
           
        },
        volverMenu() {
          this.$store.dispatch('Booking/set_e1', {
            e1: 1,
          }); 
        }
    },
  }
</script>

<style >
.v-btn.botonmenu {
    background: transparent ;
   border: 1px solid #1565c0 ;
   color: #1565c0;
  }

  .v-btn.botonmenu:hover {
    background: #1565c0;
    color: white;
  }

  .v-list.user {
    height: calc(100vh - 24px);
    overflow-y: auto;
}

.v-toolbar__title.title-list-custom {
  background: #1565c0;
}

.v-navigation-drawer>.v-list .v-list__tile .prueba {
  height: 300px;
}

.btn-step1 {
  width: 96%
}

.btn-step3 {
  width: 85%
}



</style>
