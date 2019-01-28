<template>
  <div>
    <div class="py-3"><h2>Formatos de Buses</h2> </div>
    <v-dialog v-model="dialog" persistent max-width="900px" class="text-xs-right">
      <v-card>
        <v-card-title primary-title class="primary white--text">
          <h3 class="headline">Formatos</h3>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Nombre" v-model="editedItem.name"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Niveles" type="number" 
                          v-model="editedItem.levels"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Nº de asientos"
                          type="number"
                         v-model="editedItem.seats"></v-text-field>
              </v-flex>
              <!-- <v-flex xs12 sm6 md4>
                <v-text-field label="Alto" type="number"
                          v-model="editedItem.height"></v-text-field>
              </v-flex> -->
              <v-flex xs12 md4>
                <v-text-field label="Ancho" type="number"
                          v-model="editedItem.width"></v-text-field>
              </v-flex>
              <v-flex xs12 md4>
                <v-text-field label="Largo" type="number"
                          v-model="editedItem.length"></v-text-field>
              </v-flex>
              <v-flex xs12 md4>
                <v-text-field label="Tara" type="number"
                          v-model="editedItem.weight"></v-text-field>
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

    <!-- dialogo confirmar eliminar -->
    <v-dialog v-model="confirmaAnular" persistent max-width="450">
      <v-card>
        <v-card-title class="headline primary white--text">¿Esta seguro de eliminar el empleado?</v-card-title>
        <v-card-text>Una vez realizada esta acción no podrá recuperar el empleado.</v-card-text>
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
          <v-btn color="primary" @click="dialog = true"> <v-icon light>add</v-icon> Agregar Formato</v-btn>
        </div>
      </v-toolbar>

      <v-data-table
          :headers="headers"
          :items="formats"
          :search="search"
          :loading="loading"
          :rows-per-page-items="[40, 80, 100]"
          item-key="id"
          no-data-text="No hay formatos registrados"
        >
        <template slot="items" slot-scope="props">
          <td class="">{{ props.item.name }}</td>
          <td class="">{{ props.item.levels }}</td>
          <td class="">{{ props.item.seats }}</td>
          <!-- <td class="">{{ props.item.height }}</td> -->
          <td class="">{{ props.item.width }}</td>
          <td class="">{{ props.item.length }}</td>
          <td class="">{{ props.item.weight }}</td>
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
  </div>
</template>

<script>
  import API from '@pi/app'
  import moment from 'moment'
  // import {mapGetters} from 'vuex'

  export default {
    data () {
      return {
        confirmaAnular: false,
        dialog: false,
        search: '',
        eliminaid: '',
        loading: true,
        editedItem: {
          length: '',
          name: '',
          seats: '',
          // height: '',
          width: '',
          levels: '',
          weight: ''
        },
        datepicker: false,
        headers: [
          {text: 'Nombre', value: 'name'},
          {text: 'Niveles', value: 'levels'},
          {text: 'Asientos', value: 'seats'},
          // {text: 'Alto', value: 'height'},
          {text: 'Ancho', value: 'width'},
          {text: 'Largo', value: 'length'},
          {text: 'Tara', value: 'weight'},
          {text: '', value: 'edit', sortable: false},
          {text: '', value: 'delete', sortable: false}
        ],
        formats: [],
        positions: [
          {text: 'Conductor', id: 1},
          {text: 'Auxiliar', id: 2}
        ]
      }
    },
    mounted () {
      this.getEmployees()
    },
    methods: {
      async getEmployees () {
        try {
          let formats = await API.get('formats')
          if (formats.status >= 200 && formats.status < 300) {
            console.log('formatos', formats)
            setTimeout(() => {
              this.formats = formats.data.data
              this.loading = false
            }, 500)
          }
        } catch (e) {
          console.log('catch err', e)
          // this.showModal = true
          // this.modalInfoTitle = 'Ha ocurrido un error'
          // this.modalInfoDetail = 'Ha ocurrido un error al cargar las estaciones, intente más tarde.'
          // this.modalInfoBtn1 = 'OK'
          this.$swal({
            customClass: 'modal-info',
            type: 'error',
            title: 'Error',
            text: 'Ha ocurrido un error al cargar los formatos, intente más tarde.',
            animation: true,
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonText: 'OK'
          })
        }
      },
      editItem (item) {
        console.log('item edit', item)
        this.editedItem = Object.assign({}, item)
        // this.editedItem.position = item.position ? '1' : '2'
        this.dialog = true
      },
      async save (guardar) {
        console.log('a guardar', guardar)
        let em = {
          'format':
          {
            'name': guardar.name ? guardar.name : '',
            'seats': guardar.seats ? guardar.seats : '',
            'levels': guardar.levels ? guardar.levels : '',
            'width': guardar.width ? guardar.width : '',
            'height': guardar.height ? guardar.height : '',
            'length': guardar.length ? guardar.length : '',
            'grid': {'a': 1},
            'weight': guardar.weight ? guardar.weight : ''
          }
        }
        let id = guardar.id
        if (id) {
          console.log('format a put', em)
          try {
            let putformato = await API.put('formats', id, em)
            if (putformato.status >= 200 && putformato.status < 300) {
              this.getEmployees()
              this.dialog = false
              this.$swal({
                type: 'success',
                customClass: 'modal-info',
                timer: 2000,
                title: 'Formato',
                text: 'Formato actualizado exitosamente!',
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
              text: 'Ha ocurrido un error editando el formato, intente más tarde.',
              animation: true,
              showConfirmButton: false,
              showCloseButton: false
            })
          }
        } else {
          console.log('formato a post', em)
          try {
            let postformato = await API.post('formats', em)
            if (postformato.status >= 200 && postformato.status < 300) {
              console.log('result post formato', postformato)
              this.editedItem = Object.assign({}, '')
              this.getEmployees()
              this.dialog = false
              this.$swal({
                type: 'success',
                customClass: 'modal-info',
                timer: 2000,
                title: 'Formato',
                text: 'Formato creado exitosamente!',
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
              text: 'Ha ocurrido un error creando el formato, intente más tarde.',
              animation: true,
              showConfirmButton: false,
              showCloseButton: false
            })
          }
        }
      },
      async deleteItem (item) {
        console.log('voy a eliminar formato', item)
        try {
          let eliminando = await API.delete('formats', item)
          if (eliminando.status >= 200 && eliminando.status < 300) {
            console.log('ya hizo DELETE format', eliminando)
            this.getEmployees()
            this.confirmaAnular = false
            this.$swal({
              type: 'success',
              customClass: 'modal-info',
              timer: 2000,
              title: 'Formato',
              text: 'Formato eliminado exitosamente!',
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
            text: 'Ha ocurrido un error eliminando el formato, intente más tarde.',
            animation: true,
            showConfirmButton: false,
            showCloseButton: false
          })
        }
      },
      irEliminar (datoid) {
        this.eliminaid = datoid
        this.confirmaAnular = true
      },
      close () {
        this.dialog = false
        this.editedItem = Object.assign({})
        // setTimeout(() => {
        //   this.editedItem = Object.assign({}, this.defaultItem)
        //   this.editedIndex = -1
        // }, 300)
      },
      computedDateFormattedMomentjs (data) {
        return data ? moment(data).lang('es').format('dddd DD/MM/YYYY') : ''
      },
      keymonitor () {
        console.log('entra a rut')
        let value = event.target.value
        if (!value) this.user = ''
        value = value.match(/[0-9Kk]+/g).join('')
        this.editedItem.rut = value.slice(0, -1).replace((/[0-9](?=(?:[0-9]{3})+(?![0-9]))/g), '$&.') + '-' + value.slice(-1).toLowerCase()
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
