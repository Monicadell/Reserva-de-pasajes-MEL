<template>
  <v-list dense class="py-0 user">
    <v-toolbar-title class="title-list-custom primary white--text">
      <span class="hidden-sm-and-down ml-4">Escoger usuario</span>
    </v-toolbar-title>
    <v-progress-linear :indeterminate="true" v-if="progres"></v-progress-linear>
    <v-divider></v-divider>
      <v-flex> 
        <v-card>
          <v-text-field
            flat label="Buscar"
            prepend-inner-icon="search"
            solo
            v-model="search"
            clearable
            class="input-buscar-user mb-0"
            v-on:change="busca"
            @click:clear="clearSearch">
          </v-text-field>
            <!-- <template v-if="role === 2">
              <v-chip
                close
                color="primary"
                outline
                class="chip--select-multi"
                @input="remove(selected)"
                v-if="selected.name"
              >
                {{ selected.name }}
              </v-chip>
            </template> -->
            <!-- <template v-if="role === 2">
              <div v-for="seleccionado in selected" :key="seleccionado.id">
                <v-chip
                  :selected="seleccionado"
                  close
                  color="primary"
                  outline
                  class="chip--select-multi"
                  @input="remove(seleccionado)"
                >
                  {{ seleccionado.name }}
                </v-chip>
              </div>
            </template> -->
            <template v-if="selected !== []">
              <div v-for="seleccionado in selected" :key="seleccionado.id">
                <v-chip
                  close
                  color="primary"
                  outline
                  class="chip--select-multi"
                  @input="remove(seleccionado)"
                >
                  {{ seleccionado.name }}
                </v-chip>
              </div>
            </template>

          <v-list two-line class="lista-users pt-0" v-if="users.length > 0">
            <template v-for="(item) in users">
              <v-list-tile
                :key="item.id"
                avatar
                ripple
                @click="selectUser(item)"
                style="border-bottom: 1px solid #ccc;"
                v-if="search !== ''"
              >
         
                <v-list-tile-content>
                  <v-list-tile-title class="primary--text text-capitalize">{{ item.name }}</v-list-tile-title>
                  <v-list-tile-sub-title class="text--primary">{{ item.rut }}</v-list-tile-sub-title>
                  <v-list-tile-sub-title>{{ item.company_name }}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-icon
                    small
                    slot="activator"
                    class="icono-select"
                    @click="selectUser(item)"
                  >
                    chevron_right
                  </v-icon>
                </v-list-tile-action>
              </v-list-tile>
              
            </template>
          </v-list>
        </v-card>
      </v-flex> 
    <!-- </v-layout>  -->
  </v-list>
</template>
          
<script>
  import API from '@pi/app'
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
      //  e1: 0,
        items: [],
        right: null,
        progres: false,
        users: [],
        selected: [],
        search: '',
        check: false,
        autoUpdate: true,
        isUpdating: false
      }
    },
    watch: {
      isUpdating (val) {
        if (val) {
          setTimeout(() => (this.isUpdating = false), 3000)
        }
      },
      search () {
        console.log('cambio search')
        this.busca()
      },
      usuariosBook (val) {
        console.log('clear usuarios', val)
        if (val.length === 0) {
          this.selected = []
        }
      }
    },
    computed: {
      ...mapGetters({
        usuariosBook: ['Booking/usuariosBook'],
        role: ['Auth/role']
      })
    },
    mounted () {
      console.log('path', this.$route.path)
    },
    methods: {
      clearSearch () {
        this.search = ''
        this.users = []
      },
      busca () {
        console.log('busca', this.search)
        if (this.search !== '') {
          console.log('hay algo en search', this.search)
          let buscar = {'q': this.search}
          this.getUsers(buscar)
        }
      },
      selectUser (item) {
        console.log('select user->', this.selected)
        if (this.role === 5) {
          let tam = this.selected.some(sel => sel.id === item.id)
          if (!tam) {
            this.selected.push(item)
            this.$store.dispatch('Booking/set_usuariosBook', {
              usuariosBook: this.selected.map(item => item.id)
            })
          }
        } else {
          console.log('item a select', item, this.selected)
          this.selected.splice(0, 1)
          this.selected.push(item)
          console.log('selected afeter', this.selected)
          // this.selected[0] = item
          this.$store.dispatch('Booking/set_usuariosBook', {
            usuariosBook: this.selected.map(item => item.id)
            // usuariosBook: this.selected[0].id
          })
        }
      },
      remove (item) {
        if (this.role === 5) {
          const index = this.selected.indexOf(item)
          if (index >= 0) this.selected.splice(index, 1)
          // this.selected = ''
          this.$store.dispatch('Booking/set_usuariosBook', {
            usuariosBook: this.selected.map(item => item.id)
          })
        } else {
          this.selected = []
          this.$store.dispatch('Booking/set_usuariosBook', {
            usuariosBook: []
          })
        }
      },
      async getUsers (params) {
        try {
          let usuarios = await API.get('users', params)
          if (usuarios.status >= 200 && usuarios.status < 300) {
            console.log('usuarios', usuarios.data)
            setTimeout(() => {
              this.users = usuarios.data.data
              // this.pagination.totalItems = usuarios.data.total_entries
              // this.pagination.page = usuarios.data.page_number
              // this.pagination.rowsPerPage = usuarios.data.page_size
              // this.pagination.total_pages = usuarios.data.total_pages
              this.progres = false
            }, 500)
          }
        } catch (e) {
          console.log('catch err', e.response)
          this.$swal({
            customClass: 'modal-info',
            type: 'error',
            title: 'Ha ocurrido un error',
            text: 'Ha ocurrido un inconveniente al obtener los usuarios del sistema, intente nuevamente.',
            animation: true,
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonText: 'Cerrar'
          })
        }
      }
    },
    beforeDestroy () {
      console.log('before destroy de userslist')
      this.$store.dispatch('Booking/set_usuariosBook', {
        usuariosBook: []
      })
    }
  }
</script>