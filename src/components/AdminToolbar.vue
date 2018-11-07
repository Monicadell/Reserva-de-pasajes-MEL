<template>
  <v-toolbar clipped-left  color="primary" dark app fixed>
    <v-toolbar-title class="ml-0 pl-3">
      <v-toolbar-side-icon @click.stop="changeDrawer"></v-toolbar-side-icon>
      <span class="hidden-sm-and-down">Minera Escondida Limitada</span>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>notifications</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
  export default {
    data: () => ({}),
    methods: {
      changeDrawer () {
        this.$parent.drawer = !this.$parent.drawer
      }
    }
  }
</script>
