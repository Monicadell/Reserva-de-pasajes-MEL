<template>
  <v-container fluid grid-list-lg class="container-fondoblanco">
    <v-layout row fill-height wrap align-start>
      <v-flex xs12 md5 sm7 lg4 xl4 fill-height class="flex-fondoblanco">
        <v-layout row >
          <v-flex xs12 py-0 my-3 mx-3 class="fadeinfwd" >
            <v-card class="card--flex-toolbar elevation-10 transparent">
              <template v-if="!isAuthorized">
                <menu-selection/> 
              </template>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout align-start row >
          <v-flex xs12 mt-1 mx-3 class="fadeinfwd">
            <v-card class="elevation-2 card--flex-toolbar img-gradient ">
              <v-img class="white--text" height="80px"
                    src="http://www.mch.cl/wp-content/uploads/sites/4/2017/02/escondida.jpg">
                <weather lat="-23.70" lon="-70.41" name="Minera Escondida"  />
                
              </v-img>
              <v-img class="white--text" height="80px" src="https://images.clarin.com/2017/03/02/r1hq6Rrce_1256x620.jpg">
                <weather lat="-23.65" lon="-70.23" name="Antofagasta"/>
              </v-img>
              <v-img class="white--text" height="80px"
                    src="https://www.24horas.cl/incoming/article129292.ece/ALTERNATES/w1024h768/Sanhattan%20de%20noche">
                <weather lat="-33.47" lon="-70.64" name="Santiago"/>
              </v-img>
            </v-card>
          </v-flex>
         </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {mapGetters} from 'vuex'
  import MenuSelection from './menuSelection'
  import weather from './currentWeather'

  export default {
    computed: {
      ...mapGetters('Auth', {
        isAuthorized: ['isAuthorized']
      })
    },
    components: {
      MenuSelection: MenuSelection,
      weather: weather
    },
    mounted () {
      if (this.isAuthorized) {
        this.$router.push('/admin')
      }
    },
    watch: {
      isAuthorized (value) {
        if (value) {
          this.$router.push('/admin')
        }
      }
    }
  }
</script>

<style>
  .transparent{
    background-color: transparent
  }
  .container.container-fondoblanco{
    padding:0;
    height: calc(100vh - 88px);
    padding-top:8px;
  }
  .flex-fondoblanco{
    background-color: rgba(255, 255, 255, 0.5);
    filter: brightness(100%);
    min-height: calc(100vh - 40px);
    height: 100%;
  }
</style>
