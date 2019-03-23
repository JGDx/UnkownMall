<template>
  <div>
  <div v-bind:class="{'md-show':mdShow}" class="md-modal modal-msg md-modal-transition">
    <div class="md-modal-inner">
      <div class="md-top">
        <button class="md-close" @click="cloesModal">Close</button>
      </div>
      <div class="md-content">
        <div class="confirm-tips">
          <slot name="message"></slot>
        </div>
        <div class="btn-wrap">
          <slot name="btnGroup"></slot>
        </div>
      </div>
    </div>
  </div>
  <div v-if="mdShow" class="md-overlay" @click="cloesModal"></div>
  </div>
</template>

<script>
  import '../assets/css/login.css'
    export default {
        name: "Modal",
      props:["mdShow"],
      methods:{
        cloesModal(){
          this.$emit("close");
        }
      }
    }
</script>

<style scoped>

</style>
