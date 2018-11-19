<template>
  <v-layout  >

     <v-flex  v-if="countdown => 48 && countdown <= 72"> 
      <v-btn outline color="success">Confirmar</v-btn> 
    </v-flex>
    <v-flex v-else> 
      <p> {{countdown}} </p>
    </v-flex  >
   

  </v-layout>
</template>

<script>
  import moment from 'moment'
  import VueCircle from 'vue2-circle-progress'

  export default {
    props: ['deadline','date', 'time'],
    components: {
      VueCircle
    },
    data: () => ({
      moment: moment,
      currentTime: '',
      countdown: '',
      finalDate: '',
      fill : { gradient: ["#1466C0", "#ff9801", "#fbead2"] },
      fecha: ''
    }),
    methods: {
      updateCurrentTime () {
        this.currentTime = moment()
        this.updateCountdown()
      },
      updateCountdown () {
        var a = moment(this.fecha)
        var b = moment(this.currentTime)
      
        this.countdown = a.diff(b, 'hours')
      },
    },
    mounted () {
      this.currentTime = moment()
      const dia = this.date.replace(/-/g ,'/')
      const hora = moment(this.time, ["h:mm A"]).format("HH:mm")
      this.finalDate = `${dia} ${hora}`
     this.fecha  = moment(this.finalDate, 'YYYY/MM/DD hh:mm')

      // setInterval(() => this.updateCountdown(), 1 * 1000)
      this.updateCountdown()
      setInterval(() => this.updateCurrentTime(), 60 * 1000)
    }
  }
</script>

<style lang="stylus">



</style>
