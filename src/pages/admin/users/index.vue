<template>
  <div>
    <v-card-text>
      <v-container fluid grid-list-lg class="pt-0 pb-0">
        <v-layout row wrap fill-height>
          <v-flex xs12>
            <users />
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>

  </div>
</template>

<script>
  import PlaceSelector from '@c/PlaceSelector'
  import ServiceDate from '@c/DatePicker'
  import ServiceList from '../services/List'
  import ServiceSelected from '../services/Selected'
  import Users from './Users'

  export default {
    components: {
      PlaceSelector: PlaceSelector,
      ServiceDate: ServiceDate,
      ServiceList: ServiceList,
      ServiceSelected: ServiceSelected,
      Users: Users
    }
  }
</script>
