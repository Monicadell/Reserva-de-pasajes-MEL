<template>

  <v-container fluid grid-list-lg class="mb-5">
    <v-layout align-start justify-space-around row fill-height>
      <v-flex xs3 >

        <v-card class="elevation-20 card--flex-toolbar img-gradient">
          <v-img class="white--text" height="100px" src="https://images.clarin.com/2017/03/02/r1hq6Rrce_1256x620.jpg">
            <weather lat="-23.65" lon="-70.23" name="Antofagasta"/>
          </v-img>
          <v-img class="white--text" height="100px"
                 src="http://www.mch.cl/wp-content/uploads/sites/4/2017/02/escondida.jpg">
            <weather lat="-23.70" lon="-70.41" name="Minera Escondida" />
          </v-img>
          <v-img class="white--text" height="100px"
                 src="https://i3.visitchile.com/img/GalleryContent/1426/11122-city-tour-santiago-de-chile.jpg">
            <weather lat="-33.47" lon="-70.64" name="Santiago"/>
          </v-img>
        </v-card>

      </v-flex>
      <v-flex xs3 mt-5>
        <v-card class="card--flex-toolbar elevation-10">
          <template v-if="!isAuthorized">
            <menu-selection/>
          </template>
        </v-card>
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

<style lang="stylus" scoped>
  /* 
  .card--flex-toolbar
    margin-top -90px
*/

</style>
