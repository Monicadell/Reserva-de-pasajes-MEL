<template>
  <div>
    <v-date-picker
      :min="moment().format('YYYY-MM-DD')"
      :max="moment().add(maxDays, 'days').format('YYYY-MM-DD')"

      color="primary"
      locale="es-Es"
      v-model="start"
      full-width
      
      :height="100"
      :first-day-of-week="1"
      enabled
      @input="actFecha"
      class=""
    ></v-date-picker>
  </div>
</template>

<script>

  import moment from 'moment'
  import {mapGetters} from 'vuex'


  export default {
    props: ['dato'],
    data: () => ({
      moment: moment,
      firstDayOfweek: 1,
      formattedDateFrom: null,
      formattedDateTo: null,
      allowedFromDates: [],
      allowedToDates: [],
      maxDays: 45,
      fecha: new Date().toISOString().substr(0, 10)
    }),
    mounted () {
      console.log('calendar')
      // if (this.search[this.direction].date) {
      //   let lastDateSearch = moment(this.search[this.direction].date)
      //   let today = moment()
      //   let diff = today.diff(lastDateSearch, 'hours')
      //   if (diff >= 24) {
      //     this.$store.dispatch('Booking/set_date', {search: today.format('YYYY-MM-DD'), direction: this.direction})
      //   }
      // }
      // let i = -1
      // this.allowedFromDates = [...Array(90)].map(() => {
      //   return moment().add(i++, 'd').format('YYYY-MM-DD')
      // })
    },
    computed: {
      ...mapGetters({
        freqStart: ['Calendar/freqStart'],
        // freqEnd: ['Calendar/freqEnd']
      })
    },
    methods: {
      actFecha(value) {
        // const fechaViaje = value
        // console.log(idRuta, fechaViaje)
        console.log(value)
        if(this.dato === 'freqstart'){
          // console.log('soy start de frecuencia')
          this.$store.dispatch('Calendar/set_start', {freqStart: value});  
        }
      }
    }
  }
</script>
