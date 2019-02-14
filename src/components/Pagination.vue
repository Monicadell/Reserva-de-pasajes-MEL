<template>
  <v-layout align-center justify-space-around row fill-height>
    <v-flex xs12 sm2>
      <v-select :items="pagination.rowsPerPageItems" v-model="pagination.rowsPerPage"
                label="Items por página" v-on:change="changeRowsPage()"
              item-text="text" item-value="id"
      ></v-select>
    </v-flex>
    <v-flex xs12 sm10 class="text-xs-center justify-center">
      <!-- <div class="text-xs-center"> -->
        <v-pagination
          v-model="pagination.page"
          @input="changePageNumber"
          :length="pagination.total_pages"
          :total-visible="10"
        ></v-pagination>
      <!-- </div> -->
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    props: ['pagination'],
    methods: {
      changePageNumber () {
        let newpage = {'page': this.pagination.page, 'page_size': this.pagination.rowsPerPage}
        this.$emit('change', newpage)
      },
      changeRowsPage () {
        let pagesize = {'page_size': this.pagination.rowsPerPage}
        this.$emit('change', pagesize)
      }
    }
  }
</script>

<style scoped>

</style>
