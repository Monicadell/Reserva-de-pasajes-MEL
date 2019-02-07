<template>
  <v-container fluid grid-list-md text-xs-center>
    <v-layout row wrap class="contiene-tramos">
      <div class="content-scroll">
        <div class="tramos-dash2" @click="activar(1)"  v-bind:class="{ 'active': active1 }">
          <v-avatar size="20px">
            <v-icon color="white">swap_vert</v-icon>
          </v-avatar>
          <div class="text-xs-left up-down">
            <p class="font-weight-regular pt-2 mb-0">Ida</p>
            <p class="white--text pb-2 mb-0">Vuelta</p>
          </div>
          <div class="text-xs-left pl-1 up-down">
            <p class="font-weight-bold white--text pt-2 mb-0" style="padding-bottom: 5px; border-bottom: 1px solid #ccc">Aeropuerto ANF</p>
            <p class="font-weight-bold white--text pb-2 mb-0">Complejo</p>
          </div>
        </div>

        <div class="tramos-dash2" @click="activar(2)"  v-bind:class="{ 'active': active2 }">
          <v-avatar size="20px">
            <v-icon color="white">swap_vert</v-icon>
          </v-avatar>
          <div class="text-xs-left up-down">
            <p class="font-weight-regular pt-2 mb-0">Ida</p>
            <p class="white--text pb-2 mb-0">Vuelta</p>
          </div>
          <div class="text-xs-left pl-1 up-down">
            <p class="font-weight-bold white--text pt-2 mb-0" style="padding-bottom: 5px; border-bottom: 1px solid #ccc">Antofagasta</p>
            <p class="font-weight-bold white--text pb-2 mb-0">MEL</p>
          </div>
        </div>

        <div class="tramos-dash2" @click="activar(3)"  v-bind:class="{ 'active': active3 }">
          <v-avatar size="20px">
            <v-icon color="white">swap_vert</v-icon>
          </v-avatar>
          <div class="text-xs-left up-down">
            <p class="font-weight-regular pt-2 mb-0">Ida</p>
            <p class="white--text pb-2 mb-0">Vuelta</p>
          </div>
          <div class="text-xs-left pl-1 up-down">
            <p class="font-weight-bold white--text pt-2 mb-0" style="padding-bottom: 5px; border-bottom: 1px solid #ccc">MEL 7000</p>
            <p class="font-weight-bold white--text pb-2 mb-0">Complejo</p>
          </div>
        </div>

        <div class="tramos-dash2" @click="activar(4)"  v-bind:class="{ 'active': active4 }">
          <v-avatar size="20px">
            <v-icon color="white">swap_vert</v-icon>
          </v-avatar>
          <div class="text-xs-left up-down">
            <p class="font-weight-regular pt-2 mb-0">Ida</p>
            <p class="white--text pb-2 mb-0">Vuelta</p>
          </div>
          <div class="text-xs-left pl-1 up-down">
            <p class="font-weight-bold white--text pt-2 mb-0" style="padding-bottom: 5px; border-bottom: 1px solid #ccc">Complejo</p>
            <p class="font-weight-bold white--text pb-2 mb-0">La Negra</p>
          </div>
        </div>

        <div class="tramos-dash2" @click="activar(5)"  v-bind:class="{ 'active': active5 }">
          <v-avatar size="20px">
            <v-icon color="white">swap_vert</v-icon>
          </v-avatar>
          <div class="text-xs-left up-down">
            <p class="font-weight-regular pt-2 mb-0">Ida</p>
            <p class="white--text pb-2 mb-0">Vuelta</p>
          </div>
          <div class="text-xs-left pl-1 up-down">
            <p class="font-weight-bold white--text pt-2 mb-0" style="padding-bottom: 5px; border-bottom: 1px solid #ccc">Aeropuerto ANF</p>
            <p class="font-weight-bold white--text pb-2 mb-0">Complejo</p>
          </div>
        </div>
        <div class="tramos-dash2">
          <v-avatar size="20px">
            <v-icon color="white">swap_vert</v-icon>
          </v-avatar>
          <div class="text-xs-left up-down">
            <p class="font-weight-regular pt-2 mb-0">Ida</p>
            <p class="white--text pb-2 mb-0">Vuelta</p>
          </div>
          <div class="text-xs-left pl-1 up-down">
            <p class="font-weight-bold white--text pt-2 mb-0" style="padding-bottom: 5px; border-bottom: 1px solid #ccc">Aeropuerto ANF</p>
            <p class="font-weight-bold white--text pb-2 mb-0">Complejo</p>
          </div>
        </div>

        <div class="tramos-dash2">
          <v-avatar size="20px">
            <v-icon color="white">swap_vert</v-icon>
          </v-avatar>
          <div class="text-xs-left up-down">
            <p class="font-weight-regular pt-2 mb-0">Ida</p>
            <p class="white--text pb-2 mb-0">Vuelta</p>
          </div>
          <div class="text-xs-left pl-1 up-down">
            <p class="font-weight-bold white--text pt-2 mb-0" style="padding-bottom: 5px; border-bottom: 1px solid #ccc">Aeropuerto ANF</p>
            <p class="font-weight-bold white--text pb-2 mb-0">Complejo</p>
          </div>
        </div>
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
  import Dashboard from './Dashboard'

  export default {
    data () {
      return {
        active1: true,
        active2: false,
        active3: false,
        active4: false,
        active5: false,
        img: '../../../static/img/Imagen_1.png'
      }
    },
    components: {
      Dashboard: Dashboard
    },
    methods: {
      activar (val) {
        if (val === 1) {
          this.img= '../../../static/img/Imagen_1.png'
          this.active1 = true
          this.active2 = false
          this.active3 = false
          this.active4 = false
          this.active5 = false
        }
        if (val === 2) {
          this.img= '../../../static/img/Imagen_2.png'
          this.active1 = false
          this.active2 = true
          this.active3 = false
          this.active4 = false
          this.active5 = false
        }
        if (val === 3) {
          this.active1 = false
          this.active2 = false
          this.active3 = true
          this.active4 = false
          this.active5 = false
        }
        if (val === 4) {
          this.active1 = false
          this.active2 = false
          this.active3 = false
          this.active4 = true
          this.active5 = false
        }
        if (val === 5) {
          this.active1 = false
          this.active2 = false
          this.active3 = false
          this.active4 = false
          this.active5 = true
        }
      }
    },
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
    display: flex; align-items: center
  }
  .tramos-dash2.active {
    background-color: #E66732;
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
