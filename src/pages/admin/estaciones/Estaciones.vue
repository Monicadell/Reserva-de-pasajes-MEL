<template>
  <div>
    <div class="py-3"><h2>Estaciones</h2> </div>
    
    <v-dialog v-model="dialog" persistent max-width="900px" class="text-xs-right">
      <v-card>
        <v-card-title primary-title class="primary white--text">
            <h3 class="headline">Estación</h3>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6>
                <v-text-field label="Nombre"
                              v-model="editedItem.name"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Dirección"
                              v-model="editedItem.address"></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout wrap>
              <v-flex xs12 sm6>
                <v-text-field label="Latitud" v-model="editedItem.lat"></v-text-field>
              </v-flex>


              <v-flex xs12 sm6>
                <v-text-field label="Longitud" v-model="editedItem.lon"></v-text-field>
              </v-flex>

              <!-- <v-flex xs12 sm6>
                <v-select :items="cities" v-model="editedItem.city_id"
                        label="Ciudad"
                        single-line item-text="name" item-value="id"
                ></v-select>
              </v-flex> -->

              <!-- <v-flex xs12 sm6>
                <v-text-field label="Descripción"
                              v-model="editedItem.desc"></v-text-field>
              </v-flex> -->
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

    <!-- dialogo confirmar eliminar -->
    <v-dialog v-model="confirmaAnular" persistent max-width="450">
      <v-card>
        <v-card-title class="headline primary white--text">¿Esta seguro de eliminar la Estación?</v-card-title>
        <v-card-text>Una vez realizada esta acción no podrá recuperar los datos.</v-card-text>
        <v-card-actions class="pb-3 px-3">
          
          <v-btn color="primary" outline @click.native="confirmaAnular = false">Volver</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="deleteItem(eliminaid)">Eliminar</v-btn>
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
          <v-btn color="primary" @click="dialog = true"> <v-icon light>add</v-icon> Agregar estacion</v-btn>
        </div>
      </v-toolbar>

      <v-data-table
          :headers="headers"
          :items="estaciones"
          :search="search"
          :loading="loading"
          :rows-per-page-items="[40, 80, 100]"
          item-key="id"
          no-data-text="No hay estaciones registradas"
        >
        <template slot="items" slot-scope="props">
          <td class="">{{ props.item.name }}</td>
          <td class="">{{ props.item.address }}</td>
          <td class="">{{ props.item.lat }}</td>
          <td class="">{{ props.item.lon }}</td>
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
          </td>
        </template>
      </v-data-table>
    </div>
    <!-- Modal error-->
    <modal v-if="showModal"
        @close="showModal = false"
        v-bind:btn1="modalInfoBtn1">
        <p slot="title" class="headline mb-0">{{modalInfoTitle}}</p>
        <h3 slot="body">{{modalInfoDetail}}</h3>
    </modal>
  </div>
</template>

<script>
  import API from '@pi/app'
  import Modal from '@c/Modal'

  export default {
    data () {
      return {
        confirmaAnular: false,
        dialog: false,
        search: '',
        loading: true,
        showModal: false,
        modalInfoTitle: '',
        modalInfoDetail: '',
        modalInfoBtn1: '',
        editedItem: {
          name: '',
          address: '',
          lat: '',
          lon: '',
          city_id: '',
          desc: ''
        },
        headers: [
          {text: 'Nombre', value: 'name'},
          {text: 'Dirección', value: 'address'},
          {text: 'Latitud', value: 'lat'},
          {text: 'Longitud', value: 'lon'},
          {text: '', value: 'edit', sortable: false},
          {text: '', value: 'delete', sortable: false}
        ],
        estaciones: [],
        cities: []
      }
    },
    components: {
      modal: Modal
    },
    mounted () {
      this.getStations()
      this.getCities()
    },
    methods: {
      async getStations () {
        try {
          let stations = await API.get('stations')
          if (stations.status >= 200 && stations.status < 300) {
            console.log(stations)
            setTimeout(() => {
              this.estaciones = stations.data.data
              this.loading = false
            }, 500)
          }
        } catch (e) {
          console.log('catch err', e.response)
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
      editItem (item) {
        console.log('item edit', item)
        this.editedItem = item
        this.dialog = true
      },
      irEliminar (datoid) {
        this.eliminaid = datoid
        this.confirmaAnular = true
      },
      async deleteItem (item) {
        try {
          let eliminando = await API.delete('stations', item)
          if (eliminando.status >= 200 && eliminando.status < 300) {
            console.log('ya hizo DELETE', eliminando)
            this.confirmaAnular = false
            console.log(eliminando)
            this.getStations()
            this.$swal({
              customClass: 'modal-info',
              type: 'success',
              title: 'Estación',
              timer: 2000,
              text: 'Estación eliminada exitosamente',
              animation: true,
              showCancelButton: true,
              showConfirmButton: false,
              cancelButtonText: 'OK'
            })
          }
        } catch (e) {
          console.log('catch err', e.response)
          this.editedItem = Object.assign({}, '')
          // alert('Ha ocurrido un error, intente más tarde!')
          this.confirmaAnular = false
          // alert('Ha ocurrido un error al eliminar')
          this.$swal({
            customClass: 'modal-info',
            type: 'error',
            title: 'Ha ocurrido un error al eliminar la estación',
            text: e.response.data.error,
            animation: true,
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonText: 'Cerrar'
          })
        }
      },
      close () {
        this.dialog = false
        this.editedItem = {}
        // setTimeout(() => {
        //   this.editedItem = Object.assign({}, this.defaultItem)
        //   this.editedIndex = -1
        // }, 300)
      },
      async getCities () {
        let cit = await API.get('cities')
        if (cit.status >= 200 && cit.status < 300) {
          this.cities = cit.data.data
        }
      },
      async save (guardar) {
        console.log('a guardar', guardar)
        let esta = {
          'station':
          {
            'name': guardar.name ? guardar.name : '',
            'address': guardar.address ? guardar.address : '',
            'lat': guardar.lat ? guardar.lat : '',
            'lon': guardar.lon ? guardar.lon : ''
            // 'description': guardar.desc ? guardar.desc : '',
            // 'city_id': guardar.city_id ? guardar.city_id : ''
          }
        }
        if (guardar.id) {
          console.log('ser a put', esta)
          let id = guardar.id
          try {
            let station = await API.put('stations', id, esta)
            if (station.status >= 200 && station.status < 300) {
              // console.log('ya hizo PUT', station)
              this.getStations()
              this.dialog = false
              this.$swal({
                customClass: 'modal-info',
                type: 'success',
                title: 'Estación',
                // timer: 2000,
                text: 'Estación actualizada exitosamente',
                animation: true,
                showCancelButton: true,
                showConfirmButton: false,
                cancelButtonText: 'OK'
              })
              this.editedItem = Object.assign({}, '')
            } else {
              // alert('Ha ocurrido un error al editar la estación')
              this.$swal({
                customClass: 'modal-info',
                type: 'error',
                title: 'Error',
                text: 'Ha ocurrido un error al editar la estación.',
                animation: true,
                showCancelButton: true,
                showConfirmButton: false,
                cancelButtonText: 'Cerrar'
              })
            }
          } catch (e) {
            console.log('catch error al editar la estación', e.response)
            // this.showModal = true
            // this.modalInfoTitle = 'Ha ocurrido un error'
            // this.modalInfoDetail = 'Ha ocurrido un error al editar la estación, intente más tarde.'
            // this.modalInfoBtn1 = 'OK'
            this.$swal({
              customClass: 'modal-info',
              type: 'error',
              title: 'Error',
              text: 'Ha ocurrido un error al editar la estación.',
              animation: true,
              showCancelButton: true,
              showConfirmButton: false,
              cancelButtonText: 'Cerrar'
            })
          }
        } else {
          console.log('ser a post', esta)
          try {
            let station = await API.post('stations', esta)
            if (station.status >= 200 && station.status < 300) {
              console.log(station)
              this.getStations()
              this.dialog = false
              this.$swal({
                customClass: 'modal-info',
                type: 'success',
                title: 'Estación',
                timer: 2000,
                text: 'Estación creada exitosamente',
                animation: true,
                showCancelButton: true,
                showConfirmButton: false,
                cancelButtonText: 'OK'
              })
              this.editedItem = Object.assign({}, '')
            } else {
              alert('Ha ocurrido un error al crear la estación')
            }
          } catch (e) {
            console.log('catch error al crear estación', e.response)
            // this.showModal = true
            // this.modalInfoTitle = 'Ha ocurrido un error'
            // this.modalInfoDetail = 'Ha ocurrido un error al crear la estación, intente más tarde.'
            // this.modalInfoBtn1 = 'OK'
            this.$swal({
              customClass: 'modal-info',
              type: 'error',
              title: 'Ha ocurrido un error al crear la estación.',
              text: e.response.data.error,
              animation: true,
              showCancelButton: true,
              showConfirmButton: false,
              cancelButtonText: 'Cerrar'
            })
          }
        }
      }
    }
  }
</script>

<style>
  .swal2-popup.modal-info {
    font-family: Helvetica, sans-serif;
  }
  .swal2-popup.swal2-modal.modal-info{
    border-radius: 0;
  }
  .swal2-popup.modal-info .swal2-styled.swal2-confirm {
    border: 1px solid #1565c0;
    border-radius: 0;
    background: transparent;
    background-color: transparent;
    color: #1565c0;
    font-size: 1.0625em;
    outline: none;
  }
  .swal2-popup.modal-info .swal2-styled.swal2-cancel:focus,
  .swal2-popup.modal-info .swal2-styled.swal2-confirm:focus {
    box-shadow: none;
  }
  .swal2-popup.modal-info .swal2-styled.swal2-cancel {
    border-radius: 0;
    border: none;
    background-color: #1565c0;
    outline: none;
  }
  .swal2-popup.modal-info .swal2-styled.swal2-confirm:hover {
    border: 1px solid #1565c0;
    border-radius: 0;
    background: transparent;
    background-color: rgba(21, 101, 192, 0.12);
    color: #1565c0;
    font-size: 1.0625em;
  }
</style>
