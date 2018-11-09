<template>
  <div>
    <v-card-text>
      <v-container fluid grid-list-lg class="pt-0 pb-0">
        <v-layout row wrap fill-height>
          <v-flex xs12>
            <manifiestos />
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>

  </div>
</template>

<script>
  import Manifiestos from './Manifiestos'

  export default {
    components: {
      Manifiestos: Manifiestos
    }
  }
</script>
