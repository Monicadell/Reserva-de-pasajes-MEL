<template>
<v-layout row wrap >

    <v-flex xs6 >
    <v-autocomplete
      v-model="place"
      :items="locations"
      chips
      box
      return-object
      hide-details
      label="Origen"
      item-text="name"
      item-value="name"
      class="fadeinfwdfast mr-2 selector-azul white--text" 
      
    >
      <template
        slot="selection"
        slot-scope="data"
        class="white--text"
      >
        <v-avatar >
          <img style="width: 30px; height: 30px;"
               :src="`https://ui-avatars.com/api/?name=${data.item.name}?font-size=0.45&length=2&background=fff&color=1565c0`"/>
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
      box
      return-object
      hide-details
      color="primary"
      label="Destino"
      item-text="name"
      item-value="name"
      class="fadeinfwd selector-azul"
      :disabled="seldestination.status" 
    >
      <template
        slot="selection"
        slot-scope="data"
      >
      <v-avatar class ="ma-0 pa-0">
         <img style="width: 30px; height: 30px;"
               :src="`https://ui-avatars.com/api/?name=${data.item.name.split('→')[1]}?font-size=0.45&length=2&background=fff&color=1565c0`"/>
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
  import API from '@pi/app'

  export default {
    props: ['direction'],
    data: () => ({
      locations: [],
      destLocations: [],
    //  origen: '',
      destino: '',
      seldestination: {
        status: true
      }
    }),
    computed: {
      ...mapGetters({
        e1_prev: ['Booking/e1_prev']
      }),
      place: {
        get () {
        //  return this.search[this.direction].place
        },
        set (value) {
          this.findDestinations(value.id)
          this.seldestination.status = false
        }
      },
      placeDestiny: {
        get () {
          return this.ruta
        },
        set (value) {
      //  console.log('usuario eligio destino, fijo ruta', value)
          this.locationsId = Object.assign([], this.locations)
          this.$store.dispatch('Booking/set_ruta', {
            ruta: value
          })
        }
      }
    },
    mounted: async function () {
      let stations = await API.get('stations')
    //  console.log(stations.status)
      if (stations.status >= 200 && stations.status < 300) {
        this.locations = Object.assign([], stations.data.data)
        this.$store.dispatch('Booking/set_origen', {
            origen: stations.data.data,
          })   
      }
    },
    methods: {
      async findDestinations (id) {
        console.log(`preguntare por id ${id}`)
        const destinations = await API.get('trips')
        console.log(destinations)
        if (destinations.status >= 200 && destinations.status < 300) {
          console.log('actualizo valor de los destinos')
          this.destLocations = destinations.data.data.filter(item => item.source_id === id)
        }
      //  console.log(this.destLocations)
      }
    }
  }
</script>

<style>
  #principal-container .selector-azul{
    background-color: #1565c0;
    color: #fff !important;
  }
  #principal-container .selector-azul.v-text-field.v-text-field--box.v-text-field--enclosed.v-select.v-select--chips.v-autocomplete.v-input--hide-details.v-input--is-disabled.theme--light{
    background-color: #ccc;
  }
  #principal-container .selector-azul .theme--light.v-text-field--box.v-input__slot {
    color: #fff;
  }
  #principal-container .selector-azul .theme--light.v-icon {
    color: rgba(255,255,255,.54);
  }
  #principal-container .selector-azul .v-select__selections .theme--light.v-icon.v-icon--disabled{
    color: #fff !important;
  }
  .selector-azul .theme--light.v-input--is-disabled .v-label{
    color: rgba(255,255,255,.87);
  }

  #principal-container .selector-azul .v-select__slot .v-select__selections {
    color: rgba(255,255,255,.87) !important;
  }
  #principal-container .selector-azul .theme--light.v-label.v-label--active {
      color: rgba(255,255,255,.94) !important;
  }
  #principal-container .selector-azul .theme--light.v-label {
      color: rgba(255,255,255,.84);
  }
  #principal-container .selector-azul .v-text-field.v-label--active {
    color: #fff;
  }
</style>
