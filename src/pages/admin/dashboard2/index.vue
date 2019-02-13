<template>
  <v-container fluid grid-list-md text-xs-center>
    <v-layout row wrap justify-end>
        <v-flex xs12>

        </v-flex>
    </v-layout>
    <v-layout row wrap class="contiene-tramos">
      <div class="content-scroll">
        <local-swiper ref="awesomeSwiperB" :options="swiperOptionB">
          <local-slide v-for="tramo in items" :key="tramo.id">
            <div class="tramos-dash2" @click="activar(tramo.id)"  v-bind:class="{ 'active': active === tramo.id, 'normal': active !== tramo.id}">
              <v-avatar size="20px">
                <v-icon color="white">swap_vert</v-icon>
              </v-avatar>
              <div class="text-xs-left up-down">
                <p class="font-weight-regular pt-2 mb-0">Ida</p>
                <p class="white--text pb-2 mb-0">Vuelta</p>
              </div>
              <div class="text-xs-left pl-1 up-down">
                <p class="font-weight-bold white--text pt-2 mb-0" style="padding-bottom: 5px; border-bottom: 1px solid #ccc;">{{tramo.ida}}</p>
                <p class="font-weight-bold white--text pb-2 mb-0">{{tramo.vuelta}}</p>
              </div>
            </div>
          </local-slide>
          <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
          <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
        </local-swiper>
      </div>
        
    </v-layout>

    <v-layout row wrap class="contiene-tramos">
       <v-img
          :src="img"
          aspect-ratio="2"
          class="grey lighten-2"
        ></v-img>
    </v-layout>


    <v-layout row wrap class="contiene-tramos pt-5">
      <v-flex xs6 offset-xs3 class="text-xs-center">
        <h2 class="pt-3 pb-2 grey--darken font-weight-black">Detalles del tramo</h2>
        <v-layout row>
          <v-flex xs5>
            <v-subheader class="font-weight-bold grey--darken">Total pasajeros ida:</v-subheader>
          </v-flex>
          <v-flex xs7>
            <v-text-field
              class="pt-0"
              value="30"
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs5>
            <v-subheader class="font-weight-bold grey--darken">Total pasajeros vuelta:</v-subheader>
          </v-flex>
          <v-flex xs7>
            <v-text-field
              class="pt-0"
              value="46"
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs5>
            <v-subheader class="font-weight-bold grey--darken">Cantidad de buses en ruta:</v-subheader>
          </v-flex>
          <v-flex xs7>
            <v-text-field
              class="pt-0"
              value="2 buses en la ruta"
            ></v-text-field>
          </v-flex>
        </v-layout>
        
      </v-flex>
    </v-layout>

    <v-layout row wrap class="contiene-tramos pt-5">
      <v-flex xs6 offset-xs3 class="text-xs-center">
        <h2 class="pt-3 pb-2 grey--darken font-weight-black">Detalles del bus seleccionado</h2>
        <v-layout row>
          <v-flex xs5>
            <v-subheader class="font-weight-bold grey--darken">Patente bus:</v-subheader>
          </v-flex>
          <v-flex xs7>
            <v-text-field
              class="pt-0"
              value="CFDR43"
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs5>
            <v-subheader class="font-weight-bold grey--darken">Conductor:</v-subheader>
          </v-flex>
          <v-flex xs7>
            <v-text-field
              class="pt-0"
              value="Ernesto de la Cuadra"
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs5>
            <v-subheader class="font-weight-bold grey--darken">Auxiliar:</v-subheader>
          </v-flex>
          <v-flex xs7>
            <v-text-field
              class="pt-0"
              value="Raul Fernandez"
            ></v-text-field>
          </v-flex>
        </v-layout>
        
        <v-layout row>
          <v-flex xs5>
            <v-subheader class="font-weight-bold grey--darken">Nº pasajeros:</v-subheader>
          </v-flex>
          <v-flex xs7>
            <v-text-field
              class="pt-0"
              value="30 pasajeros"
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs5>
            <v-subheader class="font-weight-bold grey--darken">Manifiesto:</v-subheader>
          </v-flex>
          <v-flex xs7>
            <v-text-field
              class="pt-0"
              value="Info Manifiesto"
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs5>
            <v-subheader class="font-weight-bold grey--darken">Destino del Bus:</v-subheader>
          </v-flex>
          <v-flex xs7>
            <v-text-field
              class="pt-0"
              value="Aeropuerto ANF"
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs5>
            <v-subheader class="font-weight-bold grey--darken">Tramo (ida/vuelta):</v-subheader>
          </v-flex>
          <v-flex xs7>
            <v-text-field
              class="pt-0"
              value="vuelta"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    data () {
      return {
        active: 1,
        img: '../../../static/img/Imagen_1.png',
        swiperOptionB: {
          slidesPerView: 6,
          spaceBetween: 0,
          slidesPerGroup: 1,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          breakpoints: {
            320: {
              slidesPerView: 1
            },
            480: {
              slidesPerView: 2
            },
            740: {
              slidesPerView: 3
            },
            940: {
              slidesPerView: 4
            },
            1200: {
              slidesPerView: 4
            },
            1500: {
              slidesPerView: 5
            }
          }
        },
        items: [
          {id: 1, ida: 'Aeropuerto ANF', vuelta: 'Complejo'},
          {id: 2, ida: 'Antofagasta', vuelta: 'MEL'},
          {id: 3, ida: 'Aeropuerto ANF', vuelta: 'MEL'},
          {id: 4, ida: 'MEL', vuelta: 'Complejo'},
          {id: 5, ida: 'La Negra', vuelta: 'MEL'},
          {id: 6, ida: 'Terminal buses ANF', vuelta: 'VCA'},
          {id: 7, ida: 'MEL 7000', vuelta: 'Antofagasta'},
          {id: 8, ida: 'MEL', vuelta: 'Terminal buses ANF'},
          {id: 9, ida: 'VSL', vuelta: 'Terminal buses'}]
      }
    },
    components: {
      LocalSwiper: swiper,
      LocalSlide: swiperSlide
    },
    methods: {
      activar (val) {
        this.active = val
        if (val === 1) {
          this.img = '../../../static/img/Imagen_1.png'
        }
        if (val === 2) {
          this.img = '../../../static/img/Imagen_2.png'
        }
      }
    }
  }
</script>

<style scoped>
  .content-scroll {
    flex: 1;
    display: flex;
    overflow: auto;
  }
  .contiene-tramos {
    overflow-x: scroll;
  }
  .tramos-dash2 {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    flex: auto;
    min-width: 240px;
    border-left: 1px solid #BF360C;
    border-right: 1px solid #BF360C;
    background-color: #d84d14;
    color: #fff;
    min-height: min-content; /* needs vendor prefixes */
  }
  .tramos-dash2.active {
    background-color: #E66732;
  }
  .tramos-dash2.normal {
    background-color: #d84d14;
  }
  .up-down {
    display: flex;
    flex-direction: column;
  }
  .tramos-dash2:last-child {
    margin-right: 0;
  }
  .grey--darken {
    color: #4C4C4C;
  }
</style>
