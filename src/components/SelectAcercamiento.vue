<template>
<v-layout row wrap >

    <v-flex offset-xs2 xs8 pt-2>
      <v-autocomplete
        v-model="model"
        :items="acercamientos"
        :loading="isLoading"
        :search-input.sync="search"
        color="primary"
        hide-no-data
        hide-selected
        item-text="name"
        item-value="name"
        label="Acercamiento"
        placeholder="Ingrese lugar de acercamiento"
        return-object
      ></v-autocomplete>
    </v-flex>
    
  </v-layout>
</template>

<script>
  // import {mapGetters} from 'vuex'
  import API from '@pi/app'

  export default {
    props: ['direction'],
    data: () => ({
      descriptionLimit: 60,
      entries: [],
      isLoading: false,
      model: null,
      search: null,
      acercamientos: []
    }),
    mounted: async function () {
      let stations = await API.get('stations')
    //  console.log(stations.status)
      if (stations.status >= 200 && stations.status < 300) {
        this.acercamientos = Object.assign([], stations.data.data)
      }
    },
    watch: {
      search (val) {
        // console.log('change seach', val)
        this.$emit('eventAcerca', val)
      }
    }
  }
</script>
