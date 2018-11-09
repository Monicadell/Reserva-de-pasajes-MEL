<template>
  <div>
    <v-card-text>
      <v-container fluid grid-list-lg class="pt-0 pb-0">
        <v-layout row wrap fill-height>
          <v-flex xs12>
            <conductores />
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>

  </div>
</template>

<script>
  import Conductores from './Conductores'

  export default {
    components: {
      Conductores: Conductores
    }
  }
</script>
