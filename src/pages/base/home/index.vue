<template>
  <div>
    <first-section />
    <fligths />
    <img-home />
  </div>
</template>

<script>
  import ImgHome from '@c/ImgHome'
  import Fligths from './flights'
  import FirstSection from './firstsection'
  export default {
    data: () => ({
      length: 3,
      window: 0,
      show: true,
      isVisible: true
    }),
    mounted () {
    },
    methods: {
      // visibilityChanged (isVisible, entry) {
      //   this.isVisible = isVisible
      //   console.log(entry)
      // }
    },
    components: {
      Fligths: Fligths,
      ImgHome: ImgHome,
      FirstSection: FirstSection
    }
  }
</script>



