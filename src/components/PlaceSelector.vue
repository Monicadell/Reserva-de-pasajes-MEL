<template>
  <div>
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
    >
     


      <template
        slot="selection"
        slot-scope="data"
      >
          <v-avatar >
          <img style="width: 30px; height: 30px;"
               :src="`https://ui-avatars.com/api/?name=${data.item.name}?font-size=0.45&length=2&background=ff9800&color=fff`"/>
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
              :src="`https://ui-avatars.com/api/?name=${data.item.name}?font-size=0.45&length=2&background=ff9800&color=fff`">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
            <v-list-tile-sub-title v-html="data.item.group"></v-list-tile-sub-title>
          </v-list-tile-content>
        </template>
      </template>
    </v-autocomplete>
    <br>
    <!-- SEGUNDO SELECTOR --> 

    <v-autocomplete
      v-model="placeDestiny"
      :items="destinyLocations"
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
    >
     <!-- <v-fade-transition slot="prepend-inner">
        <v-avatar v-if="place && place.name">
          <img width="30" height="30"
               :src="`https://ui-avatars.com/api/?name=${place.name}?font-size=0.45&length=2&background=ff9800&color=fff`"/>
        </v-avatar>
      </v-fade-transition> -->

      <template
        slot="selection"
        slot-scope="data"
      >
      <v-avatar>
         <img style="width: 30px; height: 30px;"
               :src="`https://ui-avatars.com/api/?name=${data.item.name.split('→')[1]}?font-size=0.45&length=2&background=ff9800&color=fff`"/>
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
              :src="`https://ui-avatars.com/api/?name=${data.item.name.split('→')[1]}?font-size=0.45&length=2&background=ff9800&color=fff`">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="data.item.name.split('→')[1]"></v-list-tile-title>
            <v-list-tile-sub-title v-html="data.item.group"></v-list-tile-sub-title>
          </v-list-tile-content>
        </template>
      </template>
    </v-autocomplete>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import axios from 'axios'

  export default {
    props: ['direction'],
    data: () => ({
      locations: [],
      destinyLocations: [],
      origen: '',
      destino: ''
    }),
    computed: {
      ...mapGetters({
        search: ['Booking/current']
      }),
      place: {
        get () {
          return this.search[this.direction].place
        },
        set (value) {
          console.log(value)
        //  console.log(value.id)
          this.findDestinies(value.id) 
        /*  this.$store.dispatch('Booking/set_place', {
            search: value,
            direction: this.direction
          }) */
        }
      },
      placeDestiny: {
        get () {
          return this.search[this.direction].place
        },
        set (value) {
        //  console.log(value.id)
       
          this.locationsId = Object.assign([], this.locations)
        //  console.log(value)
         this.$store.dispatch('Booking/set_ruta', {
            ruta: value,
           
          })   
        }
      }
    },
    mounted: function () {
     
       axios.get('https://mel-2-backend.gestsol.cl/api/stations')
          .then((response)=>{
          // console.log(response.data.data)
  
            this.locations = Object.assign([], response.data.data)
         })
          .catch((err)=>{
            console.log(err)
          })
    },
    methods: {
      findDestinies (id) {
       // console.log(`aqui busco a donde se puede ir con ${id} `)
          const _this = this
        axios.get('https://mel-2-backend.gestsol.cl/api/trips')
      
          .then((response)=>{
  //         console.log(response.data.data)
  
            _this.destinyLocations = response.data.data.filter((item)=>{
              return item.source_id == id
            })
         //  console.log(_this.destinyLocations)
         })
          .catch((err)=>{
            console.log(err)
          })
      }
    }
  }
</script>
