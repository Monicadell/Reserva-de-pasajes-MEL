<template>
  <v-layout column class="img-fondo" id="img3">

    <img :src="imgbg" class="img-ppal"/>
    <div class="cinta">
      <div>
        <img src="/static/img/Cinta-superior.png" class="img-cinta1">
      </div>
      
      <div class="img-peqe-cinta">
        <a v-on:click="changeimg('uno.jpg', 0)">
          <img src="/static/img/pequena1.png">
        </a>
        <a v-on:click="changeimg('dos.jpg', 1)">
          <img src="/static/img/pequena2.png">
        </a>
        <a v-on:click="changeimg('tres.jpg', 2)">
          <img src="/static/img/pequena3.png">
        </a>
        <a v-on:click="changeimg('cuatro.jpg', 3)">
          <img src="/static/img/pequena4.png">
        </a>
        <a v-on:click="changeimg('cinco.jpg', 4)">
          <img src="/static/img/pequena5.png">
        </a>
      </div>
      <img src="/static/img/Cinta-inferior.png" class="img-cinta2">
    </div>
    
  </v-layout>
</template>

<script>
  export default {
     data () {
      return {
        imgbg: '/static/img/uno.jpg',
        imagenes: ['uno.jpg', 'dos.jpg', 'tres.jpg', 'cuatro.jpg', 'cinco.jpg'],
        imgnumber: 0
      }
    },
    mounted () {
      if (this.isAuthorized) {
        this.$router.push('/admin')
      }
    },
    methods:{
      changeimg(imgname, num){
        this.imgbg = 'static/img/' + imgname
        this.imgnumber = num
      },
      updateImg () {
        if(this.imgnumber === 4){
          this.imgnumber = 0
        }
        else{
          this.imgnumber++
        }
        this.imgbg = '../../static/img/' + this.imagenes[this.imgnumber]
      }
    },
    beforeDestroy() {
      clearInterval(this.refreshInterval);
    },
    mounted () {
      this.updateImg()
      this.refreshInterval = setInterval(() => this.updateImg(), 1000 * 5)
    }
  }
</script>

<style scoped>
  /* img{
    height: 100vh;
    width: 100%;
    z-index: 1;
    object-fit: cover;
  } */
  .img-ppal{
    width: 100%;
    z-index: 1;
    position: relative;
  }
  .cinta{
    position: absolute;
    bottom: 0;
    z-index: 2;
    max-width: 100%;
    /* background: rgba(0, 0, 0, 0.7) */
  }
  .img-cinta1{
    z-index: 2;
    max-width: 100%;
    vertical-align: bottom;
  }
  .img-cinta2{
    z-index: 2;
    max-width: 100%;
    vertical-align: top;
  }
  .img-peqe-cinta{
    /* position: absolute;
    bottom: 20px;
    left: 0; */
    z-index: 3;
    background: rgba(0, 0, 0, 0.7);
    text-align: center;
  }
  .img-peqe-cinta img{
    z-index: 3;
    width: 10%;
    padding-left: 0.5%;
    opacity: 0.6;
    transition: all .4s ease-in-out;
  }
  .img-peqe-cinta img:hover{
    opacity: 1;
    -webkit-transform: scale(1.1);
    -ms-transform: scale(1.1);
    transform: scale(1.1);
  }
  
</style>
