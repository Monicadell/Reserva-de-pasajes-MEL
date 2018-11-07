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
      :label="direction"
      item-text="name"
      item-value="name"
    >
      <v-fade-transition slot="prepend-inner">
        <v-avatar v-if="place && place.name">
          <img width="30" height="30"
               :src="`https://ui-avatars.com/api/?name=${place.name}?font-size=0.45&length=2&background=ff9800&color=fff`"/>
        </v-avatar>
      </v-fade-transition>


      <template
        slot="selection"
        slot-scope="data"
      >
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
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    props: ['direction'],
    data: () => ({
      locations: [
        {id: 1, name: 'MEL'},
        {id: 2, name: 'Complejo MEL'},
        {id: 3, name: 'La Negra'},
        {id: 4, name: 'Aeropuerto ANF'},
        {id: 5, name: 'Terminal de Buses ANF'},
        {id: 6, name: 'Coloso'}
      ]
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
          this.$store.dispatch('Booking/set_place', {
            search: value,
            direction: this.direction
          })
        }
      }
    }
  }
</script>
