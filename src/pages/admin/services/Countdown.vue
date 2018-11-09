<template>
  <v-flex class="justify-center" v-if="countdown > 12">
      <p>{{countdown}} H. para tu viaje</p>
  </v-flex>
</template>

<script>
  import moment from 'moment'
  export default {
    props: ['deadline'],
    data: () => ({
      moment: moment,
      currentTime: '',
      countdown: '',
      finalDate: ''
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
      }
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
