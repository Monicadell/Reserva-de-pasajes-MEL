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
            <div class="tramos-dash2" @click="activar(tramo)"  v-bind:class="{ 'active': active === tramo.id, 'normal': active !== tramo.id}">
              <v-avatar size="20px">
                <v-icon color="white">swap_vert</v-icon>
              </v-avatar>
              <div class="text-xs-left up-down">
                <p class="font-weight-regular pt-2 mb-0">Ida</p>
                <p class="white--text pb-2 mb-0">Vuelta</p>
              </div>
              <div class="text-xs-left pl-1 up-down">
                <p class="font-weight-bold white--text pt-2 mb-0" style="padding-bottom: 5px; border-bottom: 1px solid #ccc;">{{tramo.source_name}}</p>
                <p class="font-weight-bold white--text pb-2 mb-0">{{tramo.dest_name}}</p>
              </div>
            </div>
          </local-slide>
          <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
          <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
        </local-swiper>
      </div>
    </v-layout>

    <v-layout row wrap class="contiene-tramos py-5">
      <v-flex xs12>
        <h2>{{tramo.source_name}} - {{tramo.dest_name}}</h2>
      </v-flex>
      <v-flex xs12 class="pt-5 pb-3">
        <!-- <div style="max-width: 10%; display: inline-block">
          <div class="box-pasajeros">
            <span class="pasajeros">{{10}}</span>
            <img src="/../../../static/img/pasajero-gris.png" width="20%"/>
          </div>
          <img src="/../../../static/img/bus_ida.png" width="100%"/>
        </div> -->
        
        <div style="max-width: 10%; display: inline-block">
          <div class="box-pasajeros">
            <span class="pasajeros">{{12}}</span>
            <img src="/../../../static/img/pasajero-gris.png" width="20%"/>
          </div>
          <img src="/../../../static/img/bus_ida.png" width="100%"/>
        </div>
      </v-flex>
      <v-flex xs1 align-center class="origen-destino">
        {{tramo.source_name}}
      </v-flex>
      <v-flex xs10 align-center>
        <div class="steps">
          <div class="step first">
            <div class="first-vertical"></div>
            <div class="step-title">punto 1</div>
          </div>
          <div class="step">
            <div class="step-circle"></div>
            <div class="step-title">punto 2</div>
          </div>
          <div class="step">
            <div class="step-circle"></div>
            <div class="step-title">punto 3</div>
          </div>
          <div class="step">
            <div class="step-circle"></div>
            <div class="step-title">punto 4</div>
          </div>
          <div class="step final">
            <div class="step-circle"></div>
            <div class="step-title">punto 5</div>
          </div>
        </div>
      </v-flex>
      <v-flex xs1 align-center class="origen-destino">
        {{tramo.dest_name}}
      </v-flex>
      <v-flex xs12 class="pt-3">
        <div style="max-width: 10%; display: inline-block">
          <img src="/../../../static/img/bus_vuelta.png" width="100%"/>
          <div class="box-pasajeros">
            <span class="pasajeros">{{10}}</span>
            <img src="/../../../static/img/pasajero-gris.png" width="20%"/>
          </div>
        </div> 
      </v-flex>
    </v-layout>


    <v-layout row wrap class="mt-5">
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
              readonly
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
              readonly
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
              readonly
            ></v-text-field>
          </v-flex>
        </v-layout>
        
      </v-flex>
    </v-layout>

    <v-layout row wrap class="pt-5">
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
              readonly
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
              readonly
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
              readonly
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
              readonly
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
              readonly
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
              readonly
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
              readonly
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import API from '@pi/app'

  export default {
    data () {
      return {
        active: 1,
        tramo: {},
        img: '../../../static/img/Imagen_1.png',
        busida: '../../../static/img/bus_ida.png',
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
    mounted () {
      this.getTrips()
    },
    methods: {
      activar (val) {
        console.log('val active', val)
        this.active = val.id
        this.tramo = val
        if (val.id === 1) {
          this.img = '../../../static/img/Imagen_1.png'
        }
        if (val.id === 2) {
          this.img = '../../../static/img/Imagen_2.png'
        }
      },
      async getTrips () {
        let trips = await API.get('trips')
        if (trips.status >= 200 && trips.status < 300) {
          console.log('trips', trips.data.data)
          this.items = trips.data.data
          this.active = this.items[0].id
          this.tramo = this.items[0]
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
    background-color: #f2f2f2;
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

  /* Timeline */
  .steps {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  .steps .step {
    flex-basis: 100%;
    position: relative;
  }
  .steps .step:before {
    content: '';
    height: 4px;
    width: calc(100% - 9px);
    background: #4d4d4d;
    position: absolute;
    top: 7px;
    left: 10px;
    z-index: 0;
  }
  .steps .step-circle {
    width: 1rem;
    height: 1rem;
    background-color: #ccc;
    border-radius: 50%;
    border: 5px solid #4d4d4d;
    z-index: 1;
    /* box-shadow: 0 2px 24px 0 rgba(0, 0, 0, 0.12); */
  }
  .steps .first-vertical {
    width: 3px;
    height: 18px;
    background-color: #4d4d4d;
    /* border: 5px solid #f18264; */
    z-index: 1;
    box-shadow: 0 2px 24px 0 rgba(0, 0, 0, 0.12);
  }
  .steps .step.first:before {
    content: '';
    height: 4px;
    width: 100%;
    background: #4d4d4d;
    position: absolute;
    top: 7px;
    left: 3px;
    z-index: 0;
  }
  .steps .step.final:before {
    content: '';
    height: 4px;
    width: calc(100% - 10px);
    background: #4d4d4d;
    position: absolute;
    top: 7px;
    left: 10px;
    z-index: 0;
  }
  .steps .step.final::after {
    content: '';
    width: 3px;
    height: 18px;
    background-color: #4d4d4d;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 0;
    z-index: 1;
    box-shadow: 0 2px 24px 0 rgba(0, 0, 0, 0.12);
  }
  .box-pasajeros {
    display: flex;
    align-items: flex-end;
    max-height: 30px;
    justify-content: center;
  }
  .pasajeros {
    font-weight: bold;
    color: #4d4d4d;
    font-size: 20px;
    padding-right: 5px;
  }
  .origen-destino {
    font-weight: bold;
    color: #4d4d4d;
  }
</style>
