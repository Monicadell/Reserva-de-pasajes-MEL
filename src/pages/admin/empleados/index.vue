<template>
  <div>
    <v-card-text>
      <v-container fluid grid-list-lg class="pt-0 pb-0">
        <v-layout row wrap fill-height>
          <v-flex xs12>
            <empleados />
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>

  </div>
</template>

<script>
  import Empleados from './Empleados'

  export default {
    components: {
      Empleados: Empleados
    }
  }
</script>
