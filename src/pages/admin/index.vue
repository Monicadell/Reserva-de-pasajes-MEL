<template>
  <div>
    <admin-toolbar/>

    <!-- <admin-navigation v-if="$vuetify.breakpoint.mdAndUp"/>
    <admin-bottom-navigation v-else/> -->

    <v-content>
      <v-container fluid fill-height class="pa-0">
        <v-layout justify-center align-center>
          <router-view/>
        </v-layout>
      </v-container>
    </v-content>


  </div>
</template>

<script>
  import AdminToolbar from '@c/AdminToolbar'
  import AdminNavigation from '@c/AdminNavigation'
  import AdminBottomNavigation from '@c/AdminBottomNavigation'

  export default {
    data: () => ({
      drawer: true
    }),
    components: {
      AdminToolbar: AdminToolbar,
      AdminNavigation: AdminNavigation,
      AdminBottomNavigation: AdminBottomNavigation
    }
  }
</script>
