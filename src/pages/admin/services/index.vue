<template>
  <div>
    <v-toolbar card prominent>
      <v-spacer></v-spacer>
      <v-toolbar-title class="body-3 grey--text">
        <!--{{$t(`lang.home.auth.${menuSelection.text}`)}}-->
        Busqueda de servicios
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="grey--text">
        Frecuentes
      </div>
      <v-btn small outline color="primary">MEL - Complejo MEL</v-btn>
      <v-btn small outline color="primary">Complejo MEL - MEL</v-btn>
      <v-btn small outline color="primary">Aeropuerto ANF - MEL</v-btn>
      <v-btn icon class="grey--text">
        <v-icon>help</v-icon>
      </v-btn>
    </v-toolbar>

    <v-divider></v-divider>


    <v-card-text>
      <v-container fluid grid-list-lg class="pt-0">
        <v-layout row wrap fill-height>
          <v-flex xs12 md5>
            <place-selector :direction="'from'"/>
            <place-selector :direction="'to'" class="mt-3"/>
            <service-date :direction="'from'" class="mt-3"/>
          </v-flex>
          <v-flex xs12 md7>
            <service-list/>
          </v-flex>
          <!--<v-flex xs12 md1 class="text-xs-center pb-0">
<v-icon class="text-xs-center">fal fa-arrow-down</v-icon>
          </v-flex>-->
        </v-layout>
        <v-layout row wrap fill-height class="mt-2">
          <v-flex xs12 >
            <service-selected/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>

  </div>
</template>

<script>
  import PlaceSelector from '@c/PlaceSelector'
  import ServiceDate from '@c/DatePicker'
  import ServiceList from './List'
  import ServiceSelected from './Selected'

  export default {
    components: {
      PlaceSelector: PlaceSelector,
      ServiceDate: ServiceDate,
      ServiceList: ServiceList,
      ServiceSelected: ServiceSelected
    }
  }
</script>
