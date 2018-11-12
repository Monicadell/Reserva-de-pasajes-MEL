<template>
  <div>
    <v-date-picker
      :min="moment().format('YYYY-MM-DD')"
      :max="moment().add(maxDays, 'days').format('YYYY-MM-DD')"

      color="primary"
      locale="es-Es"
      v-model="date"
      full-width
      landscape
      :height="100"
      :first-day-of-week="1"
    ></v-date-picker>
  </div>
</template>

<script>
  // <img :src="avatar + auth.name + '?font-size=0.45&length=2&background=F17B31&color=fff'">
  // avatar: 'https://ui-avatars.com/api/?name=',
  import moment from 'moment'
  import {mapGetters} from 'vuex'

  export default {
    props: ['direction'],
    data: () => ({
      moment: moment,
      firstDayOfweek: 1,
      formattedDateFrom: null,
      formattedDateTo: null,
      allowedFromDates: [],
      allowedToDates: [],
      maxDays: 45
    }),
    mounted () {
      if (this.search[this.direction].date) {
        let lastDateSearch = moment(this.search[this.direction].date)
        let today = moment()
        let diff = today.diff(lastDateSearch, 'hours')
        if (diff >= 24) {
          this.$store.dispatch('Booking/set_date', {search: today.format('YYYY-MM-DD'), direction: this.direction})
        }
      }
      let i = -1
      this.allowedFromDates = [...Array(90)].map(() => {
        return moment().add(i++, 'd').format('YYYY-MM-DD')
      })
    },
    computed: {
      ...mapGetters({
        search: ['Booking/current']
      }),
      date: {
        get () {
          console.log('aqui')
          return this.search[this.direction].date
        },
        set (value) {
           console.log(' o aqui')
           console.log(value, this.direction)
          this.$store.dispatch('Booking/set_date', {
            search: value,
            direction: this.direction
          })
        }
      }
    }
  }
</script>
