<template>
  <div>
    <!-- <div class="py-3"><h2>Reservas a terceros</h2> </div>
    <div class="text-xs-right pb-3">
        <export-option :fields="excelFields" :data="items" :name="'ReservasTerceros'" :pdf="true"/>
    </div> -->
    <v-layout row wrap>
    <v-flex class="xs12 md6 text-xs-left">
      <h2>Reservas a terceros</h2>
    </v-flex>
    <v-flex xs12 md6 class="text-xs-right">
      <export-option :fields="excelFields" :data="items" :name="'ReservasTerceros'" :pdf="true"/>
    </v-flex>
  </v-layout>
    <div class="elevation-1">
      <v-toolbar flat color="white">
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Buscar"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <div class="text-xs-right">
          <v-btn color="primary" :to="'/service_reserve'"> <v-icon light>add</v-icon> Hacer reserva</v-btn>
        </div>
      </v-toolbar>

      <v-data-table
          :headers="headers"
          :items="ticketsList"
          :search="search"
          hide-actions
          no-data-text="No tiene reservas registradas"
        >
        <template slot="items" slot-scope="props">
          <!-- <td class="" v-if="$route.path === '/misreservasaterceros'">{{ props.item.service.name }}</td> -->
          <td class="">{{ props.item.user.name }}</td>
          <td class="">{{ props.item.service.name }}</td>
          <td class="">{{ props.item.service.date }}</td>
          <td class="">{{ moment(props.item.booked_at).format('DD-MM-YYYY HH:mm') }}</td>
          <!-- <td class="">{{ props.item.checkin_at }}</td> -->
          <td class="">{{ props.item.confirmed_at }}</td>
          <td class="">{{ props.item.seat }}</td>
          <td class="">{{ props.item.status }}</td>

        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
  import API from '@pi/app'
  import moment from 'moment'
  import {mapGetters} from 'vuex'
  import ExportOption from '@c/ExportOption'

  export default {
    data () {
      return {
        search: '',
        loading: true,
        moment: moment,
        headers: [
          // {text: 'Origen', value: 'source_id'},
          {text: 'Usuario', value: 'user.name'},
          {text: 'Servicio', value: 'service.name'},
          {text: 'Fecha del servicio', value: 'service.date'},
          {text: 'Fecha reserva', value: 'booked_at'},
          // {text: 'Fecha checkin', value: 'checkin_at'},
          {text: 'Fecha confirmación', value: 'confirmed_at'},
          {text: 'Asiento', value: 'seat'},
          {text: 'Estado', value: 'status'}
        ],
        ticketsList: [],
        excelFields: {
          User: 'username',
          Servicio: 'servicename',
          FechaServicio: 'servicedate',
          FechaReserva: 'booked_at',
          Fechaconfirmacion: 'confirmed_at',
          Asiento: 'seat',
          Estado: 'status'
        },
        items: []
      }
    },
    components: {
      ExportOption: ExportOption
    },
    computed: {
      ...mapGetters({
        userId: ['Auth/userid']
      })
    },
    mounted () {
      this.getReservas()
    },
    watch: {
      $route (to, from) {
        this.getReservas()
      }
    },
    methods: {
      async getReservas () {
        console.log('user id', this.userId)
        console.log('ruta', this.$route.path)
        let params = {}
        if (this.$route.path === '/misreservasaterceros') {
          console.log('es a terceros')
          params = {'booked_by_id': this.userId}
          try {
            const tickets = await API.get('tickets', params)
            if (tickets.status >= 200 && tickets.status < 300) {
              console.log('reservas a terceros', tickets)
              // setTimeout(() => {
              // this.ticketsList = Object.assign([], tickets.data.data)
              this.ticketsList = tickets.data.data
              this.items = this.ticketsList.map(item => {
                for (const prop in item) {
                  if (item[prop] == null) item[prop] = ''
                }
                return item
              })
              this.items.forEach(element => {
                element.servicename = element.service.name
                element.servicedate = element.service.date
                element.username = element.user.name
                element.booked_at = element.booked_at ? moment(element.booked_at).format('DD-MM-YYYY HH:mm') : ''
                element.confirmed_at = element.confirmed_at ? moment(element.confirmed_at).format('DD-MM-YYYY HH:mm') : ''
              })
              // this.items.forEach(element => { element.servicedate = element.service.date })
              // this.items.forEach(element => { element.username = element.user.name })
              // this.items.forEach(element => { element.booked_at = moment(element.booked_at).format('DD-MM-YYYY HH:mm')})
              // this.items.forEach(element => { element.confirmed_at = element.confirmed_at ? moment(element.confirmed_at).format('DD-MM-YYYY HH:mm') : ''})
              // }, 500)
            } else {
              console.log('Error ', tickets.status)
              this.$swal({
                customClass: 'modal-info',
                type: 'error',
                title: 'Reservas',
                timer: 2000,
                text: 'Ha ocurrido un error al obtener las reservas',
                animation: true,
                showCancelButton: true,
                showConfirmButton: false,
                cancelButtonText: 'OK'
              })
            }
          } catch (e) {
            console.log('Error ', e.response)
            this.$swal({
              customClass: 'modal-info',
              type: 'error',
              title: 'Reservas',
              timer: 2000,
              text: 'Ha ocurrido un error al obtener las reservas',
              animation: true,
              showCancelButton: true,
              showConfirmButton: false,
              cancelButtonText: 'OK'
            })
          }
        } else {
          console.log('reservas propias')
          try {
            const tickets = await API.get('my_tickets', this.userId)
            if (tickets.status >= 200 && tickets.status < 300) {
              console.log('reservas', tickets)
              // setTimeout(() => {
              // this.ticketsList = Object.assign([], tickets.data.data)
              this.ticketsList = tickets.data.data
              this.ticketsList.forEach(element => { element.servicename = element.service.name })
              this.ticketsList.forEach(element => { element.servicedate = element.service.date })
              // }, 500)
            } else {
              console.log('Error ', tickets.status)
              this.$swal({
                customClass: 'modal-info',
                type: 'error',
                title: 'Reservas',
                timer: 2000,
                text: 'Ha ocurrido un error al obtener las reservas',
                animation: true,
                showCancelButton: true,
                showConfirmButton: false,
                cancelButtonText: 'OK'
              })
            }
          } catch (e) {
            console.log('Error ', e.response)
            this.$swal({
              customClass: 'modal-info',
              type: 'error',
              title: 'Reservas',
              timer: 2000,
              text: 'Ha ocurrido un error al obtener las reservas',
              animation: true,
              showCancelButton: true,
              showConfirmButton: false,
              cancelButtonText: 'OK'
            })
          }
        }
      }
    }
  }
</script>
