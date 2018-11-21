<template>
  <div  v-bind:class="[listIsVisible ? 'borde-list-out' : '', 'borde-list']"> 
    <div v-bind:class="[listIsVisible ? 'fadeinfwd' : '', 'list']"> 
    <v-card 
    
   :class="{
    'elevation-1': !cargandoPeticion && listaServicios.length === 0,
    'elevation-10': listaServicios.length > 0,
    //disableList: disableList && servicesList.length === 0 
    }"
    
    class="fadeinfwdfast"
    
    
    >
    
      <v-card-title style="height: 65px" class="barra-servicios">
        Servicios disponibles
        <v-spacer></v-spacer>
        <v-text-field
          append-icon="search"
          label="Filtrar"
          single-line
          hide-details
          dark
          class="mb-4"
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
          <tr :class="{'primary white--text': booking && booking.id === props.item.id}">
            <td>{{ props.item.name }}</td>
            <td >{{ props.item.departure }}</td> 
            <td >{{(props.item.arrival)}}</td>  
            <td class="text-xs-center">
                <v-icon color="primary" size=medium>airline_seat_recline_extra</v-icon>
              {{ props.item.avail_seats }} </td> 
            <v-btn block small dark color="primary darken-1" @click="resume(props.item)">Seleccionar</v-btn>
          </tr>
        </template>
      </v-data-table>
    </v-card>
    </div>
  </div>
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
        listIsVisible: false
       }
     }
     
    ,
    watch: {
      cargandoPeticion () {
       if(this.cargandoPeticion) {
         this.listIsVisible = true
       }
      }
    },
    mounted () {
   //  this.searchNewServices()
       this.$store.dispatch('Booking/set_listaServicios', {
            listaServicios: [],

          }) 
    },
    methods: {
      resume (servicioSeleccionado) {
       // console.log('aqui')
    //  console.log(servicioSeleccionado)
      this.$store.dispatch('Booking/select', {selected: true})
       this.$store.dispatch('Booking/set_servicioSeleccionado', {servicioSeleccionado: servicioSeleccionado})
      },
      selectService (service) {
      
      this.$store.dispatch('Booking/set_service', {service: service})
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
       listIsVisible: false,
      rowsNumber: [6],
      disableList: true,
      selected: [],
      loading: false,
      headers: [
        {text: 'Servicio', sortable: false},
        {text: 'Salida', value: 'from'},
        {text: 'Llegada', value: 'to'},
        {text: 'Nºde Asientos Disponibles', value: 'asientos', sortable: false},
        {text: '', value: 'action' , sortable: false},
        {text: '', value: 'action' , sortable: false},
        {text: '', value: 'action' , sortable: false},
      ],
      //servicesList: [],
     /* services: [
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
      ] */
    })
  }
</script>

<style lang="stylus" scoped>
  .disableList
    pointer-events none
    opacity 0.1


</style>

<style>
  .v-card__title.barra-servicios {
    background: #1565c0;
    color: white;
    font-size: 18px
  }

  .borde-list {
    border: solid rgb(228, 225, 225) 2px;
  }

  .borde-list-out {
    border: none;
  }

  .list {
    opacity: 0;
  }
</style>
