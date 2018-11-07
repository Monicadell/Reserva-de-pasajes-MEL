<template>
  <div>
    <v-content>
      <router-view/>
    </v-content>

  </div>
</template>

<script>
  import bowser from 'bowser'

  export default {
    mounted () {
      const browser = bowser.getParser(window.navigator.userAgent)
      let data = browser.parsedResult
      console.log(data)
    }
  }
</script>

<style lang="stylus" scoped>

</style>
