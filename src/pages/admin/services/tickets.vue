<template>
  <v-layout >
      <v-flex xs12>
          <v-card>
            <v-card-title primary-title>
                <h2 class="mb-0">Resumen de reserva</h2>
            </v-card-title>
             <v-card-text> 
               <v-divider> </v-divider>
                <v-layout row> 
                  <v-flex xs6>
                    Servicio 
                  </v-flex>
                  <v-flex xs6> 
                    {{item.id}}
                  </v-flex>
                </v-layout>
                   
                    <v-layout row> 
                  <v-flex xs4 >
                    Origen
                   
                  </v-flex>
                  <v-flex xs6> 
                    Destino
                

                  </v-flex>
                </v-layout>

                  <v-layout row> 
                  <v-flex xs4 >
                 
                    <div class="hora-ida"> {{item.service.departure}} </div> 
                  </v-flex>
                  <v-flex xs6 class="ml-2"> 
                  
                    <div class="hora-regreso "> {{item.service.arrival}} </div> 

                  </v-flex>
                </v-layout>


                <v-layout>
                  <v-flex xs6>
                    Fecha de viaje 
                  </v-flex>
                  <v-flex xs6> 
                  {{item.service.date}}
                  </v-flex>
                </v-layout>    
                
              </v-card-text>

            <v-card-actions>
              <v-btn flat color="orange">Anular</v-btn>
              <v-btn flat color="orange">Confirmar</v-btn>
              <v-btn flat color="orange">Ver Detalles</v-btn>
            </v-card-actions>
          </v-card>
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

  export default {
     props: ['item'],
    name: 'tickets',
    data() {
      return {
      }
    },
    mounted () {
 
    },
    computed: {
      ...mapGetters({
        search: ['Booking/current'],
        ruta: ['Booking/ruta']
      }),
    
    },
    methods: {
      
    },
    watch: {
    
    }
  }
</script>

<style>



    .hora-ida {
        position: relative;
        background: #1565c0;
        text-align: center;
        height: 32px;
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
        text-align: center;
        position: relative;
        background: #1565c0;
        height: 32px;
         width: 90%;
       
    }

</style>
