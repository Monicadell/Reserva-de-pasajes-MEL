<template>
  <v-card :class="{
  'elevation-1': !loading && servicesList.length === 0,
  'elevation-10': servicesList.length > 0,
  //disableList: disableList && servicesList.length === 0
  }"

  >
  
    <v-card-title style="height: 65px">
      Servicios disponibles
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="search"
        label="Filtrar"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      v-model="selected"
      :loading="cargandoPeticion"
      :headers="headers"
      :items="listaServicios"
      
      class="elevation-1 tablacustom"
      item-key="id"
      no-data-text="No hay resultados para la ruta seleccionada"
      :rows-per-page-items="rowsNumber"
    
    >

      <template slot="items" slot-scope="props">
        <tr @click="selectService(props.item, props.expanded = !props.expanded)"
            :class="{'primary white--text': booking && booking.id === props.item.id}">
          <td>{{ props.item.name }}</td>
         
        
          <td class="text-xs-center">{{(props.item.arrival)}}</td>
          
         <!-- <td class="text-xs-center">{{ props.item.departure }}</td> -->
          <td class="text-xs-center">{{ props.item.arrival }}</td>
          <td class="text-xs-center">
            <v-btn block small dark color="primary darken-1"
                   :disabled="booking && booking.id !== props.item.id"
                   @click="resume()">Seleccionar</v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
  import {mapGetters} from 'vuex'
  import axios from 'axios'
  import moment from 'moment'

  export default {
     data () {
       return {
       
        loading: false,
        moment: moment,
       }
     }
     
    ,
    watch: {
      changed () {
        this.searchNewServices()
      }
    },
    mounted () {
     this.searchNewServices()
       this.$store.dispatch('Booking/set_listaServicios', {
            listaServicios: [],

          }) 
    },
    methods: {
      resume (xs) {
        console.log('aqui')
        console.log(xs)
       this.$store.dispatch('Booking/select', {selected: true})
      },
      selectService (service) {
      
      this.$store.dispatch('Booking/set_service', {service: service})
      },
      searchNewServices () {
        this.$store.dispatch('Booking/set_service', {service: {}})
        this.disableList = true
        if (this.search && this.search.from.date && this.search.from.place && this.search.to.place) {
          console.log(this.search)
          this.selected = []
          console.log('search')
          this.servicesList = []
        //  this.loading = true
          this.disableList = false

          axios.get('http://192.168.11.146:4000/api/services?trip_id=1&date=2018-11-13')
          .then((response)=>{
               // handle success
          //  console.log(response.data)
          //  console.log(this.servicesList) 
              setTimeout(() => {
              this.servicesList = Object.assign([], this.services)
            //  this.servicesList = Object.assign([], response.data)
           //   console.log(response.data)
              this.loading = false
            }, 500)
          })
          .catch((err)=>{
            console.log(err)
          })
        }
      },
    },
    computed: {
      ...mapGetters({
        changed: ['Booking/changed'],
        search: ['Booking/current'],
        booking: ['Booking/service'],
        listaServicios: ['Booking/listaServicios'],
        cargandoPeticion: ['Booking/cargandoPeticion']
      }) 
    
    },
    data: () => ({
      rowsNumber: [6],
      disableList: true,
      selected: [],
      loading: false,
      headers: [
        {text: 'Servicio', sortable: false},
        {text: 'Salida', value: 'from'},
        {text: 'Llegada', value: 'to'},
        {text: '', value: 'action'}
      ],
      servicesList: [],
      services: [
        {
          value: false,
          id: 1,
          name: 'Frecuencia 1',
          from: '09:00',
          to: '11:00'
        },
        {
          value: false,
          id: 2,
          name: 'Frecuencia 2',
          from: '09:00',
          to: '11:00'
        },
        {
          value: false,
          id: 3,
          name: 'Frecuencia 3',
          from: '09:00',
          to: '11:00'
        },
        {
          value: false,
          id: 4,
          name: 'Frecuencia 4',
          from: '09:00',
          to: '11:00'
        },
        {
          value: false,
          id: 5,
          name: 'Frecuencia 5',
          from: '09:00',
          to: '11:00'
        },
        {
          value: false,
          id: 6,
          name: 'Frecuencia 6',
          from: '09:00',
          to: '11:00'
        }
      ]
    })
  }
</script>

<style lang="stylus" scoped>
  .disableList
    pointer-events none
    opacity 0.1

 
</style>
