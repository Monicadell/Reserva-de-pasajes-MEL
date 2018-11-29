<template>
  <v-layout id ="date-place-container"  justify-space-around column fill-height >
    
    <v-flex xs2 mb-3> 
        <h3 class="headline primary--text text-md-center">Selecciona los datos para tu viaje</h3> 
    </v-flex>
    <v-flex xs6> 
        <place-selector :direction="'from'"/> 
        <service-date :direction="'from'" class="mt-3"/> 
    </v-flex>
    <v-flex xs4>   
        <v-btn
          color="secondary"
          @click="findServices"
          :disabled="disabledBtn"
          class="ml-0 btn-dpContainer"
        >
          Buscar
        </v-btn>   
    </v-flex>
  </v-layout>
</template>

<script>
  // <img :src="avatar + auth.name + '?font-size=0.45&length=2&background=F17B31&color=fff'">
  // avatar: 'https://ui-avatars.com/api/?name=',
  import moment from 'moment'
  import {mapGetters} from 'vuex'
  import axios from 'axios'
  import API from '@pi/app'
import PlaceSelector from '@c/PlaceSelector'
  import ServiceDate from '@c/DatePicker'

  export default {
   
    name: 'datePlaceContainer',
    data() {
      return {
        statusConfirmacion : {
          status: ''
        },
        disabledBtn: true,

      }
    },
      components: {
      PlaceSelector,
      ServiceDate
    
    },
    mounted () {
     
    },
      watch : {
     
       fecha() {
           console.log('aqui si seleccionaron fecha')
       //  console.log(`seleccionaron fecha ${this.fecha}`)
         if(this.fecha != '') {
           //Habilito boton de buscar
           this.disabledBtn = false
         }
       },

     },  
    computed: {
      ...mapGetters({
        search: ['Booking/current'],
        fecha: ['Booking/fechaSeleccionada'],
        ruta: ['Booking/ruta']
      }),
    
    },
    methods: {
         async findServices() { // obtener los servicios disponibles para una ruta y dia en especifico
        const fecha= this.fecha
        const ruta = this.ruta

        const configService = {
          'trip':ruta.id,
          'date':fecha
        }
        console.log(configService)
       const services = await API.get('services', configService)
       //console.log(services)
       if (services.status >= 200 && services.status < 300){
         console.log(services)
         setTimeout(()=>{
          this.$store.dispatch('Booking/set_listaServicios', {
            listaServicios: services.data.data,
          }); 
          this.$store.dispatch('Booking/set_e1', {
            e1: 2,
          }); 
         }, 1000)
       }
      },
    }
  }
</script>

<style>
    .btn-dpContainer {
        width: 100%
    }



</style>
