<template>
  <div>
    <v-layout row wrap>
      <v-flex class="xs12 md6 text-xs-left">
        <h2>Reservas</h2>
      </v-flex>
      <v-flex xs12 md6 class="text-xs-right">
        <!-- <export-option :fields="excelFields" :data="items" :name="'Reservas'" :pdf="true"/> -->
      </v-flex>
    </v-layout>
    <div class="elevation-1">

      <v-toolbar flat color="white">
        <v-layout wrap pt-3>
          <v-flex xs12 sm4>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Buscar"
              single-line
              hide-details
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm4>
            <v-select
                  :items="filtros" v-model="filtro"
                  label="Filtros" clearable
                  item-text="text" item-value="id"
            ></v-select>
          </v-flex>

          <v-flex xs12 sm4>
            <div class="text-xs-right">
              <v-btn color="primary" :to="'/service_reserve'"> <v-icon light>add</v-icon> Hacer reserva</v-btn>
            </div>        
          </v-flex>
            
        </v-layout>
      </v-toolbar>

      <v-data-table
          :headers="headers"
          :items="ticketsList"
          :search="search"
          :loading="loading"
          :rows-per-page-items="[40, 80, 100]"
          item-key="id"
          no-data-text="No tiene reservas registradas"
        >
        <template slot="items" slot-scope="props">
          <td class="">{{ props.item.user.name }}</td>
          <td class="">{{ props.item.service.name }}</td>
          <td class="">{{ props.item.service.date }}</td>
          <td class="">{{ props.item.booked_at }}</td>
          <!-- <td class="">{{ props.item.checkin_at }}</td> -->
          <td class="">{{ props.item.confirmed_at }}</td>
          <!-- <td class="">{{ props.item.seat }}</td> -->
          <td class="text-capitalize">{{ props.item.status }}</td>

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
          {text: 'user', value: 'user.name'},
          {text: 'Servicio', value: 'service.name'},
          {text: 'Fecha del servicio', value: 'service.date'},
          {text: 'Fecha reserva', value: 'booked_at'},
          // {text: 'Fecha checkin', value: 'checkin_at'},
          {text: 'Fecha confirmación', value: 'confirmed_at'},
          // {text: 'Asiento', value: 'seat'},
          {text: 'Estado', value: 'status'}
        ],
        ticketsList: [],
        excelFields: {
          Servicio: 'servicename',
          FechaServicio: 'servicedate',
          FechaReserva: 'booked_at',
          Fechacheckin: 'checkin_at',
          Fechaconfirmacion: 'confirmed_at',
          Asiento: 'seat',
          Estado: 'status'
        },
        filtro: 3,
        filtros: [
          {text: 'Reservas actuales', id: 1},
          {text: 'Reservas perdidas', id: 2},
          {text: 'Todas mis reservas', id: 3}
        ],
        items: [
          { 'booked_at': '2018-12-14T09:47:21.965088',
            'checkin_at': '',
            'confirmed_at': '',
            'id': 84,
            'seat': '',
            'servicedate': '2018-12-22',
            'servicename': 'Prueba2',
            'status': 'reservado' },
          {
            'booked_at': '2018-12-14T09:47:21.965088',
            'checkin_at': '',
            'confirmed_at': '',
            'id': 84,
            'seat': '',
            'servicedate': '2018-12-22',
            'servicename': 'Prueba2',
            'status': 'reservado'
          }
        ]
      }
    },
    components: {
      ExportOption: ExportOption
    },
    computed: {
      ...mapGetters({
        userId: ['Auth/userid'],
        role: ['Auth/role']
      })
    },
    mounted () {
      if (this.role === 2) {
        this.getReservas()
      } else {
        this.getReservasActivas()
      }
    },
    watch: {
      $route (to, from) {
        this.getReservas()
      },
      filtro (val) {
        if (val === 1) {
          this.getReservasActivas()
        } else {
          this.getReservas()
        }
      }
    },
    methods: {
      async getReservasActivas () {
        try {
          const tickets = await API.get('my_tickets', this.userId)
          if (tickets.status >= 200 && tickets.status < 300) {
            console.log('reservas', tickets)
            setTimeout(() => {
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
                element.booked_at = element.booked_at ? moment(element.booked_at).format('DD-MM-YYYY HH:mm') : ''
                element.confirmed_at = element.confirmed_at ? moment(element.confirmed_at).format('DD-MM-YYYY HH:mm') : ''
              })
              this.loading = false
            }, 500)
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
          console.log('catch err', e.response)
          // this.showModal = true
          // this.modalInfoTitle = 'Ha ocurrido un error'
          // this.modalInfoDetail = 'Ha ocurrido un error al cargar las estaciones, intente más tarde.'
          // this.modalInfoBtn1 = 'OK'
          this.$swal({
            customClass: 'modal-info',
            type: 'error',
            title: 'Error',
            text: 'Ha ocurrido un error al cargar las estaciones, intente más tarde.',
            animation: true,
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonText: 'OK'
          })
        }
      },
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
              console.log('mis reservas a terceros', tickets)
              setTimeout(() => {
                // this.ticketsList = Object.assign([], tickets.data.data)
                this.ticketsList = tickets.data.data
                this.ticketsList.forEach(element => { element.servicename = element.service.name })
                this.ticketsList.forEach(element => { element.servicedate = element.service.date })
                this.loading = false
              }, 500)
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
          params = {'user_id': this.userId}
          try {
            const tickets = await API.get('tickets', params)
            if (tickets.status >= 200 && tickets.status < 300) {
              console.log('reservas', tickets)
              setTimeout(() => {
                // this.ticketsList = Object.assign([], tickets.data.data)
                this.ticketsList = tickets.data.data
                if (this.filtro === 2) {
                  console.log('Filtro perdidos')
                  this.ticketsList = tickets.data.data.filter(tick => (tick.service.hrs_left <= 0 && tick.status === 'confirmado'))
                } else {
                  console.log('toodos filtros')
                }
                this.items = this.ticketsList.map(item => {
                  for (const prop in item) {
                    if (item[prop] == null) item[prop] = ''
                  }
                  return item
                })
                this.items.forEach(element => {
                  element.servicename = element.service.name
                  element.servicedate = element.service.date
                  element.booked_at = element.booked_at ? moment(element.booked_at).format('DD-MM-YYYY HH:mm') : ''
                  element.confirmed_at = element.confirmed_at ? moment(element.confirmed_at).format('DD-MM-YYYY HH:mm') : ''
                })
                this.loading = false
              }, 500)
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
