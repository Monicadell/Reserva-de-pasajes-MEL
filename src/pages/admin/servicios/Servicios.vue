<template>
  <div>
    <div class="py-3"><h2>Servicios</h2> </div>
    
    <v-dialog v-model="dialog" persistent max-width="900px" style="text-align: right">
      <v-card>
        <v-card-title primary-title>
            <h3 class="headline">Servicio</h3>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
               <v-flex xs12 md6>
                <v-text-field label="Nombre"
                              v-model="editedItem.name"></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
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
                      label="Fecha"
                      readonly
                    ></v-text-field>
                    <v-date-picker
                      v-model="editedItem.date"
                      @change="datepicker = false"
                    ></v-date-picker>
                  </v-menu>
              </v-flex>
            </v-layout>

            <v-layout wrap>
              <v-flex xs12 md6>
                <!-- <v-text-field label="Llegada"
                              v-model="editedItem.arrival"></v-text-field> -->
                <v-menu
                  ref="menu"
                  :close-on-content-click="false"
                  v-model="timepicker"
                  :nudge-right="40"
                  :return-value.sync="editedItem.arrival"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="editedItem.arrival"
                    label="Llegada"
                    prepend-icon="access_time"
                    readonly
                  ></v-text-field>
                  <v-time-picker
                    v-if="timepicker"
                    v-model="editedItem.arrival"
                    full-width
                    @change="$refs.menu.save(editedItem.arrival)"
                  ></v-time-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field label="Salida"
                              v-model="editedItem.departure"></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field label="Set"
                              v-model="editedItem.set"></v-text-field>
              </v-flex>
                            
              <v-flex xs12 md6>
                <!-- <v-select :items="frequencies" v-model="editedItem.trip_id"
                          label="Tramo"
                          single-line item-text="text" item-value="id"
                ></v-select> -->
                 <v-text-field label="Tramo"
                              v-model="editedItem.trip_id"></v-text-field>
              </v-flex>       

              <v-flex xs12 md6>
                <v-select :items="frequencies" v-model="editedItem.freq_id"
                          label="Frecuencia"
                          single-line item-text="text" item-value="id"
                ></v-select>
              </v-flex>            

              <v-flex xs12 sm6>
                <v-select :items="cars" v-model="editedItem.car_id"
                          label="Bus"
                          single-line item-text="text" item-value="id"
                ></v-select>
              </v-flex>

              <v-flex xs12 sm6>
                <v-select :items="drivers" v-model="editedItem.driver_id"
                          label="Conductor"
                          single-line item-text="text" item-value="id"
                ></v-select>
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field label="Asientos disponibles"
                              v-model="editedItem.avail_seats"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" flat @click.native="close()">Cancelar</v-btn>
          <v-btn color="primary" class='white--text' @click.native="save(editedItem)">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
          <v-btn color="primary" @click="dialog = true"> <v-icon light>add</v-icon> Agregar servicio</v-btn>
        </div>
      </v-toolbar>

      <v-data-table
          :headers="headers"
          :items="services"
          :search="search"
          :loading="loading"
           item-key="id"
          hide-actions
        >
        <template slot="items" slot-scope="props">
          <td class="">{{ props.item.name }}</td>
          <td class="">{{ props.item.date }}</td>
          <td class="">{{ props.item.arrival }}</td>
          <!-- <td class="">{{  moment(props.item.arrival).format('HH:mm') }}</td> -->
          <td class="">{{ props.item.departure }}</td>
          <td class="">{{ props.item.set }}</td>
          <td class="">{{ props.item.duration }}</td>
          <td class="">{{ props.item.trip_id }}</td>

          <td class="">{{ props.item.freq_id }}</td>
          <!-- <td class="">{{ props.item.car_id }}</td>
          <td class="">{{ props.item.driver_id }}</td> -->
          <td class="">{{ props.item.avail_seats }}</td>
          <td class="justify-center">
            <v-tooltip top>
              <v-icon
                small
                slot="activator"
                color="primary"
                @click="editItem(props.item)"
              >
                edit
              </v-icon>
              <span>Editar</span>
            </v-tooltip>
          </td>
          <td class="">
            <v-tooltip top>
              <v-icon
                small
                slot="activator"
                color="primary"
                @click="irEliminar(props.item.id)"
              >
                delete
              </v-icon>
              <span>Eliminar</span>
            </v-tooltip>
            <v-dialog v-model="confirmaAnular" persistent max-width="290">
              <v-card>
                <v-card-title class="headline">¿Esta seguro de eliminar el usuario?</v-card-title>
                <v-card-text>Una vez realizada esta acción no podrá recuperar el servicio.</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary darken-1" flat @click="confirmaAnular = false">Volver</v-btn>
                  <v-btn color="red darken-1" flat @click="deleteItem(eliminaid)">Eliminar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </td>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
  import API from '@pi/app'
  import moment from 'moment'
    import axios from 'axios'
  
  export default {
    data () {
      return {
        confirmaAnular: false,
        dialog: false,
        search: '',
        loading: true,
        moment: moment,
        eliminaid: '',
        editedItem: {
          date: new Date().toISOString().substr(0, 10),
        },
        datepicker: false,
        timepicker: false,
        headers: [
          {text: 'Nombre', value: 'name'},
          {text: 'Fecha', value: 'date'},
          {text: 'Llegada', value: 'arrival'},
          {text: 'Salida', value: 'departure'},
          {text: 'Set', value: 'set'},
          {text: 'Duración', value: 'duration'},
          {text: 'Trip', value: 'trip_id'},
          {text: 'Frecuencia', value: 'freq_id'},
          // {text: 'Bus', value: 'car_id'},
          // {text: 'Conductor', value: 'driver_id'},
          {text: 'Asientos disponibles', value: 'avail_seats'},
          {text: '', value: 'edit', sortable: false},
          {text: '', value: 'delete', sortable: false}
        ],
        services: [],
        // services: [
        //   {
        //     date: '2018-10-20 20:00',
        //     freq_id: 'Frec 1',
        //     car_id: 'Bus 1',
        //     driver_id: 'Juan Perez',
        //     avail_seats: 10
        //   },
        //   {
        //     date: '2018-10-18 14:00',
        //     freq_id: 'Frec 2',
        //     car_id: 'Bus 3',
        //     driver_id: 'Martin Rojas',
        //     avail_seats: 5
        //   },
        //   {
        //     date: '2018-12-18 04:00',
        //     freq_id: 'Frec 4',
        //     car_id: 'Auto1',
        //     driver_id: 'Jorge Avila',
        //     avail_seats: 0
        //   }
        // ],
        drivers: [
          {text: 'Martin Rihdas', id: '1'},
          {text: 'Pepe Rodriguez', id: '2'}
        ],
        cars: [
          {text: 'bus 1', id: '1'},
          {text: 'Sprinter 3', id: '2'}
        ],
        frequencies: [
          {text: 'FREC 1', id: '1'},
          {text: 'FREC 2', id: '2'},
          {text: 'FREC 3', id: '3'}
        ]
      }
    },
    mounted () {
      this.getServices()
    },
    computed: {
      computedDateFormattedMomentjs () {
        return this.editedItem.date ? moment(this.editedItem.date).format('DD/MM/YYYY') : ''
      }
    },
    methods: {
      irEliminar (datoid) {
        this.eliminaid = datoid
        this.confirmaAnular = true
      },
      async getServices () {
        console.log('get services')
        let servicios = await API.get('services')
        if (servicios.status >= 200 && servicios.status < 300) {
          console.log(servicios)
          setTimeout(() => {
            this.services = servicios.data.data
            this.loading = false
            }, 500)
        }
      },
      editItem (item) {
        this.editedItem = item
        this.dialog = true
      },
      async deleteItem (item) {
        console.log('voy a eliminar', item)
        let eliminando = await API.delete('services', item)
        if (eliminando.status >= 200 && eliminando.status < 300) {
          console.log('ya hizo DELETE',eliminando)
          this.confirmaAnular = false
          console.log(eliminando)
          this.getServices()   
        }
      },
      close () {
        this.dialog = false
        this.editedItem = {}
      },
      async save (guardar) {
        console.log('a guardar', guardar)
      
        let ser = {
             "service": 
                {
                    "arrival": guardar.arrival ? guardar.arrival : '',
                    "avail_seats": guardar.avail_seats ? guardar.avail_seats : '',
                    "date": guardar.date ? guardar.date : '',
                    "departure": guardar.departure ? guardar.departure : '',
                    "name": guardar.name ? guardar.name : '',
                    "set": guardar.set ? guardar.set : '',
                    "trip_id": guardar.trip_id ? guardar.trip_id : ''
                }
        }
        
        console.log('ser a post',ser)
        if(guardar.id){
          let id = guardar.id
          // console.log('voy a PUT, ser', id)
          let servicios = await API.put('services', id, ser )
          if (servicios.status >= 200 && servicios.status < 300) {
            // console.log('ya hizo PUT',servicios)
              this.services = servicios.data.data
              this.dialog = false
            
          }
        }
        else{
          console.log('voy a POST', ser)
	        let ser = {
	             "service": 
	                {
	                    "arrival": guardar.arrival ? guardar.arrival : '',
	                    "avail_seats": guardar.avail_seats ? guardar.avail_seats : '',
	                    "date": guardar.date ? guardar.date : '2018-11-15',
	                    "departure": "16:30:00.000000",
	                    "name": guardar.name ? guardar.name : '',
	                    "set": guardar.set ? guardar.set : '',
	                    "trip_id":  guardar.trip_id ? guardar.trip_id : ''
	                }
	        }
	        
	        console.log('ser a post',ser)
	        let servicios = await API.post('services', ser)
	        if (servicios.status >= 200 && servicios.status < 300) {
            console.log(servicios)
             this.getServices()
              this.services = servicios.data.data
              this.dialog = false
	        }
        }
       
      }
      //   let auth = this.$store.getters.getAuth
      //   let config = {
      //     method: 'POST',
      //     url: endPoints.createUser,
      //     params: {
      //       rut: auth.user,
      //       ncontrato: auth.agreementNumber
      //     }
      //   }
      //   this.loading = true
      //   Object.assign(config.params, this.editedItem)
      //   axios(config).then((response) => {
      //     this.close()
      //     this.loading = false
      //     this.msgReponse = 'Guardado'
      //     this.showMsg = true
      //     this.loadUserData()
      //   }, (err) => {
      //     this.close()
      //     this.msgReponse = 'Error al guardar'
      //     this.showMsg = true
      //     this.loading = false
      //     console.warn(err)
      //   })
      // }
    }
  }
</script>