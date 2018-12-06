<template>
  <div >
    <v-card >
      <v-card dark flat>
        <v-card-title   v-bind:class="{ 'custom-header-active' :  !disableCalendar, 'custom-header': disableCalendar }" >
          
          <h3 class="title font-weight-light text-xs-center grow text-capitalize">
            {{mesformateado}} 
          </h3>
          <v-spacer> </v-spacer>
           <v-spacer> </v-spacer>
            <h3 class="title font-weight-light text-xs-center grow">
             {{year}}
          </h3>
      </v-card-title>
    </v-card>

    <v-date-picker
      :min="moment().format('YYYY-MM-DD')"
      :max="moment().add(maxDays, 'days').format('YYYY-MM-DD')"
      :color="colorCalendario"
      locale="es-Es"
      v-model="fecha"
      full-width
      no-title
      :height="100"
      :first-day-of-week="1"
      :readonly="disableCalendar"
      @input="actFecha"
      class="dateCalendar"
    ></v-date-picker>
    </v-card>
  </div>
</template>

<script>
  // <img :src="avatar + auth.name + '?font-size=0.45&length=2&background=F17B31&color=fff'">
  // avatar: 'https://ui-avatars.com/api/?name=',
  import moment from 'moment'
  import {mapGetters} from 'vuex'
  import axios from 'axios'
  import API from '@pi/app'

  export default {
    props: ['direction'],
    data: () => ({
      moment: moment,
      firstDayOfweek: 1,
      formattedDateFrom: null,
      formattedDateTo: null,
      allowedFromDates: [],
      allowedToDates: [],
      maxDays: 45,
     fecha: new Date().toISOString().substr(0, 10),
     mes: '',
     year: '',
     mesformateado: '',
     calendarIsVisible: false,
     disableCalendar: true,
     headerActiveClass: 'custom-header-active',
     headerClass: 'custom-header',
     colorCalendario: 'lighten5'
  
    }),
    mounted () {
    
       moment.locale('es-es')
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
        search: ['Booking/current'],
        ruta: ['Booking/ruta']
      })
    },
    methods: {
      async actFecha(value) {
        // actualizo valor a mostrar en el header
        this.mes = value.split('-')[1]
        this.mesformateado = moment(this.mes, 'MM').format('MMMM')
        this.year = value.split('-')[0]
     //   console.log(`selecciono fecha ${value}`)
      //  const  idRuta = this.ruta.id
        const fechaViaje = value
      //  console.log(idRuta, fechaViaje)
        this.$store.dispatch('Booking/set_fechaSeleccionada', {
          fechaSeleccionada: value,
        })
      }
    },
    watch: {
      ruta() {
       // console.log('la ruta cambio')
       // console.log(this.ruta)
        if(this.ruta.id ) {
          this.disableCalendar = false
          this.colorCalendario = 'primary'
       //   console.log(this.disableCalendar)
        }
      }
    }
  }
</script>

<style>
  .borde-calendario {
    border: solid rgb(228, 225, 225) 2px;
  }

  .borde-calendario-out {
   border: none; 
  }
  .v-date-picker-header__value strong:first-letter{
    text-transform: uppercase;
  }

  .calendario {
    opacity: 0;
  }
  .v-card__title.custom-header-active {
    background: #1565c0;
    /* height: 30px */
    padding: 10px;
        min-height: 40px;
  }

   .v-card__title.custom-header {
    background:rgb(199, 198, 198);
    /* height: 30px */
    padding: 10px;
    min-height: 40px;
  }

</style>
