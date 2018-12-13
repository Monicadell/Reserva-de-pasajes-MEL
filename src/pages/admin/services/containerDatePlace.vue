<template>
  <v-layout id ="date-place-container"  justify-space-around column fill-height >
    
    <v-flex xs2 mb-3> 
        <h3 class="headline primary--text text-md-center">Selecciona los datos para tu viaje</h3> 
    </v-flex>
    <v-flex xs6> 
        <place-selector :direction="'from'" :key="componentKeySelect"/> 
        <service-date :direction="'from'" class="mt-3" :key="componentKeyDate"/> 
    </v-flex>
    <v-flex xs4>   
      <v-layout align-center justify-center row fill-height> 
         <v-btn
          color="primary"
          @click="findServices"
          :disabled="disabledBtn"
          class="ml-0 mt-4 btn-dpContainer"
        >
          Buscar
        </v-btn>   
      </v-layout>
       
    </v-flex>
  </v-layout>
</template>

<script>
  // <img :src="avatar + auth.name + '?font-size=0.45&length=2&background=F17B31&color=fff'">
  // avatar: 'https://ui-avatars.com/api/?name=',
  // import moment from 'moment'
  import {mapGetters} from 'vuex'
  // import axios from 'axios'
  import API from '@pi/app'
  import PlaceSelector from '@c/PlaceSelector'
  import ServiceDate from '@c/DatePicker'

  export default {
    name: 'datePlaceContainer',
    data () {
      return {
        statusConfirmacion: {
          status: ''
        },
        disabledBtn: true,
        componentKeySelect: 0,
        componentKeyDate: 1
      }
    },
    components: {
      PlaceSelector,
      ServiceDate
    },
    watch: {
      fecha () {
        console.log('aqui si seleccionaron fecha')
       //  console.log(`seleccionaron fecha ${this.fecha}`)
        if (this.fecha !== '') {
          // Habilito boton de buscar
          this.disabledBtn = false
        }
      }
    },
    computed: {
      ...mapGetters({
        search: ['Booking/current'],
        fecha: ['Booking/fechaSeleccionada'],
        ruta: ['Booking/ruta']
      })
    },
    methods: {
      async findServices () { // obtener los servicios disponibles para una ruta y dia en especifico
        const fecha = this.fecha
        const ruta = this.ruta
        const configService = {
          'trip': ruta.id,
          'date': fecha
        }
       // console.log(configService)
        try {
          const services = await API.get('services', configService)
          // console.log(services)
          if (services.status >= 200 && services.status < 300) {
            console.log(services.data.data)
            if (services.data.data.length === 0) {
              console.log('no hay pasajes')
              this.$store.dispatch('Booking/set_fechaSeleccionada', {fechaSeleccionada: ''})
              this.componentKeySelect++
              this.componentKeyDate++
              this.disabledBtn = true
              this.$swal({
                customClass: 'modal-info',
                type: 'error',
                // timer: 2000,
                title: 'Oops...',
                text: '¡No hay servicios para la fecha seleccionada!',
                animation: true,
                showConfirmButton: false,
                showCloseButton: false
              })
            } else {
              setTimeout(() => {
                this.$store.dispatch('Booking/set_listaServicios', {
                  listaServicios: services.data.data
                })
                this.$store.dispatch('Booking/set_e1', {
                  e1: 2
                })
              }, 1000)
            }
          }
        } catch (e) {
          console.log('catch error al obtener serivicios', e.response)
        }
      }
    },
    beforeDestroy () {
      this.$store.dispatch('Booking/set_fechaSeleccionada', {fechaSeleccionada: ''})
    }
  }
</script>

<style>
  .btn-dpContainer {
    width: 50%;
    display: flex;
    align-self: center;
  }
  .swal2-popup.modal-info {
    font-family: Helvetica, sans-serif;
  }
  .swal2-popup.swal2-modal.modal-info{
    border-radius: 0;
  }
  .swal2-popup.modal-info .swal2-styled.swal2-confirm {
    border: 1px solid #1565c0;
    border-radius: 0;
    background: transparent;
    background-color: transparent;
    color: #1565c0;
    font-size: 1.0625em;
    outline: none;
  }
  .swal2-popup.modal-info .swal2-styled.swal2-cancel:focus,
  .swal2-popup.modal-info .swal2-styled.swal2-confirm:focus {
    box-shadow: none;
  }
  .swal2-popup.modal-info .swal2-styled.swal2-cancel {
    border-radius: 0;
    border: none;
    background-color: #1565c0;
    outline: none;
  }
  .swal2-popup.modal-info .swal2-styled.swal2-confirm:hover {
    border: 1px solid #1565c0;
    border-radius: 0;
    background: transparent;
    background-color: rgba(21, 101, 192, 0.12);
    color: #1565c0;
    font-size: 1.0625em;
  }
</style>
