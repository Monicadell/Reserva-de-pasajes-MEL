<template>
  <v-card flat>
    <v-card-text>
      <!-- <v-layout row justify-center v-if="floor"> -->
      <v-layout row justify-center v-if="floor"  v-for="(bus, f) in floor" :key="f">
        <v-flex xs12 sm12 md12 lg10 class="text-xs-center mb-5" style="border-bottom: 1px solid gray; border-top: 1px solid gray">
          <v-layout class="" row justify-center v-for="(col, i) in bus.grid" :key="i">
            <!-- acá tengo las columnas del bus (son 5)-->
            <v-flex xs1  class="text-xs-center pr-5" v-if="col !== 'pasillo'" v-for="(seat, j) in col.slice()" :key="j">
              <!-- Acà voy a ir obteniendo los asientos de atras hacia adelante de una de las 5 columnas-->
              <!-- <template > -->
                
                <template v-if="seat[0] !== 0"> <!-- si es distinto de 0 es asiento y es el nª de asiento -->
               <!--   {{seat[0]-seat[1]}}-->
                  <v-btn v-if="seat[1] === 0 && selected[2] === f" :flat="seat[0] !== selected[0]" fab class="mx-0 my-2 seatBtn"
                         color="blue darken-2" small
                         @click="selectSeat(seat, f)">
                    <seat :seatNumber="seat[0]" :selectedNumber="selected[0]" type="desktop"/>
                  </v-btn>
                  <v-btn v-else-if="seat[1] === 0 && selected[2] !== f"
                         fab class="mx-0 my-2 seatBtn" flat
                         small
                         @click="selectSeat(seat, f)">
                     <seat :seatNumber="seat[0]" type="desktop"/>
                  </v-btn>
                  <v-tooltip top>
                    <v-btn slot="activator" v-if="seat[1] === 1" fab class="my-2 mx-0 seatBtn grey lighten-1" small
                           >
                      <seat :seatNumber="seat[0]" type="desktop"/>
                    </v-btn>
                    <span>Asiento Ocupado</span>
                  </v-tooltip>
                </template>

                <template v-else>
                  <!-- baño -->
                  <v-btn flat fab class="ma-0 " disabled>
                    <img src="/../../../static/img/grid/wc.svg" alt="" class="wcSize">
                  </v-btn>
                </template>

              <!-- </template> -->
            </v-flex>
            <v-flex xs12 sm12 md12 lg12 xl4 v-else style="min-height: 30px;">
              
            </v-flex>
          </v-layout>
        </v-flex>
       
        <!-- Responsive -->
        <!-- <v-flex xs12 class="text-xs-center hidden-sm-and-up">
          <v-layout class="pl-3 pr-3 maxHeightLayout" row justify-center>
            <v-flex xs4 v-for="i in [0,1,2,3,4,5,6,7,8,9,10]" class="text-xs-center" :key="i">
              <template v-for="(row, j) in floor[0].grid">
                <template v-if="row[i]">
            
                  <template v-if="row[i][0] !== 0">
                    <v-btn v-if="row[i][1] === 0" :flat="row[i][0] !== selected[0]" fab class="ma-0 seatBtn"
                           color="blue darken-2"
                           @click="selectSeat(row[i])">
                      <seat :seatNumber="row[i][0]" :selectedNumber="selected[0]" type="mobile"/>
                    </v-btn>

                    <v-tooltip bottom>
                      <v-btn slot="activator" v-if="row[i][1] === 1" fab class="ma-2 seatBtn grey lighten-1" small
                             depressed :ripple="false">
                        <seat :seatNumber="row[i][0]" type="mobile"/>
                      </v-btn>
                      <span>Asiento Ocupado</span>
                    </v-tooltip>

                  </template>

                  <template v-else>
                    <v-btn flat fab class="ma-0 " disabled>
                      <img src="/../../../static/img/grid/wc.svg" alt="" class="wcSize">
                    </v-btn>
                  </template>
                </template>
              </template>
            </v-flex>
          </v-layout>
        </v-flex> -->
      </v-layout>

    </v-card-text>
  </v-card>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Seat from './Seat'

  export default {
    props: ['floor'],
    data () {
      return {
        corridor: false
      }
    },
    components: {
      Seat: Seat
    },
    mounted () {
      console.log('MOnto grid')
      console.log('grilla', this.floor)
    },
    computed: mapGetters({
      selected: ['Booking/seat']
    }),
    methods: {
      selectSeat (seat, bus) {
        console.log('seat seleccindao', seat)
        console.log('bus seleccindao', bus)
        let asiento = [
          seat[0],
          seat[1],
          bus
        ]
        if (this.selected[0] === seat[0]) {
          this.$store.dispatch('Booking/set_seat', {seat: false})
        } else {
          console.log('irea a book seat')
          this.$store.dispatch('Booking/set_seat', {seat: asiento})
          setTimeout(() => {
            this.$vuetify.goTo(9999, {
              duration: 500,
              offset: 600,
              easing: 'easeInOutCubic'
            })
          }, 100)
        }
      }
    }
  }
</script>

<style lang="stylus">
  .wcSize {
    width: 30px;
    margin-top: 2px;
    margin-bottom: 2px;
    fill: grey
  }

  .maxHeightLayout {
    max-height: 55vh
    min-height: 55vh
    overflow-y scroll
  }
</style>
