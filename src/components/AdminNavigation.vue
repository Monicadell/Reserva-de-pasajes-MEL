<template>
  <v-navigation-drawer
    clipped
    :value="drawer"
    fixed
    stateless permanent
    app
    v-click-outside="outside"
    :width="220"
  >

    <v-list two-line class="primary py-0" dark>
      <v-list-tile avatar>
        <v-list-tile-avatar>
          <img :src="avatar + 'testing?font-size=0.45&length=2&background=F17B31&color=fff'">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{name}}</v-list-tile-title>
          <v-list-tile-sub-title class="uppercase">{{role}}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <!-- <v-list class="primary">
      <v-list-tile>
        <v-list-tile-content>
          <v-btn block dark color="primary darken-4">Realizar una reserva</v-btn>
        </v-list-tile-content>
      </v-list-tile>
    </v-list> -->


    <v-list dense>
      <template v-for="(item, i) in items">

        <v-subheader v-if="item.subheader && item.show" class="grey--text text--darken-1">
          {{item.text}}
        </v-subheader>

        <v-list-tile v-if="!item.subheader && item.show" :to="item.path" @click="outside()">
          <v-list-tile-action>
            <img :src="item.icon">
            
          <!--  <v-icon>{{ item.icon }}</v-icon> -->
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </template>
    </v-list>
  </v-navigation-drawer
    :clipped="$vuetify.breakpoint.lgAndUp">
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    props: ['drawer'],
    data: () => ({
      name: '',
      clickOutside: false,
      role: '',
      show: true,
      avatar: 'https://ui-avatars.com/api/?name=',
      items: [
        {subheader: true, text: 'Reservas', type: 'Call'}, // Call es callcenter y admin
        {icon: '../../static/icons/06.png', text: 'Reservar', path: { path: '/service_reserve' }, type: 'Call'},
        {icon: '../../static/icons/06.png', text: 'Mis reservas', path: { path: '/misreservas' }, type: 'Call'},
        {subheader: true, text: 'Reservas a Terceros', type: 'Call'},
        {icon: '../../static/icons/06.png', text: 'Reservar a terceros', path: { path: '/reservaterceros' }, type: 'Call'},
        {icon: '../../static/icons/06.png', text: 'Historial a terceros', path: { path: '/misreservasaterceros' }, type: 'Call'},
        {subheader: true, text: 'Admin', type: 'Admin'},
        {icon: '../../static/icons/01.png', text: 'Usuarios', path: { path: '/users' }, type: 'Admin'}, // Admin es solo admin
        {icon: '../../static/icons/01.png', text: 'Solicitudes', path: { path: '/solicitudes' }, type: 'Admin'},
        {icon: '../../static/icons/02.png', text: 'Estaciones', path: { path: '/estaciones' }, type: 'Admin'},
        {icon: '../../static/icons/03.png', text: 'Tramos', path: { path: '/tramos' }, type: 'Admin'},
        {icon: '../../static/icons/04.png', text: 'Frecuencias', path: { path: '/frecuencias' }, type: 'Admin'},
        {icon: '../../static/icons/05.png', text: 'Manifiestos', path: { path: '/manifiestos' }, type: 'Admin'},
        {icon: '../../static/icons/06.png', text: 'Servicios', path: { path: '/servicios' }, type: 'Admin'},
        {icon: '../../static/icons/08.png', text: 'Programación', path: { path: '/asignacion' }, type: 'Admin'},
        {icon: '../../static/icons/07.png', text: 'Buses', path: { path: '/buses' }, type: 'Admin'},
        {icon: '../../static/icons/07.png', text: 'Formatos Bus', path: { path: '/formatos' }, type: 'Admin'},
        {icon: '../../static/icons/08.png', text: 'Empleados', path: { path: '/empleados' }, type: 'Admin'},
        {subheader: true, text: 'Perfil', type: 'Call'},
        {icon: '../../static/icons/config.png', text: 'Mi información', path: { path: '/myInfo' }, type: 'Call'}
        // {icon: 'chat_bubble', text: 'Cambiar contraseña'}
        // {subheader: true, text: ''},
        // {icon: 'phonelink', text: 'Cerrar sesión'}
      ]
    }),
    computed: mapGetters({
      roleus: ['Auth/role'],
      username: ['Auth/username']
    }),
    mounted () {
      this.info()
      this.getItems()
    },
    methods: {
      info () {
        this.name = this.username
        this.role = this.roleus
      },
      outside: function (e) {
        this.clickOutside = !this.clickOutside
        // console.log('clicked outside!')
        this.$store.dispatch('Auth/hide', {
          hide: true
        })
      },
      getItems () {
        if (this.role === 5) { // Rol callcenter
          this.items.forEach(item => {
            if (['Call'].includes(item.type)) {
              item.show = true
            } else {
              item.show = false
            }
          })
        }
        if (this.role === 2) { // Rol admin
          this.items.forEach(item => {
            item.show = true
          })
        }
        console.log('items list', this.items)
      }
    },
    directives: {
      'click-outside': {
        bind: function (el, binding, vNode) {
          // Provided expression must evaluate to a function.
          if (typeof binding.value !== 'function') {
            const compName = vNode.context.name
            let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`
            if (compName) { warn += `Found in component '${compName}'` }
            console.warn(warn)
          }
          // Define Handler and cache it on the element
          const bubble = binding.modifiers.bubble
          const handler = (e) => {
            if (bubble || (!el.contains(e.target) && el !== e.target)) {
              binding.value(e)
            }
          }
          el.__vueClickOutside__ = handler
          // add Event Listeners
          document.addEventListener('click', handler)
        },
        unbind: function (el, binding) {
          // Remove Event Listeners
          document.removeEventListener('click', el.__vueClickOutside__)
          el.__vueClickOutside__ = null
        }
      }
    }
  }
</script>
