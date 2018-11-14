<template>
  <div class="cover-height">
    <background-image/>
    <home-tool-bar/>
    <main-menu/>
  </div>
</template>

<script>
  import BackgroundImage from '@c/BackgroundImage'
  import HomeToolBar from '@c/HomeToolBar'
  import MainMenu from '../main'
  export default {
    data: () => ({
      length: 3,
      window: 0
    }),
    mounted () {
    },
    methods: {},
    components: {
      HomeToolBar: HomeToolBar,
      MainMenu: MainMenu,
      BackgroundImage: BackgroundImage,
    }
  }
</script>
<style>
  .cover-height{
    min-height: calc(100vh - 40px);
  }
</style>
