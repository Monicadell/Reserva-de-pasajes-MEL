<template>
  <div>
    <background-image/>
    <home-tool-bar/>

   <main-menu/>


    <fligths/>

    <img-home />
  </div>
</template>

<script>
  import BackgroundImage from '@c/BackgroundImage'
  import HomeToolBar from '@c/HomeToolBar'
  import ImgHome from '@c/ImgHome'
  import MainMenu from './main'
  import Fligths from './flights'

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
      Fligths: Fligths,
      ImgHome: ImgHome
    }
  }
</script>



