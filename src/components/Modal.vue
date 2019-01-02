<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header primary white--text">
            <slot name="title">
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                @click="$emit('close')"
                v-if="btn1"
              >
                {{btn1}}
              </v-btn>
              <v-btn
                color="warning"
                @click="$emit('close2')"
                v-if="btn2">
                {{btn2}}
              </v-btn>
            </slot>
          </div>

        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    props: ['btn1', 'btn2'],
    data () {
      return {
        dialog: false
      }
    }
  }
</script>

<style scoped>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    max-width: 500px;
    margin: 0px auto;
    /* padding: 20px 30px; */
    background-color: #fff;
    color: #000;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
    text-align: center;
  }
  .modal-header {
    padding: 10px;
    text-align: left;
  }

  .modal-body {
    margin: 20px 0;
    color: #646464;
    padding: 16px;
  }
  .modal-footer{
    padding-bottom: 10px;
  }
  .modal-default-button {
    float: right;
  }

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
