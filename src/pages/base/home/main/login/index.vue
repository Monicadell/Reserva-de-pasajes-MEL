<template>
  <div>
    <v-card-text class="px-0 py-0">
      <v-container>
        <v-layout align-center justify-center row fill-height>
          <v-flex xs12 md10>
            <v-radio-group v-model="documentType" row class="text-xs-center">
              <v-radio label="Rut" value="1" color="primary"></v-radio>
              <v-radio label="Pasaporte" value="2" color="primary"></v-radio>
            </v-radio-group>
          </v-flex>
        </v-layout>
        
        <v-layout align-center justify-center row fill-height>
          <v-flex xs12 md10>
            <v-text-field
              label="Usuario"
              v-model="user"
              persistent-hint
              hint="Puede ser su RUT o su numero de pasaporte"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout align-center justify-center row fill-height class="mt-3">
          <v-flex xs12 md10>
            <v-text-field
              label="Contraseña"
              v-model="password"
              type="password"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout align-center justify-center row fill-height class="mt-3">
          <v-flex xs12 md6>
            <v-btn block color="primary" @click="log()">Iniciar sesión</v-btn>
          </v-flex>
        </v-layout>
        <!-- <v-layout align-center justify-center row fill-height class="mt-3">
          <v-flex xs12 md6>
             <v-alert
                :value="true"
                type="warning"
                v-if="invalidos"
              >
                Datos inválidos
              </v-alert>

          </v-flex>
        </v-layout> -->
        <!-- Modal Error login -->
        <v-dialog v-model="errorDialog" max-width="290">
          <v-card>
            <v-card-title class="headline">Ha ocurrido un error!</v-card-title>
            <v-card-text>Ingrese datos correctos!</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat @click="errorDialog = false">Ok</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-card-text>

    <v-card-actions class="justify-center pt-1">
      <v-btn color="primary" flat small @click="goToSingUp">Solicitar registro</v-btn>
      <v-spacer></v-spacer>

      <v-btn color="primary" flat small @click="goToForgotPassword">¿Olvido su contraseña?</v-btn>
    </v-card-actions>


  </div>
</template>


<script>
  import axios from 'axios'
  import { mapGetters } from 'vuex'
  import API from '@pi/app'

  export default {
    data () {
      return {
        documentType:'',
        user: '',
        password: '',
        errorDialog: false
      }
    },
    // computed: mapGetters({
    //   authentication: ['getAuth']
    // }),
    methods: {
      goToSingUp () {
        this.$store.dispatch('Home/set_menu', {menu: 1})
      },
      goToForgotPassword () {
        this.$store.dispatch('Home/set_menu', {menu: 2})
      },
      async log () {
        let params = {}
        if(this.documentType === '1'){
          // let rut = this.checkRut(this.user)
          // console.log('return checkrut', rut)
          params = {
              rut: this.user,
              password: this.password
            }
        }
        else{
          params = {
              passport: this.user,
              password: this.password
          }
        }
        let log = await API.post('sign_in', params)
        if (log.status >= 200 && log.status < 300) {
          console.log('login succes log', log.data)
            this.$store.dispatch('Auth/login', {
              pass: this.password,
              user: this.user,
              credential: log.data.jwt
            })
            this.getMyInfo()
        } else {
          alert('Ha ocurrido un error, intente nuevamente más tarde.')
          console.log(log)
        }
      },
      async getMyInfo () {
        console.log('luego de login exitoso voy a montar datos user')
        let info = await API.get('profile')
        if (info.status >= 200 && info.status < 300) {
          // console.log('profile',info)
          this.$store.dispatch('Auth/setData', {
              role: info.data.role_id,
              username: info.data.name,
              useremail: info.data.email
            })
        } else {
          console.log('error profile', error)
        }
      },
      checkRut(rut) {
        // Despejar Puntos
        console.log("rut", rut)
        let valor = rut.replace('.','')
        // Despejar Guión
        valor = valor.replace('-','')
        
        // Aislar Cuerpo y Dígito Verificador
        cuerpo = valor.slice(0,-1)
        dv = valor.slice(-1).toUpperCase()
        
        // Formatear RUN
        rut = cuerpo + '-'+ dv
        
        // Si no cumple con el mínimo ej. (n.nnn.nnn)
        if(cuerpo.length < 7) {
          rut.setCustomValidity("RUT Incompleto")
          return false
        }
        
        // Calcular Dígito Verificador
        suma = 0
        multiplo = 2
        
        // Para cada dígito del Cuerpo
        for (let i in cuerpo) {
           // Obtener su Producto con el Múltiplo Correspondiente
          index = multiplo * valor.charAt(cuerpo.length - i);
          // Sumar al Contador General
          suma = suma + index;
          // Consolidar Múltiplo dentro del rango [2,7]
          if(multiplo < 7) {
            multiplo = multiplo + 1
          } else {
            multiplo = 2
          }
        }
        // for(i=1;i<=cuerpo.length;i++) {
        
        //   index = multiplo * valor.charAt(cuerpo.length - i);

        //   suma = suma + index;
 
        //   if(multiplo < 7) {
        //     multiplo = multiplo + 1
        //   } else {
        //     multiplo = 2
        //   }

        // }
        // Calcular Dígito Verificador en base al Módulo 11
        dvEsperado = 11 - (suma % 11);
        // Casos Especiales (0 y K)
        dv = (dv == 'K')?10:dv
        dv = (dv == 0)?11:dv
        // Validar que el Cuerpo coincide con su Dígito Verificador
        if(dvEsperado != dv) {
          rut.setCustomValidity("RUT Inválido")
          return false
        }
        // Si todo sale bien, eliminar errores (decretar que es válido)
        rut.setCustomValidity('')
      }
    }
  }
</script>
