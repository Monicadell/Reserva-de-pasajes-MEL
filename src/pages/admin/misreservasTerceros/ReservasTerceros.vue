<template>
  <div>
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
        <v-layout row wrap align-space-around>
          <!-- <v-flex xs12 sm3>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Buscar"
              single-line
              hide-details
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm3>
            <v-select v-if="role === 2"
                  :items="filtros" v-model="filtro"
                  label="Filtros" clearable
                  single-line item-text="text" item-value="id"
            ></v-select>
           
          </v-flex>
          <v-flex xs12 sm3 class="align-self-center">
             <div class="fill-height" v-if="filtro === 2">
                <p class="mb-0 fill-height">Hay {{ticketsList.length}} reservas perdidas</p>
            </div>
          </v-flex> -->
          <v-spacer></v-spacer>
          <v-flex xs12 sm3>
            <div class="text-xs-right">
              <v-btn color="primary" :to="'/reservaterceros'"> <v-icon light>add</v-icon> Hacer reserva</v-btn>
            </div>    
          </v-flex>
        </v-layout>    
      </v-toolbar>
      <v-toolbar flat color="white">
        <v-layout row wrap align-space-around>
          <v-flex xs12 sm3>
            <v-select
                  :items="origenes" v-model="origen"
                  label="Origen" clearable
                  single-line item-text="name" item-value="id"
            ></v-select>
          </v-flex>

          <v-flex xs12 sm3>
            <v-select
                  :items="estados" v-model="status"
                  label="Estado" clearable
                  single-line item-text="text" item-value="id"
            ></v-select>
           
          </v-flex>
          <v-flex xs12 sm3 class="align-self-center">
            <v-select
                  :items="services" v-model="service"
                  label="Servicio" clearable
                  single-line item-text="name" item-value="id"
            ></v-select>
          </v-flex>
          <!--v-flex xs12 sm3>
              <v-select
                  :items="users" v-model="user"
                  label="Usuario" clearable
                  single-line item-text="text" item-value="id"
            ></v-select>
          </v-flex>-->
          <v-flex xs12 sm3>
            <!--CAMBIO PARA LA FECHA>-->
          <v-menu
                v-model="datepicker"
                :close-on-content-click="false"
                full-width
                max-width="290"
              >
                <v-text-field
                  slot="activator"
                  :value="computedDateFormattedMomentjs"
                  clearable
                  @click:clear="clearFecha"
                  label="Fecha"
                  readonly
                ></v-text-field>
                <v-date-picker
                  v-model="dateSearch"
                  @change="datepicker = false"
                  @click:clear="clearFecha"
                  locale="es-419"
                ></v-date-picker>
              </v-menu>
              <!--FIN DE CAMBIO PARA LA FECHA>-->
           </v-flex>
        </v-layout>
      </v-toolbar>
      <v-data-table
          :headers="headers"
          :items="ticketsList"
          :search="search"
          hide-actions
          item-key="id"
          no-data-text="No tiene reservas registradas"
        >
        <template slot="items" slot-scope="props">
          <td class="">{{ props.item.user.name }}</td>
          <td class="">{{ props.item.service.name }}</td>
          <td class="">{{ props.item.service.date }}</td>
          <td class="">{{ props.item.booked_at }}</td>
          <td class="">{{ props.item.confirmed_at }}</td>
          <td class="">{{ props.item.seat }}</td>
          <td class="">{{ props.item.status }}</td>
          <td class="">
            <v-btn color="red" v-if="props.item.status != 'anulado' && props.item.service.date >= today" outline class="white--text btn-ticket"  @click="irEliminar(props.item.id)">Anular</v-btn> 
          </td>
        </template>
         <template slot="footer">
          <td :colspan="headers.length" class="text-xs-right">
            <v-container grid-list-xl text-xs-center>
              <pagination :pagination="pagination" @change="getReservas"/>
            </v-container>  
          </td>
        </template>
      </v-data-table>
      <!-- dialogo confirmar eliminar -->
      <v-dialog v-model="confirmaAnular" persistent max-width="450">
        <v-card>
          <v-card-title class="headline primary white--text">¿Esta seguro de eliminar la reserva?</v-card-title>
          <v-card-text>Una vez realizada esta acción no podrá recuperarla.</v-card-text>
          <v-card-actions class="pb-3 px-3">
            
            <v-btn color="primary" outline @click.native="confirmaAnular = false">Volver</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="anularReserva(eliminaid)">Eliminar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </div>
  </div>
</template>

<script>
  import API from '@pi/app'
  import moment from 'moment'
  import {mapGetters} from 'vuex'
  import ExportOption from '@c/ExportOption'
  import Pagination from '@c/Pagination'

  export default {
    data () {
      return {
        search: '',
        datepicker: false,
        dateSearch: '',
        loading: true,
        moment: moment,
        headers: [
          {text: 'Usuario', value: 'user.name'},
          {text: 'Servicio', value: 'service.name'},
          {text: 'Fecha del servicio', value: 'service.date'},
          {text: 'Fecha reserva', value: 'booked_at'},
          {text: 'Fecha confirmación', value: 'confirmed_at'},
          {text: 'Asiento', value: 'seat'},
          {text: 'Estado', value: 'status'},
          {text: '', value: ''}
        ],
        headersServ: [
          {text: 'Servicio', value: 'service_name'},
          {text: 'Fecha servicio', value: 'date'}
        ],
        // filtro: 3,
        // filtros: [
        //   {text: 'Reservas actuales', id: 1},
        //   {text: 'Reservas perdidas', id: 2},
        //   {text: 'Todas mis reservas a terceros', id: 3}
        // ],
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
        pagination: {
          page: 1,
          rowsPerPage: 40, // -1 for All
          // sortBy: '',
          totalItems: 0,
          rowsPerPageItems: [40, 80, 120],
          total_pages: 0
        },
        items: [],
        today: moment().format('YYYY-MM-DD'),
        confirmaAnular: false,
        eliminaid: '',
        users: [],
        services: [],
        estados: [],
        origenes: [],
        origen: '',
        status: '',
        service: '',
        user: ''
      }
    },
    components: {
      ExportOption: ExportOption,
      Pagination
    },
    computed: {
      computedDateFormattedMomentjs () {
        return this.dateSearch ? moment(this.dateSearch).format('DD/MM/YYYY') : ''
      },
      ...mapGetters({
        userId: ['Auth/userid'],
        role: ['Auth/role']
      })
    },
    mounted () {
      console.log('reservas a terceros')
      this.getOrigen()
      this.getReservas()
      this.getServices()
      // this.getUsers()
      // this.getStations()
    },
    watch: {
      $route (to, from) {
        this.getReservas()
      },
      dateSearch () {
        this.loading = true
        this.getReservas()
      },
      // filtro (val) {
      //   this.getReservas()
      // },
      user () {
        this.loading = true
        this.getReservas()
      },
      service () {
        this.loading = true
        this.getReservas()
      },
      origen () {
        this.loading = true
        this.getReservas()
      },
      status () {
        this.loading = true
        this.getReservas()
      }
    },
    methods: {
      clearOrigen () {
        this.loading = true
        this.getReservas()
      },
      clearService () {
        this.loading = true
        this.getReservas()
      },
      clearFecha () {
        // console.log('filtros', this.dateSearch, this.tripSearch, this.busSearch, this.conductorSearch)
        this.dateSearch = ''
        this.loading = true
        this.getReservas()
      },
      async getOrigen () {
        try {
          let trips = await API.get('stations')
          if (trips.status >= 200 && trips.status < 300) {
            // console.log('tramos a', trips.status)
            setTimeout(() => {
              this.origenes = trips.data.data
              console.log('tramos', this.origenes)
            }, 500)
          }
        } catch (e) {
          this.$swal({
            customClass: 'modal-info',
            type: 'error',
            title: 'Error',
            text: 'Ha ocurrido un error al cargar los origenes, intente más tarde.',
            animation: true,
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonText: 'OK'
          })
        }
      },
      async getServices () {
        try {
          let service = await API.get('services')
          if (service.status >= 200 && service.status < 300) {
            console.log('tramos a', service)
            setTimeout(() => {
              this.services = service.data.data
              console.log('servicio', this.tickets)
            }, 500)
          }
        } catch (e) {
          console.log('catch err', e.response)
          this.$swal({
            customClass: 'modal-info',
            type: 'error',
            title: 'Error',
            text: 'Ha ocurrido un error al cargar los servicios, intente más tarde.',
            animation: true,
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonText: 'OK'
          })
        }
      },
      async getReservas () {
        const params = {
          'source_id': this.origen,
          'service_id': this.service,
          'date': this.dateSearch
        }
        console.log('ruta', this.$route.path)
        console.log('es a terceros')
        try {
          const tickets = await API.get('tickets', params)
          if (tickets.status >= 200 && tickets.status < 300) {
            console.log('reservas a terceros', tickets)
            this.tickets = tickets.data.data
            this.ticketsList = this.origen
            console.log('origen', this.origen)
            // if (this.filtro === 2) {
            //   console.log('Filtro perdidos terceros')
            //   this.ticketsList = tickets.data.data.filter(tick => (tick.service.hrs_left <= 0 && tick.status === 'confirmado'))
            // } else if (this.filtro === 1) {
            //   console.log('Filtro activas a terceros')
            //   this.ticketsList = tickets.data.data.filter(tick => (tick.service.hrs_left > 0))
            // } else {
            //   console.log('Filtro todas a terceros')
            //   this.ticketsList = tickets.data.data
            // }
            this.ticketsList = tickets.data.data
            this.items = this.ticketsList.map(item => {
              for (const prop in item) {
                if (item[prop] == null) item[prop] = ''
                if (Number.isInteger(item[prop])) item[prop] = item[prop].toString()
              }
              return item
            })
            this.items.forEach(element => {
              element.servicename = element.service.name || ''
              element.servicedate = element.service.date || ''
              element.username = element.user.name || ''
              element.booked_at = element.booked_at ? moment(element.booked_at).format('DD-MM-YYYY HH:mm') : ''
              element.confirmed_at = element.confirmed_at ? moment(element.confirmed_at).format('DD-MM-YYYY HH:mm') : ''
            })
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
      },
      async deleteItem (item) {
        console.log('voy a eliminar user', item)
        try {
          let eliminando = await API.delete('ticket', item)
          if (eliminando.status >= 200 && eliminando.status < 300) {
            console.log('ya hizo DELETE user', eliminando)
            this.getUsers()
            this.confirmaAnular = false
            this.$swal({
              type: 'success',
              customClass: 'modal-info',
              timer: 2000,
              title: 'Usuario',
              text: 'Usuario eliminado exitosamente!',
              animation: true,
              showConfirmButton: false,
              showCloseButton: false
            })
            console.log(eliminando)
          }
        } catch (e) {
          console.log('catch err', e.response)
          this.editedItem = Object.assign({}, '')
          this.confirmaAnular = false
          this.$swal({
            type: 'error',
            customClass: 'modal-info',
            timer: 2000,
            title: 'Ha ocurrido un error',
            text: 'Ha ocurrido un error eliminando el usuario, intente más tarde.',
            animation: true,
            showConfirmButton: false,
            showCloseButton: false
          })
        }
      },
      irEliminar (ticketid) {
        this.eliminaid = ticketid
        this.confirmaAnular = true
      },
      async anularReserva (ticketid) {
        console.log('Anular reserva', ticketid)
        try {
          let eliminando = await API.deleteNoRest('tickets', ticketid)
          if (eliminando.status >= 200 && eliminando.status < 300) {
            console.log('eliminado exitoso', eliminando)
            this.confirmaAnular = false
            this.$swal({
              type: 'success',
              customClass: 'modal-info',
              timer: 2000,
              title: 'Reserva',
              text: 'Reserva eliminada exitosamente!',
              animation: true,
              showConfirmButton: false,
              showCloseButton: false
            })
          }
        } catch (e) {
          console.log('Error al anular reserva', e)
          this.$swal({
            customClass: 'modal-info',
            type: 'error',
            title: '¡oops!',
            text: 'Ha ocurrido un error por favor intenta de nuevo',
            animation: true,
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonText: 'Cerrar'
          })
        }
      },
      // async getStations () {
      //  try {
      //    const tickets = await API.get('tickets')
      //    if (tickets.status >= 200 && tickets.status < 300) {
      //      console.log('Estados', tickets)
      //     console.log('despues de estados', this.ticketsList)
      //    }
      //  } catch (e) {
      //    console.log('catch err', e.response)
      //    this.$swal({
      //     customClass: 'modal-info',
      //      type: 'error',
      //      title: 'Error',
      //      text: 'Ha ocurrido un error al cargar los estados, intente más tarde.',
      //      animation: true,
      //      showCancelButton: true,
      //      showConfirmButton: false,
      //      cancelButtonText: 'OK'
      //    })
      //  }
      // },
      async save (guardar) {
        if (this.$refs.form.validate()) {
          console.log('a guardar', guardar)
          if (guardar.tipoDocumento === '1') {
            console.log('es rut guarda')
            guardar.documento = guardar.documento.replace(/\./g, '')
          }
          let us = {
            'user':
            {
              'active': guardar.active ? guardar.active : '',
              'address': guardar.address ? guardar.address : '',
              'company_id': guardar.company_id ? guardar.company_id : '',
              'contract_type_id': guardar.contract_type_id ? guardar.contract_type_id : '',
              'email': guardar.email ? guardar.email : '',
              'last_connection': guardar.last_connection ? guardar.last_connection : '',
              'name': guardar.name ? guardar.name : '',
              'passport': guardar.tipoDocumento === '2' ? guardar.documento : '',
              'rut': guardar.tipoDocumento === '1' ? guardar.documento : '',
              'phone_number': guardar.phone_number ? guardar.phone_number : '',
              'role_id': guardar.role_id ? guardar.role_id : '',
              'password': guardar.password ? guardar.password : '',
              'password_confirmation': guardar.password_confirmation ? guardar.password_confirmation : ''
            }
          }
          if (guardar.id) {
            console.log('user a put', us)
            let id = guardar.id
            try {
              let putuser = await API.put('users', id, us)
              if (putuser.status >= 200 && putuser.status < 300) {
                this.getUsers()
                this.dialog = false
                this.$swal({
                  type: 'success',
                  customClass: 'modal-info',
                  timer: 2000,
                  title: 'Usuario',
                  text: 'Usuario actualizado exitosamente!',
                  animation: true,
                  showConfirmButton: false,
                  showCloseButton: false
                })
                this.editedItem = Object.assign({}, '')
              }
            } catch (e) {
              console.log('catch err', e.response)
              this.editedItem = Object.assign({}, '')
              this.dialog = false
              this.$swal({
                type: 'error',
                customClass: 'modal-info',
                timer: 2000,
                title: 'Ha ocurrido un error',
                text: 'Ha ocurrido un error editando el usuario, intente más tarde.',
                animation: true,
                showConfirmButton: false,
                showCloseButton: false
              })
            }
          } else {
            console.log('user a post', us)
            try {
              let postuser = await API.post('users', us)
              if (postuser.status >= 200 && postuser.status < 300) {
                console.log('result post user', postuser)
                this.editedItem = Object.assign({}, '')
                this.getUsers()
                this.dialog = false
                this.$swal({
                  type: 'success',
                  customClass: 'modal-info',
                  timer: 2000,
                  title: 'Usuario',
                  text: 'Usuario creado exitosamente!',
                  animation: true,
                  showConfirmButton: false,
                  showCloseButton: false
                })
              }
            } catch (e) {
              console.log('catch err', e.response)
              this.editedItem = Object.assign({}, '')
              this.dialog = false
              this.$swal({
                type: 'error',
                customClass: 'modal-info',
                title: 'Ha ocurrido un error',
                text: 'Ha ocurrido un error creando el usuario, intente más tarde.',
                animation: true,
                showConfirmButton: false,
                showCloseButton: false
              })
            }
          }
        }
      }
    }
  }
</script>

<style scoped>
  .align-self-center {
    align-self: center;
  }
</style>
