<template>
  <!-- <div> -->
    <v-card-text>
      <v-container fluid grid-list-lg class="pt-0 pb-0">
        <v-layout row wrap fill-height>
          <v-flex xs12>
            <solicitudes />
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>

  <!-- </div> -->
</template>

<script>
  import Solicitudes from './Solicitudes'

  export default {
    components: {
      Solicitudes: Solicitudes
    }
  }
</script>
