<template>
  <v-footer height="auto" dark fixed>
    <v-card color="transparent" class="flex pa-0" flat tile>
      <v-card-title class="pb-0">
        <v-spacer></v-spacer>
        logo
        <!--<img src="@/assets/img/logos/gestsol_white.png" alt="gplay" height="25">-->
        <v-spacer></v-spacer>
      </v-card-title>

      <v-card-actions class="justify-center pt-1">
        <small>&copy; {{ new Date().getFullYear() }} Todos los derechos reservados</small>
      </v-card-actions>
    </v-card>
  </v-footer>
</template>
