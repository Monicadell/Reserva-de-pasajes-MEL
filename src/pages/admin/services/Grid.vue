<template>
  <v-card flat>
    <v-card-text>
      <v-layout row justify-center v-if="floor">
        <v-flex xs12 sm12 md8 lg6 xl4 class="text-xs-center hidden-xs-only">
          <v-layout class="pl-3 pr-3" row justify-center>
            <v-flex xs1 v-for="(row, i) in floor " class="text-xs-center" :key="i">
              <template v-for="(seat, j) in row.slice().reverse()">
                <template v-if="seat.kind === 'a'">

                  <v-btn v-if="seat.status === 0" :flat="seat.number !== selected.number" fab class="ma-0 seatBtn"
                         color="blue darken-2"
                         @click="selectSeat(seat)">
                    <seat :seatNumber="seat.number" :selectedNumber="selected.number" type="desktop"/>
                  </v-btn>
                  <v-tooltip bottom>
                    <v-btn slot="activator" v-if="seat.status === 1" fab class="ma-2 seatBtn grey lighten-1" small
                           depressed :ripple="false">
                      <seat :seatNumber="seat.number" type="desktop"/>
                    </v-btn>
                    <span>Asiento Ocupado</span>
                  </v-tooltip>


                </template>
                <template v-if="seat.kind === 'p'">
                  <v-btn flat class="ma-0 corridorDesktop" disabled>
                  </v-btn>
                </template>
                <template v-if="seat.kind === 'v'">
                  <v-btn flat fab class="ma-0" disabled>
                  </v-btn>
                </template>
                <template v-if="seat.kind === 'b'">
                  <v-btn flat fab class="ma-0 " disabled>
                    <img src="static/imgs/grid/wc.svg" alt="" class="wcSize">
                  </v-btn>
                </template>

              </template>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 class="text-xs-center hidden-sm-and-up">
          <v-layout class="pl-3 pr-3 maxHeightLayout" row justify-center>
            <v-flex xs4 v-for="i in [0,1,2,3,4]" class="text-xs-center" :key="i">
              <template v-for="(row, j) in floor">
                <template v-if="row[i]">
                  <template v-if="row[i].kind === 'a'">
                    <v-btn v-if="row[i].status === 0" :flat="row[i].number !== selected.number" fab class="ma-0 seatBtn"
                           color="blue darken-2"
                           @click="selectSeat(row[i])">
                      <seat :seatNumber="row[i].number" :selectedNumber="selected.number" type="mobile"/>
                    </v-btn>

                    <v-tooltip bottom>
                      <v-btn slot="activator" v-if="row[i].status === 1" fab class="ma-2 seatBtn grey lighten-1" small
                             depressed :ripple="false">
                        <seat :seatNumber="row[i].number" type="mobile"/>
                      </v-btn>
                      <span>Asiento Ocupado</span>
                    </v-tooltip>

                  </template>
                  <template v-if="row[i].kind === 'p'">
                    <v-btn flat class="ma-0 corridorMobile" disabled>
                    </v-btn>
                  </template>
                  <template v-if="row[i].kind === 'v'">
                    <v-btn flat fab class="ma-0" disabled>
                    </v-btn>
                  </template>
                  <template v-if="row[i].kind === 'b'">
                    <v-btn flat fab class="ma-0 " disabled>
                      <img src="static/imgs/grid/wc.svg" alt="" class="wcSize">
                    </v-btn>
                  </template>
                </template>
              </template>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>

    </v-card-text>
  </v-card>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Seat from '@/views/seats/Seat'

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

    },
    computed: mapGetters({
      selected: ['getSeat']
    }),
    methods: {
      selectSeat (seat) {
        if (this.selected.number === seat.number) {
          this.$store.dispatch('SET_SEAT', {seat: false})
        } else {
          this.$store.dispatch('SET_SEAT', {seat: seat})
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
