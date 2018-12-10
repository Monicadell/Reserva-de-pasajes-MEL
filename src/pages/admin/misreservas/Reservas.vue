<template>
  <div>
    <div class="py-3"><h2>Reservas</h2> </div>


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
          <td class="">{{ props.item.service.name }}</td>
          <td class="">{{ props.item.service.date }}</td>
          <td class="">{{ moment(props.item.booked_at).format('DD-MM-YYYY HH:mm') }}</td>
          <td class="">{{ props.item.checkin_at }}</td>
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

  export default {
    data () {
      return {
        search: '',
        loading: true,
        moment: moment,
        headers: [
          // {text: 'Origen', value: 'source_id'},
          // {text: 'Destino', value: 'dest_id'},
          {text: 'Servicio', value: 'service.name'},
          {text: 'Fecha del servicio', value: 'service.date'},
          {text: 'Fecha reserva', value: 'booked_at'},
          {text: 'Fecha checkin', value: 'checkin_at'},
          {text: 'Fecha confirmación', value: 'confirmed_at'},
          {text: 'Asiento', value: 'seat'},
          {text: 'Estado', value: 'status'}
        ],
        ticketsList: []
      }
    },
    computed: {
      ...mapGetters({
        userId: ['Auth/userid']
      })
    },
    mounted () {
      this.getReservas()
    },
    methods: {
      async getReservas () {
        console.log('user id', this.userId)
        try {
          const tickets = await API.get('tickets', this.userId)
          if (tickets.status >= 200 && tickets.status < 300) {
            console.log('reservas', tickets)
            // setTimeout(() => {
            this.ticketsList = Object.assign([], tickets.data.data)
            // }, 500)
          } else {
            console.log('Error ', tickets.status)
            // this.showModal = true
            // this.modalInfoTitle = 'Ha ocurrido un error'
            // this.modalInfoDetail = 'Ha ocurrido un error al obtener las reservas.'
            // this.modalInfoBtn1 = 'OK'
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
          // this.showModal = true
          // this.modalInfoTitle = 'Ha ocurrido un error'
          // this.modalInfoDetail = 'Ha ocurrido un error al obtener las reservas.'
          // this.modalInfoBtn1 = 'OK'
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
</script>