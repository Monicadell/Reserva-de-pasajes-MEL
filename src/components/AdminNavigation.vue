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

    <v-list two-line class="primary" dark>
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
      <template v-for="item in items">

        <v-subheader v-if="item.subheader" class="grey--text text--darken-1">
          {{item.text}}
        </v-subheader>

        <v-list-tile v-else :to="item.path">
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
        {subheader: true, text: 'Reservas'},
        {icon: '../../static/icons/06.png', text: 'Reservar', path: { path: '/service_reserve' }},
        {icon: '../../static/icons/06.png', text: 'Mis reservas', path: { path: '/misreservas' }},
        {subheader: true, text: 'Admin'},
        {icon: '../../static/icons/01.png', text: 'Usuarios', path: { path: '/users' }},
        {icon: '../../static/icons/02.png', text: 'Estaciones', path: { path: '/estaciones' }},
        {icon: '../../static/icons/03.png', text: 'Tramos', path: { path: '/tramos' }},
        {icon: '../../static/icons/04.png', text: 'Frecuencias', path: { path: '/frecuencias' }},
        {icon: '../../static/icons/05.png', text: 'Manifiestos', path: { path: '/manifiestos' }},
        {icon: '../../static/icons/06.png', text: 'Servicios', path: { path: '/servicios' }},
        // {icon: '../../static/icons/07.png', text: 'Buses', path: { path: '/buses' }},
        // {icon: '../../static/icons/08.png', text: 'Conductores', path: { path: '/conductores' }},
        {subheader: true, text: 'Perfil'},
        {icon: '../../static/icons/config.png', text: 'Mi información', path: { path: '/myInfo' }}
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
    },
    methods: {
      info () {
        this.name = this.username
        this.role = this.roleus
      },
      outside: function(e) {
      	this.clickOutside = !this.clickOutside
        console.log('clicked outside!')
        this.$store.dispatch('Auth/hide', {
          hide: true
        })
      },
    },
    directives: {
    'click-outside': {
      bind: function(el, binding, vNode) {
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
      
      unbind: function(el, binding) {
        // Remove Event Listeners
        document.removeEventListener('click', el.__vueClickOutside__)
        el.__vueClickOutside__ = null

      }
    }
  }
  }
</script>
