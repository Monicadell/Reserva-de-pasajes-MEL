<template>
 <div id="bg">
    <img :src="imagen"
         class="kenburns-bottom"
         alt="">

  </div> 




</template>

<script>
  export default {
    props: ['from'],
    data: () => ({
      imagen: '',
      imgnumber: 1,
      refreshInterval: ''
    }),
    methods: {
      updateImg () {
        console.log('update')
        if(this.imgnumber === 5){
          this.imgnumber = 1
        }
        else{
          this.imgnumber++
        }
        this.imagen = '../../static/img/' + this.imgnumber + '.jpg'
      }
    },
    beforeDestroy() {
      clearInterval(this.refreshInterval);
    },
    mounted () {
      this.updateImg()
      this.refreshInterval = setInterval(() => this.updateImg(), 1000 * 10)
    }
  }
</script>

<style lang="stylus" scoped>
  .kenburns-bottom
    -webkit-animation kenburns-bottom 20s ease-out infinite alternate-reverse both
    animation kenburns-bottom 20s ease-out infinite alternate-reverse both

  @-webkit-keyframes kenburns-bottom
    0%
      -webkit-transform: scale(1) translateY(0);
      transform: scale(1) translateY(0);
      -webkit-transform-origin: 50% 84%;
      transform-origin: 50% 84%;
    100%
      -webkit-transform: scale(1.10) translateY(15px);
      transform: scale(1.10) translateY(15px);
      -webkit-transform-origin: bottom;
      transform-origin: bottom;
  @keyframes kenburns-bottom
    0%
      -webkit-transform: scale(1) translateY(0);
      transform: scale(1) translateY(0);
      -webkit-transform-origin: 50% 84%;
      transform-origin: 50% 84%;
    100%
      -webkit-transform: scale(1.10) translateY(15px);
      transform: scale(1.10) translateY(15px);
      -webkit-transform-origin: bottom;
      transform-origin: bottom;
  #bg
    z-index 0
    position fixed
    top -50%
    left -50%
    width 200%
    height 200%

  #bg img
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    margin auto
    min-width 50%
    min-height 50%

  .darkBackground
    background-color black
    position absolute
    top 0
    left 0
    right 0
    bottom 0

  .blur
    background-color black
    filter blur(6px)
    -webkit-filter blur(6px) grayscale(0.8)
    -moz-filter blur(6px) grayscale(0.8)
    -o-filter blur(6px) grayscale(0.8)
    -ms-filter blur(6px) grayscale(0.8)
</style>
