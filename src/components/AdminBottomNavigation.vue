<template>
  <v-bottom-nav
    class="fixedToBottom"
    color="orange"
    :height="55"
    :active.sync="bottomNav"
    :value="true"
    fixed
  >
    <v-btn
      dark
      value="reserve"
    >
      <span>Realizar reserva</span>
      <v-icon>history</v-icon>
    </v-btn>

    <v-btn
      dark
      value="favorites"
    >
      <span>Mis reservas</span>
      <v-icon>favorite</v-icon>
    </v-btn>

    <v-btn
      dark
      value="nearby"
    >
      <span>Perfil</span>
      <v-icon>fal fa-user</v-icon>
    </v-btn>
  </v-bottom-nav>
</template>

<style lang="stylus" scoped>
  .fixedToBottom
    bottom 0px
</style>

<script>
  export default {
    data () {
      return {
        bottomNav: 'reserve'
      }
    }
  }
</script>
