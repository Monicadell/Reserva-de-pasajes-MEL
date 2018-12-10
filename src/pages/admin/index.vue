<template>
  <div style="width: 100%;">
    <admin-toolbar @showAdminBar="showAdminBar"/>
    
    <admin-navigation v-if="showAdmin" />
    <!-- <admin-navigation v-if="$vuetify.breakpoint.mdAndUp"/> -->
    <!-- <admin-bottom-navigation v-else/> -->

    <v-content>
      <v-container fluid class="pa-0">
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
      drawer: true,
      showAdmin: false
    }),
    components: {
      AdminToolbar: AdminToolbar,
      AdminNavigation: AdminNavigation,
      AdminBottomNavigation: AdminBottomNavigation
    },
    methods: {
      showAdminBar (val) {
        this.showAdmin = val
      }
    }
  }
</script>
