<template>

      <v-container fluid grid-list-lg class="pt-0 pb-0">
        <!-- <v-layout row wrap fill-height>
          <v-flex xs12> -->
            <dashboard />
          <!-- </v-flex>
        </v-layout> -->
      </v-container>

</template>

<script>
  import Dashboard from './Dashboard'

  export default {
    components: {
      Dashboard: Dashboard
    }
  }
</script>
