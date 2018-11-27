<template>
<v-layout row wrap >

    <v-flex xs6  >
    <v-autocomplete
      v-model="place"
      :items="locations"
      chips
      clearable
      box
      return-object
      hide-details
      color="primary"
      label="Desde"
      item-text="name"
      item-value="name"
      class="fadeinfwdfast" 
    >
      <template
        slot="selection"
        slot-scope="data"
      >
          <v-avatar >
          <img style="width: 30px; height: 30px;"
               :src="`https://ui-avatars.com/api/?name=${data.item.name}?font-size=0.45&length=2&background=1565c0&color=fff`"/>
        </v-avatar>
        {{ data.item.name }}
      </template>
      <template
        slot="item"
        slot-scope="data"
      >
        <template>
          <v-list-tile-avatar>
            <img
              :src="`https://ui-avatars.com/api/?name=${data.item.name}?font-size=0.45&length=2&background=1565c0&color=fff`">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
          </v-list-tile-content>
        </template>
      </template>
    </v-autocomplete>
    </v-flex>
    <br>
    <!-- SEGUNDO SELECTOR --> 
    <v-flex xs6  >
    <v-autocomplete
      v-model="placeDestiny"
      :items="destLocations"
      no-data-text="No hay destinos disponibles"
      chips
      clearable
      box
      return-object
      hide-details
      color="primary"
      label="Hacia"
      item-text="name"
      item-value="name"
      class="fadeinfwd"
      :disabled="seldestination.status" 
    >
      <template
        slot="selection"
        slot-scope="data"
      >
      <v-avatar>
         <img style="width: 30px; height: 30px;"
               :src="`https://ui-avatars.com/api/?name=${data.item.name.split('→')[1]}?font-size=0.45&length=2&background=1565c0&color=fff`"/>
        </v-avatar>  

        {{ data.item.name.split('→')[1] }}

      </template>
      <template
        slot="item"
        slot-scope="data"
      >
        <template>
          <v-list-tile-avatar>
            <img
              :src="`https://ui-avatars.com/api/?name=${data.item.name.split('→')[1]}?font-size=0.45&length=2&background=1565c0&color=fff`">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="data.item.name.split('→')[1]"></v-list-tile-title>
            <v-list-tile-sub-title v-html="data.item.group"></v-list-tile-sub-title>
          </v-list-tile-content>
        </template>
      </template>
    </v-autocomplete>
    </v-flex>
  
  </v-layout>
</template>

<script>
  import {mapGetters} from 'vuex'
  import axios from 'axios'
  import API from '@pi/app'

  export default {
    props: ['direction'],
    data: () => ({
      locations: [],
      destLocations: [],
      origen: '',
      destino: '',
      seldestination:{
        status: true
      } 
    }),
    computed: {
      ...mapGetters({
      //  search: ['Booking/current']
      }),
      place: {
        get () {
        //  return this.search[this.direction].place
        },
        set (value) {
         // console.log('usuario eligio origen')
          this.findDestinations(value.id) 
          this.seldestination.status = false
        }
      },
      placeDestiny: {
        get () {
        //  return this.search[this.direction].place
        },
        set (value) {
      //  console.log('usuario eligio destino, fijo ruta', value)
        this.locationsId = Object.assign([], this.locations)
        this.$store.dispatch('Booking/set_ruta', {
            ruta: value,
          })   
        }
      }
    },
    mounted: async function () {
      let stations = await API.get('stations')
    //  console.log(stations.status)
      if (stations.status >= 200 && stations.status < 300){
        this.locations = Object.assign([], stations.data.data)
      }
   
    }, 
    
    methods: {
      async findDestinations (id) {
        const destinations = await API.get('trips')
        if (destinations.status >= 200 && destinations.status < 300){
          this.destLocations = destinations.data.data.filter(item=> item.source_id == id)
        }
        console.log(destinations)
      },
    }
  }
</script>
