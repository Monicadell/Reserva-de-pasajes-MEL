<template>
  <div>
    <v-card-text>
      <v-container fluid grid-list-lg class="pt-0 pb-0" style="overflow: scroll">
        <v-layout row wrap fill-height>
          <v-flex xs12>
            <servicios />
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>

  </div>
</template>

<script>
  import Servicios from './Servicios'

  export default {
    components: {
      Servicios: Servicios
    }
  }
</script>
