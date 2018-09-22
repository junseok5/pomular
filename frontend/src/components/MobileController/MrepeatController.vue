<template>
  <div class="MrepeatController controller" v-on:click="repeat">
    <font-awesome-icon icon="redo" />
  </div>
</template>

<script>
  export default {
    methods: {
      repeat () {
        this.$emit('repeat')
      }
    }
  }
</script>

<style>
  @import '../../styles/components/MobileController/MrepeatController.css';
</style>
