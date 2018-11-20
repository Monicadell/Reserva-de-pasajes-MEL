<template>
  <div>
    <v-card  id="calendario">
      <v-card dark flat>
        <v-card-title class="custom-header" >
          <h3 class="title font-weight-light text-xs-center grow">
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

      color="primary"
      locale="es-Es"
      v-model="fecha"
      full-width
      no-title
      :height="100"
      :first-day-of-week="1"
      enabled
      @input="actFecha"
      class="fadeinfwd"

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
     mesformateado: ''
  
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
      }),
    /*  fecha: {
        get () {
          console.log('aqui')
       //   return this.search[this.direction].date
        },
        set (value) {
          //fecha=  new Date().toISOString().substr(0, 10)
          console.log(' o aqui')
          //console.log(this.ruta)
          const  idRuta = this.ruta.id
          const fechaViaje = value
          console.log(idRuta, fechaViaje)
          axios.get(`https://mel-2-backend.gestsol.cl/api/services?trip=${idRuta}&date=${fechaViaje}`)
          .then((response)=>{
           console.log(response.data.data)
           
          this.$store.dispatch('Booking/set_cargandoPeticion', {
            cargandoPeticion: true
            
          });  
          setTimeout(()=>{
            this.$store.dispatch('Booking/set_cargandoPeticion', {
            cargandoPeticion: false
          });
          this.$store.dispatch('Booking/set_listaServicios', {
            listaServicios: response.data.data,
          }); 


          },2000)
            
         })
          .catch((err)=>{
            console.log(err)
          })
          // console.log(value, this.direction)
        /*  this.$store.dispatch('Booking/set_date', {
            search: value,
            direction: this.direction
          })  
        }
      } */
    },
    methods: {
      actFecha(value) {
        // actualizo valor a mostrar en el header
        this.mes = value.split('-')[1]
        this.mesformateado = moment(this.mes, 'MM').format('MMMM')
        this.year = value.split('-')[0]
        console.log(`selecciono fecha ${value}`)
        const  idRuta = this.ruta.id
        const fechaViaje = value
        console.log(idRuta, fechaViaje)

        axios.get(`https://mel-2-backend.gestsol.cl/api/services?trip=${idRuta}&date=${fechaViaje}`)
          .then((response)=>{
           console.log(response.data.data)
           
          this.$store.dispatch('Booking/set_cargandoPeticion', {
            cargandoPeticion: true
            
          });  
          setTimeout(()=>{
            this.$store.dispatch('Booking/set_cargandoPeticion', {
            cargandoPeticion: false
          });
          this.$store.dispatch('Booking/set_listaServicios', {
            listaServicios: response.data.data,
          }); 


          },2000)
            
         })
          .catch((err)=>{
            console.log(err)
          })

      }
    }
  }
</script>

<style>
  .v-card__title.custom-header {
    background: #1565c0;
    height: 30px
  }
</style>
