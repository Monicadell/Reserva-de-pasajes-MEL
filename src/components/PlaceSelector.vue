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
      class="fadeinfwd" 
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
      //  search: ['Booking/current']
      }),
      place: {
        get () {
        //  return this.search[this.direction].place
        },
        set (value) {
          console.log('usuario eligio origen')
          this.findDestinies(value.id) 
        }
      },
      placeDestiny: {
        get () {
        //  return this.search[this.direction].place
        },
        set (value) {
        console.log('usuario eligio destino, fijo ruta', value)
        this.locationsId = Object.assign([], this.locations)
        this.$store.dispatch('Booking/set_ruta', {
            ruta: value,
          })   
        }
      }
    },
    mounted: function () {
      axios.get('https://mel-2-backend.gestsol.cl/api/stations')
        .then((response)=>{
          this.locations = Object.assign([], response.data.data)
         })
          .catch((err)=>{
            console.log(err)
          })
    },
    methods: {
      findDestinies (id) {
       // console.log(`aqui busco a donde se puede ir con ${id} `)
        axios.get('https://mel-2-backend.gestsol.cl/api/trips')
      
          .then((response)=>{
            this.destinyLocations = response.data.data.filter((item)=>{
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
