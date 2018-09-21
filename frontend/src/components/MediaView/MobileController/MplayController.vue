<template>
  <div class="MplayController controller" v-on:click="playControl">
    <font-awesome-icon icon="play" v-show="!play" />
    <font-awesome-icon icon="pause" v-show="play" />
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  
  export default {
    computed: {
      ...mapState(['play'])
    },
    methods: {
      playControl () {
        this.$emit('playControl')
      }
    }
  }
</script>

<style>
  @import '../../../styles/MediaView/MobileController/MplayController.css';
</style>
