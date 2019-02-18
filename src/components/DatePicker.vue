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
      :allowed-dates="allowedDates"
    ></v-date-picker>
    </v-card>
  </div>
</template>

<script>
  // <img :src="avatar + auth.name + '?font-size=0.45&length=2&background=F17B31&color=fff'">
  // avatar: 'https://ui-avatars.com/api/?name=',
  import moment from 'moment'
  import {mapGetters} from 'vuex'
  // import axios from 'axios'
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
      colorCalendario: 'lighten5',
      servicios: []
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
      async actFecha (value) {
        // actualizo valor a mostrar en el header
        this.mes = value.split('-')[1]
        this.mesformateado = moment(this.mes, 'MM').format('MMMM')
        this.year = value.split('-')[0]
     //   console.log(`selecciono fecha ${value}`)
      //  const  idRuta = this.ruta.id
        // const fechaViaje = value
      //  console.log(idRuta, fechaViaje)
        this.$store.dispatch('Booking/set_fechaSeleccionada', {
          fechaSeleccionada: value
        })
      },
      async findServices () { // obtener los servicios disponibles para una ruta y dia en especifico
        // const fecha = this.fecha
        const ruta = this.ruta
        const configService = {
          'trip': ruta.id
        }
       // console.log(configService)
        try {
          const services = await API.get('services', configService)
          if (services.status >= 200 && services.status < 300) {
            this.servicios = services.data.data.map(ser => ser.date).filter(date => date >= moment().toISOString())
            if (this.servicios.length === 0) {
              this.$swal({
                customClass: 'modal-info',
                type: 'error',
                timer: 1500,
                title: 'Oops...',
                text: '¡No hay servicios para el tramo seleccionado!',
                animation: true,
                showConfirmButton: false,
                showCloseButton: false
              })
            }
          }
        } catch (e) {
          console.log('catch error al obtener serivicios', e.response)
        }
      },
      allowedDates (val) {
        // console.log(val, this.servicios)
        return this.servicios.indexOf(val) !== -1
      }
    },
    watch: {
      ruta (val) {
        console.log('la ruta cambio', val)
        if (this.ruta.id) {
          this.disableCalendar = false
          this.colorCalendario = 'primary'
          this.findServices()
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
    background: #E66732;
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
  .dateCalendar .v-btn__content {
    font-weight: bold;
  }

</style>
