<template>
  <div>
    <div class="py-3"><h2>Tramos</h2> </div>
    
    <v-dialog v-model="dialog" persistent max-width="900px" class="text-xs-right">
      <v-card>
        <v-card-title primary-title class="primary white--text">
            <h3 class="headline">Tramo</h3>
        </v-card-title>
        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 md6>
                  <v-text-field label="Nombre"
                                v-model="editedItem.name"
                                :rules="[rules.required]" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-switch
                    class="justify-center"
                    label="Público"
                    v-model="editedItem.public"
                  ></v-switch>
                </v-flex>
              </v-layout>
              <v-layout wrap>
                <v-flex xs12 md6>
                  <v-select :items="stations" v-model="editedItem.source_id"
                            label="Estación de inicio"
                            single-line item-text="name" item-value="id"
                            :rules="[rules.required]" required
                  ></v-select>
                </v-flex>
                <v-flex xs12 md6>
                  <v-select :items="stations" v-model="editedItem.dest_id"
                            label="Estación de destino"
                            single-line item-text="name" item-value="id"
                            :rules="[rules.required]" required
                  ></v-select>
                </v-flex>
                
                <v-flex xs12 md6>
                  <v-text-field v-model="editedItem.duration" :mask="maskNum" label="Duración (minutos)" ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-switch
                    class="justify-center"
                    label="Incluye vuelo"
                    v-model="editedItem.vuelo"
                  ></v-switch>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
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
        <v-card-title class="headline primary white--text">¿Esta seguro de eliminar el tramo?</v-card-title>
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
          <v-btn color="primary" @click="dialog = true"> <v-icon light>add</v-icon> Agregar tramo</v-btn>
        </div>
      </v-toolbar>

      <v-data-table
          :headers="headers"
          :items="recorridos"
          :search="search"
          :loading="loading"
          :rows-per-page-items="[40, 80, 100]"
          item-key="id"
          no-data-text="No hay tramos registrados"
        >
        <template slot="items" slot-scope="props">
          <td class="">{{ props.item.name }}</td>
          <td class="">
            <!-- {{ props.item.duration }} -->
            <input
              :value="convertMinsToHrsMins(props.item.duration)"
              readonly style="border-width: 0"
            >
          </td>
          <td class="">{{ props.item.source_name }}</td>
          <td class="">{{ props.item.dest_name }}</td>
          <td class="">
            <span v-if="props.item.public">Activo</span>
            <span v-else>Inactivo</span>
          </td>
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
  import moment from 'moment'
  import Modal from '@c/Modal'

  export default {
    data () {
      return {
        confirmaAnular: false,
        dialog: false,
        search: '',
        trips: [],
        loading: true,
        moment: moment,
        showModal: false,
        modalInfoTitle: '',
        modalInfoDetail: '',
        modalInfoBtn1: '',
        editedItem: {
          name: '',
          public: ''
        },
        headers: [
          {text: 'Nombre', value: 'name'},
          {text: 'Duración (horas)', value: 'duration'},
          {text: 'Origen', value: 'source_name'},
          {text: 'Destino', value: 'dest_dest'},
          {text: 'Público', value: 'public'},
          {text: '', value: 'edit', sortable: false},
          {text: '', value: 'delete', sortable: false}
        ],
        recorridos: [],
        stations: [],
        maskNum: '################',
        valid: true,
        rules: {
          required: v => !!v || 'Campo requerido'
        }
      }
    },
    mounted () {
      this.getTrips()
      this.getStations()
    },
    components: {
      modal: Modal
    },
    methods: {
      convertMinsToHrsMins (mins) {
        let h = Math.floor(mins / 60)
        let m = mins % 60
        h = h < 10 ? '0' + h : h
        m = m < 10 ? '0' + m : m
        return `${h}:${m}`
      },
      async getTrips () {
        let trips = await API.get('trips')
        if (trips.status >= 200 && trips.status < 300) {
          setTimeout(() => {
            console.log('trips', trips.data.data)
            this.recorridos = trips.data.data
            this.loading = false
          }, 500)
        }
      },
      async getStations () {
        let estaciones = await API.get('stations')
        if (estaciones.status >= 200 && estaciones.status < 300) {
          console.log(estaciones)
          this.stations = estaciones.data.data
        }
      },
      irEliminar (datoid) {
        this.eliminaid = datoid
        this.confirmaAnular = true
      },
      async deleteItem (item) {
        try {
          let eliminando = await API.delete('trips', item)
          if (eliminando.status >= 200 && eliminando.status < 300) {
            console.log('ya hizo DELETE', eliminando)
            this.confirmaAnular = false
            console.log(eliminando)
            this.$swal({
              customClass: 'modal-info',
              type: 'success',
              title: 'Tramo',
              timer: 2000,
              text: 'Tramo eliminado exitosamente',
              animation: true,
              showCancelButton: true,
              showConfirmButton: false,
              cancelButtonText: 'Cerrar'
            })
            this.getTrips()
          }
        } catch (e) {
          console.log('catch err', e.response)
          this.editedItem = Object.assign({}, '')
          // alert('Ha ocurrido un error, intente más tarde!')
          this.confirmaAnular = false
          // this.showModal = true
          // this.modalInfoTitle = 'Ha ocurrido un error'
          // this.modalInfoDetail = 'Ha ocurrido un error eliminando el tramo, intente más tarde.'
          // this.modalInfoBtn1 = 'OK'
          this.$swal({
            customClass: 'modal-info',
            type: 'error',
            title: 'Ha ocurrido un error al eliminar el tramo',
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
        this.editedItem = Object.assign({}, '')
      },
      editItem (item) {
        this.editedItem = item
        this.dialog = true
        console.log('a editar', item)
      },
      async save (guardar) {
        console.log('a guardar', guardar)
        if (this.$refs.form.validate()) {
          let tramo = {
            'trip':
            {
              'dest_id': guardar.dest_id ? guardar.dest_id : '',
              'source_id': guardar.source_id ? guardar.source_id : '',
              'name': guardar.name ? guardar.name : '',
              'public': guardar.public,
              'duration': guardar.duration ? guardar.duration : '',
              'vuelo': guardar.vuelo ? guardar.vuelo : false
            }
          }
          if (guardar.id) {
            console.log('tramo a put', tramo)
            let id = guardar.id
            try {
              let tramos = await API.put('trips', id, tramo)
              if (tramos.status >= 200 && tramos.status < 300) {
                console.log('ya hizo PUT', tramos)
                this.editedItem = Object.assign({}, '')
                this.$swal({
                  customClass: 'modal-info',
                  type: 'success',
                  title: 'Tramo',
                  timer: 2000,
                  text: 'Tramo actualizado exitosamente',
                  animation: true,
                  showCancelButton: true,
                  showConfirmButton: false,
                  cancelButtonText: 'OK'
                })
                this.getTrips()
                this.dialog = false
              }
            } catch (e) {
              console.log('catch err', e.response)
              // alert('Ha ocurrido un error, intente más tarde!')
              this.editedItem = Object.assign({}, '')
              this.dialog = false
              // this.showModal = true
              // this.modalInfoTitle = 'Ha ocurrido un error'
              // this.modalInfoDetail = 'Ha ocurrido un error editando el usuario, intente más tarde.'
              // this.modalInfoBtn1 = 'OK'
              this.$swal({
                customClass: 'modal-info',
                type: 'error',
                title: 'Ha ocurrido un error al crear el tramo, intente más tarde.',
                text: e.response.data.error,
                animation: true,
                showCancelButton: true,
                showConfirmButton: false,
                cancelButtonText: 'Cerrar'
              })
            }
          } else {
            console.log('tramo a post', tramo)
            try {
              let tramos = await API.post('trips', tramo)
              if (tramos.status >= 200 && tramos.status < 300) {
                console.log('post ok', tramos)
                this.$swal({
                  customClass: 'modal-info',
                  type: 'success',
                  title: 'Tramo',
                  timer: 2000,
                  text: 'Tramo creado exitosamente',
                  animation: true,
                  showCancelButton: true,
                  showConfirmButton: false,
                  cancelButtonText: 'OK'
                })
                this.getTrips()
                this.dialog = false
              }
            } catch (e) {
              console.log('catch err', e.response)
              // alert('Ha ocurrido un error, intente más tarde!')
              this.editedItem = Object.assign({}, '')
              this.dialog = false
              this.$swal({
                customClass: 'modal-info',
                type: 'error',
                title: 'Ha ocurrido un error al crear el tramo, intente más tarde.',
                text: e.response.data.error,
                animation: true,
                showCancelButton: true,
                showConfirmButton: false,
                cancelButtonText: 'Cerrar'
              })
              // this.showModal = true
              // this.modalInfoTitle = 'Ha ocurrido un error'
              // this.modalInfoDetail = 'Ha ocurrido un error creando el tramo, intente nuevamente.'
              // this.modalInfoBtn1 = 'OK'
            }
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
