<template>
  <v-flex class="justify-center" v-if="countdown > 12">
     
      <vue-circle
        :progress="countdown"
        :size="50"
        :reverse="true"
        line-cap="round"
        :fill="fill"
        empty-fill="rgba(0, 0, 0, .1)"
        :animation-start-value="0.0"
        :start-angle="0"
        insert-mode="append"
        :thickness="3"
        :show-percent="false"
       >
        <p class="text-circle-progress">{{countdown}} hrs</p>
         
      </vue-circle>
       <p class="text-circle-progress"> Para su check-in</p>
  </v-flex>
</template>

<script>
  import moment from 'moment'
  import VueCircle from 'vue2-circle-progress'

  export default {
    props: ['deadline'],
    components: {
      VueCircle
    },
    data: () => ({
      moment: moment,
      currentTime: '',
      countdown: '',
      finalDate: '',
      fill : { gradient: ["#1466C0", "#ff9801", "#fbead2"] },
    }),
    methods: {
      updateCurrentTime () {
        this.currentTime = moment()
        this.updateCountdown()
      },
      updateCountdown () {
        var a = moment(this.finalDate)
        var b = moment(this.currentTime)
        this.countdown = a.diff(b, 'hours')
      },
    },
    mounted () {
      this.currentTime = moment()
      this.finalDate = this.deadline
      this.finalDate = moment(this.finalDate, 'DD/MM/YYYY hh:mm')
      // setInterval(() => this.updateCountdown(), 1 * 1000)
      this.updateCountdown()
      setInterval(() => this.updateCurrentTime(), 60 * 1000)
    }
  }
</script>

<style lang="stylus">

   .text-circle-progress 
    margin-bottom: 0px
    margin-top: 0px
    font-size: 11px

</style>
